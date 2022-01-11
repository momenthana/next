import { init } from "@/lib/alice";
import { start } from "@/server";

init().then(() => {
  start();
});
