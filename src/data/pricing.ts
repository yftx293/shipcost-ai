import type { ModelPricing } from "../types/pricing";

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
  },
];
