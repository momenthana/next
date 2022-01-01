import { AuthenticationError } from "apollo-server-koa"
import MUUID from "uuid-mongodb"

import App from "@/models/app"

export const createApp = async (_, args, { payload }) => {
  if (!payload) throw new AuthenticationError()

  const app = await App.create({ ...args.input, userId: MUUID.from(payload.sub) })

  app.clientId = MUUID.from(app.id).toString()

  return app
}
