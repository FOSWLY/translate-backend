import { Elysia } from "elysia";

import config from "../../config";

export default new Elysia().group("/health", (app) =>
  app.get(
    "/",
    () => ({
      version: config.app.version,
      status: "ok",
    }),
    {
      detail: {
        summary: "Get health",
        tags: ["Health"],
      },
    },
  ),
);
