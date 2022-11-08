import {Book, RequestBody} from '../types/types';

export const checkDuplicates = (allBooks: Array<Book>, req: RequestBody<Book>) => {
	return allBooks.filter(book => (book.title === req.body.title &&
		book.author === req.body.author &&
		book.year === req.body.year)
	);
};
