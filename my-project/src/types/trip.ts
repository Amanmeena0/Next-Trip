export interface TripPlanRequest {
  leavingCity: string;
  destination: string;
  fromDate: string;
  toDate: string;
  budget: number;
}

export interface TripPlanData {
  flights: string[];
  stays: string[];
  activities: string[];
}

export interface TripPlanResponse {
  trip: {
    leaving_city: string;
    destination_city: string;
    from_date: string;
    to_date: string;
    budget: number;
  };
  results: Record<string, unknown>;
}