import * as path from "node:path";

import { Value } from "@sinclair/typebox/value";

import { ConfigSchema } from "@/schemas/config";

export default Value.Parse(ConfigSchema, {
  server: {
    port: Bun.env.SERVICE_PORT,
    hostname: Bun.env.SERVICE_HOST,
  },
  app: {
    name: Bun.env.APP_NAME,
    desc: Bun.env.APP_DESC,
    contact_email: Bun.env.APP_CONTACT_EMAIL,
    allowUnsafeEval: Bun.env.ALLOW_UNSAFE_EVAL === "true",
  },
  cors: {},
  logging: {
    level: Bun.env.NODE_ENV === "production" ? "info" : "debug",
    logPath: path.join(__dirname, "..", "logs"),
    logToFile: Bun.env.LOG_TO_FILE === "true",
    loki: {
      host: Bun.env.LOKI_HOST,
      user: Bun.env.LOKI_USER,
      password: Bun.env.LOKI_PASSWORD,
      label: Bun.env.LOKI_LABEL ?? "translate-backend",
    },
  },
});
