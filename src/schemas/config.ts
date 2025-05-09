import { Type as t, type Static } from "@sinclair/typebox";
import { Config as LoggingConfig } from "@vaylo/pino/schema";

import { version } from "../../package.json";

export const LoggingLevel = t.Union(
  [
    t.Literal("info"),
    t.Literal("debug"),
    t.Literal("fatal"),
    t.Literal("error"),
    t.Literal("warn"),
    t.Literal("trace"),
  ],
  {
    default: "info",
  },
);

const license = "MIT";
const scalarCDN = "https://unpkg.com/@scalar/api-reference@1.25.122/dist/browser/standalone.js";

export const ConfigSchema = t.Object({
  server: t.Object({
    port: t.Number({ default: 3313 }),
    hostname: t.String({ default: "0.0.0.0" }),
  }),
  app: t.Object({
    name: t.String({ default: "[FOSWLY] Translate" }),
    desc: t.String({
      default:
        "[FOSWLY] Translate is a server that implements unified endpoints for providers that are supported in the @toil/translate library",
    }),
    version: t.Literal(version, { readOnly: true, default: version }),
    license: t.Literal(license, { readOnly: true, default: license }),
    github_url: t.String({
      default: "https://github.com/FOSWLY/translate-backend",
    }),
    contact_email: t.String({ default: "me@toil.cc" }),
    scalarCDN: t.Literal(scalarCDN, { readOnly: true, default: scalarCDN }),
    allowUnsafeEval: t.Boolean({ default: false }),
  }),
  cors: t.Object({
    allowedHeaders: t.String({ default: "*" }),
    origin: t.String({ default: "*" }),
    methods: t.String({ default: "GET, POST, OPTIONS" }),
    maxAge: t.Number({ default: 86400 }),
  }),
  logging: LoggingConfig,
});

export type ConfigSchemaType = Static<typeof ConfigSchema>;
