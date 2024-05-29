// src/features/auth/presentation/routes.ts

import { Router } from 'express';

import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../infraestructure';

export class AuthRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new AuthDatasourceImpl();
		const repository = new AuthRepositoryImpl(datasource);
		const controller = new AuthController(repository);

		router.post('/login', controller.login);
		router.post('/register', controller.register);

		return router;
	}
}
