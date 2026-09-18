const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  // Pinned to UTC: the source dates are plain calendar dates, so formatting in
  // the viewer's timezone could shift the rendered day by one.
  timeZone: "UTC",
});

/**
 * Formats an ISO calendar date for display:
 * "2026-09-18" -> "Sep 18, 2026".
 */
export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? isoDate : dateFormatter.format(date);
}
