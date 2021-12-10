import { AuthenticationError } from "apollo-server-koa"
import MUUID from "uuid-mongodb"

import App from "@/models/app"

export const app = async (_, args, { payload }) => {
  if (!payload) throw new AuthenticationError()

  const filter = {
    id: MUUID.from(payload.sub),
  }

  if (args.input?.clientId) filter.clientId = MUUID.from(args.input?.clientId)

  const apps = await App.find(filter)

  apps.forEach((app) => {
    app.clientId = MUUID.from(app.clientId).toString()
  })

  return apps
}
