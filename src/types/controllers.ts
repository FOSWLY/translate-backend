import { t } from "elysia";
import { Lang, LangPair } from "./api";

export const TranslationRequestParams = t.Object({
  lang: t.Union([Lang, LangPair]),
  text: t.String(),
});

export const DetectRequestParams = t.Object({
  text: t.String(),
});

export const BaseYandexResponse = t.Object({
  code: t.Number(),
});

export const TranslateSuccessResponse = t.Composite([
  BaseYandexResponse,
  t.Object({
    lang: LangPair,
    text: t.Array(t.String()),
  }),
]);

export const DetectSuccessResponse = t.Composite([
  BaseYandexResponse,
  t.Object({
    lang: Lang,
  }),
]);

export const YandexErrorResponse = t.Composite([
  BaseYandexResponse,
  t.Object({
    message: t.String(),
  }),
]);

export const GetLangsResponse = t.Object({
  dirs: t.Array(LangPair),
});
