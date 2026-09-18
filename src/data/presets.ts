import type { Workload } from "../types/workload";

export type PresetId = "chatbot" | "rag" | "agent" | "custom";

export const workloadPresets: Record<
  Exclude<PresetId, "custom">,
  Workload
> = {
  chatbot: {
    users: 1_000,
    interactionsPerUser: 10,
    callsPerInteraction: 1,
    inputTokensPerCall: 1_500,
    outputTokensPerCall: 300,
    monthlyBudget: 100,
  },
  rag: {
    users: 1_000,
    interactionsPerUser: 6,
    callsPerInteraction: 1,
    inputTokensPerCall: 8_000,
    outputTokensPerCall: 800,
    monthlyBudget: 100,
  },
  agent: {
    users: 500,
    interactionsPerUser: 4,
    callsPerInteraction: 6,
    inputTokensPerCall: 12_000,
    outputTokensPerCall: 1_200,
    monthlyBudget: 100,
  },
};

/** A neutral editable starting point for a custom workload. */
export const customWorkload: Workload = { ...workloadPresets.chatbot };
