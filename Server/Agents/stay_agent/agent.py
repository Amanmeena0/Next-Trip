from google.adk.agents import Agent
from google.adk.models.lite_llm import LiteLlm
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
import json
import uuid
from Model.Model import get_model,get_api_key

model = LiteLlm(
    model=get_model(),
    api_key=get_api_key()
)

stay_agent = Agent(
    name="stay_agent",
    model=model,
    description="Suggests interesting stay for the user at a destination.",
    instruction=(
        "Given a destination, dates, and budget, suggest 2-3 engaging tourist or cultural stay. "
        "For each stay, provide a name, price estimate, location and a short description. "
        "Respond in plain English. Keep it concise and well-formatted."
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
        f"with a budget of {request['budget']}. Suggest 2-3 stay, each with name, description, price estimate, and duration. "
        f"Respond in JSON format using the key 'stay' with a list of stay objects."
    )
    message = types.Content(role="user", parts=[types.Part(text=prompt)])
    try:
        async for event in runner.run_async(user_id=USER_ID, session_id=session_id, new_message=message):
            if event.is_final_response():
                response_text = event.content.parts[0].text
                try:
                    parsed = json.loads(response_text)
                    if "stay" in parsed and isinstance(parsed["stay"], list):
                        return {"stay": parsed["stay"]}
                    else:
                        print("'stay' key missing or not a list in response JSON")
                        return {"stay": response_text}  # fallback to raw text
                except json.JSONDecodeError as e:
                    print("JSON parsing failed:", e)
                    print("Response content:", response_text)
                    return {"stay": response_text}  # fallback to raw text
    except Exception as e:
        print("Stay agent execution failed:", e)
        short_error = str(e).splitlines()[0]
        return {"stay": f"Stay generation failed: {short_error}"}