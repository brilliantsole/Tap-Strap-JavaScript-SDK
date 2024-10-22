import express from "express";
import https from "https";
import http from "http";
const app = express();
import fs from "fs";
import ip from "ip";
import * as TS from "./build/tapstrap.node.module.js";
import nocache from "nocache";

//TS.setAllConsoleLevelFlags({ log: false });

// HTTPS SERVER
app.use(nocache());
app.use(function (req, res, next) {
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("x-frame-options", "same-origin");

  next();
});
app.use(express.static("./"));

const serverOptions = {
  key: fs.readFileSync("./sec/key.pem"),
  cert: fs.readFileSync("./sec/cert.pem"),
};

const httpServer = http.createServer(app);
httpServer.listen(80);
const httpsServer = https.createServer(serverOptions, app);
httpsServer.listen(443, () => {
  console.log(`server listening on https://${ip.address()}`);
});
