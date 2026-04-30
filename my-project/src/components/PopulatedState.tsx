import { ItineraryCard } from './ItineraryCard';
import type { TripPlanData } from '../types/trip';

interface PopulatedStateProps {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  tripPlan: TripPlanData;
}

export function PopulatedState({
  destination,
  startDate,
  endDate,
  budget,
  tripPlan,
}: PopulatedStateProps) {
  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <ItineraryCard
        destination={destination}
        startDate={startDate}
        endDate={endDate}
        budget={budget}
        tripPlan={tripPlan}
      />
    </div>
  );
}
