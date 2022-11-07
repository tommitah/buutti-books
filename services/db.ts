// This is a module for db-integration
import { Database } from 'sqlite3';
import path from 'path';

const db = new Database(path.resolve('books.db'), (err) => {
	if (err) return console.error(err.message);
	console.log('connection to database established!');
});

// TODO: 
// interface for sql params to fix any?
const query = (sql: string, params?: any[]) => {
	// TODO: should this just return rows and errors?
	// TODO: interface/type for rows!
	return new Promise((resolve, reject) => {
		db.prepare(sql)
			.all(params, (err, rows) => err ? reject(err) : resolve(rows))
			.finalize();
	});
};

const queryOne = (sql: string, id: number) => {
	return new Promise((resolve, reject) => {
		db.prepare(sql)
			.get([id], (err, row) => err ? reject(err) : resolve(row))
			.finalize();
	});
};

export default {
	query,
	queryOne,
};
