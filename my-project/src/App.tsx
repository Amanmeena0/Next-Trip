import { useState } from 'react';
import { Header } from './components/Header';
import { TripForm } from './components/TripForm';
import { EmptyState } from './components/EmptyState';
import { PopulatedState } from './components/PopulatedState';
import { MobileNavigation } from './components/MobileNavigation';
import { FloatingActionButton } from './components/FloatingActionButton';
import type { TripPlanData, TripPlanRequest, TripPlanResponse } from './types/trip';

export default function TripFlow() {
  const [budget, setBudget] = useState<number>(2500);
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [tripPlan, setTripPlan] = useState<TripPlanData | null>(null);
  const [error, setError] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  const normalizeSection = (value: unknown): string[] => {
    if (!Array.isArray(value)) return [];
    return value
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') {
          const textCandidate =
            'title' in item
              ? item.title
              : 'name' in item
                ? item.name
                : 'description' in item
                  ? item.description
                  : 'details' in item
                    ? item.details
                    : null;
          return typeof textCandidate === 'string' ? textCandidate : JSON.stringify(item);
        }
        return String(item);
      })
      .filter(Boolean);
  };

  const normalizeResponse = (payload: unknown): TripPlanData => {
    if (!payload || typeof payload !== 'object') {
      return { flights: [], stays: [], activities: [] };
    }

    const result = payload as Record<string, unknown>;
    const nested = result.plan && typeof result.plan === 'object' ? (result.plan as Record<string, unknown>) : null;

    return {
      flights: normalizeSection(result.flights ?? nested?.flights),
      stays: normalizeSection(result.stays ?? result.hotels ?? nested?.stays ?? nested?.hotels),
      activities: normalizeSection(result.activities ?? nested?.activities),
    };
  };

  const validateForm = (): string | null => {
    if (!origin.trim() || !destination.trim() || !startDate || !endDate || budget <= 0) {
      return 'Please fill all trip details before planning your itinerary.';
    }

    const from = new Date(startDate);
    const to = new Date(endDate);

    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
      return 'Please select valid travel dates.';
    }

    if (to <= from) {
      return 'To Date must be after From Date.';
    }

    return null;
  };

  const handlePlanTrip = async () => {
    const validationMessage = validateForm();
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setValidationError('');
    setError('');
    setLoading(true);

    const formData: TripPlanRequest = {
      leavingCity: origin.trim(),
      destination: destination.trim(),
      fromDate: startDate,
      toDate: endDate,
      budget,
    };

    const extractErrorMessage = async (response: Response): Promise<string> => {
      try {
        const payload = (await response.json()) as unknown;
        if (payload && typeof payload === 'object') {
          const detail = (payload as { detail?: unknown }).detail;
          if (typeof detail === 'string') return detail;
          if (Array.isArray(detail) && detail.length > 0) {
            const firstDetail = detail[0] as { msg?: unknown } | undefined;
            if (firstDetail && typeof firstDetail.msg === 'string') {
              return firstDetail.msg;
            }
          }
        }
      } catch {
        // Fall back to the generic message below.
      }

      return 'Unable to generate itinerary at the moment. Please try again.';
    };

    try {
      const response = await fetch('http://localhost:8000/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(await extractErrorMessage(response));
      }

      const payload = (await response.json()) as TripPlanResponse;
      setTripPlan(normalizeResponse(payload.results));
    } catch (requestError) {
      setTripPlan(null);
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Something went wrong while planning your trip. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-linear-to-b from-[#f8f1e6] via-[#fbf6ee] to-[#f3e8d8] text-nature-brown-900 font-body-md antialiased min-h-screen">
      <Header />

      {/*
        The main layout intentionally stays single-column on smaller screens and
        only becomes two columns on large laptops/desktops. This avoids the need
        for users to zoom in just to read the form an itinerary at a normal
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
              error={error}
              validationError={validationError}
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
              {!tripPlan ? (
                <EmptyState />
              ) : (
                <PopulatedState
                  destination={destination}
                  startDate={startDate}
                  endDate={endDate}
                  budget={budget}
                  tripPlan={tripPlan}
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