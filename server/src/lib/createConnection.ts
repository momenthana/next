import mongoose from 'mongoose'
import { env } from 'process'

export default (name: string): mongoose.Connection => {
  interface Uri {
    [key: string]: string
  }

  const uri: Uri = {
    alice: `mongodb+srv://${env.MONGO_DB_USER}:${env.MONGO_DB_PASS}@${env.MONGO_DB_ALICE}/alice`,
    dev: `mongodb+srv://${env.MONGO_DB_USER}:${env.MONGO_DB_PASS}@${env.MONGO_DB_DEV}/dev`
  }

  return mongoose.createConnection(uri[name])
}
