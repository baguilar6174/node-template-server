// src\app.ts

import { envs } from './core/config/env';
import { AppRoutes } from './routes';
import { Server } from './server';

(() => {
	main();
})();

function main(): void {
	const server = new Server({
		routes: AppRoutes.routes,
		port: envs.PORT
	});
	void server.start();
}
