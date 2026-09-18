import { useMemo, useState } from "react";
import { modelPricing } from "./data/pricing";
import { customWorkload, workloadPresets, type PresetId } from "./data/presets";
import { Hero } from "./components/Hero";
import { WorkloadForm } from "./components/calculator/WorkloadForm";
import { WorkloadSummary } from "./components/calculator/WorkloadSummary";
import { ModelComparison } from "./components/comparison/ModelComparison";
import { calculateCost } from "./lib/calculateCost";
import { calculateUsage } from "./lib/calculateUsage";
import type { Workload } from "./types/workload";

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
        <Hero selectedPreset={selectedPreset} onSelectPreset={selectPreset} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <WorkloadForm workload={workload} onChange={updateWorkload} />
          <WorkloadSummary usage={usage} />
        </div>

        <ModelComparison estimates={estimates} />
      </div>
    </main>
  );
}

export default App;
