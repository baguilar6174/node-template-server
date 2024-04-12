import { type ValidationType } from '../../../../core/types';

export class CreateTodoDto {
	constructor(public readonly text: string) {}

	public static validate(dto: CreateTodoDto): ValidationType[] {
		const errors: ValidationType[] = [];

		if (!dto.text) {
			errors.push({ fields: ['text'], constraint: 'Text is required' });
		}

		return errors;
	}
}
