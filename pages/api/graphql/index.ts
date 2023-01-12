import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

import resolvers from '@/lib/graphql/resolvers'
import typeDefs from '@/lib/graphql/typeDefs'
import { NextApiRequest, NextApiResponse } from 'next'

type Context = { req: NextApiRequest; res: NextApiResponse }

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
})

export default startServerAndCreateNextHandler<Context>(server, { context: async (req, res) => ({ req, res }) })
