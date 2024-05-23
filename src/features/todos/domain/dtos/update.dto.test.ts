import { AppError } from '../../../../core';
import { UpdateTodoDto } from './update.dto';

describe('tests in update.dto.test.ts', () => {
	test('should create an instance with valid id and isCompleted', () => {
		const dto = UpdateTodoDto.create({ id: 1, isCompleted: true });
		expect(dto.id).toBe(1);
		expect(dto.isCompleted).toBe(true);
	});

	test('should create an instance with valid id, text, and isCompleted', () => {
		const dto = UpdateTodoDto.create({ id: 1, text: 'Test todo', isCompleted: false });
		expect(dto.id).toBe(1);
		expect(dto.text).toBe('Test todo');
		expect(dto.isCompleted).toBe(false);
	});

	test('should throw a validation error for an invalid id', () => {
		expect(() => UpdateTodoDto.create({ id: NaN, isCompleted: true })).toThrow(AppError);
		expect(() => UpdateTodoDto.create({ id: null, isCompleted: true })).toThrow(AppError);
		expect(() => UpdateTodoDto.create({ id: undefined, isCompleted: true })).toThrow(AppError);
		expect(() => UpdateTodoDto.create({ id: 'invalid', isCompleted: true })).toThrow(AppError);
	});

	test('should throw a validation error for an invalid isCompleted (not a boolean)', () => {
		expect(() => UpdateTodoDto.create({ id: 1, isCompleted: 'invalid' })).toThrow(AppError);
	});

	test('should throw a validation error with correct error message for invalid id', () => {
		try {
			UpdateTodoDto.create({ id: NaN, isCompleted: true });
		} catch (error) {
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['id'], constraint: 'Id is not a valid number' }]);
			}
		}
	});

	test('should throw a validation error with correct error message for invalid isCompleted', () => {
		try {
			UpdateTodoDto.create({ id: 1, isCompleted: 'invalid' });
		} catch (error) {
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([
					{ fields: ['isCompleted'], constraint: 'isCompleted must be a valid value (true or false)' }
				]);
			}
		}
	});
});
