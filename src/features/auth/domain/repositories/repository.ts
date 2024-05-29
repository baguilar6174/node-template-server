// src/features/auth/domain/repositories/repository.ts

import { type LoginUserDto, type RegisterUserDto } from '../dtos';
import { type AuthEntity } from '../entities';

export abstract class AuthRepository {
	abstract register(dto: RegisterUserDto): Promise<AuthEntity>;
	abstract login(dto: LoginUserDto): Promise<AuthEntity>;
}
