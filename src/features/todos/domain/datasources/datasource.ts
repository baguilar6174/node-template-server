// src\features\todos\domain\datasources\datasource.ts

import { type TodoEntity } from '../entities/todo.entity';

export abstract class TodoDatasource {
	abstract getAll(): Promise<TodoEntity[]>;
	// rest of operations
	// ...
}
