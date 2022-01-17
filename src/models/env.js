import mongoose from 'mongoose'

import createConnection from '@/createConnection'

const alice = createConnection('alice')

const Env = new mongoose.Schema()

module.exports = alice.model('env', Env)
