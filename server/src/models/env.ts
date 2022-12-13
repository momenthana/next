import { Schema } from "mongoose";

import createConnection from "@/lib/createConnection";

const alice = createConnection("alice");

const EnvSchema = new Schema();

export default alice.model("env", EnvSchema) as any;
