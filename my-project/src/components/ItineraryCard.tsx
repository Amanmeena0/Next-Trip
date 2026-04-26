import { BUDGET_CATEGORIES } from '../constants/appConstants';

interface ItineraryCardProps {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
}

export function ItineraryCard({
  destination,
  startDate,
  endDate,
  budget,
}: ItineraryCardProps) {
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

      {/* Budget Breakdown */}
      <div className="p-5 sm:p-6 md:p-7">
        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-nature-blue-800 mb-4 md:mb-5">Budget Breakdown</h4>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {BUDGET_CATEGORIES.map(({ label, value}) => (
            <div key={label} className="p-3 sm:p-4 md:p-5 bg-nature-blue-50 rounded-lg border border-nature-green-200 text-center hover:border-nature-green-300 transition-colors">
              <p className="text-sm sm:text-base font-semibold text-nature-blue-800 mb-2">{label}</p>
              <p className="font-bold text-nature-green-700 text-base sm:text-lg md:text-xl">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
