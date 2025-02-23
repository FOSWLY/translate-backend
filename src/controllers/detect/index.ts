import { Elysia } from "elysia";

import TranslationClient from "@toil/translate";

import { DetectParams, DetectSuccessResponse } from "@/models/translate.model";
import config from "@/config";

const {
  app: { allowUnsafeEval },
} = config;

async function detect({ service, text }: DetectParams) {
  const client = new TranslationClient({
    service,
    allowUnsafeEval,
  });

  return await client.detect(text);
}

const detectSharedOpts = {
  response: {
    200: DetectSuccessResponse,
  },
  detail: {
    summary: "Detect lang",
    tags: ["Translate"],
  },
};

export default new Elysia().group("/detect", (app) =>
  app
    .post("/", async ({ body }) => await detect(body), {
      body: DetectParams,
      ...detectSharedOpts,
    })
    .get("/", async ({ query }) => await detect(query), {
      query: DetectParams,
      ...detectSharedOpts,
    }),
);
