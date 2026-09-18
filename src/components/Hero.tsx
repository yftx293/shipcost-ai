import { PresetSelector } from "./PresetSelector";
import type { PresetId } from "../data/presets";

interface HeroProps {
  selectedPreset: PresetId;
  onSelectPreset: (preset: PresetId) => void;
}

export function Hero({ selectedPreset, onSelectPreset }: HeroProps) {
  return (
    <>
      <header className="mb-8 max-w-2xl">
        <p className="mb-2 text-sm font-semibold tracking-wide text-blue-700">PLANNING TOOL</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">ShipCost AI</h1>
        <p className="mt-2 text-base text-slate-600">Estimate your AI app cost before you ship.</p>
      </header>
      <PresetSelector selectedPreset={selectedPreset} onSelectPreset={onSelectPreset} />
    </>
  );
}
