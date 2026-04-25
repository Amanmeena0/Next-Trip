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
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 sm:p-6 border-l-4 border-primary">
        <div className="flex justify-between items-start gap-2 mb-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-h3 font-h3 text-primary break-words">
              {destination ? `7 Days in ${destination}` : '7 Days in Kyoto'}
            </h3>
            <p className="text-on-surface-variant text-xs sm:text-body-sm mt-1">
              {startDate && endDate
                ? `${startDate} – ${endDate}`
                : 'Oct 12 – Oct 19'}{' '}
              • ${budget.toLocaleString()} Budget
            </p>
          </div>
          <span className="px-2 sm:px-3 py-1 bg-blue-50 text-primary rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0">
            Planned
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
          {BUDGET_CATEGORIES.map(({ icon, label, value, color }) => (
            <div key={label} className="p-2 sm:p-4 bg-surface rounded-lg sm:rounded-xl">
              <span className={`material-symbols-outlined ${color} mb-1 sm:mb-2 block text-lg sm:text-2xl`}>
                {icon}
              </span>
              <p className="text-xs text-outline font-label-caps">{label}</p>
              <p className="font-bold text-on-surface text-sm sm:text-base">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
