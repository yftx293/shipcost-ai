import { providerLabels } from "../../data/pricing";
import { calculateCostBreakdown } from "../../lib/calculateCostBreakdown";
import { formatCurrency } from "../../lib/formatCurrency";
import type { ModelCostEstimate } from "../../types/pricing";

interface CostBreakdownProps {
  estimates: ModelCostEstimate[];
}

export function CostBreakdown({ estimates }: CostBreakdownProps) {
  return (
    <section aria-labelledby="breakdown-heading" className="mt-14">
      <h2 id="breakdown-heading" className="text-xl font-semibold tracking-tight text-ink">
        Cost breakdown
      </h2>
      <p className="mt-1.5 text-sm text-ink-2">
        Understand how input and output tokens contribute to your estimated bill.
      </p>

      {/*
       * Lighter than the cost cards on purpose: these are rule-topped columns
       * rather than a fourth row of boxed cards, so the breakdown reads as
       * supporting detail instead of competing with the headline numbers.
       */}
      <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-3">
        {estimates.map(({ pricing, estimate }) => {
          const breakdown = calculateCostBreakdown(estimate.inputCost, estimate.outputCost);

          const rows = [
            { label: "Input", percentage: breakdown.inputPercentage, cost: estimate.inputCost },
            { label: "Output", percentage: breakdown.outputPercentage, cost: estimate.outputCost },
          ];

          return (
            <article key={pricing.id} className="border-t border-line pt-5">
              <p className="text-xs font-medium text-ink-3">
                {providerLabels[pricing.provider]}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-ink">{pricing.name}</h3>

              <dl className="mt-4 space-y-4">
                {rows.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <dt className="text-ink-2">{row.label}</dt>
                      <dd className="font-mono tabular-nums text-ink">{row.percentage}%</dd>
                    </div>
                    <div
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line"
                    >
                      <div
                        className={`h-full rounded-full ${
                          row.label === "Input" ? "bg-ink" : "bg-ink-3"
                        }`}
                        style={{ width: `${row.percentage}%` }}
                      />
                    </div>
                    <p className="mt-1.5 font-mono text-xs tabular-nums text-ink-3">
                      {formatCurrency(row.cost)}
                    </p>
                  </div>
                ))}
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}
