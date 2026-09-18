import { calculateCost } from "./calculateCost";
import type { ModelPricing, Provider } from "../types/pricing";
import type { Workload } from "../types/workload";

/** Estimated monthly cost for each compared provider at one user level. */
export interface ScalePoint {
  users: number;
  costs: Record<Provider, number>;
}

/**
 * The user levels the simulator steps through when growing a small app. Kept as
 * a plain fixed list rather than a generated curve so the axis stays predictable
 * and every reader can guess the next point.
 */
export const defaultScaleUserLevels: number[] = [100, 500, 1000, 2500, 5000, 10000];

/**
 * The default levels, plus the user's own scale when it sits above the largest
 * default — otherwise a workload with 50,000 users would chart no point at or
 * beyond the scale the user actually cares about.
 */
export function buildScaleUserLevels(currentUsers: number): number[] {
  const levels = [...defaultScaleUserLevels];
  const largest = levels[levels.length - 1];

  if (Number.isFinite(currentUsers) && currentUsers > largest) {
    levels.push(currentUsers);
  }

  return levels;
}

/**
 * Re-costs the current workload at several user levels. Only `users` is scaled;
 * every other assumption is held at the user's current values. Costs come from
 * calculateCost(), so this never re-implements the pricing formula.
 */
export function calculateScaleSeries(
  workload: Workload,
  models: ModelPricing[],
  userLevels: number[],
): ScalePoint[] {
  return userLevels.map((users) => {
    const scaledWorkload: Workload = { ...workload, users };
    const costs: Record<Provider, number> = { openai: 0, anthropic: 0, google: 0 };

    for (const model of models) {
      // Summed per provider so a provider carrying more than one compared model
      // still charts as a single line.
      costs[model.provider] += calculateCost(scaledWorkload, model).monthlyCost;
    }

    return { users, costs };
  });
}
