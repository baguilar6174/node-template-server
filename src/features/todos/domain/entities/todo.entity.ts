// src\features\todos\domain\entities\todo.entity.ts

export class TodoEntity {
	constructor(
		public id: number,
		public text: string,
		public isCompleted: boolean
	) {}

	public static fromJson(obj: Record<string, unknown>): TodoEntity {
		const { id, text, isCompleted = false } = obj;
		if (!id) throw new Error('id is required');
		if (!text) throw new Error('text is required');
		return new TodoEntity(id as number, text as string, isCompleted as boolean);
	}
}
