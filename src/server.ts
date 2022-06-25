import { env } from "process";
import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import fastify, { FastifyInstance } from "fastify";
import Hana from "hana.js";

const fastifyAppClosePlugin = (app: FastifyInstance): ApolloServerPlugin => {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
};

export const startApolloServer = async (
  typeDefs: any,
  resolvers: any
): Promise<void> => {
  const app = fastify({
    https: {
      key: env.KEY ?? undefined,
      cert: env.CERT ?? undefined,
    },
  });
  const server = new ApolloServer({
    context: async (ctx) => {
      try {
        const { operationName }: any = ctx.request.body;

        if (operationName === "IntrospectionQuery") {
          if (env.NODE_ENV !== "production") return { ctx };

          if (ctx.request.headers.authorization == null) throw new Error();

          const authorization = ctx.request.headers.authorization.split(" ");

          if (authorization[1] !== env.TOKEN) throw new Error();
        }

        if (ctx.request.headers.authorization == null) return { ctx };

        const authorization = ctx.request.headers.authorization.split(" ");

        if (authorization[0] !== "Bearer") return { ctx };

        const payload = await Hana.Auth.tokenInfo({
          accessToken: authorization[1],
        });

        return { ctx, payload };
      } catch {
        return { ctx };
      }
    },
    typeDefs,
    resolvers,
    plugins: [
      fastifyAppClosePlugin(app as any),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server as any }),
    ],
  });

  await server.start();
  app.register(import("@fastify/cookie"));
  app.register(
    server.createHandler({
      cors: {
        origin: (_origin: any, cb: any) => {
          cb(null, true);
        },
        credentials: true,
      },
    })
  );
  await app.listen(env.PORT ?? 4000, env.ADDR);
  console.log(
    `🚀 Server ready at https://localhost:${env.PORT ?? 4000}${
      server.graphqlPath
    }`
  );
};
