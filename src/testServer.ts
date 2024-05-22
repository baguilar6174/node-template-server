// src/testServer.ts

import { envs } from './core';
import { AppRoutes } from './routes';
import { Server } from './server';

// This is a test server for testing purposes
export const testServer = new Server({
	port: envs.PORT,
	apiPrefix: envs.API_PREFIX,
	routes: AppRoutes.routes
});
