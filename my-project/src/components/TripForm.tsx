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
    <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-lg md:rounded-2xl shadow-lg border-2 border-nature-green-100 bg-linear-to-br from-white via-nature-blue-50/30 to-nature-green-50/30">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-nature-blue-900 mb-1 md:mb-2">
          ✈️ Create New Itinerary
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-nature-brown-600">
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

        <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 md:pt-8 border-t-2 border-nature-green-200">
          <div className="flex justify-between items-center gap-2">
            <label className="text-xs sm:text-sm font-semibold text-nature-blue-700">
              💰 Budget Range
            </label>
            <span className="px-3 sm:px-4 py-1.5 bg-linear-to-r from-nature-green-100 to-nature-blue-100 text-nature-green-900 rounded-full text-xs md:text-sm font-bold whitespace-nowrap border border-nature-green-300">
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
            className="w-full h-2.5 bg-nature-green-200 rounded-lg appearance-none cursor-pointer accent-nature-green-600 hover:accent-nature-green-700"
          />
          <div className="flex justify-between text-xs text-nature-brown-600 font-semibold gap-2">
            <span>💵 $500 (Budget)</span>
            <span>👑 $10k (Luxury)</span>
          </div>
        </div>

        <button
          onClick={onPlanTrip}
          disabled={loading}
          className="w-full py-3 sm:py-4 bg-linear-to-r from-nature-blue-600 to-nature-green-600 text-white rounded-lg md:rounded-xl font-bold text-xs sm:text-sm md:text-base shadow-lg shadow-nature-blue-400/40 hover:shadow-xl hover:shadow-nature-blue-500/50 hover:from-nature-blue-700 hover:to-nature-green-700 active:scale-95 duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin">
                autorenew
              </span>
              <span>Planning...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">auto_awesome</span>
              <span>Plan My Trip</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
