// src\features\todos\infraestructure\local.datasource.impl.ts

import { ONE, ZERO, AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../shared';
import {
	TodoEntity,
	type CreateTodoDto,
	type GetTodoByIdDto,
	type UpdateTodoDto,
	type TodoDatasource
} from '../domain';

const TODOS_MOCK = [
	{
		id: 1,
		text: 'First TODO...',
		isCompleted: false
	},
	{
		id: 2,
		text: 'Second TODO...',
		isCompleted: false
	}
];

export class TodoDatasourceImpl implements TodoDatasource {
	public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>> {
		const { page, limit } = pagination;

		const todos = TODOS_MOCK;
		const total = TODOS_MOCK.length;

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			results: todos.slice((page - ONE) * limit, page * limit).map((todo) => TodoEntity.fromJson(todo)),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		const todo = TODOS_MOCK.find((todo) => todo.id === getByIdDto.id);
		if (!todo) throw AppError.notFound(`Todo with id ${getByIdDto.id} not found`);
		return TodoEntity.fromJson(todo);
	}

	public async create(createDto: CreateTodoDto): Promise<TodoEntity> {
		const createdTodo = { id: TODOS_MOCK.length + ONE, ...createDto, isCompleted: false };
		TODOS_MOCK.push(createdTodo);
		return TodoEntity.fromJson(createdTodo);
	}

	public async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		const { id } = await this.getById(updateDto);
		const index = TODOS_MOCK.findIndex((todo) => todo.id === id);

		TODOS_MOCK[index] = {
			...TODOS_MOCK[index],
			...Object.fromEntries(Object.entries(updateDto).filter(([_, v]) => v !== undefined))
		};

		return TodoEntity.fromJson(TODOS_MOCK[index]);
	}

	public async delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		const { id } = await this.getById(getByIdDto);
		const index = TODOS_MOCK.findIndex((todo) => todo.id === id);
		const deletedTodo = TODOS_MOCK.splice(index, ONE)[ZERO];
		return TodoEntity.fromJson(deletedTodo);
	}
}
