import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# Keep a single source of truth for the LiteLLM model identifier.
MODEL_NAME = os.getenv("MODEL_NAME", "gemini-2.5-flash")

# Backward-compatible exports used across agent modules.
get_model = MODEL_NAME
get_Model = MODEL_NAME