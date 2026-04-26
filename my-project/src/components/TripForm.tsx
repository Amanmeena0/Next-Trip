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
  const isFormValid = origin && destination;

  return (
    <div className="bg-white p-5 sm:p-7 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-nature-green-200">
      {/* Header Section */}
      <div className="mb-7 sm:mb-8 md:mb-9">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-nature-blue-900 mb-2 sm:mb-3">
          Plan Your Trip
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-nature-brown-600 leading-relaxed">
          Tell us your travel details and we'll create your perfect itinerary.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-7 md:space-y-8">
        {/* Location Section */}
        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-nature-blue-800 mb-3 sm:mb-4">Where are you going?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <FormInput
              label="Leaving from"
              placeholder="e.g., New York"
              value={origin}
              onChange={(e) => onOriginChange(e.target.value)}
            />
            <FormInput
              label="Going to"
              placeholder="e.g., Paris"
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
            />
          </div>
        </div>

        {/* Dates Section */}
        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-nature-blue-800 mb-3 sm:mb-4">When are you traveling?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <FormInput
              label="Start date"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
            />
            <FormInput
              label="End date"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
            />
          </div>
        </div>

        {/* Budget Section */}
        <div className="bg-nature-blue-50 border border-nature-blue-200 p-5 sm:p-6 md:p-7 rounded-lg md:rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-nature-blue-800">
              What's your budget?
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold text-nature-blue-900">
                ${budget.toLocaleString()}
              </span>
            </div>
          </div>
          <input
            type="range"
            min={500}
            max={10000}
            step={100}
            value={budget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="w-full h-2.5 sm:h-3 bg-nature-blue-200 rounded-lg appearance-none cursor-pointer accent-nature-green-600 hover:accent-nature-green-700 transition-all"
          />
          <div className="flex justify-between text-xs sm:text-sm text-nature-brown-600 font-medium gap-2 mt-3 sm:mt-4">
            <span>$500</span>
            <span>$10,000</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onPlanTrip}
          disabled={loading || !isFormValid}
          className={`w-full py-3.5 sm:py-4 md:py-5 rounded-lg md:rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-200 flex items-center justify-center gap-2.5 ${
            isFormValid && !loading
              ? 'bg-nature-green-600 text-white shadow-lg shadow-nature-green-400/30 hover:bg-nature-green-700 active:scale-95'
              : 'bg-nature-brown-200 text-nature-brown-600 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Planning your trip...</span>
            </>
          ) : (
            <>
              <span>Create My Itinerary</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
