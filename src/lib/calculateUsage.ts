import type { UsageEstimate, Workload } from "../types/workload";

const normalizeNonNegative = (value: number): number =>
  Number.isFinite(value) && value > 0 ? value : 0;

/**
 * Converts workload assumptions into monthly counts. Invalid and negative
 * numbers become zero so estimates never leak NaN or Infinity.
 */
export function calculateUsage(workload: Workload): UsageEstimate {
  const users = normalizeNonNegative(workload.users);
  const interactionsPerUser = normalizeNonNegative(workload.interactionsPerUser);
  const callsPerInteraction = normalizeNonNegative(workload.callsPerInteraction);
  const inputTokensPerCall = normalizeNonNegative(workload.inputTokensPerCall);
  const outputTokensPerCall = normalizeNonNegative(workload.outputTokensPerCall);

  const monthlyInteractions = users * interactionsPerUser;
  const monthlyModelCalls = monthlyInteractions * callsPerInteraction;

  return {
    monthlyInteractions,
    monthlyModelCalls,
    monthlyInputTokens: monthlyModelCalls * inputTokensPerCall,
    monthlyOutputTokens: monthlyModelCalls * outputTokensPerCall,
  };
}
