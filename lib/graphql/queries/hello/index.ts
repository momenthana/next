export const hello = async (
  _: unknown,
  { input }: { input: { hello: string } }
): Promise<unknown> => {
  console.log(input);

  return input.hello;
};
