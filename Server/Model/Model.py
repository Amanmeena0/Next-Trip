import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

MODEL_NAME = os.getenv("MODEL_NAME", "gemini/gemini-2.5-flash")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY=os.getenv("OPENAI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing")

def get_model():
    return MODEL_NAME

def get_api_key():
    return GEMINI_API_KEY

def get_open_model():
    return OPENAI_API_KEY