import { describe, expect, it } from "vitest";
import { calculateCost } from "./calculateCost";
import type { ModelPricing } from "../types/pricing";
import type { Workload } from "../types/workload";

const workload: Workload = {
  users: 100,
  interactionsPerUser: 5,
  callsPerInteraction: 2,
  inputTokensPerCall: 1_000,
  outputTokensPerCall: 200,
  monthlyBudget: 100,
};

const pricing: ModelPricing = {
  id: "test-model",
  provider: "openai",
  name: "Test model",
  inputPricePerMillion: 2,
  outputPricePerMillion: 10,
  sourceUrl: "https://example.com/pricing",
  checkedAt: "2026-09-18",
};

describe("calculateCost", () => {
  it("calculates input, output, and per-user costs", () => {
    const estimate = calculateCost(workload, pricing);

    expect(estimate.inputCost).toBeCloseTo(2);
    expect(estimate.outputCost).toBeCloseTo(2);
    expect(estimate.monthlyCost).toBeCloseTo(4);
    expect(estimate.costPerUser).toBeCloseTo(0.04);
    expect(estimate.budgetCapacityUsers).toBeCloseTo(2_500);
  });

  it("never returns NaN, Infinity, or negative costs for invalid inputs", () => {
    const estimate = calculateCost(
      { ...workload, users: -1, monthlyBudget: -100 },
      { ...pricing, inputPricePerMillion: Number.POSITIVE_INFINITY },
    );

    expect(Object.values(estimate).every(Number.isFinite)).toBe(true);
    expect(Object.values(estimate).every((value) => value >= 0)).toBe(true);
  });
});
