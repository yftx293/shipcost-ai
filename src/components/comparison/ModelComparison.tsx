import { ModelCostCard } from "./ModelCostCard";
import type { ModelCostEstimate } from "../../types/pricing";

interface ModelComparisonProps {
  estimates: ModelCostEstimate[];
}

export function ModelComparison({ estimates }: ModelComparisonProps) {
  return (
    <section aria-labelledby="comparison-heading" className="mt-10">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 id="comparison-heading" className="text-base font-semibold text-ink">
          Provider comparison
        </h2>
        <span className="text-xs text-ink-3">Standard text-token list prices</span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {estimates.map(({ pricing, estimate }) => (
          <ModelCostCard key={pricing.id} pricing={pricing} estimate={estimate} />
        ))}
      </div>
    </section>
  );
}
