import process from 'process'
import MUUID from 'uuid-mongodb'

import Env from '@/models/env'

export const init = async (): Promise<void> => {
  const keys = await Env.aggregate([
    {
      $match: {
        repositoryId: MUUID.from(process.env.ID as string),
        name: process.env.ENV
      }
    },
    {
      $lookup: {
        from: 'keys',
        localField: 'id',
        foreignField: 'envId',
        as: 'keys'
      }
    },
    { $unwind: '$keys' },
    {
      $replaceRoot: {
        newRoot: '$keys'
      }
    }
  ])

  for await (const key of keys) {
    Object.assign(process.env, { [key.name]: key.value })
  }
}
