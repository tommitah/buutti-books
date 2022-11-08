import { Request } from 'express';
import { ValidationError } from 'express-validator';

export type SqlParams = Array<string | number>

export type RequestBody<T> = Request<{}, {}, T>;

export interface Book {
	title: string,
	author: string,
	year: number,
	publisher: string,
	description: string
}

export class RouteError {
	msg!: string;
	record!: Record<string, ValidationError>;
	statusCode!: number;

	constructor(msg: string, record: Record<string, ValidationError> = {}, statusCode = 500) {
		this.msg = msg;
		this.record = record;
		this.statusCode = statusCode;
	}
}


