import { CreateTodoDto } from '../dtos';
import { TodoEntity } from '../entities';
import { TodoRepository } from '../repositories/respository';
import { CreateTodo, CreateTodoUseCase } from './create.usecase';

describe('tests in create.usecase.ts', () => {
	let repository: jest.Mocked<TodoRepository>;
	let createTodoUseCase: CreateTodoUseCase;

	beforeEach(() => {
		repository = {
			create: jest.fn(),
			getAll: jest.fn(),
			getById: jest.fn(),
			update: jest.fn(),
			delete: jest.fn()
		} as jest.Mocked<TodoRepository>;

		createTodoUseCase = new CreateTodo(repository);
	});

	test('should create a todo item successfully', async () => {
		const todoData = CreateTodoDto.create({ text: 'Test Todo' });
		const createdTodo: TodoEntity = { id: 1, text: 'Test Todo', isCompleted: false };

		repository.create.mockResolvedValue(createdTodo);

		const result = await createTodoUseCase.execute(todoData);

		expect(repository.create).toHaveBeenCalledWith(todoData);
		expect(result).toEqual(createdTodo);
	});

	test('should throw an error if repository.create fails', async () => {
		const todoData = CreateTodoDto.create({ text: 'Test Todo' });
		const error = new Error('Repository create failed');

		repository.create.mockRejectedValue(error);

		await expect(createTodoUseCase.execute(todoData)).rejects.toThrow(error);
	});
});
