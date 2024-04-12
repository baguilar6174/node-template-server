// src\features\todos\presentation\controller.ts

import { type NextFunction, type Request, type Response } from 'express';
import { type TodoRepository } from '../domain/repositories/respository';
import { type TodoEntity } from '../domain/entities/todo.entity';
import { GetTodos } from '../domain/usecases/getAll.usecase';

export class TodoController {
	//* Dependency injection
	constructor(private readonly repository: TodoRepository) {}

	public getAll = (
		_req: Request<unknown, unknown, unknown, unknown>,
		res: Response<TodoEntity[]>,
		next: NextFunction
	): void => {
		new GetTodos(this.repository)
			.execute()
			.then((result) => res.json(result))
			.catch((error) => {
				next(error);
			});
	};

	// rest of operations
	// ...
}
