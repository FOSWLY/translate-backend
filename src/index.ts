import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import config from "./config";

import health from "./controllers/health";
import translate from "./controllers/translate";
import setupElysia, { log } from "./setup";
import { InternalServerError, UnableAccessYandexAPI } from "./errors";
import detect from "./controllers/detect";
import getLangs from "./controllers/getLangs";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/docs",
      scalarCDN: config.app.scalarCDN,
      documentation: {
        info: {
          title: config.app.name,
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
  .use(setupElysia)
  .error({
    INTERNAL_SERVER_ERROR: InternalServerError,
    UNABLE_ACCESS_YANDEX_API_ERROR: UnableAccessYandexAPI,
  })
  .onError(({ set, code, error }) => {
    switch (code) {
      case "NOT_FOUND":
        return {
          detail: "Route not found :(",
        };
      case "VALIDATION":
        return error.all;
      case "INTERNAL_SERVER_ERROR":
        set.status = 500;
        break;
      case "UNABLE_ACCESS_YANDEX_API_ERROR":
        set.status = 503;
        break;
    }

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
