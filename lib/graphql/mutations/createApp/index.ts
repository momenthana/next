import { GraphQLError } from 'graphql'

import MUUID from 'uuid-mongodb'
import App from '@/lib/models/app'
export const createApp = async (_: any, args: { input: any }, { payload }: any) => {
  if (!payload)
    throw new GraphQLError('', {
      extensions: { code: 'UNAUTHENTICATED' },
    })

  const app = await App.create({ ...args.input, userId: MUUID.from(payload.sub) })
  app.clientId = MUUID.from(app.id).toString()
  return app
}
