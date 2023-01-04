import MUUID from 'uuid-mongodb'

import App from '@/lib/models/app'
import { GraphQLError } from 'graphql/error'

export const app = async (_: any, args: { input: { clientId: any } }, { payload }: any) => {
  if (!payload)
    throw new GraphQLError('', {
      extensions: { code: 'UNAUTHENTICATED' },
    })

  const filter = {
    userId: MUUID.from(payload.sub),
    clientId: MUUID.from(args.input?.clientId)
  }

  const apps = await App.find(filter)

  apps.forEach((app) => {
    app.clientId = MUUID.from(app.clientId).toString()
  })

  return apps
}
