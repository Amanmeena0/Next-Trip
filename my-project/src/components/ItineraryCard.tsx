import type { TripPlanData } from '../types/trip';

interface ItineraryCardProps {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  tripPlan: TripPlanData;
}

export function ItineraryCard({
  destination,
  startDate,
  endDate,
  budget,
  tripPlan,
}: ItineraryCardProps) {
  const sections = [
    {
      title: 'Flights',
      icon: '✈️',
      items: tripPlan.flights,
      empty: 'No flight options were returned for this route.',
    },
    {
      title: 'Stays',
      icon: '🏨',
      items: tripPlan.stays,
      empty: 'No stay suggestions were returned for these dates.',
    },
    {
      title: 'Activities',
      icon: '🎯',
      items: tripPlan.activities,
      empty: 'No activities were returned for this destination yet.',
    },
  ];

  return (
    <div className="surface-card overflow-hidden transition-shadow duration-300 hover:shadow-lift">
      <div className="border-b border-border bg-surface-muted p-5 sm:p-6 md:p-7">
        <div className="mb-4 flex items-start justify-between gap-3 md:mb-5 md:gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="mb-1 text-xl font-bold text-foreground sm:mb-2 sm:text-2xl md:text-3xl">
              {destination ? `7 Days in ${destination}` : '7 Days in Kyoto'}
            </h3>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
              {startDate && endDate ? `${startDate} – ${endDate}` : 'Oct 12 – Oct 19'} • ${budget.toLocaleString()} Budget
            </p>
          </div>

          <span className="metric-chip whitespace-nowrap border-success/20 bg-success/10 px-3 py-1.5 text-success sm:px-4 sm:py-2 sm:text-sm">
            ✓ Planned
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 md:p-7">
        <h4 className="mb-4 text-sm font-semibold text-foreground sm:text-base md:mb-5 md:text-lg">
          Your Trip Options
        </h4>

        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="surface-panel p-4 sm:p-5">
              <h5 className="mb-3 text-base font-semibold text-foreground sm:text-lg">
                <span className="mr-2" aria-hidden>
                  {section.icon}
                </span>
                {section.title}
              </h5>

              {section.items.length === 0 ? (
                <p className="text-sm text-muted-foreground sm:text-base">{section.empty}</p>
              ) : (
                <ul className="space-y-2.5 sm:space-y-3">
                  {section.items.map((item, index) => (
                    <li
                      key={`${section.title}-${index}`}
                      className="rounded-xl border border-border bg-surface-elevated px-3 py-2.5 text-sm text-foreground/85 sm:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}