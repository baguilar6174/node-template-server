import { AppError } from '../../../../core';
import { TodoEntity } from './todo.entity';

describe('tests in todo.entity.test.ts', () => {
	test('should create todo entity instance', () => {
		const todo = new TodoEntity(1, 'Test');
		expect(todo).toBeInstanceOf(TodoEntity);
		expect(todo.id).toBe(1);
		expect(todo.text).toBe('Test');
		expect(todo.isCompleted).toBe(false);
	});

	test('should create a Todo entity instance from json', () => {
		const todo = TodoEntity.fromJson({ id: 1, text: 'Test' });
		expect(todo).toBeInstanceOf(TodoEntity);
		expect(todo.id).toBe(1);
		expect(todo.text).toBe('Test');
		expect(todo.isCompleted).toBe(false);
	});

	test('should throw validation error', () => {
		// ? Shrotest to throw AppError
		// expect(() => TodoEntity.fromJson({ id: 1 })).toThrow(AppError);

		expect(() => TodoEntity.fromJson({ id: 1 })).toThrow(
			AppError.badRequest('This entity requires a text', [{ constraint: 'text is required', fields: ['text'] }])
		);
		expect(() => TodoEntity.fromJson({ text: 'Hola' })).toThrow(
			AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }])
		);
	});
});
