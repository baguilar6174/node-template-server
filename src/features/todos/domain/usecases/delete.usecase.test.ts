import { GetTodoByIdDto } from '../dtos';
import { TodoEntity } from '../entities';
import { TodoRepository } from '../repositories/respository';
import { DeleteTodo, DeleteTodoUseCase } from './delete.usecase';

describe('tests in delete.usecase.ts', () => {
	let repository: jest.Mocked<TodoRepository>;
	let deleteTodoUseCase: DeleteTodoUseCase;

	beforeEach(() => {
		repository = {
			create: jest.fn(),
			getAll: jest.fn(),
			getById: jest.fn(),
			update: jest.fn(),
			delete: jest.fn()
		} as jest.Mocked<TodoRepository>;

		deleteTodoUseCase = new DeleteTodo(repository);
	});

	test('should call repository.delete with correct parameters', async () => {
		const getByIdDto = GetTodoByIdDto.create({ id: 1 });
		const todoEntity = new TodoEntity(getByIdDto.id, 'Test Todo');

		repository.delete.mockResolvedValue(todoEntity);

		const result = await deleteTodoUseCase.execute(getByIdDto);

		expect(repository.delete).toHaveBeenCalledWith(getByIdDto);
		expect(result).toBe(todoEntity);
	});

	test('should throw an error if repository.delete fails', async () => {
		const getByIdDto = GetTodoByIdDto.create({ id: 1 });
		const errorMessage = 'Delete failed';

		repository.delete.mockRejectedValue(new Error(errorMessage));

		await expect(deleteTodoUseCase.execute(getByIdDto)).rejects.toThrow(errorMessage);
	});
});
