import config from "../config";
import type {
  Lang,
  LangPair,
  TranslationEndpoint,
  TranslationParams,
  EmptyObj,
} from "../types/api";

import { UnableAccessYandexAPI, InternalServerError } from "../errors";
import { log } from "../setup";

async function request(endpoint: TranslationEndpoint, params: TranslationParams | EmptyObj = {}) {
  return await fetch(
    `https://browser.translate.yandex.net/api/v1/tr.json/${endpoint}?` +
      new URLSearchParams({
        srv: config.api.srv,
        ...params,
      }),
    {
      method: "POST",
      headers: config.api.headers,
      body: new URLSearchParams({
        maxRetryCount: "2",
        fetchAbortTimeout: "500",
      }),
    },
  )
    .catch((err) => {
      log.error(`Fetch error: ${err.message}`);
      throw new InternalServerError();
    })
    .then(async (res) => {
      if (![200, 400, 413].includes(res.status)) {
        log.error(`API error: ${res.statusText} (${res.status})`);
        throw new UnableAccessYandexAPI();
      }

      return await res.json();
    });
}

export async function translate(text: string, langPair: Lang | LangPair = "en-ru") {
  return await request("translate", {
    text,
    lang: langPair,
  });
}

export async function detect(text: string) {
  return await request("detect", {
    text,
  });
}

export async function getLangs() {
  return await request("getLangs");
}
