import mongoose from "mongoose"

import createConnection from "@/createConnection"

const alice = createConnection("alice")

const Cert = new mongoose.Schema()

module.exports = alice.model("cert", Cert)
