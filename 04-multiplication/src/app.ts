import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";


(async () => {
  await main();
})()

async function main() {
  const { b: base, l: limit, s: show} = yarg;
  ServerApp.run({base, limit, show})
  
}