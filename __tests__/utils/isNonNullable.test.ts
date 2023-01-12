import { isNonNullable } from '@/utils/isNonNullable';

describe('isNonNullable util', () => {
  test('', async () => {
    const nullableArray = [null, 'test', null];

    const nonNullableArray = nullableArray.filter(isNonNullable);

    expect(nonNullableArray).toStrictEqual(['test']);
  });
});
