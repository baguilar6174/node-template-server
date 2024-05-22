import { PaginationDto } from '../../shared';
import { CreateTodoDto, GetTodoByIdDto, UpdateTodoDto } from '../domain';
import { TodoDatasource } from '../domain/datasources/datasource';
import { TodoRepositoryImpl } from './repository.impl';

describe('tests in repository.impl.ts', () => {
	const datasource = {
		create: jest.fn(),
		getAll: jest.fn(),
		getById: jest.fn(),
		update: jest.fn(),
		delete: jest.fn()
	} as TodoDatasource;

	const repository = new TodoRepositoryImpl(datasource);

	test('create should call datasource.create with right arguments', async () => {
		const createDto = new CreateTodoDto('Test Todo');
		await repository.create(createDto);
		expect(datasource.create).toHaveBeenCalledWith(createDto);
	});

	test('getAll should call datasource.getAll with right arguments', async () => {
		const paginationDto = new PaginationDto(1, 10);
		await repository.getAll(paginationDto);
		expect(datasource.getAll).toHaveBeenCalledWith(paginationDto);
	});

	test('getById should call datasource.getById with right arguments', async () => {
		const getByIdDto = new GetTodoByIdDto(1);
		await repository.getById(getByIdDto);
		expect(datasource.getById).toHaveBeenCalledWith(getByIdDto);
	});

	test('update should call datasource.update with right arguments', async () => {
		const updateDto = new UpdateTodoDto(1, 'Test Todo updated');
		await repository.update(updateDto);
		expect(datasource.update).toHaveBeenCalledWith(updateDto);
	});

	test('delete should call datasource.delete with right arguments', async () => {
		const getByIdDto = new GetTodoByIdDto(1);
		await repository.delete(getByIdDto);
		expect(datasource.delete).toHaveBeenCalledWith(getByIdDto);
	});
});
