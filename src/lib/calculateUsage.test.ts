import { describe, expect, it } from "vitest";
import { calculateUsage } from "./calculateUsage";
import type { Workload } from "../types/workload";

const workload: Workload = {
  users: 100,
  interactionsPerUser: 5,
  callsPerInteraction: 2,
  inputTokensPerCall: 1_000,
  outputTokensPerCall: 200,
  monthlyBudget: 100,
};

describe("calculateUsage", () => {
  it("calculates the expected monthly usage", () => {
    expect(calculateUsage(workload)).toEqual({
      monthlyInteractions: 500,
      monthlyModelCalls: 1_000,
      monthlyInputTokens: 1_000_000,
      monthlyOutputTokens: 200_000,
    });
  });

  it("returns finite zeros when there are no users", () => {
    const estimate = calculateUsage({ ...workload, users: 0 });

    expect(estimate.monthlyInteractions).toBe(0);
    expect(Object.values(estimate).every(Number.isFinite)).toBe(true);
  });

  it("normalizes negative values to avoid negative usage", () => {
    const estimate = calculateUsage({
      ...workload,
      users: -100,
      inputTokensPerCall: -1_000,
    });

    expect(Object.values(estimate).every((value) => value >= 0)).toBe(true);
    expect(Object.values(estimate).every(Number.isFinite)).toBe(true);
  });
});
