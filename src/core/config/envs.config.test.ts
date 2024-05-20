import { envs } from './envs.config';

describe('tests in envs.config.test.ts', () => {
	test('should return env options', () => {
		expect(envs).toEqual({
			PORT: 3000,
			API_PREFIX: '/api/v1/test',
			NODE_ENV: 'test'
		});
	});
});
