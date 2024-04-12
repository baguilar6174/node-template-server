import { ZERO } from '../../../../core/constants';
import { type ValidationType } from '../../../../core/types';

export class PaginationDto {
	constructor(
		public readonly page: number,
		public readonly limit: number
	) {}

	public static validate(dto: PaginationDto): ValidationType[] {
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

		return errors;
	}
}
