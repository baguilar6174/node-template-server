import { PaginationResponseEntity } from './paginationResponse.entity';

describe('tests in paginationResponse.entity.test.ts', () => {
	test('should create an instance with given values', () => {
		const total = 100;
		const totalPages = 10;
		const currentPage = 1;
		const nextPage = 2;
		const prevPage = null;
		const results = [{ id: 1, name: 'Test Item' }];

		const entity = new PaginationResponseEntity(total, totalPages, currentPage, nextPage, prevPage, results);

		expect(entity.total).toBe(total);
		expect(entity.totalPages).toBe(totalPages);
		expect(entity.currentPage).toBe(currentPage);
		expect(entity.nextPage).toBe(nextPage);
		expect(entity.prevPage).toBe(prevPage);
		expect(entity.results).toBe(results);
	});

	it('should allow nextPage and prevPage to be null', () => {
		const total = 100;
		const totalPages = 10;
		const currentPage = 1;
		const nextPage = null;
		const prevPage = null;
		const results = [{ id: 1, name: 'Test Item' }];

		const entity = new PaginationResponseEntity(total, totalPages, currentPage, nextPage, prevPage, results);

		expect(entity.nextPage).toBeNull();
		expect(entity.prevPage).toBeNull();
	});

	it('should correctly handle different types for results', () => {
		const total = 100;
		const totalPages = 10;
		const currentPage = 1;
		const nextPage = 2;
		const prevPage = null;
		const results = [{ id: 1, name: 'Test Item' }];

		const entity = new PaginationResponseEntity(total, totalPages, currentPage, nextPage, prevPage, results);

		expect(Array.isArray(entity.results)).toBe(true);
	});

	it('should create an instance with a different type for results', () => {
		const total = 100;
		const totalPages = 10;
		const currentPage = 1;
		const nextPage = 2;
		const prevPage = null;
		const results = { id: 1, name: 'Test Item' };

		const entity = new PaginationResponseEntity(total, totalPages, currentPage, nextPage, prevPage, results);

		expect(entity.results).toEqual(results);
	});
});
