import { PaginationDto, PaginationResponseEntity } from '../../../shared';
import { CreateTodoDto, GetTodoByIdDto, UpdateTodoDto } from '../dtos';
import { TodoEntity } from '../entities';
import { TodoDatasource } from './datasource';

describe('tests in datasource.test.ts', () => {
	const todo = new TodoEntity(1, 'Test', false);

	class MockDatasource implements TodoDatasource {
		async create(createDto: CreateTodoDto): Promise<TodoEntity> {
			return todo;
		}

		async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>> {
			return {
				results: [todo],
				currentPage: 1,
				nextPage: null,
				prevPage: null,
				total: 1,
				totalPages: 1
			};
		}

		async getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
			return todo;
		}

		async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
			return todo;
		}

		async delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
			return todo;
		}
	}

	test('should test be abstract class', async () => {
		const mockDatasource = new MockDatasource();

		expect(mockDatasource).toBeInstanceOf(MockDatasource);

		expect(typeof mockDatasource.create).toBe('function');
		expect(typeof mockDatasource.getAll).toBe('function');
		expect(typeof mockDatasource.getById).toBe('function');
		expect(typeof mockDatasource.update).toBe('function');
		expect(typeof mockDatasource.delete).toBe('function');

		const todos = await mockDatasource.getAll(PaginationDto.create({ page: 1, limit: 10 }));
		expect(todos.results).toHaveLength(1);
		expect(todos.results).toBeInstanceOf(Array);
		expect(todos.results[0]).toBeInstanceOf(TodoEntity);
	});
});
