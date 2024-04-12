// src\features\shared\presentation\middlewares\error.middleware.ts

import { type Response, type NextFunction, type Request } from 'express';

import { ValidationError } from '../../../../core/errors/validation.error';
import { HttpCode } from '../../../../core/constants';
import { AppError } from '../../../../core/errors/custom.error';

export class ErrorMiddleware {
	//* Dependency injection
	// constructor() {}

	public static handleError = (error: unknown, _: Request, res: Response, next: NextFunction): void => {
		if (error instanceof ValidationError) {
			const { message, name, validationErrors, stack } = error;
			const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
			res.statusCode = statusCode;
			res.json({ name, message, validationErrors, stack });
		}
		if (error instanceof AppError) {
			const { message, name, stack } = error;
			const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
			res.statusCode = statusCode;
			res.json({ name, message, stack });
		}
		next();
	};
}
