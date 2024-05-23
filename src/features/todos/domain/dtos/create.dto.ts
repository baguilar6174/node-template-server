import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class CreateTodoDto implements CoreDto<CreateTodoDto> {
	constructor(public readonly text: string) {
		this.validate(this);
	}

	public validate(dto: CreateTodoDto): void {
		const errors: ValidationType[] = [];

		if (!dto.text || dto.text.length === ZERO) {
			errors.push({ fields: ['text'], constraint: 'Text is required' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating create todo', errors);
	}
}
