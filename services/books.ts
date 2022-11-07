// This is a module for serving data from the database to the router
import db from '../services/db';

const getAll = async () => await db.query(`select * from books`);

const findById = async (id: number) => await db.queryOne(`select * from books where id = ?`, id);

const remove = async (id: number) => await db.queryOne(`delete from books where id = ?`, id);

// TODO: SQL params interface for this!
const create = async (book: any[]) => {
	const sql = `insert into books(title,author,year,publisher,description) values (?,?,?,?,?)`;
	return await db.query(sql, book);
};

export default {
	getAll,
	findById,
	remove,
	create,
};
