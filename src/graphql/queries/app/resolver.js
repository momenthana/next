import { AuthenticationError } from "apollo-server-koa"
import MUUID from "uuid-mongodb"

import App from "@/models/app"

export const app = async (_, args, { payload }) => {
  if (!payload) throw new AuthenticationError()

  const app = await App.findOne({
    clientId: MUUID.from(args.input.clientId),
  })

  return app
}
