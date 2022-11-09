import { Book, RequestBody, SqlParams } from '../types/types';

export const checkDuplicates = (allBooks: Array<Book>, req: RequestBody<Book>) => {
	return allBooks.filter(book => (book.title === req.body.title &&
		book.author === req.body.author &&
		book.year === req.body.year)
	);
};

export const buildSearchQuery = (search: SqlParams) => {
	//...
	let sql = `select * from books where `;
	let first = true;
	if (search[0]) {
		sql = sql.concat(`author = ? `);
		first = false;
	}
	if (search[1]) {
		if (first) {
			sql = sql.concat(`year = ? `);
			first = false;
		}
		else sql = sql.concat(`and year = ?`);
	}
	if (search[2]) {
		if (first)
			sql = sql.concat(`publisher = ? `);
		else sql = sql.concat(`and publisher = ?`);
	}

	return sql;
};
