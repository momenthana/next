import { Schema } from 'mongoose'

import createConnection from '@/lib/createConnection'

const alice = createConnection('alice')

const Env = new Schema()

export default alice.model('env', Env)
