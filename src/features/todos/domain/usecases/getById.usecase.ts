import { type GetTodoByIdDto } from '../dtos';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/respository';

export interface GetTodoByIdUseCase {
	execute: (getByIdDto: GetTodoByIdDto) => Promise<TodoEntity>;
}

export class GetTodoById implements GetTodoByIdUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		return await this.repository.getById(getByIdDto);
	}
}
