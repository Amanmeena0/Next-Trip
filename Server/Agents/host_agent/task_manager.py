import asyncio
import logging
from typing import Dict, Any

from Agents.flight_agent.agent import execute as flight_execute
from Agents.stay_agent.agent import execute as stay_execute
from Agents.activities_agent.agent import execute as activities_execute

logger = logging.getLogger(__name__)


async def run(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Orchestrator: call sub-agents internally (async) and aggregate results.

    Expected payload keys: `destination`, `start_date`, `end_date`, `budget`.
    """
    logger.info("Host orchestrator received payload: %s", payload)

    async def _safe_call(name, coro):
        try:
            res = await coro
            return res if isinstance(res, dict) else {name: res}
        except Exception as e:
            logger.exception("Agent %s failed", name)
            return {name: f"{name} failed: {str(e).splitlines()[0]}"}

    # Run agents in parallel (they are independent)
    tasks = [
        _safe_call("flights", flight_execute(payload)),
        _safe_call("stay", stay_execute(payload)),
        _safe_call("activities", activities_execute(payload)),
    ]

    flights_res, stay_res, activities_res = await asyncio.gather(*tasks)

    # Normalize outputs
    flights = flights_res.get("flights") if isinstance(flights_res, dict) else flights_res
    stay = stay_res.get("stay") if isinstance(stay_res, dict) else stay_res
    activities = activities_res.get("activities") if isinstance(activities_res, dict) else activities_res

    aggregated = {
        "flights": flights or "No flights returned.",
        "stay": stay or "No stay options returned.",
        "activities": activities or "No activities found.",
    }

    logger.info("Aggregated result: %s", aggregated)
    return aggregated