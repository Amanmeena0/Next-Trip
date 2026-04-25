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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-l-4 border-primary">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-h3 font-h3 text-primary">
              {destination ? `7 Days in ${destination}` : '7 Days in Kyoto'}
            </h3>
            <p className="text-on-surface-variant text-body-sm mt-1">
              {startDate && endDate
                ? `${startDate} – ${endDate}`
                : 'Oct 12 – Oct 19'}{' '}
              • ${budget.toLocaleString()} Budget
            </p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-primary rounded-full text-xs font-bold">
            Planned
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {BUDGET_CATEGORIES.map(({ icon, label, value, color }) => (
            <div key={label} className="p-4 bg-surface rounded-xl">
              <span className={`material-symbols-outlined ${color} mb-2 block`}>
                {icon}
              </span>
              <p className="text-xs text-outline font-label-caps">{label}</p>
              <p className="font-bold text-on-surface">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
