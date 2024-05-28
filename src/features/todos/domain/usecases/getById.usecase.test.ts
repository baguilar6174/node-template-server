import { GetTodoByIdDto } from '../dtos';
import { TodoEntity } from '../entities';
import { TodoRepository } from '../repositories/respository';
import { GetTodoById, GetTodoByIdUseCase } from './getById.usecase';

describe('tests in getById.usecase.ts', () => {
	let repository: jest.Mocked<TodoRepository>;
	let getTodoByIdUseCase: GetTodoByIdUseCase;

	beforeEach(() => {
		repository = {
			create: jest.fn(),
			getAll: jest.fn(),
			getById: jest.fn(),
			update: jest.fn(),
			delete: jest.fn()
		} as jest.Mocked<TodoRepository>;

		getTodoByIdUseCase = new GetTodoById(repository);
	});

	test('should get a todo item by id successfully', async () => {
		const getByIdDto = GetTodoByIdDto.create({ id: 1 });
		const todoEntity = new TodoEntity(getByIdDto.id, 'Test Todo');

		repository.getById.mockResolvedValue(todoEntity);

		const result = await getTodoByIdUseCase.execute(getByIdDto);

		expect(repository.getById).toHaveBeenCalledWith(getByIdDto);
		expect(result).toEqual(todoEntity);
	});

	test('should throw an error if repository.getById fails', async () => {
		const getByIdDto = GetTodoByIdDto.create({ id: 1 });
		const error = new Error('Repository getById failed');

		repository.getById.mockRejectedValue(error);

		await expect(getTodoByIdUseCase.execute(getByIdDto)).rejects.toThrow(error);
	});
});
