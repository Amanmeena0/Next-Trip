import os
from dotenv import load_dotenv, find_dotenv
from google.adk.models.lite_llm import LiteLlm

load_dotenv(find_dotenv())

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")


if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing")

def get_model():
    """Get the default LLM model (Gemini via API key)."""
    return LiteLlm(model="gemini/gemini-2.5-flash", api_key=GEMINI_API_KEY)

def get_api_key():
    """Get the Gemini API key."""
    return GEMINI_API_KEY

def get_open_model():
    """Get Hugging Face model."""
    if not HUGGINGFACE_API_KEY:
        raise ValueError("HUGGINGFACE_API_KEY is missing")
    return LiteLlm(model="huggingface/meta-llama/Meta-Llama-3-8B-Instruct")

def get_hugging_face():
    """Alias for get_open_model()."""
    return get_open_model()