import express, { Request, Response } from 'express';
import books from '../services/books';
import { Book, RouteError, RequestBody, SqlParams } from '../types/types';
import { validationResult } from 'express-validator';
import { checkDuplicates } from '../utils/functions';
import { getValidationChain, idValidationChain, postValidationChain } from '../utils/middleware';

const bookRouter = express.Router();

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

bookRouter.get('/:id', idValidationChain, async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new RouteError('Oops, looks like you provided a funky id!', errors.mapped(), 404);

	const bookById = await books.findById([Number(req.params.id)]);
	if (!bookById)
		throw new RouteError('Oops, looks like you searched for a non-existing book!', {}, 404);

	res.status(200).json(bookById);
});

bookRouter.post('/', postValidationChain, async (req: RequestBody<Book>, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new RouteError('Oops, looks like you provided bad input!', errors.mapped(), 400);

	// This could be done in the middleware as well
	const allBooks = await books.getAll();
	if (checkDuplicates(allBooks, req).length !== 0)
		throw new RouteError('Oops, looks like this entry already exists!', {}, 400);

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

bookRouter.delete('/:id', idValidationChain, async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		throw new RouteError('Oops, looks like you provided a funky id!', errors.mapped(), 404);

	const book = await books.findById([Number(req.params.id)]);
	if (!book) throw new RouteError('Oops, looks like you tried to delete a non-existing entry!', {}, 404);

	await books.remove([Number(req.params.id)]);
	res.status(204).send();
});

export default bookRouter;
