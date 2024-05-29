// src/features/auth/infraestructure/repository.impl.ts

import {
	type RegisterUserDto,
	type AuthRepository,
	type AuthEntity,
	type AuthDatasource,
	type LoginUserDto
} from '../domain';

export class AuthRepositoryImpl implements AuthRepository {
	constructor(private readonly datasource: AuthDatasource) {}

	async register(dto: RegisterUserDto): Promise<AuthEntity> {
		return await this.datasource.register(dto);
	}

	async login(dto: LoginUserDto): Promise<AuthEntity> {
		return await this.datasource.login(dto);
	}
}
