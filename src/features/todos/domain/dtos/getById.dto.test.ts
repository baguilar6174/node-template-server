import { AppError } from '../../../../core';
import { GetTodoByIdDto } from './getById.dto';

describe('tests in getById.dto.ts', () => {
	test('should create an instance with a valid id', () => {
		const dto = GetTodoByIdDto.create({ id: 1 });
		expect(dto.id).toBe(1);
	});

	test('should throw a validation error for an invalid id', () => {
		expect(() => GetTodoByIdDto.create({ id: NaN })).toThrow(AppError);
		expect(() => GetTodoByIdDto.create({ id: null })).toThrow(AppError);
		expect(() => GetTodoByIdDto.create({ id: undefined })).toThrow(AppError);
		expect(() => GetTodoByIdDto.create({ id: 'invalid' })).toThrow(AppError);
	});

	test('should throw a validation error with correct error message for invalid id', () => {
		try {
			GetTodoByIdDto.create({ id: NaN });
			// GetTodoByIdDto.create({id: null});
			// GetTodoByIdDto.create({id: undefined});
			// GetTodoByIdDto.create({id: 'invalid'});
		} catch (error) {
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['id'], constraint: 'Id is not a valid number' }]);
			}
		}
	});
});
