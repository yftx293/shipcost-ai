import type { PresetId } from "../data/presets";

const presetLabels: Record<PresetId, string> = {
  chatbot: "Chatbot",
  rag: "RAG Assistant",
  agent: "AI Agent",
  custom: "Custom",
};

interface PresetSelectorProps {
  selectedPreset: PresetId;
  onSelectPreset: (preset: PresetId) => void;
}

export function PresetSelector({ selectedPreset, onSelectPreset }: PresetSelectorProps) {
  return (
    <section aria-labelledby="preset-heading" className="mb-6">
      <h2 id="preset-heading" className="mb-3 text-sm font-semibold text-slate-700">Start with an example workload</h2>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(presetLabels) as PresetId[]).map((preset) => (
          <button key={preset} type="button" aria-pressed={selectedPreset === preset} onClick={() => onSelectPreset(preset)} className={`rounded-md border px-3 py-2 text-sm font-medium transition ${selectedPreset === preset ? "border-blue-700 bg-blue-700 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"}`}>
            {presetLabels[preset]}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-slate-500">Example workload — adjust to match your application.</p>
    </section>
  );
}
