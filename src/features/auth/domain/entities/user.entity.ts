// src/features/auth/domain/entities/user.entity.ts

import { AppError, ZERO } from '../../../../core';

export class UserEntity {
	constructor(
		public id: string,
		public name: string,
		public email: string,
		public emailVerified: boolean = false,
		public password: string,
		public role: string[],
		public avatar?: string
	) {}

	/**
	 * If someone wants to work with this entity (map an object coming from my database),
	 * let's make sure to do validations on its properties. …
	 * @param obj - The object coming from my database
	 * @returns UserEntity - A new UserEntity instance
	 */
	public static fromJson(obj: Record<string, unknown>): UserEntity {
		const { id, name, email, emailVerified, password, role, avatar } = obj;
		if (!id) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}
		if (!name || (name as string).length === ZERO) {
			throw AppError.badRequest('This entity requires a name', [{ constraint: 'name is required', fields: ['name'] }]);
		}
		if (!email || (email as string).length === ZERO) {
			throw AppError.badRequest('This entity requires an email', [
				{ constraint: 'email is required', fields: ['email'] }
			]);
		}
		if (emailVerified === undefined) {
			throw AppError.badRequest('This entity requires an emailVerified', [
				{ constraint: 'emailVerified is required', fields: ['emailVerified'] }
			]);
		}
		if (!password || (password as string).length === ZERO) {
			throw AppError.badRequest('This entity requires a password', [
				{ constraint: 'password is required', fields: ['password'] }
			]);
		}
		if (!role || (role as string).length === ZERO) {
			throw AppError.badRequest('This entity requires a role', [{ constraint: 'role is required', fields: ['role'] }]);
		}
		return new UserEntity(
			id as string,
			name as string,
			email as string,
			emailVerified as boolean,
			password as string,
			role as string[],
			avatar as string
		);
	}
}
