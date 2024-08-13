// src\server.ts

import { type Server as ServerHttp, type IncomingMessage, type ServerResponse } from 'http';
import express, { type Router, type Request, type Response, type NextFunction } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY, AppError } from './core';
import { CustomMiddlewares, ErrorMiddleware } from './features/shared';

interface ServerOptions {
	port: number;
	routes: Router;
	apiPrefix: string;
}

export class Server {
	public readonly app = express(); // This is public for testing purposes
	private serverListener?: ServerHttp<typeof IncomingMessage, typeof ServerResponse>;
	private readonly port: number;
	private readonly routes: Router;
	private readonly apiPrefix: string;

	constructor(options: ServerOptions) {
		const { port, routes, apiPrefix } = options;
		this.port = port;
		this.routes = routes;
		this.apiPrefix = apiPrefix;
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

		// Shared Middlewares
		this.app.use(CustomMiddlewares.writeInConsole);

		// CORS
		this.app.use((req, res, next) => {
			// Add your origins
			const allowedOrigins = ['http://localhost:3000'];
			const origin = req.headers.origin;
			// TODO: Fix this
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			if (allowedOrigins.includes(origin!)) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				res.setHeader('Access-Control-Allow-Origin', origin!);
			}
			// Do not forget to add all the necessary methods and headers to avoid CORS problems
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			// For example, if you are going to use authorization headers do not forget to add it here
			res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
			next();
		});

		//* Routes
		this.app.use(this.apiPrefix, this.routes);

		// Test rest api
		this.app.get('/', (_req: Request, res: Response) => {
			return res.status(HttpCode.OK).send({
				message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}/`
			});
		});

		//* Handle not found routes in /api/v1/* (only if 'Public content folder' is not available)
		this.routes.all('*', (req: Request, _: Response, next: NextFunction): void => {
			next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
		});

		// Handle errors middleware
		this.routes.use(ErrorMiddleware.handleError);

		this.serverListener = this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}

	close(): void {
		this.serverListener?.close();
	}
}
