import express, { Response } from 'express';
import books from '../services/books';
import { Book, RouteError, RequestBody, SqlParams } from '../types/types';
import { validationResult } from 'express-validator';
import { checkDuplicates } from '../utils/functions';
import { getValidationChain, postValidationChain } from '../utils/middleware';

const bookRouter = express.Router();

// TODO: 
// Verify all the status codes and response formats are correct per spec

// TODO:
// types for rows?
bookRouter.get('/', getValidationChain, async (req: RequestBody<Book>, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new RouteError('Oops, looks like you provided bad input!', errors.mapped(), 400);

	let allBooks;
	if (!req.body.author && !req.body.year && !req.body.publisher)
		allBooks = await books.getAll();
	else {
		const searchParams: SqlParams = [req.body.author, req.body.year, req.body.publisher];
		allBooks = await books.searchAll(searchParams);
	}
	res.status(200).json(allBooks);
});

bookRouter.get('/:id', async (req, res) => {
	// TODO:
	// input validation
	const bookById = await books.findById([Number(req.params.id)]);
	res.status(200).json(bookById);
});

bookRouter.post('/', postValidationChain, async (req: RequestBody<Book>, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new RouteError('Oops, looks like you provided bad input!', errors.mapped(), 400);

	if (checkDuplicates(await books.getAll(), req).length !== 0)
		throw new RouteError('Oops, looks like this entry already exists!', {}, 400);

	// TODO: Still has to check for null fields, some are optional
	// we could check if they exist in the middleware.
	const bookParams: SqlParams = [
		req.body.title,
		req.body.author,
		req.body.year,
		req.body.publisher,
		req.body.description
	];

	const bookToAdd = await books.create(bookParams);
	res.status(200).json({ id: bookToAdd.lastID });
});

bookRouter.delete('/:id', async (req, res) => {
	// TODO: input validation?
	await books.remove([Number(req.params.id)]);
	res.status(204).send();
});

export default bookRouter;
