/**
 * NonNullable Array로 인식을 유도하는 유틸 함수
 *
 * @example
 * Array.filter(isNonNullable)
 */
export const isNonNullable = <T>(v: T | undefined | null): v is T => Boolean(v);
