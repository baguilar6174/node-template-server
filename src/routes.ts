// src\routes.ts

import { Router } from 'express';

import { TodoRoutes } from './features/todos';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/todos', TodoRoutes.routes);

		// rest of routes
		// ...

		return router;
	}
}
