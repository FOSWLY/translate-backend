import config from "@/config";
import { PinoClient } from "@vaylo/pino";

const {
  logging: { loki, level, logPath, logToFile },
} = config;

export const loggerClient = new PinoClient({
  loki,
  level,
  logToFile,
  logPath,
});

export const log = loggerClient.init();
