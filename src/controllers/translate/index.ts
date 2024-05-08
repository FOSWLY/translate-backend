import { Elysia, t } from "elysia";
import {
  TranslateSuccessResponse,
  TranslationRequestParams,
  YandexErrorResponse,
} from "../../types/controllers";
import * as YandexAPI from "../../libs/api";

export default new Elysia().group("/translate", (app) =>
  app
    .post(
      "/",
      async ({ body: { text, lang } }) => {
        return await YandexAPI.translate(text, lang);
      },
      {
        body: TranslationRequestParams,
        response: {
          200: t.Union([TranslateSuccessResponse, YandexErrorResponse]),
        },
        detail: {
          summary: "Translate text",
          tags: ["Translate"],
        },
      },
    )
    .get(
      "/",
      async ({ query: { text, lang } }) => {
        return await YandexAPI.translate(text, lang);
      },
      {
        query: TranslationRequestParams,
        response: {
          200: t.Union([TranslateSuccessResponse, YandexErrorResponse]),
        },
        detail: {
          summary: "Translate text",
          tags: ["Translate"],
        },
      },
    ),
);
