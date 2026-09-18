import { useMemo, useState } from "react";
import { modelPricing } from "./data/pricing";
import { customWorkload, workloadPresets, type PresetId } from "./data/presets";
import { calculateCost } from "./lib/calculateCost";
import { calculateUsage } from "./lib/calculateUsage";
import { formatCurrency } from "./lib/formatCurrency";
import { formatNumber } from "./lib/formatNumber";
import type { Workload } from "./types/workload";

const fields: Array<{ key: keyof Workload; label: string; prefix?: string }> = [
  { key: "users", label: "Monthly active users" },
  { key: "interactionsPerUser", label: "Interactions / user / month" },
  { key: "callsPerInteraction", label: "Model calls / interaction" },
  { key: "inputTokensPerCall", label: "Input tokens / model call" },
  { key: "outputTokensPerCall", label: "Output tokens / model call" },
  { key: "monthlyBudget", label: "Monthly AI budget", prefix: "$" },
];

const presetLabels: Record<PresetId, string> = {
  chatbot: "Chatbot", rag: "RAG Assistant", agent: "AI Agent", custom: "Custom",
};

function App() {
  const [selectedPreset, setSelectedPreset] = useState<PresetId>("chatbot");
  const [workload, setWorkload] = useState<Workload>({ ...workloadPresets.chatbot });
  const usage = useMemo(() => calculateUsage(workload), [workload]);
  const estimates = useMemo(
    () => modelPricing.map((pricing) => ({ pricing, estimate: calculateCost(workload, pricing) })),
    [workload],
  );

  const selectPreset = (preset: PresetId) => {
    setSelectedPreset(preset);
    setWorkload(preset === "custom" ? { ...customWorkload } : { ...workloadPresets[preset] });
  };

  const updateWorkload = (key: keyof Workload, rawValue: string) => {
    const value = Number(rawValue);
    setSelectedPreset("custom");
    setWorkload((current) => ({ ...current, [key]: Number.isFinite(value) ? value : 0 }));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 max-w-2xl">
          <p className="mb-2 text-sm font-semibold tracking-wide text-blue-700">PLANNING TOOL</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">ShipCost AI</h1>
          <p className="mt-2 text-base text-slate-600">Estimate your AI app cost before you ship.</p>
        </header>

        <section aria-labelledby="preset-heading" className="mb-6">
          <h2 id="preset-heading" className="mb-3 text-sm font-semibold text-slate-700">Start with an example workload</h2>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(presetLabels) as PresetId[]).map((preset) => (
              <button key={preset} type="button" aria-pressed={selectedPreset === preset} onClick={() => selectPreset(preset)} className={`rounded-md border px-3 py-2 text-sm font-medium transition ${selectedPreset === preset ? "border-blue-700 bg-blue-700 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"}`}>
                {presetLabels[preset]}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-500">Example workload — adjust to match your application.</p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section aria-labelledby="workload-heading" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 id="workload-heading" className="text-lg font-semibold">Workload assumptions</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {fields.map(({ key, label, prefix }) => (
                <div key={key} className="text-sm font-medium text-slate-700">
                  <label htmlFor={`workload-${key}`}>{label}</label>
                  <div className="relative mt-1.5">
                    {prefix && <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">{prefix}</span>}
                    <input id={`workload-${key}`} type="number" min="0" step="any" value={workload[key]} onChange={(event) => updateWorkload(key, event.target.value)} className={`w-full rounded-md border border-slate-300 py-2 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${prefix ? "pl-7 pr-3" : "px-3"}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

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
        </div>

        <section aria-labelledby="comparison-heading" className="mt-6">
          <div className="mb-3 flex items-baseline justify-between gap-4"><h2 id="comparison-heading" className="text-lg font-semibold">Provider comparison</h2><span className="text-xs text-slate-500">Standard text-token list prices</span></div>
          <div className="grid gap-4 md:grid-cols-3">
            {estimates.map(({ pricing, estimate }) => (
              <article key={pricing.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
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
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
