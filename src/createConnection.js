import mongoose from "mongoose"
import { env } from "process"

export default (name) => {
  const uri = {
    alice: `mongodb+srv://${env.MONGO_DB_USER}:${env.MONGO_DB_PASS}@${env.MONGO_DB_ALICE}/alice`,
    dev: `mongodb+srv://${env.MONGO_DB_USER}:${env.MONGO_DB_PASS}@${env.MONGO_DB_DEV}/dev`,
  }

  return mongoose.createConnection(uri[name], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
}
