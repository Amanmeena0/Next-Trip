import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import date

class Trip(BaseModel):
    CurrentCity: str
    DestinationCity : str
    FromDate : date
    ToDate : date
    Budget : float
 
app = FastAPI(debug=True)

origins = [
    "https://localhost:3000"
]



