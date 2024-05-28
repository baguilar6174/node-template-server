import { AppError } from '../../../core';
import { PaginationDto } from '../../shared';
import { CreateTodoDto, GetTodoByIdDto, TodoEntity, UpdateTodoDto } from '../domain';
import { TodoDatasourceImpl } from './local.datasource.impl';

describe('tests in local.datasource.impl.ts', () => {
	const todoDatasource = new TodoDatasourceImpl();

	test('should return a TODOs list', async () => {
		const paginationDto = PaginationDto.create({ page: 1, limit: 10 });
		const expectedResults = [
			{ id: 1, text: 'First TODO...', isCompleted: false },
			{ id: 2, text: 'Second TODO...', isCompleted: false }
		];
		const result = await todoDatasource.getAll(paginationDto);
		expect(result).toEqual({
			results: expectedResults.map((todo) => TodoEntity.fromJson(todo)),
			currentPage: 1,
			nextPage: null,
			prevPage: null,
			total: 2,
			totalPages: 1
		});
	});

	test('should return a TODO by id', async () => {
		const getByIdDto = GetTodoByIdDto.create({ id: 1 });
		const todo = await todoDatasource.getById(getByIdDto);
		expect(todo).toEqual(TodoEntity.fromJson({ id: 1, text: 'First TODO...', isCompleted: false }));
	});

	test('should return an error when trying to get a non-existing TODO', async () => {
		try {
			const getByIdDto = GetTodoByIdDto.create({ id: 100 });
			await todoDatasource.getById(getByIdDto);
		} catch (error) {
			if (error instanceof AppError) {
				expect(error).toEqual(AppError.notFound('Todo with id 100 not found'));
			}
		}
	});

	test('should create a TODO', async () => {
		const data = CreateTodoDto.create({ text: 'Test Todo' });
		const createdTodo: TodoEntity = { id: expect.any(Number), text: 'Test Todo', isCompleted: false };

		const result = await todoDatasource.create(data);
		expect(result).toEqual(createdTodo);
	});

	test('should update a TODO', async () => {
		const data = UpdateTodoDto.create({ id: 1, text: 'Test Todo' });
		const updatedTodo: TodoEntity = { id: 1, text: 'Test Todo', isCompleted: false };

		const result = await todoDatasource.update(data);
		expect(result).toEqual(updatedTodo);
	});

	test('should delete a TODO', async () => {
		const getByIdDto = GetTodoByIdDto.create({ id: 1 });
		const todo = await todoDatasource.getById(getByIdDto);
		const deletedTodo = await todoDatasource.delete(getByIdDto);
		expect(deletedTodo).toEqual(todo);
	});
});
