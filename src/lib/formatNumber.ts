const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/**
 * Formats counts such as tokens, calls, and users for display without letting
 * components call `.toFixed()` themselves:
 * 1200 -> "1.2K", 1200000 -> "1.2M", 1200000000 -> "1.2B".
 */
export function formatNumber(value: number): string {
  return Number.isFinite(value) ? compactFormatter.format(value) : "0";
}
