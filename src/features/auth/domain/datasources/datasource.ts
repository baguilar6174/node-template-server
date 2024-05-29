// src/features/auth/domain/datasources/datasource.ts

import { type LoginUserDto, type RegisterUserDto } from '../dtos';
import { type AuthEntity } from '../entities';

export abstract class AuthDatasource {
	abstract register(dto: RegisterUserDto): Promise<AuthEntity>;
	abstract login(dto: LoginUserDto): Promise<AuthEntity>;
}
