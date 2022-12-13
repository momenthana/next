import { AuthenticationError } from 'apollo-server-core'
import MUUID from 'uuid-mongodb'

import App from '@/models/app'

export const app = async (_, args, { payload }) => {
  if (!payload) throw new AuthenticationError()

  const filter = {
    userId: MUUID.from(payload.sub)
  }

  if (args.input?.clientId) filter.id = MUUID.from(args.input?.clientId)

  const apps = await App.find(filter)

  apps.forEach((app) => {
    app.clientId = MUUID.from(app.id).toString()
  })

  return apps
}
