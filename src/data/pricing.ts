import type { ModelPricing } from "../types/pricing";

/**
 * Standard paid-tier text-token list prices, checked against the linked
 * official provider documentation on 2026-09-18. Caching, batch, tools, and
 * non-text modalities are intentionally outside this Phase 1 calculator.
 */
export const modelPricing: ModelPricing[] = [
  {
    id: "gpt-5-mini",
    provider: "openai",
    name: "GPT-5 mini",
    inputPricePerMillion: 0.25,
    outputPricePerMillion: 2,
    sourceUrl: "https://developers.openai.com/api/docs/models/gpt-5-mini",
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
