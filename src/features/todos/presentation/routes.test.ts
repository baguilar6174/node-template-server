// use supertest to test routes
import request from 'supertest';

import { testServer } from '../../../testServer';
import { ErrorResponse, HttpCode, SuccessResponse, envs } from '../../../core';
import { PaginationResponseEntity } from '../../shared';
import { TodoEntity } from '../domain';

describe('tests in routes', () => {
	const url = `${envs.API_PREFIX}/todos`;

	beforeAll(async () => {
		await testServer.start();
	});

	afterAll(() => {
		testServer.close();
	});

	test('should return TODOs /todos', async () => {
		const expectedResponse = {
			data: {
				currentPage: 1,
				nextPage: null,
				prevPage: null,
				results: [
					{ id: 1, isCompleted: false, text: 'First TODO...' },
					{ id: 2, isCompleted: false, text: 'Second TODO...' }
				],
				total: 2,
				totalPages: 1
			}
		};

		await request(testServer.app)
			.get(url)
			.expect(HttpCode.OK)
			.expect('Content-Type', /json/)
			.then(({ body }: { body: SuccessResponse<PaginationResponseEntity<TodoEntity[]>> }) => {
				expect(body).toEqual(expectedResponse);
				expect(body.data?.results.length).toBe(2);
			});
	});

	test('should return TODOs /todos/1', async () => {
		const expectedResponse = {
			data: {
				id: 1,
				isCompleted: false,
				text: 'First TODO...'
			}
		};

		await request(testServer.app)
			.get(`${url}/${expectedResponse.data.id}`)
			.expect(HttpCode.OK)
			.expect('Content-Type', /json/)
			.then(({ body }: { body: SuccessResponse<TodoEntity> }) => {
				expect(body).toEqual(expectedResponse);
			});
	});

	test('should return 404 NOT_FOUND when TODOs /todos/100', async () => {
		await request(testServer.app)
			.get(`${url}/100`)
			.expect(HttpCode.NOT_FOUND)
			.expect('Content-Type', /json/)
			.then(({ body }: { body: ErrorResponse }) => {
				expect(body.message).toEqual('Todo with id 100 not found');
			});
	});

	test('should return 400 BAD_REQUEST when TODOs /todos/abc', async () => {
		await request(testServer.app)
			.get(`${url}/abc`)
			.expect(HttpCode.BAD_REQUEST)
			.expect('Content-Type', /json/)
			.then(({ body }: { body: ErrorResponse }) => {
				expect(body.message).toEqual('Error validating get todo by id');
				expect(body.validationErrors).toEqual([{ fields: ['id'], constraint: 'Id is not a valid number' }]);
			});
	});

	test('should return a new TODO /todos', async () => {
		const expectedResponse = {
			data: {
				id: 3,
				isCompleted: false,
				text: 'New TODO...'
			}
		};

		await request(testServer.app)
			.post(url)
			.send(expectedResponse.data)
			.expect(HttpCode.CREATED)
			.expect('Content-Type', /json/)
			.then(({ body }: { body: SuccessResponse<TodoEntity> }) => {
				expect(body).toEqual(expectedResponse);
			});
	});

	test('should return 400 BAD_REQUEST when TODO /todos with undefined text', async () => {
		const data = { id: 3, isCompleted: false, text: undefined };

		await request(testServer.app)
			.post(url)
			.send(data)
			.expect(HttpCode.BAD_REQUEST)
			.expect('Content-Type', /json/)
			.then(({ body }: { body: ErrorResponse }) => {
				expect(body.message).toEqual('Error validating create todo');
				expect(body.validationErrors).toEqual([{ fields: ['text'], constraint: 'Text is required' }]);
			});
	});

	test('should return 400 BAD_REQUEST when TODO /todos with empty text', async () => {
		const data = { id: 3, isCompleted: false, text: '' };

		await request(testServer.app)
			.post(url)
			.send(data)
			.expect(HttpCode.BAD_REQUEST)
			.expect('Content-Type', /json/)
			.then(({ body }: { body: ErrorResponse }) => {
				expect(body.message).toEqual('Error validating create todo');
				expect(body.validationErrors).toEqual([{ fields: ['text'], constraint: 'Text is required' }]);
			});
	});

	test('should update a TODO /todos/1', async () => {
		const expectedResponse = {
			data: {
				id: 1,
				isCompleted: true,
				text: 'First TODO...'
			}
		};

		await request(testServer.app)
			.put(`${url}/${expectedResponse.data.id}`)
			.send(expectedResponse.data)
			.expect(HttpCode.OK)
			.expect('Content-Type', /json/)
			.then(({ body }: { body: SuccessResponse<TodoEntity> }) => {
				expect(body).toEqual(expectedResponse);
			});
	});

	test('should delete a TODO /todos/1', async () => {
		const expectedResponse = {
			data: {
				id: 2,
				isCompleted: false,
				text: 'Second TODO...'
			}
		};

		await request(testServer.app)
			.delete(`${url}/${expectedResponse.data.id}`)
			.expect(HttpCode.OK)
			.expect('Content-Type', /json/)
			.then(({ body }: { body: SuccessResponse<TodoEntity> }) => {
				expect(body).toEqual(expectedResponse);
			});
	});
});
