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
