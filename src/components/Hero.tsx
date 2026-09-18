import { PresetSelector } from "./PresetSelector";
import type { PresetId } from "../data/presets";

interface HeroProps {
  selectedPreset: PresetId;
  onSelectPreset: (preset: PresetId) => void;
}

export function Hero({ selectedPreset, onSelectPreset }: HeroProps) {
  return (
    <section className="pt-14 pb-10 sm:pt-20 sm:pb-14">
      <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Know your AI bill
        <br />
        before you ship.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2 sm:mt-6 sm:text-lg">
        Estimate how much your Chatbot, RAG app or AI Agent will cost at real user scale.
      </p>
      <div className="mt-8 sm:mt-10">
        <PresetSelector selectedPreset={selectedPreset} onSelectPreset={onSelectPreset} />
      </div>
    </section>
  );
}
