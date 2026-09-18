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
  /**
   * Machine-readable end date for a price that is only temporarily valid, so a
   * later phase can flag expired rows. Optional: most list prices have no end
   * date, and inventing one would be misleading.
   */
  validUntil?: string;
  /**
   * Human-readable note about the price's timing, shown next to the cost. Only
   * set where the provider document actually says something about a change.
   */
  pricingNote?: string;
}

/** A pricing entry paired with the cost estimate it produces for a workload. */
export interface ModelCostEstimate {
  pricing: ModelPricing;
  estimate: CostEstimate;
}
