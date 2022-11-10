import { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { RouteError } from '../types/types';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
	console.log(`Method: ${req.method}`);
	console.log(`Path: ${req.path}`);
	console.log(`Body: ${JSON.stringify(req.body)}`);
	console.log('---');
	next();
};

const errorHandler = (
	err: TypeError | SyntaxError | RouteError,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	let error = err;

	if (err instanceof SyntaxError)
		error = new RouteError('Your format is not valid JSON.', {}, 400);
	else if (!(err instanceof RouteError))
		error = new Error('no separate error implemented for this situation!');
	

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

export const idValidationChain = [
	param('id').exists().isInt()
];

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
