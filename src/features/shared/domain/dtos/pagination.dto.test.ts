import { AppError } from '../../../../core';
import { PaginationDto } from './pagination.dto';

describe('tests in pagination.dto.ts', () => {
	test('should create an instance with valid page and limit', () => {
		const dto = PaginationDto.create({ page: 1, limit: 10 });
		expect(dto.page).toBe(1);
		expect(dto.limit).toBe(10);
	});

	test('should throw a validation error for page or limit invalid', () => {
		expect(() => PaginationDto.create({ page: NaN, limit: 10 })).toThrow(AppError);
		expect(() => PaginationDto.create({ page: 1, limit: NaN })).toThrow(AppError);
		expect(() => PaginationDto.create({ page: 0, limit: 10 })).toThrow(AppError);
		expect(() => PaginationDto.create({ page: -1, limit: 10 })).toThrow(AppError);
		expect(() => PaginationDto.create({ page: 1, limit: 0 })).toThrow(AppError);
		expect(() => PaginationDto.create({ page: 1, limit: -1 })).toThrow(AppError);
	});

	test('should throw a validation error with correct error message for NaN values', () => {
		try {
			PaginationDto.create({ page: NaN, limit: NaN });
		} catch (error) {
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([
					{ fields: ['page', 'limit'], constraint: 'Page and limit must be numbers' }
				]);
			}
		}
	});

	test('should throw a validation error with correct error message for page less than or equal to zero', () => {
		try {
			PaginationDto.create({ page: 0, limit: 10 });
		} catch (error) {
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['page'], constraint: 'Page must be greater than zero' }]);
			}
		}

		try {
			PaginationDto.create({ page: -1, limit: 10 });
		} catch (error) {
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['page'], constraint: 'Page must be greater than zero' }]);
			}
		}
	});

	test('should throw a validation error with correct error message for limit less than or equal to zero', () => {
		try {
			PaginationDto.create({ page: 1, limit: 0 });
		} catch (error) {
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['limit'], constraint: 'Limit must be greater than zero' }]);
			}
		}

		try {
			PaginationDto.create({ page: 1, limit: -1 });
		} catch (error) {
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['limit'], constraint: 'Limit must be greater than zero' }]);
			}
		}
	});
});
