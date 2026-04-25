import { FormInput } from './FormInput';

interface TripFormProps {
  budget: number;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  loading: boolean;
  onBudgetChange: (value: number) => void;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onPlanTrip: () => void;
}

export function TripForm({
  budget,
  origin,
  destination,
  startDate,
  endDate,
  loading,
  onBudgetChange,
  onOriginChange,
  onDestinationChange,
  onStartDateChange,
  onEndDateChange,
  onPlanTrip,
}: TripFormProps) {
  return (
    <div className="glass-panel p-4 sm:p-6 rounded-xl shadow-[0_-4px_20px_rgba(15,82,186,0.08)] border border-white/50">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-h2 font-h2 text-primary mb-2">
          Create New Itinerary
        </h2>
        <p className="text-xs sm:text-body-sm text-on-surface-variant">
          Tell us where you want to go and we'll handle the rest.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FormInput
            label="Origin"
            icon="location_on"
            placeholder="City, Country"
            value={origin}
            onChange={(e) => onOriginChange(e.target.value)}
          />
          <FormInput
            label="Destination"
            icon="flight_land"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <FormInput
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
          <FormInput
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
          />
        </div>

        <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-outline-variant/30">
          <div className="flex justify-between items-center gap-2">
            <label className="text-xs sm:text-label-caps font-label-caps text-outline">
              Budget Range
            </label>
            <span className="px-2 sm:px-3 py-1 bg-secondary-fixed text-on-secondary-container rounded-full text-xs font-bold whitespace-nowrap">
              ${budget.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={500}
            max={10000}
            step={100}
            value={budget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-outline font-label-caps gap-2">
            <span>$500 (Budget)</span>
            <span>$10k (Luxury)</span>
          </div>
        </div>

        <button
          onClick={onPlanTrip}
          disabled={loading}
          className="w-full py-3 sm:py-4 bg-primary text-on-primary rounded-xl font-button text-xs sm:text-button shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95 duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin">
                autorenew
              </span>
              Planning...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">auto_awesome</span>
              Plan My Trip
            </>
          )}
        </button>
      </div>
    </div>
  );
}
