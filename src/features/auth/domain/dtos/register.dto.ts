import { AppError, type ValidationType, ZERO, REGEX_EMAIL, SIX } from '../../../../core';
import { type CoreDto } from '../../../shared';

/**
 * DTOs must have a validate method that throws an error
 * if the data is invalid or missing required fields.
 */
export class RegisterUserDto implements CoreDto<RegisterUserDto> {
	private constructor(
		public readonly name: string,
		public readonly email: string,
		public readonly password: string
	) {
		this.validate(this);
	}

	public validate(dto: RegisterUserDto): void {
		const errors: ValidationType[] = [];
		const { name, email, password } = dto;

		if (!name || name.length === ZERO) {
			errors.push({ fields: ['name'], constraint: 'Name is required' });
		}

		if (!email || !REGEX_EMAIL.test(email)) {
			errors.push({ fields: ['email'], constraint: 'Email is not valid' });
		}

		if (!password || password.length < SIX) {
			errors.push({ fields: ['password'], constraint: 'Password is not valid' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating user data', errors);
	}

	/**
	 * This method creates a new instance of this DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of this DTO
	 */
	public static create(object: Record<string, unknown>): RegisterUserDto {
		const { name, email, password } = object;
		return new RegisterUserDto(name as string, email as string, password as string);
	}
}
