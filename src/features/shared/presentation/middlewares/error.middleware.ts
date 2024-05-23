import { type Response, type NextFunction, type Request } from 'express';

import { type ErrorResponse, HttpCode, AppError } from '../../../../core';

export class ErrorMiddleware {
	//* Dependency injection
	// constructor() {}

	public static handleError = (error: unknown, _: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
		if (error instanceof AppError) {
			const { message, name, stack, validationErrors } = error;
			const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
			res.statusCode = statusCode;
			res.json({ name, message, validationErrors, stack });
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
