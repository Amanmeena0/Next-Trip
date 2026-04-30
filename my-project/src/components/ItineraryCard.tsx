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
    <div className="bg-white rounded-lg md:rounded-xl shadow-lg border border-nature-green-300 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="p-5 sm:p-6 md:p-7 bg-nature-blue-50 border-b border-nature-green-200">
        <div className="flex justify-between items-start gap-3 md:gap-4 mb-4 md:mb-5">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-nature-blue-900 wrap-words mb-1 sm:mb-2">
              {destination ? `7 Days in ${destination}` : '7 Days in Kyoto'}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-nature-brown-600">
              {startDate && endDate
                ? `${startDate} – ${endDate}`
                : 'Oct 12 – Oct 19'}{' '}
              • ${budget.toLocaleString()} Budget
            </p>
          </div>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-nature-green-100 text-nature-green-800 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 border border-nature-green-300">
            ✓ Planned
          </span>
        </div>
      </div>

      {/* Aggregated Trip Plan */}
      <div className="p-5 sm:p-6 md:p-7">
        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-nature-blue-800 mb-4 md:mb-5">Your Trip Options</h4>
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-nature-green-200 bg-nature-blue-50 p-4 sm:p-5">
              <h5 className="mb-3 text-base sm:text-lg font-semibold text-nature-blue-900">
                <span className="mr-2" aria-hidden>
                  {section.icon}
                </span>
                {section.title}
              </h5>
              {section.items.length === 0 ? (
                <p className="text-sm sm:text-base text-nature-brown-600">{section.empty}</p>
              ) : (
                <ul className="space-y-2.5 sm:space-y-3">
                  {section.items.map((item, index) => (
                    <li
                      key={`${section.title}-${index}`}
                      className="rounded-md bg-white px-3 py-2.5 text-sm sm:text-base text-nature-brown-800 border border-nature-green-100"
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
