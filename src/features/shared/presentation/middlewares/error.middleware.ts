import { type Response, type NextFunction, type Request } from 'express';

import { type ErrorResponse, ValidationError, HttpCode, AppError } from '../../../../core';

export class ErrorMiddleware {
	//* Dependency injection
	// constructor() {}

	public static handleError = (error: unknown, _: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
		if (error instanceof ValidationError) {
			const { message, name, validationErrors, stack } = error;
			const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
			res.statusCode = statusCode;
			res.json({ name, message, validationErrors, stack });
		} else if (error instanceof AppError) {
			const { message, name, stack } = error;
			const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
			res.statusCode = statusCode;
			res.json({ name, message, stack });
		} else {
			const name = 'InternalServerError';
			const message = 'An internal server error occurred';
			const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
			res.statusCode = statusCode;
			res.json({ name, message });
		}

		next();
	};
}
