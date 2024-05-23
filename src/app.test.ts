// src\app.test.ts

import { Server } from './server';
import { envs } from './core';

jest.mock('./server');

describe('tests in app.ts', () => {
	test('should call server with correct arguments and start it', async () => {
		await import('./app');
		expect(Server).toHaveBeenCalledTimes(1);
		expect(Server).toHaveBeenCalledWith({
			port: envs.PORT,
			apiPrefix: envs.API_PREFIX,
			routes: expect.any(Function)
		});
	});
});
