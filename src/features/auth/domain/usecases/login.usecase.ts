import { type LoginUserDto } from '../dtos';
import { type AuthEntity } from '../entities';
import { type AuthRepository } from '../repositories/repository';

export interface LoginUserUseCase {
	execute: (data: LoginUserDto) => Promise<AuthEntity>;
}

export class LoginUser implements LoginUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	async execute(data: LoginUserDto): Promise<AuthEntity> {
		return await this.repository.login(data);
	}
}
