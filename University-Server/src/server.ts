import { Server } from "http";
import { configFiles } from "./app/config";
import app from "./app";

// getting-started.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

let server: Server;
async function main() {
  const { port, url } = configFiles;
  await mongoose.connect(url as string);
  server = app.listen(port, () => {
    console.log(`University server is listening on port ${port}`);
  });
}
