import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  /*
   * These are exact-string assertions, which is only possible because the
   * formatter pins UTC. Without that pin, a runner in a negative-offset
   * timezone would render 2026-01-01 as "Dec 31, 2025" and these fail.
   */
  it("formats ISO calendar dates", () => {
    expect(formatDate("2026-09-18")).toBe("Sep 18, 2026");
    expect(formatDate("2027-01-01")).toBe("Jan 1, 2027");
    expect(formatDate("2026-12-31")).toBe("Dec 31, 2026");
  });

  it("falls back to the input for values it cannot parse", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });
});
