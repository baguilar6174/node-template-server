import { AppError, ZERO, type ValidationType } from '../../../../core';
import { type CoreDto } from './core.dto';

export class PaginationDto implements CoreDto<PaginationDto> {
	private constructor(
		public readonly page: number,
		public readonly limit: number
	) {
		this.validate(this);
	}

	/**
	 * This method validates the properties of the PaginationDto class.
	 * @param dto The instance of the PaginationDto class to be validated.
	 * @returns void
	 */
	public validate(dto: PaginationDto): void {
		const errors: ValidationType[] = [];

		if (isNaN(dto.page) || isNaN(dto.limit)) {
			errors.push({ fields: ['page', 'limit'], constraint: 'Page and limit must be numbers' });
		}

		if (dto.page <= ZERO) {
			errors.push({ fields: ['page'], constraint: 'Page must be greater than zero' });
		}

		if (dto.limit <= ZERO) {
			errors.push({ fields: ['limit'], constraint: 'Limit must be greater than zero' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating pagination', errors);
	}

	/**
	 * This method creates a new instance of this DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of this DTO
	 */
	public static create(object: Record<string, unknown>): PaginationDto {
		const { page, limit } = object;
		return new PaginationDto(page as number, limit as number);
	}
}
