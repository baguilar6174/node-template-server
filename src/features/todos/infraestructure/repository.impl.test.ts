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
		const createDto = CreateTodoDto.create({ text: 'Test Todo' });
		await repository.create(createDto);
		expect(datasource.create).toHaveBeenCalledWith(createDto);
	});

	test('getAll should call datasource.getAll with right arguments', async () => {
		const paginationDto = PaginationDto.create({ page: 1, limit: 10 });
		await repository.getAll(paginationDto);
		expect(datasource.getAll).toHaveBeenCalledWith(paginationDto);
	});

	test('getById should call datasource.getById with right arguments', async () => {
		const getByIdDto = GetTodoByIdDto.create({ id: 1 });
		await repository.getById(getByIdDto);
		expect(datasource.getById).toHaveBeenCalledWith(getByIdDto);
	});

	test('update should call datasource.update with right arguments', async () => {
		const updateDto = UpdateTodoDto.create({ id: 1, text: 'Test Todo updated' });
		await repository.update(updateDto);
		expect(datasource.update).toHaveBeenCalledWith(updateDto);
	});

	test('delete should call datasource.delete with right arguments', async () => {
		const getByIdDto = GetTodoByIdDto.create({ id: 1 });
		await repository.delete(getByIdDto);
		expect(datasource.delete).toHaveBeenCalledWith(getByIdDto);
	});
});
