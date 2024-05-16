import { type GetTodoByIdDto } from '../dtos';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/respository';

export interface DeleteTodoUseCase {
	execute: (getByIdDto: GetTodoByIdDto) => Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		return await this.repository.delete(getByIdDto);
	}
}
