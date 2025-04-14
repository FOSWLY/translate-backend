import fs from "node:fs/promises";

import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { HttpStatusCode } from "elysia-http-status-code";

import config from "./config";
import { log } from "./logging";

import health from "./controllers/health";
import translate from "./controllers/translate";
import detect from "./controllers/detect";
import getLangs from "./controllers/getLangs";
import { LibreTransalteDisabledError } from "./errors";

if (!(await fs.exists(config.logging.logPath))) {
  await fs.mkdir(config.logging.logPath, { recursive: true });
  log.info(`Created log directory`);
}

const app = new Elysia({
  prefix: "/v2",
})
  .use(
    swagger({
      path: "/docs",
      scalarCDN: config.app.scalarCDN,
      scalarConfig: {
        spec: {
          url: "/v2/docs/json",
        },
      },
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
  .use(HttpStatusCode())
  .use(cors(config.cors))
  .error({
    LIBRE_TRANSLATE_DISABLED: LibreTransalteDisabledError,
  })
  .onError(({ set, code, error, httpStatus }) => {
    switch (code) {
      case "NOT_FOUND":
        return {
          detail: "Route not found :(",
        };
      case "VALIDATION":
        return error.all;
      case "LIBRE_TRANSLATE_DISABLED":
        set.status = httpStatus.HTTP_403_FORBIDDEN;
        break;
    }

    log.error(
      {
        message: (error as Error).message,
      },
      code as string,
    );

    return {
      error: (error as Error).message,
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
