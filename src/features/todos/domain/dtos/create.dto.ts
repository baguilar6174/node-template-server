import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class CreateTodoDto implements CoreDto<CreateTodoDto> {
	private constructor(public readonly text: string) {
		this.validate(this);
	}

	public validate(dto: CreateTodoDto): void {
		const errors: ValidationType[] = [];

		if (!dto.text || dto.text.length === ZERO) {
			errors.push({ fields: ['text'], constraint: 'Text is required' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating create todo', errors);
	}

	/**
	 * This method creates a new instance of this DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of this DTO
	 */
	public static create(object: Record<string, unknown>): CreateTodoDto {
		const { text } = object;
		return new CreateTodoDto(text as string);
	}
}
