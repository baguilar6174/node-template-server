// src/features/auth/domain/repositories/repository.ts

import { type LoginUserDto, type RegisterUserDto } from '../dtos';
import { type UserEntity, type AuthEntity } from '../entities';

export abstract class AuthRepository {
	abstract register(dto: RegisterUserDto): Promise<AuthEntity>;
	abstract login(dto: LoginUserDto): Promise<AuthEntity>;
	// TODO: create a DTO for this method
	abstract getUserById(dto: string): Promise<UserEntity>;
}
