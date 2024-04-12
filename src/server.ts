// src\server.ts

import express, { type Router, type Request, type Response } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants';
import { ErrorMiddleware } from './features/shared/presentation/middlewares/error.middleware';

interface ServerOptions {
	port: number;
	routes: Router;
}

export class Server {
	private readonly app = express();
	private readonly port: number;
	private readonly routes: Router;

	constructor(options: ServerOptions) {
		const { port, routes } = options;
		this.port = port;
		this.routes = routes;
	}

	async start(): Promise<void> {
		//* Middlewares
		this.app.use(express.json()); // parse json in request body (allow raw)
		this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
		this.app.use(compression());
		//  limit repeated requests to public APIs
		this.app.use(
			rateLimit({
				max: ONE_HUNDRED,
				windowMs: SIXTY * SIXTY * ONE_THOUSAND,
				message: 'Too many requests from this IP, please try again in one hour'
			})
		);

		//* Routes
		this.app.use(this.routes);

		// Test rest api
		this.app.get('/', (_req: Request, res: Response) => {
			return res.status(HttpCode.OK).send({
				message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}/`
			});
		});

		// Handle errors middleware
		this.routes.use(ErrorMiddleware.handleError);

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
