import { env } from 'process'

import Env from '@/models/env'

export const init = async (): Promise<void> => {
  const data = await Env.aggregate([
    { $match: { NAME: env.NAME } },
    {
      $lookup: {
        from: 'certs',
        localField: 'certId',
        foreignField: '_id',
        as: 'cert'
      }
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$cert', 0] }, '$$ROOT'] }
      }
    },
    { $project: { _id: 0, certId: 0, cert: 0 } }
  ])

  Object.assign(env, data.shift())
}
