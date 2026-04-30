from google.adk.agents import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
import logging
import uuid
from Model.Model import get_model
from shared.json_utils import parse_json_from_llm

model = get_model()
logger = logging.getLogger(__name__)

stay_agent = Agent(
    name="stay_agent",
    model=model,
    description="Suggests interesting stay for the user at a destination.",
    instruction=(
        "Given a destination, dates, and budget, suggest 2-3 stay options. "
        "For each stay, provide name, price_estimate, location, and description. "
        "Return strict valid JSON only. Do not add markdown or code fences."
    )
)

session_service = InMemorySessionService()
runner = Runner(
    agent=stay_agent,
    app_name="stay_app",
    session_service=session_service
)
USER_ID = "user_stay"

async def execute(request):
    session_id = f"session_stay_{uuid.uuid4().hex}"
    await session_service.create_session(
        app_name="stay_app",
        user_id=USER_ID,
        session_id=session_id
    )
    prompt = (
        f"User is flying to {request['destination']} from {request['start_date']} to {request['end_date']}, "
        f"with a budget of {request['budget']}. Suggest 2-3 stay options, each with name, description, price_estimate, and location. "
        f"Respond with strict valid JSON using key 'stay' mapped to a list of objects. No markdown, no code fences."
    )
    message = types.Content(role="user", parts=[types.Part(text=prompt)])
    try:
        async for event in runner.run_async(user_id=USER_ID, session_id=session_id, new_message=message):
            if event.is_final_response():
                response_text = event.content.parts[0].text
                try:
                    parsed = parse_json_from_llm(response_text)
                    if "stay" in parsed and isinstance(parsed["stay"], list):
                        return {"stay": parsed["stay"]}
                    else:
                        logger.warning("'stay' key missing or not a list in response JSON")
                        return {"stay": response_text}  # fallback to raw text
                except Exception as e:
                    logger.warning("JSON parsing failed: %s", e)
                    logger.debug("Response content: %s", response_text)
                    return {"stay": response_text}  # fallback to raw text
    except Exception as e:
        logger.exception("Stay agent execution failed")
        short_error = str(e).splitlines()[0]
        return {"stay": f"Stay generation failed: {short_error}"}