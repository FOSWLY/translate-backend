// export type TranslationEndpoint = "detect" | "translate" | "getLangs";

// export type TranslationParams = {
//   lang?: Lang | LangPair;
//   text?: string;
// };

// export type Lang = string;

// export type LangPair = `${Lang}-${Lang}`;

import { Static, t } from "elysia";

export type EmptyObj = Record<PropertyKey, never>;

export type Lang = Static<typeof Lang>;
export const Lang = t.String();

export type LangPair = Static<typeof LangPair>;
export const LangPair = t.TemplateLiteral([Lang, t.Literal("-"), Lang]);

export type TranslationParams = Static<typeof TranslationParams>;
export const TranslationParams = t.Object({
  lang: t.Optional(t.Union([Lang, LangPair])),
  text: t.String(),
});

export type TranslationEndpoint = Static<typeof TranslationEndpoint>;
export const TranslationEndpoint = t.Union([
  t.Literal("detect"),
  t.Literal("translate"),
  t.Literal("getLangs"),
]);
