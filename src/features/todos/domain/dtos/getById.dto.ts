import { type ValidationType, ZERO, AppError } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class GetTodoByIdDto implements CoreDto<GetTodoByIdDto> {
	private constructor(public readonly id: number) {
		this.validate(this);
	}

	public validate(dto: GetTodoByIdDto): void {
		const errors: ValidationType[] = [];

		const { id } = dto;

		if (!id || isNaN(Number(id))) {
			errors.push({ fields: ['id'], constraint: 'Id is not a valid number' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating get todo by id', errors);
	}

	/**
	 * This method creates a new instance of the DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of the DTO
	 */
	public static create(object: Record<string, unknown>): GetTodoByIdDto {
		const { id } = object;
		return new GetTodoByIdDto(id as number);
	}
}
