import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
	console.log(`Method: ${req.method}`);
	console.log(`Path: ${req.path}`);
	console.log(`Body: ${JSON.stringify(req.body)}`);
	console.log('---');
	next();
};

// TODO: might not be relevant here
const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
	if (err.name === 'CastError') {
		return res.status(404).send({ error: 'malformatted id' });
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message });
	}
	next(err);
};

export default {
	requestLogger,
	errorHandler,
};
