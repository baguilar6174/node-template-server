import { createHash, randomBytes } from 'crypto';

import { TEN } from '../constants';

// Generate a random salt
const salt = randomBytes(TEN).toString('hex');

/**
 * Basic encryption adapter for password hashing and comparison.
 * Here you can use any encryption library you want.
 */
export const basicEncript = {
	/**
	 * Generates a hash for a password with a salt.
	 * @param password - The password to hash.
	 * @returns - The hashed password.
	 */
	hashPassword: (password: string): string => {
		// Create the hash using the salt and the password
		const hash = createHash('sha256')
			.update(salt + password)
			.digest('hex');

		return hash;
	},

	/**
	 * Compares a password with a given hash and salt.
	 * @param password - The password to verify.
	 * @param hash - The original hash to compare with.
	 * @returns - True if the password matches, false otherwise.
	 */
	comparePassword: (password: string, hash: string): boolean => {
		// Create a new hash with the given salt and password
		const newHash = createHash('sha256')
			.update(salt + password)
			.digest('hex');

		// Compare the new hash with the original hash
		return newHash === hash;
	}
};
