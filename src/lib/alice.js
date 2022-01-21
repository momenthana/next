import { env } from 'process'

import Env from '@/models/env'

export const init = async () => {
  const data = await Env.findById(env.ID).lean()

  Object.assign(env, data)
}
