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
    <div className="bg-gradient-to-br from-white to-nature-blue-50 rounded-lg md:rounded-2xl shadow-lg md:shadow-xl border-2 border-nature-green-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="p-4 sm:p-6 md:p-8 border-l-4 md:border-l-6 border-nature-blue-600 bg-gradient-to-r from-nature-blue-50/50 to-transparent">
        <div className="flex justify-between items-start gap-2 md:gap-4 mb-4 md:mb-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-nature-blue-900 break-words">
              {destination ? `🗺️ 7 Days in ${destination}` : '🗺️ 7 Days in Kyoto'}
            </h3>
            <p className="text-nature-brown-600 text-xs sm:text-sm md:text-base mt-1 md:mt-2">
              {startDate && endDate
                ? `📅 ${startDate} – ${endDate}`
                : '📅 Oct 12 – Oct 19'}{' '}
              • 💰 ${budget.toLocaleString()} Budget
            </p>
          </div>
          <span className="px-3 sm:px-4 py-2 bg-nature-green-100 text-nature-green-900 rounded-full text-xs md:text-sm font-bold whitespace-nowrap flex-shrink-0 border border-nature-green-300">
            ✓ Planned
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8">
          {BUDGET_CATEGORIES.map(({ icon, label, value, color }) => (
            <div key={label} className="p-2 sm:p-3 md:p-4 bg-white rounded-lg md:rounded-xl border-2 border-nature-green-100 hover:border-nature-green-300 transition-colors">
              <span className={`material-symbols-outlined ${color} mb-1 sm:mb-2 block text-lg sm:text-2xl md:text-3xl`}>
                {icon}
              </span>
              <p className="text-xs text-nature-brown-600 font-semibold">{label}</p>
              <p className="font-bold text-nature-blue-900 text-sm md:text-base">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
