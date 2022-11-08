import { Request } from 'express';

export type SqlParams = Array<string | number>

export interface Book {
	title: string,
	author: string,
	year: number,
	publisher: string,
	description: string
}

export interface SafeRequest<T> extends Request {
	body: T
}

// export class CustomError implements Error {
// 	constructor(message: string) {
// 		super(message);
// 		Object.setPrototypeOf(this, CustomError.prototype);
// 	}
// }

export class CustomError {
	msg!: string;
	statusCode!: number;

	constructor(msg: string, statusCode: number = 500) {
		this.msg = msg;
		this.statusCode = statusCode;
	}
}


