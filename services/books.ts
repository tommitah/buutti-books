// This is a module for serving data from the database to the router
import db from '../services/db';
import { SqlParams } from '../types/types';

// TODO:
// error validation for books service? Types might take care of it?

const getAll = async () => await db.queryAll(`select * from books`);

const findById = async (id: number) => await db.querySingle(`select * from books where id = ?`, [id]);

const remove = async (id: number) => await db.querySingle(`delete from books where id = ?`, [id]);

const create = async (book: SqlParams) => {
	const sql = `insert into books(title,author,year,publisher,description) values (?,?,?,?,?)`;
	return await db.querySingle(sql, book);
};

export default {
	getAll,
	findById,
	remove,
	create,
};
