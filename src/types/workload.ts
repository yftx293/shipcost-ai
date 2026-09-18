/** The monthly usage assumptions for an AI application. */
export interface Workload {
  users: number;
  interactionsPerUser: number;
  callsPerInteraction: number;
  inputTokensPerCall: number;
  outputTokensPerCall: number;
  monthlyBudget: number;
}

export interface UsageEstimate {
  monthlyInteractions: number;
  monthlyModelCalls: number;
  monthlyInputTokens: number;
  monthlyOutputTokens: number;
}

export interface CostEstimate extends UsageEstimate {
  inputCost: number;
  outputCost: number;
  monthlyCost: number;
  costPerUser: number;
  costPerThousandInteractions: number;
  budgetCapacityUsers: number;
}
