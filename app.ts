import express from 'express';
require('express-async-errors');
import middleware from './utils/middleware';
import bookRouter from './controllers/bookRouter';

const app = express();

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.errorHandler);

app.get('/', (_req, res) => res.status(200).json({ success: true }));

app.use('/books', bookRouter);


export default app;
