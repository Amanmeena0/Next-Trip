import { ItineraryCard } from './ItineraryCard';
import { TipCardsSection } from './TipCardsSection';

interface PopulatedStateProps {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
}

export function PopulatedState({
  destination,
  startDate,
  endDate,
  budget,
}: PopulatedStateProps) {
  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <ItineraryCard
        destination={destination}
        startDate={startDate}
        endDate={endDate}
        budget={budget}
      />
      <TipCardsSection />
    </div>
  );
}
