import type { ModelPricing, Provider } from "../types/pricing";

/**
 * Provider ids are stored lowercased, so display names are mapped explicitly
 * rather than relying on CSS text-transform (which renders "openai" as
 * "Openai").
 */
export const providerLabels: Record<Provider, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google",
};

/**
 * Standard paid-tier text-token list prices, checked against the linked
 * official provider documentation on 2026-09-18. Caching, batch, tools, and
 * non-text modalities are intentionally outside this Phase 1 calculator.
 */
export const modelPricing: ModelPricing[] = [
  {
    id: "gpt-5.6-terra",
    provider: "openai",
    name: "GPT-5.6 Terra",
    inputPricePerMillion: 2,
    outputPricePerMillion: 12,
    sourceUrl: "https://developers.openai.com/api/docs/models/gpt-5.6-terra",
    checkedAt: "2026-09-18",
  },
  {
    id: "claude-sonnet-5",
    provider: "anthropic",
    name: "Claude Sonnet 5",
    inputPricePerMillion: 2,
    outputPricePerMillion: 10,
    sourceUrl: "https://platform.claude.com/docs/en/about-claude/pricing",
    checkedAt: "2026-09-18",
  },
  {
    id: "gemini-3-8-flash",
    provider: "google",
    name: "Gemini 3.8 Flash",
    inputPricePerMillion: 0.75,
    outputPricePerMillion: 3.75,
    sourceUrl: "https://ai.google.dev/gemini-api/docs/pricing",
    checkedAt: "2026-09-18",
    validUntil: "2026-12-31",
    pricingNote:
      "Introductory pricing through Dec 31, 2026. Standard pricing changes Jan 1, 2027.",
  },
];

/**
 * The most recent date on which any price here was verified against its source,
 * used for the page-level "Pricing checked" line.
 */
export const pricingCheckedAt = modelPricing.reduce(
  (latest, model) => (model.checkedAt > latest ? model.checkedAt : latest),
  modelPricing[0].checkedAt,
);
