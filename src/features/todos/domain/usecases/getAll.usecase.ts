// src\features\todos\domain\usecases\getAll.usecase.ts

import { type TodoEntity } from '../entities/todo.entity';
import { type TodoRepository } from '../repositories/respository';

export interface GetTodosUseCase {
	execute: () => Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(): Promise<TodoEntity[]> {
		return await this.repository.getAll();
	}
}
