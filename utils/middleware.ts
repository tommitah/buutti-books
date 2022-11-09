import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
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

	// no idea why the || 500 is needed and not just inferred
	// console.log(error);
	// console.log((error as RouteError).statusCode);
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
// Somethings wrong with the validation now
// The issue is reported in the middleware
// My idea was to check whether the fields exist in validation since some of them are optional
export const postValidationChain = [
	body('title').exists().isString().notEmpty(),
	body('author').exists().isString().notEmpty(),
	body('year').exists().not().isString().isInt(),
	body('publisher').if(body('publisher')
		.exists()
		.isString()
		.notEmpty()
	),
	body('description').if(body('description')
		.exists()
		.isString()
		.notEmpty()
	),
];

export default {
	requestLogger,
	errorHandler,
};
