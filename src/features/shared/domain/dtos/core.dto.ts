export abstract class CoreDto<T> {
	abstract validate(dto: T): void;
}
