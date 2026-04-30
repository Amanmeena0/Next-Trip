from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, model_validator
from datetime import date
import logging

from Agents.host_agent.task_manager import run as orchestrator_run

logger = logging.getLogger("tripplanner")

class Trip(BaseModel):
    CurrentCity: str
    DestinationCity: str
    FromDate: date
    ToDate: date
    Budget: float

    @model_validator(mode='after')
    def check_dates(self):
        if self.ToDate <= self.FromDate:
            raise ValueError("ToDate must be after FromDate")
        if self.Budget <= 0:
            raise ValueError("Budget must be greater than 0")
        return self


app = FastAPI(debug=True)

# CORS
origins = ["http://localhost:3000", "https://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/plan-trip")
async def plan_trip(trip: Trip):
    payload = {
        "destination": trip.DestinationCity,
        "start_date": trip.FromDate.isoformat(),
        "end_date": trip.ToDate.isoformat(),
        "budget": trip.Budget,
    }

    logger.info("Received plan request: %s -> %s", trip.CurrentCity, trip.DestinationCity)
    result = await orchestrator_run(payload)
    return {"trip": payload, "results": result}



