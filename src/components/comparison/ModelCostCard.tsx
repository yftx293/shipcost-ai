import { formatCurrency } from "../../lib/formatCurrency";
import { formatNumber } from "../../lib/formatNumber";
import type { ModelCostEstimate } from "../../types/pricing";

export function ModelCostCard({ pricing, estimate }: ModelCostEstimate) {
  return (
    <article className="rounded-lg border border-line bg-surface p-5">
      <p className="text-sm font-medium capitalize text-ink-2">{pricing.provider}</p>
      <h3 className="mt-1 font-semibold text-ink">{pricing.name}</h3>
      <p className="mt-5 font-mono text-3xl font-medium tracking-tight tabular-nums text-ink">
        {formatCurrency(estimate.monthlyCost)}
      </p>
      <p className="mt-1 text-sm text-ink-3">per month</p>
      <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-ink-2">Cost / user</dt>
          <dd className="font-medium tabular-nums">{formatCurrency(estimate.costPerUser)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-ink-2">Budget capacity</dt>
          <dd className="font-medium tabular-nums">{formatNumber(estimate.budgetCapacityUsers)} users</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-ink-2">Cost / 1K interactions</dt>
          <dd className="font-medium tabular-nums">{formatCurrency(estimate.costPerThousandInteractions)}</dd>
        </div>
      </dl>
      <a
        className="mt-5 inline-block text-xs font-medium text-accent hover:underline"
        href={pricing.sourceUrl}
        target="_blank"
        rel="noreferrer"
      >
        Official pricing · checked {pricing.checkedAt}
      </a>
    </article>
  );
}
