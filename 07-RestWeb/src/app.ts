import { log } from "console";
import { Server } from "./presentation/server";
import { envs } from "./config/envs";

(() => {
  main();
})();

function main() {

  const server = new Server({
    PORT: envs.PORT,
    PUBLIC_PATH: envs.PUBLIC_PATH
  });

  server.start();

}