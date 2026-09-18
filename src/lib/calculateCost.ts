import { calculateUsage } from "./calculateUsage";
import type { ModelPricing } from "../types/pricing";
import type { CostEstimate, Workload } from "../types/workload";

const normalizeNonNegative = (value: number): number =>
  Number.isFinite(value) && value > 0 ? value : 0;

/** Calculates unformatted monthly API costs for a workload and a model. */
export function calculateCost(
  workload: Workload,
  pricing: ModelPricing,
): CostEstimate {
  const usage = calculateUsage(workload);
  const users = normalizeNonNegative(workload.users);
  const monthlyBudget = normalizeNonNegative(workload.monthlyBudget);
  const inputPrice = normalizeNonNegative(pricing.inputPricePerMillion);
  const outputPrice = normalizeNonNegative(pricing.outputPricePerMillion);

  const inputCost = (usage.monthlyInputTokens / 1_000_000) * inputPrice;
  const outputCost = (usage.monthlyOutputTokens / 1_000_000) * outputPrice;
  const monthlyCost = inputCost + outputCost;
  const costPerUser = users > 0 ? monthlyCost / users : 0;
  const costPerThousandInteractions =
    usage.monthlyInteractions > 0
      ? (monthlyCost / usage.monthlyInteractions) * 1_000
      : 0;
  const budgetCapacityUsers =
    costPerUser > 0 ? monthlyBudget / costPerUser : 0;

  return {
    ...usage,
    inputCost,
    outputCost,
    monthlyCost,
    costPerUser,
    costPerThousandInteractions,
    budgetCapacityUsers,
  };
}
