import { Elysia } from "elysia";

import TranslationClient from "@toil/translate";
import { ClientType } from "@toil/translate/types";

import { DetectParams, DetectSuccessResponse } from "@/models/translate.model";

async function detect({ service, text }: DetectParams) {
  const client = new TranslationClient({
    service: service as unknown as ClientType.TranslationService,
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
