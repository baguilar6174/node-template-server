// src\features\todos\infraestructure\repository.impl.ts

import { type TodoDatasource } from '../domain/datasources/datasource';
import { type TodoEntity } from '../domain/entities/todo.entity';
import { type TodoRepository } from '../domain/repositories/respository';

export class TodoRepositoryImpl implements TodoRepository {
	constructor(private readonly datasource: TodoDatasource) {}

	async getAll(): Promise<TodoEntity[]> {
		return await this.datasource.getAll();
	}

	// rest of operations
	// ...
}
