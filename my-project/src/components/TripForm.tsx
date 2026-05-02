import { FormInput } from './FormInput';

interface TripFormProps {
  budget: number;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  loading: boolean;
  error: string;
  validationError: string;
  onBudgetChange: (value: number) => void;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onPlanTrip: () => Promise<void>;
}

export function TripForm({
  budget,
  origin,
  destination,
  startDate,
  endDate,
  loading,
  error,
  validationError,
  onBudgetChange,
  onOriginChange,
  onDestinationChange,
  onStartDateChange,
  onEndDateChange,
  onPlanTrip,
}: TripFormProps) {
  const isFormValid =
    origin.trim() !== '' && destination.trim() !== '' && startDate !== '' && endDate !== '' && budget > 0;

  return (
    <div className="surface-card p-6 sm:p-7 md:p-8">
      {/* Header Section */}
      <div className="mb-7 sm:mb-8 md:mb-9">
        <h2 className="section-title mb-2 sm:mb-3">
          Plan Your Trip
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-foreground/75">
          Tell us your travel details and we'll create your perfect itinerary.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-7 md:space-y-8">
        {/* Location Section */}
        <div>
          <h3 className="mb-3 sm:mb-4 text-sm font-semibold text-foreground sm:text-base md:text-lg">Where are you going?</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
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
          <h3 className="mb-3 sm:mb-4 text-sm font-semibold text-foreground sm:text-base md:text-lg">When are you traveling?</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <FormInput
              label="Start date"
              type="date"
              value={startDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => onStartDateChange(e.target.value)}
            />
            <FormInput
              label="End date"
              type="date"
              value={endDate}
              min={startDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => onEndDateChange(e.target.value)}
            />
          </div>
        </div>

        {/* Budget Section */}
        <div className="surface-panel p-5 sm:p-6 md:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
            <h3 className="text-sm font-semibold text-foreground sm:text-base md:text-lg">
              What's your budget?
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground sm:text-2xl md:text-3xl">
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
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary transition-all"
          />
          <div className="mt-3 flex justify-between gap-2 text-xs font-medium text-muted-foreground sm:mt-4 sm:text-sm">
            <span>$500</span>
            <span>$10,000</span>
          </div>
        </div>

        {/* CTA Button */}
        {(validationError || error) && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {validationError || error}
          </div>
        )}

        <button
          onClick={() => {
            void onPlanTrip();
          }}
          disabled={loading || !isFormValid}
          className={`btn-primary w-full py-3.5 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg ${
            isFormValid && !loading
              ? ''
              : 'cursor-not-allowed bg-muted text-muted-foreground shadow-none hover:bg-muted'
          }`}
        >
          {loading ? (
            <>
              <span className="inline-block h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin sm:h-6 sm:w-6" />
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
