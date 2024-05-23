import { AppError } from '../../../../core';
import { CreateTodoDto } from './create.dto';

describe('tests in create.dto.ts', () => {
	test('should create a valid CreateTodoDto', () => {
		const todoData = new CreateTodoDto('Valid Todo');
		expect(todoData).toBeInstanceOf(CreateTodoDto);
		expect(todoData.text).toBe('Valid Todo');
	});

	test('should throw a validation error if text is empty', () => {
		expect(() => new CreateTodoDto('')).toThrow(AppError);
	});

	test('should throw a validation error if text is not provided', () => {
		expect(() => new CreateTodoDto(undefined as unknown as string)).toThrow(AppError);
	});

	test('should include the correct validation error message if text is empty', () => {
		try {
			new CreateTodoDto('');
		} catch (error) {
			expect(error).toBeInstanceOf(AppError);
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['text'], constraint: 'Text is required' }]);
			}
		}
	});

	test('should include the correct validation error message if text is not provided', () => {
		try {
			new CreateTodoDto(undefined as unknown as string);
		} catch (error) {
			expect(error).toBeInstanceOf(AppError);
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['text'], constraint: 'Text is required' }]);
			}
		}
	});
});
