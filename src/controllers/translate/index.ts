import { Elysia } from "elysia";

import { TranslationParams, TranslationSuccessResponse } from "@/models/translate.model";
import { createClient } from "@/utils/client";

async function translate({ text, lang, service }: TranslationParams) {
  const client = createClient(service);
  return await client.translate(text, lang);
}

const translateSharedOpts = {
  response: {
    200: TranslationSuccessResponse,
  },
  detail: {
    summary: "Translate text",
    tags: ["Translate"],
  },
};

export default new Elysia().group("/translate", (app) =>
  app
    .post("/", async ({ body }) => await translate(body), {
      body: TranslationParams,
      ...translateSharedOpts,
    })
    .get("/", async ({ query }) => await translate(query), {
      query: TranslationParams,
      ...translateSharedOpts,
    }),
);
