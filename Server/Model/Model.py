import os
from dotenv import load_dotenv, find_dotenv
from google.adk.models.lite_llm import LiteLlm

load_dotenv(find_dotenv())

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")


if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing")

def get_model():
    return LiteLlm(model="gemini-2.5-flash")

def get_hugging_face():
    return LiteLlm(model="huggingface/meta-llama/Meta-Llama-3-8B-Instruct")