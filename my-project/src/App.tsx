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
    <div className="bg-linear-to-b from-[#f8f1e6] via-[#fbf6ee] to-[#f3e8d8] text-nature-brown-900 font-body-md antialiased min-h-screen">
      <Header />

      {/*
        The main layout intentionally stays single-column on smaller screens and
        only becomes two columns on large laptops/desktops. This avoids the need
        for users to zoom in just to read the form and itinerary at a normal
        15.6-inch laptop size.
      */}
      <main className="pt-20 sm:pt-22 md:pt-24 pb-32 sm:pb-40 px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
          {/* Left Panel */}
          <section className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
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
            <div className="h-full flex flex-col gap-5 sm:gap-6">
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