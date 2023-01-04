import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";

import createApp from "./mutations/createApp/typeDef.graphql";
import token from './mutations/token/typeDef.graphql'
import app from "./queries/app/typeDef.graphql";

const mutationTypeDefs = [createApp, token];

const queryTypeDefs = [app];

export default mergeTypeDefs([
  ...scalarTypeDefs,
  ...mutationTypeDefs,
  ...queryTypeDefs,
]);
