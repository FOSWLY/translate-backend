import { Elysia } from "elysia";

import { GetLangsParams, GetLangsSuccessResponse } from "@/models/translate.model";
import { createClient } from "@/utils/client";

async function getLangs({ service }: GetLangsParams) {
  const client = createClient(service);
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
