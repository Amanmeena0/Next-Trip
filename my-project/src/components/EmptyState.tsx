export function EmptyState() {
  return (
    <div className="surface-card flex min-h-80 flex-1 flex-col items-center justify-center bg-linear-to-br from-surface via-surface to-surface-muted p-6 text-center sm:min-h-96 sm:p-8 md:min-h-[31.25rem] md:p-10">
      {/* Icon */}
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface-elevated shadow-soft sm:h-24 sm:w-24 sm:mb-6 md:mb-7 md:h-28 md:w-28">
        <span className="text-4xl sm:text-5xl md:text-6xl">🗺️</span>
      </div>

      {/* Content */}
      <h3 className="mb-3 text-xl font-bold text-foreground sm:mb-4 sm:text-2xl md:text-3xl">
        Create Your Perfect Trip
      </h3>
      <p className="mx-auto mb-6 max-w-sm text-sm text-foreground/75 sm:mb-7 sm:text-base md:mb-8 md:text-lg">
        Get started by filling out a few simple details on the left. We'll generate a customized itinerary, budget breakdown, and travel tips just for you.
      </p>

      {/* Steps */}
      <div className="surface-panel w-full max-w-sm p-4 text-left sm:p-5 md:p-6">
        <h4 className="mb-3 text-sm font-semibold text-foreground sm:mb-4 sm:text-base">
          Quick setup:
        </h4>
        <div className="space-y-2.5 text-left sm:space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground sm:h-7 sm:w-7 sm:text-sm">
              1
            </div>
            <span className="pt-0.5 text-xs text-foreground/75 sm:text-sm md:text-base">Enter where you're traveling from and to</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground sm:h-7 sm:w-7 sm:text-sm">
              2
            </div>
            <span className="pt-0.5 text-xs text-foreground/75 sm:text-sm md:text-base">Set your travel dates</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground sm:h-7 sm:w-7 sm:text-sm">
              3
            </div>
            <span className="pt-0.5 text-xs text-foreground/75 sm:text-sm md:text-base">Choose your budget and create!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
