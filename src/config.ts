import * as path from "node:path";
import { LoggerLevel } from "./types/logging";
import { version } from "../package.json";

export default {
  server: {
    port: 3313,
    hostname: "0.0.0.0",
  },
  app: {
    name: "[FOSWLY] Translate",
    desc: "[FOSWLY] Translate is Free Yandex Translate API without any authorization or restrictions.",
    version,
    license: "MIT",
    github_url: "https://github.com/FOSWLY/translate-backend",
    contact_email: "me@toil.cc",
    scalarCDN: "https://unpkg.com/@scalar/api-reference@1.15.1/dist/browser/standalone.js",
  },
  logging: {
    level: LoggerLevel.INFO,
    logRequests: false, // for debugging (true/false)
    logPath: path.join(__dirname, "..", "logs"),
    logSave: true,
  },
  api: {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.660 YaBrowser/23.9.5.660 Yowser/2.5 Safari/537.36",
      Referer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      Origin: "https://www.youtube.com",
      // pragma: "no-cache",
      // "cache-control": "no-cache",
    },
    srv: "browser_video_translation",
  },
};
