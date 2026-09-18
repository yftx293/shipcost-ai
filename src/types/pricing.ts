import type { CostEstimate } from "./workload";

export type Provider = "openai" | "anthropic" | "google";

/** Public per-million-token prices for a single text model. */
export interface ModelPricing {
  id: string;
  provider: Provider;
  name: string;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  sourceUrl: string;
  checkedAt: string;
}

/** A pricing entry paired with the cost estimate it produces for a workload. */
export interface ModelCostEstimate {
  pricing: ModelPricing;
  estimate: CostEstimate;
}
