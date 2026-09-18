import type { Workload } from "../../types/workload";

interface FieldConfig {
  key: keyof Workload;
  label: string;
  prefix?: string;
}

interface FieldGroup {
  label: string;
  fields: FieldConfig[];
}

const groups: FieldGroup[] = [
  {
    label: "Audience",
    fields: [{ key: "users", label: "Monthly active users" }],
  },
  {
    label: "Usage",
    fields: [
      { key: "interactionsPerUser", label: "Interactions / user / month" },
      { key: "callsPerInteraction", label: "Model calls / interaction" },
    ],
  },
  {
    label: "Tokens",
    fields: [
      { key: "inputTokensPerCall", label: "Input tokens / model call" },
      { key: "outputTokensPerCall", label: "Output tokens / model call" },
    ],
  },
  {
    label: "Budget",
    fields: [{ key: "monthlyBudget", label: "Monthly AI budget", prefix: "$" }],
  },
];

interface WorkloadFormProps {
  workload: Workload;
  onChange: (key: keyof Workload, rawValue: string) => void;
}

export function WorkloadForm({ workload, onChange }: WorkloadFormProps) {
  return (
    <section aria-labelledby="workload-heading" className="p-6 sm:p-7">
      <h2 id="workload-heading" className="text-base font-semibold text-ink">
        Your workload
      </h2>

      <div className="mt-6 space-y-6">
        {groups.map((group) => (
          <fieldset key={group.label}>
            <legend className="text-xs font-medium text-ink-3">{group.label}</legend>
            <div className="mt-2.5 grid gap-x-4 gap-y-4 sm:grid-cols-2">
              {group.fields.map(({ key, label, prefix }) => (
                <div key={key} className="min-w-0">
                  <label htmlFor={`workload-${key}`} className="text-sm font-medium text-ink-2">
                    {label}
                  </label>
                  <div className="relative mt-1.5">
                    {prefix && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-ink-3"
                      >
                        {prefix}
                      </span>
                    )}
                    <input
                      id={`workload-${key}`}
                      type="number"
                      min="0"
                      step="any"
                      value={workload[key]}
                      onChange={(event) => onChange(key, event.target.value)}
                      className={`w-full min-w-0 rounded-md border border-line bg-surface py-2 text-sm tabular-nums text-ink transition-colors focus:border-accent ${
                        prefix ? "pr-3 pl-7" : "px-3"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  );
}
