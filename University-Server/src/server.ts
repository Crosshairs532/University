import { Server } from "http";
import { configFiles } from "./app/config";
import app from "./app";
import superAdmin from "./app/DB";

// getting-started.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

let server: Server;
async function main() {
  const { port, url } = configFiles;
  await mongoose.connect(url as string);

  superAdmin();
  server = app.listen(port, () => {
    console.log(`University server is listening on port ${port}`);
  });
}
// for asynchronous  behavior
process.on("unhandledRejection", (reason, promise) => {
  console.log(`UnhandledRejection is detected, shutting down server....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//  for synchronous behavior
process.on("uncaughtException", (err) => {
  console.log(`UnCaughtRejection is detected, shutting down server....`);
  console.error(err);
  process.exit(1);
});
