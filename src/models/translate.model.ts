import { Static, t } from "elysia";

import { ClientType } from "@toil/translate/types";

export type StaticWithService<T> = Omit<T, "service"> & {
  service?: ClientType.TranslationService;
};

// elysia typebox types have bad compatibility with typebox types
export const Lang = t.String();
export type Lang = Static<typeof Lang>;

export const LangPair = t.TemplateLiteral([t.String(), t.Literal("-"), t.String()]);
export type LangPair = Static<typeof LangPair>;

export const TranslationService = t.Enum(ClientType.TranslationService);
export type TranslationService = Static<typeof TranslationService>;

export const Score = t.Union([t.Number(), t.Null()]);
export type Score = Static<typeof Score>;

export const TranslationParams = t.Object({
  lang: t.Union([Lang, LangPair]),
  service: t.Optional(TranslationService),
  text: t.Union([t.String(), t.Array(t.String())]),
});

export type TranslationParams = Static<typeof TranslationParams>;

export const DetectParams = t.Object({
  text: t.String(),
  service: t.Optional(TranslationService),
});

export type DetectParams = Static<typeof DetectParams>;

export const GetLangsParams = t.Object({
  service: t.Optional(TranslationService),
});

export type GetLangsParams = Static<typeof GetLangsParams>;

export const TranslationSuccessResponse = t.Object({
  lang: LangPair,
  translations: t.Array(t.String()),
});

export const DetectSuccessResponse = t.Object({
  lang: Lang,
  score: Score,
});

export const GetLangsSuccessResponse = t.Union([t.Array(Lang), t.Array(LangPair)]);
