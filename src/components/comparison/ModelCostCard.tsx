import { providerLabels } from "../../data/pricing";
import { formatCurrency } from "../../lib/formatCurrency";
import { formatNumber } from "../../lib/formatNumber";
import type { ModelCostEstimate } from "../../types/pricing";

interface ModelCostCardProps extends ModelCostEstimate {
  monthlyBudget: number;
}

export function ModelCostCard({ pricing, estimate, monthlyBudget }: ModelCostCardProps) {
  const hasPaidUsage = estimate.costPerUser > 0;

  return (
    <article className="flex flex-col rounded-lg border border-line bg-surface p-5">
      <p className="text-xs font-medium text-ink-3">{providerLabels[pricing.provider]}</p>
      <h3 className="mt-1 text-sm font-semibold text-ink">{pricing.name}</h3>

      <div className="mt-6">
        <p className="font-mono text-4xl font-medium tracking-tight tabular-nums text-ink">
          {formatCurrency(estimate.monthlyCost)}
        </p>
        <p className="mt-1.5 text-xs text-ink-3">per month</p>
      </div>

      <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-ink-2">Cost per active user</dt>
          <dd className="font-mono font-medium tabular-nums text-ink">
            {formatCurrency(estimate.costPerUser)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-ink-2">Cost per 1K interactions</dt>
          <dd className="font-mono font-medium tabular-nums text-ink">
            {formatCurrency(estimate.costPerThousandInteractions)}
          </dd>
        </div>
      </dl>

      <div className="mt-5 border-t border-line pt-5">
        <p className="text-xs text-ink-3">
          With your {formatCurrency(monthlyBudget)} monthly budget
        </p>
        {hasPaidUsage ? (
          <p className="mt-1.5 font-mono text-lg font-medium tabular-nums text-ink">
            ≈ {formatNumber(estimate.budgetCapacityUsers)} users
          </p>
        ) : (
          <>
            <p className="mt-1.5 font-mono text-lg font-medium text-ink">—</p>
            <p className="mt-1 text-xs text-ink-3">No paid usage to estimate</p>
          </>
        )}
      </div>

      <dl className="mt-5 space-y-1.5 border-t border-line pt-5 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-ink-2">Input</dt>
          <dd className="font-mono tabular-nums text-ink-2">{formatCurrency(estimate.inputCost)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-ink-2">Output</dt>
          <dd className="font-mono tabular-nums text-ink-2">{formatCurrency(estimate.outputCost)}</dd>
        </div>
      </dl>

      <p className="mt-auto pt-5 text-xs leading-relaxed text-ink-3">
        {formatCurrency(pricing.inputPricePerMillion)} / 1M input tokens
        <br />
        {formatCurrency(pricing.outputPricePerMillion)} / 1M output tokens
      </p>

      {pricing.pricingNote && (
        <p className="mt-3 rounded border border-line bg-accent-soft px-2.5 py-2 text-xs leading-relaxed text-ink-2">
          {pricing.pricingNote}
        </p>
      )}
    </article>
  );
}
