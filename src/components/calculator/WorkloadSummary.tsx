import { formatNumber } from "../../lib/formatNumber";
import type { UsageEstimate } from "../../types/workload";

interface WorkloadSummaryProps {
  usage: UsageEstimate;
}

export function WorkloadSummary({ usage }: WorkloadSummaryProps) {
  return (
    <section aria-labelledby="summary-heading" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 id="summary-heading" className="text-lg font-semibold">Monthly workload summary</h2>
      <dl className="mt-5 grid grid-cols-2 gap-3">
        {([
          ["Monthly interactions", usage.monthlyInteractions], ["Monthly model calls", usage.monthlyModelCalls],
          ["Monthly input tokens", usage.monthlyInputTokens], ["Monthly output tokens", usage.monthlyOutputTokens],
        ] as Array<[string, number]>).map(([label, value]) => (
          <div key={label} className="rounded-md bg-slate-50 p-3">
            <dt className="text-xs font-medium text-slate-500">{label}</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums text-slate-900">{formatNumber(value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
