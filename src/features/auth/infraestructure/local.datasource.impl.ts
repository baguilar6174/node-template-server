// src/features/auth/infraestructure/local.datasource.impl.ts

import { AppError, ONE, basicEncript, basicJWT } from '../../../core';
import { type RegisterUserDto, type AuthDatasource, UserEntity, AuthEntity, type LoginUserDto } from '../domain';

const USERS_MOCK = [
	{
		id: '1',
		name: 'Test User',
		email: 'test@test.com',
		emailVerified: false,
		password: 'ca0711461f3b8387d01cc0c0cf532a4fb4b5fdf0207f7902fa75580718da497a',
		role: ['USER_ROLE'],
		avatar: 'https://avatars.dicebear.com/api/initials/T.svg'
	},
	{
		id: '2',
		name: 'Test User 2',
		email: 'test2@test.com',
		emailVerified: false,
		password: 'ca0711461f3b8387d01cc0c0cf532a4fb4b5fdf0207f7902fa75580718da497a',
		role: ['USER_ROLE']
	}
];

export class AuthDatasourceImpl implements AuthDatasource {
	public async register(dto: RegisterUserDto): Promise<AuthEntity> {
		const user = USERS_MOCK.find((user) => user.email === dto.email);
		if (user) {
			throw AppError.badRequest('User already exists', [{ constraint: 'User already exists', fields: ['email'] }]);
		}
		const createdUser = {
			...dto,
			id: (USERS_MOCK.length + ONE).toString(),
			emailVerified: false,
			role: ['USER_ROLE']
		};
		// Hash the password
		createdUser.password = basicEncript.hashPassword(dto.password);
		// Add the user to the mock
		USERS_MOCK.push(createdUser);
		// Create the auth entity (omit the password)
		const { password, ...rest } = UserEntity.fromJson(createdUser);
		const token = basicJWT.generateToken({ id: createdUser.id });
		// ? Here you can verify if the token is created correctly before to send it to the client
		return new AuthEntity(rest, token);
	}

	public async login(dto: LoginUserDto): Promise<AuthEntity> {
		const user = USERS_MOCK.find((user) => user.email === dto.email);
		if (!user) throw AppError.badRequest('User with this email not found');
		const isPasswordMatch = basicEncript.comparePassword(dto.password, user.password);
		if (!isPasswordMatch) throw AppError.badRequest('Invalid password');
		const { password, ...rest } = UserEntity.fromJson({ ...user });
		const token = basicJWT.generateToken({ id: user.id });
		// ? Here you can verify if the token is created correctly before to send it to the client
		return new AuthEntity(rest, token);
	}

	public async getUserById(dto: string): Promise<UserEntity> {
		const user = USERS_MOCK.find((user) => user.id === dto);
		if (!user) throw AppError.badRequest('User with this id not found');
		return UserEntity.fromJson({ ...user });
	}
}
