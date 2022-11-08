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




