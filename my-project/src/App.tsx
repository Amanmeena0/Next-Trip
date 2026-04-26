import { useState } from 'react';
import { Header } from './components/Header';
import { TripForm } from './components/TripForm';
import { EmptyState } from './components/EmptyState';
import { PopulatedState } from './components/PopulatedState';
import { MobileNavigation } from './components/MobileNavigation';
import { FloatingActionButton } from './components/FloatingActionButton';

export default function TripFlow() {
  const [budget, setBudget] = useState<number>(2500);
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [planned, setPlanned] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePlanTrip = () => {
    if (!origin || !destination) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPlanned(true);
    }, 1200);
  };

  return (
    <div className="bg-white text-nature-brown-900 font-body-md antialiased min-h-screen">
      <Header />

      <main className="pt-20 sm:pt-22 md:pt-24 pb-32 sm:pb-40 px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 md:gap-8 lg:gap-9">
          {/* Left Panel */}
          <section className="lg:col-span-5 flex flex-col gap-6 sm:gap-7">
            <TripForm
              budget={budget}
              origin={origin}
              destination={destination}
              startDate={startDate}
              endDate={endDate}
              loading={loading}
              onBudgetChange={setBudget}
              onOriginChange={setOrigin}
              onDestinationChange={setDestination}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onPlanTrip={handlePlanTrip}
            />
          </section>

          {/* Right Panel */}
          <section className="lg:col-span-7">
            <div className="h-full flex flex-col gap-6 sm:gap-7">
              {!planned ? (
                <EmptyState />
              ) : (
                <PopulatedState
                  destination={destination}
                  startDate={startDate}
                  endDate={endDate}
                  budget={budget}
                />
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNavigation />

      {/* FAB */}
      <FloatingActionButton />
    </div>
  );
}