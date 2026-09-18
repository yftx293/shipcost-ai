import { describe, expect, it } from "vitest";
import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("formats ordinary amounts with grouping and two decimals", () => {
    expect(formatCurrency(1_283.729)).toBe("$1,283.73");
    expect(formatCurrency(4)).toBe("$4.00");
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("keeps small per-user costs visible instead of showing $0.00", () => {
    expect(formatCurrency(0.00421)).toBe("$0.0042");
    expect(formatCurrency(0.04)).toBe("$0.04");
  });

  it("compacts large amounts", () => {
    expect(formatCurrency(1_280_000)).toBe("$1.28M");
    expect(formatCurrency(1_240_000_000)).toBe("$1.24B");
  });

  it("returns a finite fallback for invalid input", () => {
    expect(formatCurrency(Number.NaN)).toBe("$0.00");
    expect(formatCurrency(Number.POSITIVE_INFINITY)).toBe("$0.00");
  });
});
