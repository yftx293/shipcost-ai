import { pricingCheckedAt } from "../data/pricing";
import { formatDate } from "../lib/formatDate";

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:px-6">
        <span className="text-sm font-semibold tracking-tight text-ink">ShipCost AI</span>
        <span className="text-xs text-ink-3">
          Pricing checked {formatDate(pricingCheckedAt)}
        </span>
      </div>
    </header>
  );
}
