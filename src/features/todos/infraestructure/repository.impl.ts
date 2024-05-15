// src\features\todos\infraestructure\repository.impl.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../shared/domain';
import { type TodoDatasource } from '../domain/datasources/local.datasource';
import { type GetTodoByIdDto, type UpdateTodoDto, type CreateTodoDto } from '../domain/dtos';
import { type TodoEntity } from '../domain/entities/todo.entity';
import { type TodoRepository } from '../domain/repositories/respository';

export class TodoRepositoryImpl implements TodoRepository {
	constructor(private readonly datasource: TodoDatasource) {}

	async create(createDto: CreateTodoDto): Promise<TodoEntity> {
		return await this.datasource.create(createDto);
	}

	async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>> {
		return await this.datasource.getAll(pagination);
	}

	async getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		return await this.datasource.getById(getByIdDto);
	}

	async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		return await this.datasource.update(updateDto);
	}

	async delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		return await this.datasource.delete(getByIdDto);
	}
}
