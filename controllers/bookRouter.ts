import express from 'express';
import { Database } from 'sqlite3';

const bookRouter = express.Router();
const db = new Database('./books.db');

// TODO: 
// Verify all the status codes and response formats are correct per spec

// TODO:
// types for rows?
bookRouter.get('/', (_req, res) => {
	const statement = db.prepare(`SELECT * FROM books`);
	statement.all((err, rows) => {
		if (err) return console.error(err.message);

		rows.forEach(row => console.log(row));
		res.status(200).json(rows);
	});
});

bookRouter.get('/:id', (req, res) => {
	// TODO:
	// input validation and error handling

	const statement = db.prepare(`SELECT * FROM books WHERE id = ?`);
	statement.get([req.params.id], (err, row) => {
		err ? console.error(err.message) : res.status(200).json(row);
	});
});

bookRouter.post('/', (req, res) => {
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

	// TODO: ts type/interface for this!
	const book = {
		title: body.title,
		author: body.author,
		year: body.year,
		publisher: body.publisher,
		description: body.description
	};

	const statement = db.prepare(`INSERT INTO books(title,author,year,publisher,description) VALUES (?,?,?,?,?)`);
	statement.run(
		[book.title, book.author, book.year, book.publisher, book.description],
		err => err ? console.error(err.message) : res.status(200).json()
	);
});

bookRouter.delete('/:id', (req, res) => {
	// TODO: input validation
	const statement = db.prepare(`DELETE FROM books WHERE id = ?`);
	statement.get([req.params.id], err =>
		err ? console.error(err.message) : res.status(200).json({ success: true }));
});

export default bookRouter;
