export interface CostBreakdown {
  inputPercentage: number;
  outputPercentage: number;
}

/**
 * Splits an estimated bill into the share that came from input tokens and the
 * share that came from output tokens.
 *
 * Percentages are whole numbers because they exist to be displayed next to a
 * bar. The output share is derived by complement rather than rounded
 * separately, so the pair always reads as a whole 100% instead of occasionally
 * summing to 99% or 101%. A zero-cost estimate reports 0% / 0%, never NaN%.
 */
export function calculateCostBreakdown(inputCost: number, outputCost: number): CostBreakdown {
  const total = inputCost + outputCost;

  if (!Number.isFinite(inputCost) || !Number.isFinite(outputCost) || total <= 0) {
    return { inputPercentage: 0, outputPercentage: 0 };
  }

  const inputPercentage = Math.round((inputCost / total) * 100);

  return { inputPercentage, outputPercentage: 100 - inputPercentage };
}
