// This is a module for serving data from the database to the router
import db from '../services/db';
import { SqlParams } from '../types/types';

const getAll = async () => await db.queryAll(`select * from books`);

// TODO: Figure out how to use sql with null checks(?)
// We could snip the SQL into parts, this way the ending would always start with 'where'
// meaning we could get rid of getAll?
const searchAll = async (search: SqlParams) => {
	const trimmedParams = search.filter(param => param !== undefined);
	console.log('trim', trimmedParams);

	const sql = `select * from books where author = ? or year = ? or publisher = ?`;
	return await db.queryAll(sql, search);
};

const findById = async (id: SqlParams) => await db.queryRow(`select * from books where id = ?`, id);

const remove = async (id: SqlParams) => await db.queryOperate(`delete from books where id = ?`, id);

const create = async (book: SqlParams) => {
	const sql = `insert into books(title,author,year,publisher,description) values (?,?,?,?,?)`;
	return await db.queryOperate(sql, book);
};

export default {
	getAll,
	searchAll,
	findById,
	remove,
	create,
};
