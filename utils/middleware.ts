import { Request, Response, NextFunction } from 'express';
import { body, check } from 'express-validator';
import { RouteError } from '../types/types';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
	console.log(`Method: ${req.method}`);
	console.log(`Path: ${req.path}`);
	console.log(`Body: ${JSON.stringify(req.body)}`);
	console.log('---');
	next();
};

const errorHandler = (
	err: TypeError | RouteError,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	let error = err;
	if (!(err instanceof RouteError)) {
		error = new Error('no separate error implemented for this situation!');
	}

	res.status((error as RouteError).statusCode).json(error);
};

export const getValidationChain = [
	body('author').if(body('author')
		.exists()
		.isString()
		.notEmpty()
	),
	body('year').if(body('year')
		.exists()
		.not()
		.isString()
		.isInt()
	),
	body('publisher').if(body('publisher')
		.exists()
		.isString()
		.notEmpty()
	),
];

// TODO?: it's possible to ping the db from here so we could check duplicates here as well
export const postValidationChain = [
	check('title').isString().notEmpty(),
	check('author').isString().notEmpty(),
	check('year').not().isString().isInt(),
	check('publisher').isString().notEmpty()
];

export default {
	requestLogger,
	errorHandler,
};
