import * as path from "node:path";

import { Elysia } from "elysia";
import { formatters, pino, createPinoLogger } from "@bogeychan/elysia-logger";
import type { DestinationStream } from "pino";
import pinnoPretty from "pino-pretty";

import * as fs from "fs";

import { mkdir } from "node:fs/promises";

import config from "./config";

const stream = pinnoPretty({
  colorize: true,
});

const pinoOpts = {
  level: config.logging.level,
  formatters: {
    ...formatters,
    level: (label: string) => {
      return { level: label.toUpperCase() };
    },
  },
};

if (!fs.existsSync(config.logging.logPath)) {
  await mkdir(config.logging.logPath, { recursive: true });
}

const startingDate = new Date().toISOString().split("T")[0];
const fileDestination = config.logging.logSave
  ? pino.destination(path.join(config.logging.logPath, `${startingDate}.log`))
  : undefined;

// log to file + console
export const log = createPinoLogger({
  ...pinoOpts,
  stream: config.logging.logSave
    ? pino.multistream([stream, fileDestination as DestinationStream])
    : stream,
});

// log only to file
export const fileLog = createPinoLogger({
  ...pinoOpts,
  stream: fileDestination,
});

// https://elysiajs.com/essential/plugin#service-locator
export default new Elysia().use(
  log.into({
    autoLogging: config.logging.logRequests as true,
  }),
);
