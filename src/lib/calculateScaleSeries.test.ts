import { describe, expect, it } from "vitest";
import {
  buildScaleUserLevels,
  calculateScaleSeries,
  defaultScaleUserLevels,
} from "./calculateScaleSeries";
import { calculateCost } from "./calculateCost";
import type { ModelPricing } from "../types/pricing";
import type { Workload } from "../types/workload";

const workload: Workload = {
  users: 1_000,
  interactionsPerUser: 5,
  callsPerInteraction: 2,
  inputTokensPerCall: 1_000,
  outputTokensPerCall: 200,
  monthlyBudget: 100,
};

const models: ModelPricing[] = [
  {
    id: "test-openai",
    provider: "openai",
    name: "Test OpenAI",
    inputPricePerMillion: 2,
    outputPricePerMillion: 10,
    sourceUrl: "https://example.com/openai",
    checkedAt: "2026-09-18",
  },
  {
    id: "test-anthropic",
    provider: "anthropic",
    name: "Test Anthropic",
    inputPricePerMillion: 2,
    outputPricePerMillion: 10,
    sourceUrl: "https://example.com/anthropic",
    checkedAt: "2026-09-18",
  },
  {
    id: "test-google",
    provider: "google",
    name: "Test Google",
    inputPricePerMillion: 0.75,
    outputPricePerMillion: 3.75,
    sourceUrl: "https://example.com/google",
    checkedAt: "2026-09-18",
  },
];

describe("calculateScaleSeries", () => {
  it("scales every provider linearly with users", () => {
    const [atOneThousand, atTwoThousand] = calculateScaleSeries(workload, models, [1_000, 2_000]);

    for (const provider of ["openai", "anthropic", "google"] as const) {
      expect(atTwoThousand.costs[provider]).toBeCloseTo(atOneThousand.costs[provider] * 2);
    }
  });

  it("matches calculateCost for the same workload", () => {
    const [point] = calculateScaleSeries(workload, models, [1_000]);

    expect(point.costs.openai).toBeCloseTo(calculateCost(workload, models[0]).monthlyCost);
  });

  it("only changes users, leaving the original workload untouched", () => {
    const originalUsers = workload.users;
    const snapshot = { ...workload };

    calculateScaleSeries(workload, models, [100, 5_000, 10_000]);

    expect(workload.users).toBe(originalUsers);
    expect(workload).toEqual(snapshot);
  });

  it("leaves the budget out of the scaled cost", () => {
    const [cheapBudget] = calculateScaleSeries({ ...workload, monthlyBudget: 1 }, models, [1_000]);
    const [bigBudget] = calculateScaleSeries({ ...workload, monthlyBudget: 500 }, models, [1_000]);

    expect(cheapBudget.costs.openai).toBe(bigBudget.costs.openai);
  });

  it("returns finite zeros when there are no users", () => {
    const [point] = calculateScaleSeries(workload, models, [0]);

    expect(Object.values(point.costs).every(Number.isFinite)).toBe(true);
    expect(Object.values(point.costs).every((cost) => cost === 0)).toBe(true);
  });

  it("stays finite at very large user counts", () => {
    const points = calculateScaleSeries(workload, models, [10_000_000]);

    expect(points[0].users).toBe(10_000_000);
    expect(Object.values(points[0].costs).every(Number.isFinite)).toBe(true);
    expect(Object.values(points[0].costs).every((cost) => cost >= 0)).toBe(true);
  });
});

describe("buildScaleUserLevels", () => {
  it("uses the default levels for small workloads", () => {
    expect(buildScaleUserLevels(0)).toEqual(defaultScaleUserLevels);
    expect(buildScaleUserLevels(1_000)).toEqual(defaultScaleUserLevels);
  });

  it("includes the current scale when it is above the largest default", () => {
    expect(buildScaleUserLevels(50_000)).toEqual([...defaultScaleUserLevels, 50_000]);
  });

  it("does not duplicate the largest default", () => {
    const levels = buildScaleUserLevels(10_000);
    expect(levels).toEqual(defaultScaleUserLevels);
    expect(new Set(levels).size).toBe(levels.length);
  });

  it("keeps levels ascending and ignores invalid input", () => {
    const levels = buildScaleUserLevels(50_000);
    expect([...levels].sort((a, b) => a - b)).toEqual(levels);
    expect(buildScaleUserLevels(Number.NaN)).toEqual(defaultScaleUserLevels);
  });
});
