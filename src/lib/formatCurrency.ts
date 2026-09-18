const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactUsdFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
});

/**
 * Formats a USD amount for display. Costs per user are often fractions of a
 * cent, so small values keep four decimals instead of collapsing to "$0.00":
 * 1283.729 -> "$1,283.73", 0.00421 -> "$0.0042", 1280000 -> "$1.28M".
 */
export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return "$0.00";

  const absoluteValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (absoluteValue >= 1_000_000) {
    return `${sign}$${compactUsdFormatter.format(absoluteValue)}`;
  }
  if (absoluteValue > 0 && absoluteValue < 0.01) {
    return `${sign}$${absoluteValue.toFixed(4)}`;
  }
  return `${sign}${usdFormatter.format(absoluteValue)}`;
}
