// src\app.ts

import { envs } from './core';
import { AppRoutes } from './routes';
import { Server } from './server';

(() => {
	main();
})();

function main(): void {
	const server = new Server({
		port: envs.PORT,
		apiPrefix: envs.API_PREFIX,
		routes: AppRoutes.routes
	});
	void server.start();
}
