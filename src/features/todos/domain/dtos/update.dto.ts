import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class UpdateTodoDto implements CoreDto<UpdateTodoDto> {
	private constructor(
		public readonly id: number,
		public readonly text?: string,
		public readonly isCompleted?: boolean
	) {
		this.validate(this);
	}

	public validate(dto: UpdateTodoDto): void {
		const errors: ValidationType[] = [];

		const { id, isCompleted } = dto;

		if (!id || isNaN(Number(id))) {
			errors.push({ fields: ['id'], constraint: 'Id is not a valid number' });
		}

		if (
			isCompleted !== undefined &&
			typeof isCompleted !== 'boolean' &&
			isCompleted !== 'true' &&
			isCompleted !== 'false'
		) {
			errors.push({ fields: ['isCompleted'], constraint: 'isCompleted must be a valid value (true or false)' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating update todo', errors);
	}

	/**
	 * This method creates a new instance of the DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of the DTO
	 */
	public static create(object: Record<string, unknown>): UpdateTodoDto {
		const { id, text, isCompleted } = object;
		return new UpdateTodoDto(id as number, text as string, isCompleted as boolean);
	}
}
