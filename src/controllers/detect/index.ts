import { Elysia, t } from "elysia";
import {
  DetectRequestParams,
  YandexErrorResponse,
  DetectSuccessResponse,
} from "../../types/controllers";
import * as YandexAPI from "../../libs/api";
import { fileLog } from "../../setup";

export default new Elysia().group("/detect", (app) =>
  app
    .post(
      "/",
      async ({ body: { text } }) => {
        const result = await YandexAPI.detect(text);
        if (result.lang === "") {
          fileLog.warn(`Unknown language detected. Entered text: "${text}".`);
        }

        return result;
      },
      {
        body: DetectRequestParams,
        response: {
          200: t.Union([DetectSuccessResponse, YandexErrorResponse]),
        },
        detail: {
          summary: "Detect lang",
          tags: ["Translate"],
        },
      },
    )
    .get(
      "/",
      async ({ query: { text } }) => {
        const result = await YandexAPI.detect(text);
        if (result.lang === "") {
          fileLog.warn(`Unknown language detected. Entered text: "${text}".`);
        }

        return result;
      },
      {
        query: DetectRequestParams,
        response: {
          200: t.Union([DetectSuccessResponse, YandexErrorResponse]),
        },
        detail: {
          summary: "Detect lang",
          tags: ["Translate"],
        },
      },
    ),
);
