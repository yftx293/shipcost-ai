import { formatCurrency } from "../../lib/formatCurrency";
import { formatNumber } from "../../lib/formatNumber";
import type { ModelCostEstimate } from "../../types/pricing";

export function ModelCostCard({ pricing, estimate }: ModelCostEstimate) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium capitalize text-slate-500">{pricing.provider}</p>
      <h3 className="mt-1 font-semibold text-slate-900">{pricing.name}</h3>
      <p className="mt-5 text-3xl font-bold tracking-tight tabular-nums">{formatCurrency(estimate.monthlyCost)}</p>
      <p className="mt-1 text-sm text-slate-500">/ month</p>
      <dl className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
        <div className="flex justify-between gap-3"><dt className="text-slate-500">Cost / user</dt><dd className="font-medium tabular-nums">{formatCurrency(estimate.costPerUser)}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-slate-500">Budget capacity</dt><dd className="font-medium tabular-nums">{formatNumber(estimate.budgetCapacityUsers)} users</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-slate-500">Cost / 1K interactions</dt><dd className="font-medium tabular-nums">{formatCurrency(estimate.costPerThousandInteractions)}</dd></div>
      </dl>
      <a className="mt-5 inline-block text-xs font-medium text-blue-700 hover:underline" href={pricing.sourceUrl} target="_blank" rel="noreferrer">Official pricing · checked {pricing.checkedAt}</a>
    </article>
  );
}
