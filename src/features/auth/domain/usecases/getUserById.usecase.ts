import { type UserEntity } from '../entities';
import { type AuthRepository } from '../repositories/repository';

export interface GetUserByIdUseCase {
	execute: (dto: string) => Promise<UserEntity>;
}

export class GetUserById implements GetUserByIdUseCase {
	constructor(private readonly repository: AuthRepository) {}

	async execute(dto: string): Promise<UserEntity> {
		return await this.repository.getUserById(dto);
	}
}
