import { type RegisterUserDto } from '../dtos';
import { type AuthEntity } from '../entities';
import { type AuthRepository } from '../repositories/repository';

export interface RegisterUserUseCase {
	execute: (data: RegisterUserDto) => Promise<AuthEntity>;
}

export class RegisterUser implements RegisterUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	async execute(data: RegisterUserDto): Promise<AuthEntity> {
		return await this.repository.register(data);
	}
}
