import fs from "node:fs/promises";

import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import config from "./config";
import { log } from "./logging";

import health from "./controllers/health";
import translate from "./controllers/translate";
import detect from "./controllers/detect";
import getLangs from "./controllers/getLangs";

if (!(await fs.exists(config.logging.logPath))) {
  await fs.mkdir(config.logging.logPath, { recursive: true });
  log.info(`Created log directory`);
}

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
      scalarCDN: config.app.scalarCDN,
      documentation: {
        info: {
          title: config.app.name,
          description: config.app.desc,
          version: config.app.version,
          license: {
            name: config.app.license,
          },
          contact: {
            name: "Developer",
            url: config.app.github_url,
            email: config.app.contact_email,
          },
        },
      },
    }),
  )
  .onRequest(({ set }) => {
    for (const [key, val] of Object.entries(config.cors)) {
      set.headers[key] = val;
    }
  })
  .onError(({ code, error }) => {
    switch (code) {
      case "NOT_FOUND":
        return {
          detail: "Route not found :(",
        };
      case "VALIDATION":
        return error.all;
    }

    log.error(
      {
        message: error.message,
      },
      code,
    );

    return {
      error: error.message,
    };
  })
  .use(health)
  .use(translate)
  .use(detect)
  .use(getLangs)
  .listen({
    port: config.server.port,
    hostname: config.server.hostname,
  });

log.info(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
