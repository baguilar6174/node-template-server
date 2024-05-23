import { AppError, ZERO, type ValidationType } from '../../../../core';
import { type CoreDto } from './core.dto';

export class PaginationDto implements CoreDto<PaginationDto> {
	constructor(
		public readonly page: number,
		public readonly limit: number
	) {
		this.validate(this);
	}

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

	public static create(props: Record<string, unknown>): PaginationDto {
		const { page, limit } = props;
		return new PaginationDto(page as number, limit as number);
	}
}
