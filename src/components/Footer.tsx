export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-6">
        <span className="text-sm font-semibold tracking-tight text-ink">ShipCost AI</span>
        <span className="text-sm text-ink-3">Built for estimating AI inference costs.</span>
      </div>
    </footer>
  );
}
