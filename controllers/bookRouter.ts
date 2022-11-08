import express from 'express';
import books from '../services/books';
import { Book, SafeRequest, SqlParams } from '../types/types';
import { check, validationResult } from 'express-validator';

const bookRouter = express.Router();

// TODO: 
// Verify all the status codes and response formats are correct per spec

// TODO:
// types for rows?
bookRouter.get('/', async (_req, res) => {
	const allBooks = await books.getAll();
	res.status(200).json(allBooks);
});

bookRouter.get('/:id', async (req, res) => {
	// TODO:
	// input validation, error handling should be working
	const bookById = await books.findById([Number(req.params.id)]);
	res.status(200).json(bookById);
});

bookRouter.post('/',
	check('title').notEmpty(),
	check('author').notEmpty(),
	check('year').isNumeric().toInt(), // checks that the string only contains numbers and converts it
	check('publisher').notEmpty()
	, async (req: SafeRequest<Book>, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		// TODO: Validation for duplicate books as well

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

	if (typeof req.params.id !== 'number')
		return res.status(404).json();

	await books.remove([Number(req.params.id)]);
	res.status(204).send();
});

export default bookRouter;
