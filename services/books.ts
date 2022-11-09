// This is a module for serving data from the database to the router
import db from '../services/db';
import { SqlParams } from '../types/types';
import { buildSearchQuery } from '../utils/functions';

const getAll = async () => await db.queryAll(`select * from books`);

const searchAll = async (search: SqlParams) => {
	// View with an empty stomach....
	const sql = buildSearchQuery(search);
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
