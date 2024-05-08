import { Elysia } from "elysia";
import * as YandexAPI from "../../libs/api";
import { GetLangsResponse } from "../../types/controllers";

export default new Elysia().group("/getLangs", (app) =>
  app.get(
    "/",
    async () => {
      return await YandexAPI.getLangs();
    },
    {
      response: {
        200: GetLangsResponse,
      },
      detail: {
        summary: "Get langs",
        tags: ["Translate"],
      },
    },
  ),
);
