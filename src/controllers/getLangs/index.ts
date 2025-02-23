import { Elysia } from "elysia";

import TranslationClient from "@toil/translate";

import { GetLangsParams, GetLangsSuccessResponse } from "@/models/translate.model";
import config from "@/config";

const {
  app: { allowUnsafeEval },
} = config;

async function getLangs({ service }: GetLangsParams) {
  const client = new TranslationClient({
    service,
    allowUnsafeEval,
  });

  return await client.getLangs();
}

export default new Elysia().group("/getLangs", (app) =>
  app.get("/", async ({ query }) => await getLangs(query), {
    query: GetLangsParams,
    response: {
      200: GetLangsSuccessResponse,
    },
    detail: {
      summary: "Get langs",
      tags: ["Translate"],
    },
  }),
);
