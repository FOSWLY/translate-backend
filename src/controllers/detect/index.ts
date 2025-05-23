import { Elysia } from "elysia";

import { DetectParams, DetectSuccessResponse } from "@/models/translate.model";
import { createClient } from "@/utils/client";

async function detect({ service, text }: DetectParams) {
  const client = createClient(service);
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
