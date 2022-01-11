import { env } from "process";

import Env from "@/models/env";

export const init = async () => {
  const data = await Env.findOne({
    NAME: env.NAME,
  }).lean();

  Object.assign(env, data);
};
