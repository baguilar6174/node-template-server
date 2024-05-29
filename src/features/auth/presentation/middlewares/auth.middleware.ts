import { type Response, type NextFunction, type Request } from 'express';
import { HttpCode, ONE, basicJWT } from '../../../../core';

import { type AuthRepository, GetUserById } from '../../../auth';

export class AuthMiddleware {
	//* Dependency injection
	constructor(private readonly repository: AuthRepository) {}

	public validateJWT = (req: Request, res: Response, next: NextFunction): void => {
		const authorization = req.header('Authorization');

		if (!authorization) {
			res.status(HttpCode.UNAUTHORIZED).json({ message: 'Unauthorized (no authorization header)' });
			return;
		}

		if (!authorization.startsWith('Bearer ')) {
			res.status(HttpCode.UNAUTHORIZED).json({ message: 'Invalid authorization header (Bearer token required)' });
			return;
		}

		const token = authorization.split(' ').at(ONE) ?? '';
		const payload = basicJWT.validateToken<{ id: string }>(token);

		if (!payload) {
			res.status(HttpCode.UNAUTHORIZED).json({ message: 'Invalid token' });
			return;
		}

		const { id } = payload;

		new GetUserById(this.repository)
			.execute(id)
			.then((result) => {
				req.body.user = result;
				next();
			})
			.catch(next);
	};
}
