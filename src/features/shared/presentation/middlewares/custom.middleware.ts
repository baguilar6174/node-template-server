import { type Response, type NextFunction, type Request } from 'express';

export class CustomMiddlewares {
	//* Dependency injection
	// constructor() {}

	public static writeInConsole = (_req: Request, _res: Response, next: NextFunction): void => {
		// console.log('Hello from the Middleware');
		next();
	};
}
