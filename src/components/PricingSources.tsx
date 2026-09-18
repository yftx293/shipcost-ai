import { modelPricing, providerLabels } from "../data/pricing";
import { formatCurrency } from "../lib/formatCurrency";
import { formatDate } from "../lib/formatDate";

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.75 3.5H3.75A1.25 1.25 0 0 0 2.5 4.75v7.5c0 .69.56 1.25 1.25 1.25h7.5c.69 0 1.25-.56 1.25-1.25v-3" />
      <path d="M9.75 2.5h3.75v3.75" />
      <path d="M13.5 2.5 7.75 8.25" />
    </svg>
  );
}

export function PricingSources() {
  return (
    <section aria-labelledby="pricing-sources-heading" className="mt-14">
      <h2 id="pricing-sources-heading" className="text-xl font-semibold tracking-tight text-ink">
        Pricing &amp; methodology
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">
        Estimates use standard text token pricing and exclude prompt caching, batch
        discounts, tool-specific fees, regional pricing, and other provider-specific
        charges.
      </p>

      <ul className="mt-6 border-b border-line">
        {modelPricing.map((pricing) => (
          <li
            key={pricing.id}
            className="grid gap-3 border-t border-line py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink-3">
                {providerLabels[pricing.provider]}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{pricing.name}</p>
              <p className="mt-1.5 text-sm text-ink-2">
                {formatCurrency(pricing.inputPricePerMillion)} input /{" "}
                {formatCurrency(pricing.outputPricePerMillion)} output per 1M tokens
              </p>
              {pricing.pricingNote && (
                <p className="mt-2 max-w-xl text-xs leading-relaxed text-ink-3">
                  {pricing.pricingNote}
                </p>
              )}
            </div>

            <div className="sm:text-right">
              <a
                className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                href={pricing.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                Official pricing
                <ExternalLinkIcon />
                <span className="sr-only">(opens in new tab)</span>
              </a>
              <p className="mt-1.5 text-xs text-ink-3">Checked {formatDate(pricing.checkedAt)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
