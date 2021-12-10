import { AuthenticationError } from "apollo-server-koa"
import MUUID from "uuid-mongodb"

import App from "@/models/app"

export const app = async (_, args, { payload }) => {
  if (!payload) throw new AuthenticationError()

  const apps = await App.find({
    id: MUUID.from(payload.sub),
  })

  apps.forEach((app) => {
    app.clientId = MUUID.from(app.clientId).toString()
  })

  return apps
}
