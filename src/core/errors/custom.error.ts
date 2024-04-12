// src\core\errors\custom.error.ts

import { HttpCode } from '../constants';

interface AppErrorArgs {
	name?: string;
	statusCode: HttpCode;
	message: string;
	isOperational?: boolean;
}

export class AppError extends Error {
	public readonly name: string;
	public readonly statusCode: HttpCode;
	public readonly isOperational: boolean = true;

	private constructor(args: AppErrorArgs) {
		const { message, name, statusCode, isOperational } = args;
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name ?? 'Error';
		this.statusCode = statusCode;
		if (isOperational !== undefined) this.isOperational = isOperational;
		Error.captureStackTrace(this);
	}

	static badRequest(message: string): AppError {
		return new AppError({ message, statusCode: HttpCode.BAD_REQUEST });
	}

	static unauthorized(message: string): AppError {
		return new AppError({ message, statusCode: HttpCode.UNAUTHORIZED });
	}

	static forbidden(message: string): AppError {
		return new AppError({ message, statusCode: HttpCode.FORBIDDEN });
	}

	static notFound(message: string): AppError {
		return new AppError({ message, statusCode: HttpCode.NOT_FOUND });
	}

	static internalServer(message: string): AppError {
		return new AppError({ message, statusCode: HttpCode.INTERNAL_SERVER_ERROR });
	}
}
