import express from 'express';
import books from '../services/books';

const bookRouter = express.Router();

// TODO: 
// Verify all the status codes and response formats are correct per spec

// TODO:
// types for rows?
// TODO:
// error validation for books service!
bookRouter.get('/', async (_req, res) => {
	const allBooks = await books.getAll();
	res.status(200).json(allBooks);
});

bookRouter.get('/:id', async (req, res) => {
	// TODO:
	// input validation, error handling should be working
	const bookById = await books.findById(Number(req.params.id));
	res.status(200).json(bookById);
});

bookRouter.post('/', async (req, res) => {
	// NOTE: had to disable the implicit return rule for the compiler
	const body = req.body;

	// TODO:
	// is there a way to make the type checks etc a bit more typescripty?
	if (!body.title || body.title === ''
		|| !body.author || body.author === ''
		|| !body.year || body.publisher === '')
		return res.status(400).json({ error: 'book must have a title, author and year' });

	if (typeof body.year !== 'number')
		return res.status(400).json({ error: 'year must be a number' });

	// TODO: Validation for duplicate books as well

	// TODO: ts type/interface for this? Could return an array still?
	const book = [
		body.title,
		body.author,
		body.year,
		body.publisher,
		body.description
	];

	const bookToAdd = await books.create(book);
	res.status(200).json(bookToAdd);
});

bookRouter.delete('/:id', async (req, res) => {
	// TODO: input validation
	await books.remove(Number(req.params.id));
	res.status(200).json({ removed: true });
});

export default bookRouter;
