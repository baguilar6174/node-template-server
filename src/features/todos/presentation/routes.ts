// src\features\todos\presentation\routes.ts

import { Router } from 'express';
import { TodoDatasourceImpl } from '../infraestructure/local.datasource.impl';
import { TodoRepositoryImpl } from '../infraestructure/repository.impl';
import { TodoController } from './controller';

export class TodoRoutes {
	static get routes(): Router {
		const router = Router();

		//* This datasource can be change
		const datasource = new TodoDatasourceImpl();
		const repository = new TodoRepositoryImpl(datasource);
		const controller = new TodoController(repository);

		router.get('/', controller.getAll);

		// rest of operations
		// ...

		return router;
	}
}
