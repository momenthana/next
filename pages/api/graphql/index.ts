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

export default startServerAndCreateNextHandler<Context>(server, {
  context: async (req, res) => {
    try {
      const { operationName }: any = req.body;

      if (operationName === "IntrospectionQuery") {
        if (env.NODE_ENV !== "production") return { req, res }

        if (req.headers.authorization == null) throw new Error();

        const authorization = req.headers.authorization.split(" ");

        if (authorization[1] !== env.TOKEN) throw new Error();
      }

      if (req.headers.authorization == null) return { req, res }

      const authorization = req.headers.authorization.split(" ");

      if (authorization[0] !== "Bearer") return { req, res }

      const payload = await Hana.Auth.tokenInfo({
        accessToken: authorization[1],
      });

      return { req, res, payload };
    } catch {
      return { req, res };
    }
  },
})
