// src/features/auth/domain/entities/auth.entity.ts

import { type UserEntity } from './user.entity';

export class AuthEntity {
	constructor(
		public readonly user: Omit<UserEntity, 'password'>,
		public readonly token: string
	) {}
}
