import { AuthenticationError } from "apollo-server-koa"

import App from "@/models/app"

export const createApp = async (_, args, { payload }) => {
  if (!payload) throw new AuthenticationError()

  const app = App(args.input)
  await app.save()

  return true
}
