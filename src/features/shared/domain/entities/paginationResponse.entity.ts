export class PaginationResponseEntity<T> {
	constructor(
		public total: number,
		public totalPages: number,
		public currentPage: number,
		public nextPage: number | null,
		public prevPage: number | null,
		public results: T
	) {}
}
