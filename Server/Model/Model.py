import os
from dotenv import load_dotenv, find_dotenv
from google.adk.models import Gemini
from huggingface_hub import InferenceClient

# Load env variables
load_dotenv(find_dotenv())

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

# Basic validation
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing")


# -------------------------
# Gemini Model
# -------------------------
def get_model():
    return Gemini(
        model="gemini-2.5-flash",
        api_key=GEMINI_API_KEY
    )


# -------------------------
# Hugging Face Model
# -------------------------
def get_hugging_face():
    if not HUGGINGFACE_API_KEY:
        raise ValueError("HUGGINGFACE_API_KEY is missing")

    return InferenceClient(
        model="meta-llama/Meta-Llama-3-8B-Instruct",
        token=HUGGINGFACE_API_KEY
    )