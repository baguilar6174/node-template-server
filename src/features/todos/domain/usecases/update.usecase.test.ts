import { UpdateTodoDto } from '../dtos';
import { TodoEntity } from '../entities';
import { TodoRepository } from '../repositories/respository';
import { UpdateTodo, UpdateTodoUseCase } from './update.usecase';

describe('tests in update.usecase.ts', () => {
	let repository: jest.Mocked<TodoRepository>;
	let updateTodoUseCase: UpdateTodoUseCase;

	beforeEach(() => {
		repository = {
			create: jest.fn(),
			getAll: jest.fn(),
			getById: jest.fn(),
			update: jest.fn(),
			delete: jest.fn()
		} as jest.Mocked<TodoRepository>;

		updateTodoUseCase = new UpdateTodo(repository);
	});

	test('should update a todo item successfully', async () => {
		const updateData = UpdateTodoDto.create({ id: 1, text: 'Test Todo updated' });
		const updatedTodo: TodoEntity = { id: 1, text: 'Test Todo updated', isCompleted: false };

		repository.update.mockResolvedValue(updatedTodo);

		const result = await updateTodoUseCase.execute(updateData);

		expect(repository.update).toHaveBeenCalledWith(updateData);
		expect(result).toEqual(updatedTodo);
	});

	test('should throw an error if repository.update fails', async () => {
		const updateData = UpdateTodoDto.create({ id: 1, text: 'Test Todo updated' });
		const error = new Error('Repository update failed');

		repository.update.mockRejectedValue(error);

		await expect(updateTodoUseCase.execute(updateData)).rejects.toThrow(error);
	});
});
