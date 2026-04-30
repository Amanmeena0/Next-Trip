"""
Simple test script for the orchestrator.

Run this to verify agents are working without needing the FastAPI server.
"""

import asyncio
import logging
from datetime import date

from pydantic import ValidationError

logging.basicConfig(level=logging.INFO)

from Agents.host_agent.task_manager import run as orchestrator_run
from main import Trip

async def test_basic_orchestration():
    """Test basic trip planning."""
    payload = {
        "destination": "Paris",
        "start_date": "2026-06-01",
        "end_date": "2026-06-07",
        "budget": 2000,
    }

    print("Testing orchestrator with payload:", payload)
    print("-" * 60)

    result = await orchestrator_run(payload)

    print("\nOrchestrator result:")
    print("-" * 60)
    for key, value in result.items():
        print(f"{key}:")
        if isinstance(value, list):
            for item in value:
                print(f"  - {item}")
        else:
            print(f"  {value}")

    return result


async def test_error_handling():
    """Test API-model validation for invalid budget and date ordering."""
    print("\nTesting model validation with invalid payloads")
    print("-" * 60)

    try:
        Trip(
            CurrentCity="LA",
            DestinationCity="Tokyo",
            FromDate=date(2026, 7, 1),
            ToDate=date(2026, 7, 5),
            Budget=-100,
        )
        print("Unexpected: negative budget passed validation")
    except ValidationError as e:
        print("Caught expected validation error for budget:")
        print(e)

    try:
        Trip(
            CurrentCity="LA",
            DestinationCity="Tokyo",
            FromDate=date(2026, 7, 5),
            ToDate=date(2026, 7, 1),
            Budget=1000,
        )
        print("Unexpected: reversed dates passed validation")
    except ValidationError as e:
        print("Caught expected validation error for dates:")
        print(e)


async def main():
    print("=" * 60)
    print("TripPlanner Orchestrator Tests")
    print("=" * 60)

    await test_basic_orchestration()
    await test_error_handling()

    print("\n" + "=" * 60)
    print("Tests completed!")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
