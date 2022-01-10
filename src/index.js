import Koa from "koa"
import cors from "@koa/cors"
import Router from "koa-router"
import bodyParser from "koa-bodyparser"
import http from "http"
import https from "https"
import { env } from "process"
import { ApolloServer } from "apollo-server-koa"
import Hana from "hana.js"

import typeDefs from "@/graphql/typeDefs"
import resolvers from "@/graphql/resolvers"
import Cert from "@/models/cert"

const app = new Koa()
const router = new Router()
const apollo = new ApolloServer({
  context: async ({ ctx }) => {
    try {
      if (!ctx.req.headers.authorization) return { ctx }

      const authorization = ctx.req.headers.authorization.split(" ")

      if (authorization[0] != "Bearer") return { ctx }

      const payload = await Hana.Auth.tokenInfo({
        accessToken: authorization[1],
      })

      return { ctx, payload }
    } catch {
      return { ctx }
    }
  },
  typeDefs,
  resolvers,
})

app.use(
  cors({
    credentials: true,
  })
)

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

apollo.applyMiddleware({
  app,
  cors: { origin: env.ORIGIN || "*" },
})

Cert.findOne({
  name: "dev",
}).lean().then((res) => {
  if (res.KEY || res.CERT) {
    const options = {
      key: res.KEY,
      cert: res.CERT,
    }

    https.createServer(options, app.callback()).listen(env.HTTPS || 443, () => {
      console.log(
        `🚀  Server ready at https://localhost:${env.HTTPS || 443}/graphql`
      )
    })
  }

  http.createServer(app.callback()).listen(env.HTTP || 80, () => {
    console.log(
      `🚀  Server ready at http://localhost:${env.HTTP || 80}/graphql`
    )
  })
})
