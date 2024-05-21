import { ValidationError } from '../../../../core';
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
		// ? Shrotest to throw ValidationError
		// expect(() => TodoEntity.fromJson({ id: 1 })).toThrow(ValidationError);

		expect(() => TodoEntity.fromJson({ id: 1 })).toThrow(
			new ValidationError([{ constraint: 'text is required', fields: ['text'] }])
		);
		expect(() => TodoEntity.fromJson({ text: 'Hola' })).toThrow(
			new ValidationError([{ constraint: 'id is required', fields: ['id'] }])
		);
	});
});
