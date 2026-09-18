import { describe, expect, it } from "vitest";
import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  it("compacts thousands, millions, and billions", () => {
    expect(formatNumber(1_200)).toBe("1.2K");
    expect(formatNumber(1_200_000)).toBe("1.2M");
    expect(formatNumber(1_200_000_000)).toBe("1.2B");
  });

  it("keeps values below one thousand as plain numbers", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(500)).toBe("500");
  });

  it("carries into the next unit instead of printing 1000 of a unit", () => {
    expect(formatNumber(999_950)).toBe("1M");
    expect(formatNumber(999_999_999)).toBe("1B");
  });

  it("returns a finite fallback for invalid input", () => {
    expect(formatNumber(Number.NaN)).toBe("0");
    expect(formatNumber(Number.POSITIVE_INFINITY)).toBe("0");
    expect(formatNumber(Number.NEGATIVE_INFINITY)).toBe("0");
  });
});
