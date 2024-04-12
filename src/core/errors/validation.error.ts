// src\core\errors\validation.error.ts

import { ZERO, type HttpCode } from '../constants';

export interface ValidationType {
	fields: string[];
	constraint: string;
}

export class ValidationError extends Error {
	public readonly statusCode: HttpCode;
	public readonly validationErrors: ValidationType[];

	constructor(validationErrors: ValidationType[]) {
		super('Validation Error');
		Object.setPrototypeOf(this, new.target.prototype);
		this.statusCode = 400;
		this.validationErrors = validationErrors;
		Error.captureStackTrace(this);
	}

	public validate(): void {
		if (this.validationErrors.length > ZERO) throw new ValidationError(this.validationErrors);
	}
}
