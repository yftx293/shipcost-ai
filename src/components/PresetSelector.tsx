import type { PresetId } from "../data/presets";

const presets: PresetId[] = ["chatbot", "rag", "agent", "custom"];

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
    <div>
      <div role="group" aria-label="Example workload presets" className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const isSelected = preset === selectedPreset;

          return (
            <button
              key={preset}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectPreset(preset)}
              className={`rounded-md border px-3.5 py-2 text-sm transition-colors ${
                isSelected
                  ? "border-ink bg-ink font-semibold text-surface"
                  : "border-line bg-surface font-medium text-ink-2 hover:border-line-2 hover:text-ink"
              }`}
            >
              {presetLabels[preset]}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-ink-3">
        Example workload — adjust to match your application.
      </p>
    </div>
  );
}
