import mongoose from 'mongoose'
import MUUID from 'uuid-mongodb'

import createConnection from '@/createConnection'

const dev = createConnection('dev')

const App = new mongoose.Schema(
  {
    userId: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String
    },
    id: {
      type: Object,
      default: MUUID.v4,
      required: true,
      unique: true
    },
    clientSecret: {
      type: Object,
      default: MUUID.v4,
      required: true,
      unique: true
    },
    requiredScope: {
      type: Array
    },
    optionalScope: {
      type: Array
    },
    redirectUri: {
      type: Array
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = dev.model('app', App)
