import { ModelCostCard } from "./ModelCostCard";
import type { ModelCostEstimate } from "../../types/pricing";

interface ModelComparisonProps {
  estimates: ModelCostEstimate[];
  monthlyBudget: number;
}

export function ModelComparison({ estimates, monthlyBudget }: ModelComparisonProps) {
  return (
    <section aria-labelledby="comparison-heading" className="mt-14">
      <h2 id="comparison-heading" className="text-xl font-semibold tracking-tight text-ink">
        Estimated monthly cost
      </h2>
      <p className="mt-1.5 text-sm text-ink-2">
        Based on your current workload assumptions.
      </p>

      {/*
       * Three columns only from lg. At md widths a forced 3-up leaves each card
       * ~229px, which squeezes the label/value rows in the card; two columns
       * stay comfortable and single-column below sm keeps mobile readable.
       */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {estimates.map(({ pricing, estimate }) => (
          <ModelCostCard
            key={pricing.id}
            pricing={pricing}
            estimate={estimate}
            monthlyBudget={monthlyBudget}
          />
        ))}
      </div>
    </section>
  );
}
