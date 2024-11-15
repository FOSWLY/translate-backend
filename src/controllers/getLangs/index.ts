import { Elysia } from "elysia";

import TranslationClient from "@toil/translate";
import { ClientType } from "@toil/translate/types";

import { GetLangsParams, GetLangsSuccessResponse } from "@/models/translate.model";

async function getLangs({ service }: GetLangsParams) {
  const client = new TranslationClient({
    service: service as unknown as ClientType.TranslationService,
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
