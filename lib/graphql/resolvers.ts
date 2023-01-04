import { resolvers as scalarResolvers } from 'graphql-scalars'

import { createApp } from './mutations/createApp'
import { token } from './mutations/token'
import { app } from './queries/app'

const resolvers = {
  ...scalarResolvers,
  Mutation: {
    createApp,
    token,
  },
  Query: {
    app,
  },
}

export default resolvers
