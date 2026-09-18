import { describe, expect, it } from "vitest";
import { calculateCostBreakdown } from "./calculateCostBreakdown";

describe("calculateCostBreakdown", () => {
  it("splits a bill into input and output shares", () => {
    expect(calculateCostBreakdown(75, 25)).toEqual({
      inputPercentage: 75,
      outputPercentage: 25,
    });
  });

  it("reports zero for a zero-cost estimate instead of NaN", () => {
    expect(calculateCostBreakdown(0, 0)).toEqual({
      inputPercentage: 0,
      outputPercentage: 0,
    });
  });

  it("always adds up to exactly 100 when there is a cost", () => {
    for (const [input, output] of [
      [1, 2],
      [2, 1],
      [0.004, 99.996],
      [33.33, 66.67],
      [1_000_000, 1],
    ]) {
      const breakdown = calculateCostBreakdown(input, output);
      expect(breakdown.inputPercentage + breakdown.outputPercentage).toBe(100);
    }
  });

  it("handles an all-input bill", () => {
    expect(calculateCostBreakdown(12, 0)).toEqual({
      inputPercentage: 100,
      outputPercentage: 0,
    });
  });

  it("handles an all-output bill", () => {
    expect(calculateCostBreakdown(0, 12)).toEqual({
      inputPercentage: 0,
      outputPercentage: 100,
    });
  });

  it("reports zero for non-finite input", () => {
    for (const [input, output] of [
      [Number.NaN, 10],
      [10, Number.NaN],
      [Number.POSITIVE_INFINITY, 10],
    ]) {
      expect(calculateCostBreakdown(input, output)).toEqual({
        inputPercentage: 0,
        outputPercentage: 0,
      });
    }
  });
});
