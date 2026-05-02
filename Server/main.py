from datetime import date
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field, model_validator

from Agents.host_agent.task_manager import run as orchestrator_run

logger = logging.getLogger("tripplanner")

class TripRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    leaving_city: str = Field(alias="leavingCity")
    destination_city: str = Field(alias="destinationCity")
    from_date: date = Field(alias="fromDate")
    to_date: date = Field(alias="toDate")
    budget: float

    @model_validator(mode="after")
    def check_dates(self):
        if self.to_date <= self.from_date:
            raise ValueError("to_date must be after from_date")
        if self.budget <= 0:
            raise ValueError("Budget must be greater than 0")
        return self


class TripPlanResponse(BaseModel):
    trip: dict
    results: dict


app = FastAPI(debug=True)

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "ok"}


def _build_host_payload(trip: TripRequest) -> dict:
    return {
        "destination": trip.destination_city,
        "start_date": trip.from_date.isoformat(),
        "end_date": trip.to_date.isoformat(),
        "budget": trip.budget,
    }


@app.post("/plan", response_model=TripPlanResponse)
async def plan_trip(trip: TripRequest):
    payload = _build_host_payload(trip)

    logger.info("Received plan request: %s -> %s", trip.leaving_city, trip.destination_city)
    result = await orchestrator_run(payload)
    return {"trip": payload, "results": result}


@app.post("/plan-trip", response_model=TripPlanResponse)
async def legacy_plan_trip(trip: TripRequest):
    return await plan_trip(trip)



