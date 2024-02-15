import { writeFileSync } from "fs";
import { yarg } from "./config/plugins/yargs.plugin";

const { b: base, l: limit, s: show} = yarg;

// const base =  b;
const outputPath = `outputs/tabla_${base}.txt`;
let outputMessage = `======================================
============= Tabla del ${base} ============
======================================\n`;

for (let i = 1; i <= limit; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`;  
}
writeFileSync(outputPath, outputMessage, { encoding: 'utf-8'})
if (show === true) {
  console.log(outputMessage);
  
}
