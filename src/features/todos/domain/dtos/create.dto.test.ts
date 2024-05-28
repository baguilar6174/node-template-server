import { AppError } from '../../../../core';
import { CreateTodoDto } from './create.dto';

describe('tests in create.dto.ts', () => {
	test('should create a valid CreateTodoDto', () => {
		const todoData = CreateTodoDto.create({ text: 'Valid Todo' });
		expect(todoData).toBeInstanceOf(CreateTodoDto);
		expect(todoData.text).toBe('Valid Todo');
	});

	test('should throw a validation error if text is empty', () => {
		expect(() => CreateTodoDto.create({ text: '' })).toThrow(AppError);
	});

	test('should throw a validation error if text is not provided', () => {
		expect(() => CreateTodoDto.create({ text: undefined as unknown as string })).toThrow(AppError);
	});

	test('should include the correct validation error message if text is empty', () => {
		try {
			CreateTodoDto.create({ text: '' });
		} catch (error) {
			expect(error).toBeInstanceOf(AppError);
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['text'], constraint: 'Text is required' }]);
			}
		}
	});

	test('should include the correct validation error message if text is not provided', () => {
		try {
			CreateTodoDto.create({ text: undefined as unknown as string });
		} catch (error) {
			expect(error).toBeInstanceOf(AppError);
			if (error instanceof AppError) {
				expect(error.validationErrors).toEqual([{ fields: ['text'], constraint: 'Text is required' }]);
			}
		}
	});
});
