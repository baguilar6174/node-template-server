// src\features\todos\domain\entities\todo.entity.ts

import { ValidationError } from '../../../../core/errors/validation.error';

export class TodoEntity {
	constructor(
		public id: number,
		public text: string,
		public isCompleted: boolean
	) {}

	public static fromJson(obj: Record<string, unknown>): TodoEntity {
		const { id, text, isCompleted = false } = obj;
		if (!text) {
			throw new ValidationError([
				{
					constraint: 'id is required',
					fields: ['id']
				}
			]);
		}
		return new TodoEntity(id as number, text as string, isCompleted as boolean);
	}
}
