import { Elysia } from "elysia";
import TranslationClient from "@toil/translate";

import { TranslationParams, TranslationSuccessResponse } from "@/models/translate.model";
import config from "@/config";

const {
  app: { allowUnsafeEval },
} = config;

async function translate({ text, lang, service }: TranslationParams) {
  const client = new TranslationClient({
    service,
    allowUnsafeEval,
  });

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
