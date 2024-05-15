import { ZERO } from '../../../../core/constants';
import { ValidationError } from '../../../../core/errors/validation.error';
import { type ValidationType } from '../../../../core/types';
import { type CoreDto } from '../../../shared/domain';

export class CreateTodoDto implements CoreDto<CreateTodoDto> {
	constructor(public readonly text: string) {
		this.validate(this);
	}

	public validate(dto: CreateTodoDto): void {
		const errors: ValidationType[] = [];

		if (!dto.text) {
			errors.push({ fields: ['text'], constraint: 'Text is required' });
		}

		if (errors.length > ZERO) throw new ValidationError(errors);
	}
}
