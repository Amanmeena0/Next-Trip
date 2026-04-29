import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Trip(BaseModel):
    CurrentCity: str
    DestinationCity : str
    FromDate : 
    ToDate :
    Budget :
    