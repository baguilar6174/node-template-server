import { type CreateTodoDto } from '../dtos';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/respository';

export interface CreateTodoUseCase {
	execute: (data: CreateTodoDto) => Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(data: CreateTodoDto): Promise<TodoEntity> {
		return await this.repository.create(data);
	}
}
