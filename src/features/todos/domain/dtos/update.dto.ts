import { ZERO } from '../../../../core/constants';
import { ValidationError } from '../../../../core/errors/validation.error';
import { type ValidationType } from '../../../../core/types';
import { type CoreDto } from '../../../shared/domain';

export class UpdateTodoDto implements CoreDto<UpdateTodoDto> {
	private constructor(
		public readonly id: number,
		public readonly text?: string,
		public readonly completedAt?: Date
	) {}

	get values(): Record<string, unknown> {
		const obj: Record<string, unknown> = {};
		if (this.text) obj.text = this.text;
		if (this.completedAt) obj.completedAt = this.completedAt;
		return obj;
	}

	public validate(dto: UpdateTodoDto): void {
		const errors: ValidationType[] = [];

		const { id, completedAt } = dto;

		if (!id || isNaN(Number(id))) {
			errors.push({ fields: ['id'], constraint: 'Id is not a valid number' });
		}

		if (completedAt) {
			const newDate = new Date(completedAt);
			if (newDate.toString() === 'Invalid Date') {
				errors.push({ fields: ['completedAt'], constraint: 'CompletedAt must be a valid date' });
			}
		}

		if (errors.length > ZERO) throw new ValidationError(errors);
	}

	public static create(props: Record<string, unknown>): UpdateTodoDto {
		const { id, text, completedAt } = props;
		return new UpdateTodoDto(id as number, text as string, new Date(completedAt as string));
	}
}
