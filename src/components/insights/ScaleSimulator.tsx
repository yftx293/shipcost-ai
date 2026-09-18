import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { modelPricing, providerLabels } from "../../data/pricing";
import { buildScaleUserLevels, calculateScaleSeries } from "../../lib/calculateScaleSeries";
import { formatCompactCurrency, formatCurrency } from "../../lib/formatCurrency";
import { formatNumber } from "../../lib/formatNumber";
import type { ModelCostEstimate, Provider } from "../../types/pricing";
import type { Workload } from "../../types/workload";

/*
 * A deliberately quiet three-series palette: near-black, deep teal and a muted
 * ochre. They differ in hue and in lightness, so the lines stay separable
 * without resorting to neon data-viz colours.
 */
const seriesColors: Record<Provider, string> = {
  openai: "#101317",
  anthropic: "#0e6f63",
  google: "#a8762f",
};

const axisTick = { fill: "#8b939e", fontSize: 11 };
const axisLabel = { fill: "#8b939e", fontSize: 11 };

interface ChartSeries {
  provider: Provider;
  dataKey: string;
  label: string;
  color: string;
}

interface ScaleTooltipProps {
  series: ChartSeries[];
  active?: boolean;
  // Injected by Recharts; the rendered rows come from payload[0].payload so the
  // rows can be listed in series order rather than the default payload order.
  payload?: Array<{ payload?: { users: number; costs: Record<Provider, number> } }>;
}

function ScaleTooltip({ series, active, payload }: ScaleTooltipProps) {
  const point = active ? payload?.[0]?.payload : undefined;
  if (!point) return null;

  return (
    <div className="rounded-md border border-line bg-surface px-3 py-2">
      <p className="text-xs text-ink-3">{formatNumber(point.users)} active users</p>
      <dl className="mt-1.5 space-y-1">
        {series.map((entry) => (
          <div key={entry.provider} className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-1.5 text-xs text-ink-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.label}
            </dt>
            <dd className="font-mono text-xs tabular-nums text-ink">
              {formatCurrency(point.costs[entry.provider])}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface ScaleSimulatorProps {
  workload: Workload;
  estimates: ModelCostEstimate[];
}

export function ScaleSimulator({ workload, estimates }: ScaleSimulatorProps) {
  const points = useMemo(
    () => calculateScaleSeries(workload, modelPricing, buildScaleUserLevels(workload.users)),
    [workload],
  );

  const series = estimates.map(({ pricing }) => ({
    provider: pricing.provider,
    dataKey: `costs.${pricing.provider}`,
    label: providerLabels[pricing.provider],
    color: seriesColors[pricing.provider],
  }));

  const lastPoint = points[points.length - 1];

  /*
   * The chart is exposed as a single described image rather than an
   * interactive region. Recharts' accessibility layer would otherwise make the
   * <svg> a focus stop with role="application" whose accessible name is just
   * the concatenated axis text. The description states the endpoint, which is
   * the takeaway a sighted reader gets from the curve's top-right corner.
   */
  const chartDescription =
    `Estimated monthly cost from ${formatNumber(points[0].users)} to ` +
    `${formatNumber(lastPoint.users)} monthly active users. At ` +
    `${formatNumber(lastPoint.users)} users: ` +
    series
      .map((entry) => `${entry.label} ${formatCurrency(lastPoint.costs[entry.provider])}`)
      .join(", ") +
    ".";

  return (
    <section aria-labelledby="scale-heading" className="mt-14">
      <h2 id="scale-heading" className="text-xl font-semibold tracking-tight text-ink">
        What if you scale?
      </h2>
      <p className="mt-1.5 text-sm text-ink-2">
        See how your estimated API cost changes as your user base grows.
      </p>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-line pt-5">
        <div>
          <p className="text-xs text-ink-3">Current scale</p>
          <p className="mt-1 font-mono text-lg font-medium tabular-nums text-ink">
            {formatNumber(workload.users)} active users
          </p>
        </div>

        <dl className="flex flex-wrap gap-x-8 gap-y-3">
          {estimates.map(({ pricing, estimate }) => (
            <div key={pricing.id}>
              <dt className="text-xs text-ink-3">{providerLabels[pricing.provider]}</dt>
              <dd className="mt-1 font-mono text-sm tabular-nums text-ink">
                {formatCurrency(estimate.monthlyCost)}
                <span className="text-ink-3">/mo</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {series.map((entry) => (
          <li key={entry.provider} className="flex items-center gap-2 text-xs text-ink-2">
            <span
              aria-hidden="true"
              className="h-0.5 w-4 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.label}
          </li>
        ))}
      </ul>

      <div className="mt-3 h-[260px] w-full sm:h-[320px]" role="img" aria-label={chartDescription}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={points}
            margin={{ top: 8, right: 12, bottom: 26, left: 0 }}
            accessibilityLayer={false}
          >
            <CartesianGrid vertical={false} stroke="#e4e7eb" />
            <XAxis
              dataKey="users"
              tickFormatter={(value: number) => formatNumber(value)}
              tick={axisTick}
              tickLine={false}
              axisLine={{ stroke: "#e4e7eb" }}
              label={{
                value: "Monthly active users",
                position: "bottom",
                offset: 8,
                style: axisLabel,
              }}
            />
            <YAxis
              tickFormatter={(value: number) => formatCompactCurrency(value)}
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              width={58}
              label={{
                value: "Estimated monthly cost",
                angle: -90,
                position: "insideLeft",
                style: { ...axisLabel, textAnchor: "middle" },
              }}
            />
            <Tooltip
              cursor={{ stroke: "#cdd2d9" }}
              content={<ScaleTooltip series={series} />}
            />
            {series.map((entry) => (
              <Line
                key={entry.provider}
                type="monotone"
                dataKey={entry.dataKey}
                name={entry.label}
                stroke={entry.color}
                strokeWidth={2}
                dot={{ r: 2.5, strokeWidth: 0, fill: entry.color }}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
