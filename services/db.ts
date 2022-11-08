// This is a module for db-integration
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { SqlParams } from '../types/types';

export const dbPromise = open({
	filename: 'books.db',
	driver: sqlite3.Database
});

const queryAll = async (sql: string, params?: SqlParams) => {
	const db = await dbPromise;
	return await db.all(sql, params);
};

// TODO:
// This should return a row if possible, not the .get('/:id') doesn't work
const querySingle = async (sql: string, params: SqlParams) => {
	const db = await dbPromise;
	return await db.run(sql, params);
};

export default {
	queryAll,
	querySingle,
};
