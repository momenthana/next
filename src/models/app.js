import mongoose from "mongoose"
import MUUID from "uuid-mongodb"

const App = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    clientId: {
      type: Object,
      default: MUUID.v4,
      required: true,
      unique: true,
    },
    clientSecret: {
      type: Object,
      default: MUUID.v4,
      required: true,
      unique: true,
    },
    requiredScope: {
      type: Array,
    },
    optionalScope: {
      type: Array,
    },
    redirectUri: {
      type: Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

module.exports = mongoose.model("app", App)
