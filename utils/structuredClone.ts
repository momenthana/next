/**
 * structuredClone의 타입 추론을 유도하는 유틸 함수
 *
 * @example
 * clone(value, options)
 */
export const clone = <T>(value: T, options?: StructuredSerializeOptions): T => structuredClone(value, options);
