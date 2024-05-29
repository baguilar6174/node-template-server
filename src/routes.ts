// src\routes.ts

import { Router } from 'express';

import { TodoRoutes } from './features/todos';
import { AuthRoutes } from './features/auth';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/auth', AuthRoutes.routes);
		router.use('/todos', TodoRoutes.routes);

		// rest of routes
		// ...

		return router;
	}
}
