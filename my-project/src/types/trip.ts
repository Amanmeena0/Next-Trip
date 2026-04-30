export interface TripPlanRequest {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
}

export interface TripPlanData {
  flights: string[];
  stays: string[];
  activities: string[];
}