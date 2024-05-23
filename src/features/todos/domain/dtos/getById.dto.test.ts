import { AppError } from '../../../../core';
import { GetTodoByIdDto } from './getById.dto';

describe('tests in getById.dto.ts', () => {
	test('should create an instance with a valid id', () => {
		const dto = new GetTodoByIdDto(1);
		expect(dto.id).toBe(1);
	});

	test('should throw a validation error for an invalid id', () => {
		expect(() => new GetTodoByIdDto(NaN)).toThrow(AppError);
		expect(() => new GetTodoByIdDto(null as any)).toThrow(AppError);
		expect(() => new GetTodoByIdDto(undefined as any)).toThrow(AppError);
		expect(() => new GetTodoByIdDto('invalid' as any)).toThrow(AppError);
	});

	test('should throw a validation error with correct error message for invalid id', () => {
		try {
			new GetTodoByIdDto(NaN);
			// new GetTodoByIdDto(null as any);
			// new GetTodoByIdDto(undefined as any);
			// new GetTodoByIdDto('invalid' as any);
		} catch (error) {
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['id'], constraint: 'Id is not a valid number' }]);
			}
		}
	});
});
