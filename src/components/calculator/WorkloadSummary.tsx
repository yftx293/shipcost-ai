import { formatNumber } from "../../lib/formatNumber";
import type { UsageEstimate } from "../../types/workload";

interface WorkloadSummaryProps {
  usage: UsageEstimate;
}

export function WorkloadSummary({ usage }: WorkloadSummaryProps) {
  const metrics: Array<[string, number]> = [
    ["Monthly interactions", usage.monthlyInteractions],
    ["Monthly model calls", usage.monthlyModelCalls],
    ["Monthly input tokens", usage.monthlyInputTokens],
    ["Monthly output tokens", usage.monthlyOutputTokens],
  ];

  return (
    <section aria-labelledby="summary-heading" className="p-6 sm:p-7">
      <h2 id="summary-heading" className="text-base font-semibold text-ink">
        Workload summary
      </h2>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
        {metrics.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-xs font-medium text-ink-3">{label}</dt>
            <dd className="mt-1.5 font-mono text-xl font-medium tabular-nums text-ink sm:text-2xl">
              {formatNumber(value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
