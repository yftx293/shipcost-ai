import type { Workload } from "../../types/workload";

const fields: Array<{ key: keyof Workload; label: string; prefix?: string }> = [
  { key: "users", label: "Monthly active users" },
  { key: "interactionsPerUser", label: "Interactions / user / month" },
  { key: "callsPerInteraction", label: "Model calls / interaction" },
  { key: "inputTokensPerCall", label: "Input tokens / model call" },
  { key: "outputTokensPerCall", label: "Output tokens / model call" },
  { key: "monthlyBudget", label: "Monthly AI budget", prefix: "$" },
];

interface WorkloadFormProps {
  workload: Workload;
  onChange: (key: keyof Workload, rawValue: string) => void;
}

export function WorkloadForm({ workload, onChange }: WorkloadFormProps) {
  return (
    <section aria-labelledby="workload-heading" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 id="workload-heading" className="text-lg font-semibold">Workload assumptions</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {fields.map(({ key, label, prefix }) => (
          <div key={key} className="text-sm font-medium text-slate-700">
            <label htmlFor={`workload-${key}`}>{label}</label>
            <div className="relative mt-1.5">
              {prefix && <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">{prefix}</span>}
              <input id={`workload-${key}`} type="number" min="0" step="any" value={workload[key]} onChange={(event) => onChange(key, event.target.value)} className={`w-full rounded-md border border-slate-300 py-2 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${prefix ? "pl-7 pr-3" : "px-3"}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
