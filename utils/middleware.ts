import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types/types';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
	console.log(`Method: ${req.method}`);
	console.log(`Path: ${req.path}`);
	console.log(`Body: ${JSON.stringify(req.body)}`);
	console.log('---');
	next();
};

const errorHandler = (
	err: TypeError | CustomError,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	let customError = err;
	if (!(err instanceof CustomError)) {
		customError = new CustomError(
			'no separate error implemented for this situation!'
		);
	}

	res.status((customError as CustomError).statusCode).json(customError);
};

export default {
	requestLogger,
	errorHandler,
};
