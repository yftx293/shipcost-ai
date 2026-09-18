import { useMemo, useState } from "react";
import { modelPricing } from "./data/pricing";
import { customWorkload, workloadPresets, type PresetId } from "./data/presets";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { WorkloadForm } from "./components/calculator/WorkloadForm";
import { WorkloadSummary } from "./components/calculator/WorkloadSummary";
import { ModelComparison } from "./components/comparison/ModelComparison";
import { ScaleSimulator } from "./components/insights/ScaleSimulator";
import { CostBreakdown } from "./components/insights/CostBreakdown";
import { PricingSources } from "./components/PricingSources";
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
    <div className="min-h-screen bg-page text-ink">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Hero selectedPreset={selectedPreset} onSelectPreset={selectPreset} />

        <div className="overflow-hidden rounded-lg border border-line bg-surface lg:grid lg:grid-cols-[55fr_45fr]">
          <WorkloadForm workload={workload} onChange={updateWorkload} />
          <div className="border-t border-line lg:border-t-0 lg:border-l">
            <WorkloadSummary usage={usage} />
          </div>
        </div>

        <ModelComparison estimates={estimates} monthlyBudget={workload.monthlyBudget} />
        <ScaleSimulator workload={workload} estimates={estimates} />
        <CostBreakdown estimates={estimates} />
        <PricingSources />
      </main>

      <Footer />
    </div>
  );
}

export default App;
