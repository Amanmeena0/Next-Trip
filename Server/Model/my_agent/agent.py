from datetime import datetime
from zoneinfo import ZoneInfo

from google.adk.agents import Agent


CITY_TIMEZONES = {
    "new york": "America/New_York",
    "los angeles": "America/Los_Angeles",
    "chicago": "America/Chicago",
    "denver": "America/Denver",
    "london": "Europe/London",
    "paris": "Europe/Paris",
    "berlin": "Europe/Berlin",
    "rome": "Europe/Rome",
    "madrid": "Europe/Madrid",
    "dubai": "Asia/Dubai",
    "singapore": "Asia/Singapore",
    "tokyo": "Asia/Tokyo",
    "seoul": "Asia/Seoul",
    "sydney": "Australia/Sydney",
    "toronto": "America/Toronto",
}


def get_current_time(city: str) -> dict:
    """Return the current local time for a supported city."""
    normalized_city = city.strip().lower()
    timezone_name = CITY_TIMEZONES.get(normalized_city, "UTC")
    current_time = datetime.now(ZoneInfo(timezone_name))

    return {
        "status": "success",
        "city": city,
        "timezone": timezone_name,
        "time": current_time.strftime("%I:%M %p"),
    }


root_agent = Agent(
    model="gemini-flash-latest",
    name="root_agent",
    description="Tells the current time in a specified city.",
    instruction=(
        "You are a helpful assistant that tells the current time in cities. "
        "Use the get_current_time tool for this purpose."
    ),
    tools=[get_current_time],
)
