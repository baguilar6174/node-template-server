// src\core\errors\custom.error.ts

import { HttpCode } from '../constants';
import { type ValidationType } from '../types';

interface AppErrorArgs {
	name?: string;
	statusCode: HttpCode;
	message: string;
	isOperational?: boolean;
	validationErrors?: ValidationType[];
}

export class AppError extends Error {
	public readonly name: string;
	public readonly statusCode: HttpCode;
	public readonly isOperational: boolean = true;
	public readonly validationErrors?: ValidationType[];

	constructor(args: AppErrorArgs) {
		const { message, name, statusCode, isOperational, validationErrors } = args;
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name ?? 'Aplication Error';
		this.statusCode = statusCode;
		if (isOperational !== undefined) this.isOperational = isOperational;
		this.validationErrors = validationErrors;
		Error.captureStackTrace(this);
	}

	static badRequest(message: string, validationErrors?: ValidationType[]): AppError {
		return new AppError({ name: 'BadRequestError', message, statusCode: HttpCode.BAD_REQUEST, validationErrors });
	}

	static unauthorized(message: string): AppError {
		return new AppError({ name: 'UnauthorizedError', message, statusCode: HttpCode.UNAUTHORIZED });
	}

	static forbidden(message: string): AppError {
		return new AppError({ name: 'ForbiddenError', message, statusCode: HttpCode.FORBIDDEN });
	}

	static notFound(message: string): AppError {
		return new AppError({ name: 'NotFoundError', message, statusCode: HttpCode.NOT_FOUND });
	}

	static internalServer(message: string): AppError {
		return new AppError({ name: 'InternalServerError', message, statusCode: HttpCode.INTERNAL_SERVER_ERROR });
	}
}
