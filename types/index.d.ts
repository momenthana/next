declare module "*.graphql" {
  import { DocumentNode } from "graphql";
  const value: DocumentNode;
  export default value;
}

type Maybe<T> = T | null;

type InferArray<T extends any[]> = T extends (infer U)[] ? U : never;

type ReturnAwaited<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

type ReturnData<T extends (...args: any) => any> = ReturnAwaited<T>['data'];

type QueriesResult<T extends { [key: string]: any }> = {
  [Property in keyof T as `${string & Property}Result`]: ReturnAwaited<T[Property]>;
};
