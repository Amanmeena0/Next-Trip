# TripPlanner Multi-Agent System

A practice project demonstrating multi-agent orchestration using FastAPI, async Python, and LLM-powered agents.

## Architecture Overview

### Current Design: Modular Monolith (Internal Async Agents)

```
┌─────────────────────────────────────────────────────────┐
│  FastAPI Server (main.py)                               │
│  ┌──────────────────────────────────────────────────┐   │
│  │ POST /plan-trip                                  │   │
│  │ (Trip validation + orchestrator entry)           │   │
│  └──────────────────────────────────────────────────┘   │
│           ↓                                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Host Orchestrator (host_agent/task_manager.py)  │   │
│  │ - Calls sub-agents in parallel (asyncio.gather) │   │
│  │ - Aggregates responses                           │   │
│  │ - Handles errors gracefully                      │   │
│  └──────────────────────────────────────────────────┘   │
│      ↙        ↓        ↓                                 │
│  ┌────────────────────────────────────────────────┐    │
│  │ Sub-Agents (internal async functions)          │    │
│  │ - flight_agent.execute()                       │    │
│  │ - stay_agent.execute()                         │    │
│  │ - activities_agent.execute()                   │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

**Key benefits for practice:**
- ✅ No network overhead (in-process calls)
- ✅ Easy to debug (single Python debugger)
- ✅ Simple to test orchestration logic
- ✅ Fast iteration on agent behavior

## Project Structure

```
Server/
├── main.py                           # FastAPI app + /plan-trip endpoint
├── Agents/
│   ├── host_agent/
│   │   ├── agent.py                 # Host agent definition (orchestrator)
│   │   ├── task_manager.py          # Orchestration logic
│   │   └── __main__.py              # Legacy (not used now)
│   ├── flight_agent/
│   │   ├── agent.py                 # Flight search agent
│   │   ├── task_manager.py          # Execute flight queries
│   │   └── __main__.py              # Legacy
│   ├── stay_agent/
│   │   ├── agent.py                 # Stay recommendations
│   │   ├── task_manager.py          # Execute stay queries
│   │   └── __main__.py              # Legacy
│   └── activities_agent/
│       ├── agent.py                 # Activities recommendations
│       ├── task_manager.py          # Execute activity queries
│       └── __main__.py              # Legacy
├── common/
│   ├── a2a_server.py                # Legacy HTTP server
│   └── a2a_client.py                # Legacy HTTP client
├── Model/
│   └── Model.py                     # LLM config (get_model, get_api_key)
├── shared/
│   └── schemas.py                   # Shared data models
├── travel_ui.py                     # UI helper (if used)
├── requirements.txt                 # Python dependencies
└── README.md                         # This file
```

## Setup & Running Locally

### Prerequisites

- Python 3.8+
- Virtual environment (`.venv` already created in workspace)
- API keys for LLM (set `OPENAI_API_KEY` or configure in `Model/Model.py`)

### Installation

```bash
# Activate virtual environment
# On Windows:
.venv\Scripts\Activate.ps1

# On Linux/Mac:
source .venv/bin/activate

# Install dependencies (if not already done)
pip install -r requirements.txt
```

### Run the Server

```bash
# Start the FastAPI app with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server runs at: `http://localhost:8000`

Docs: `http://localhost:8000/docs` (interactive Swagger UI)

### Test the API

#### Using curl

```bash
curl -X POST http://localhost:8000/plan-trip \
  -H "Content-Type: application/json" \
  -d '{
    "CurrentCity": "New York",
    "DestinationCity": "London",
    "FromDate": "2026-06-01",
    "ToDate": "2026-06-07",
    "Budget": 1500
  }'
```

#### Using Python requests

```python
import requests

response = requests.post(
    "http://localhost:8000/plan-trip",
    json={
        "CurrentCity": "New York",
        "DestinationCity": "London",
        "FromDate": "2026-06-01",
        "ToDate": "2026-06-07",
        "Budget": 1500
    }
)

print(response.json())
```

#### Using JavaScript/Fetch (React)

```javascript
const fetchTripPlan = async (currentCity, destination, fromDate, toDate, budget) => {
  const response = await fetch("/plan-trip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      CurrentCity: currentCity,
      DestinationCity: destination,
      FromDate: fromDate,
      ToDate: toDate,
      Budget: budget
    })
  });
  
  const data = await response.json();
  return data;
};

// Usage
const result = await fetchTripPlan("NYC", "LON", "2026-06-01", "2026-06-07", 1500);
console.log(result);
```

## API Specification

### Endpoint: `POST /plan-trip`

**Request** (Trip model):
```json
{
  "CurrentCity": "string",
  "DestinationCity": "string",
  "FromDate": "YYYY-MM-DD",
  "ToDate": "YYYY-MM-DD",
  "Budget": number
}
```

**Validations**:
- `ToDate` must be after `FromDate` (enforced via Pydantic validator)
- `Budget` must be a positive number
- All fields required

**Response**:
```json
{
  "trip": {
    "destination": "string",
    "start_date": "YYYY-MM-DD",
    "end_date": "YYYY-MM-DD",
    "budget": number
  },
  "results": {
    "flights": [
      {
        "name": "string",
        "price": number,
        "departure_time": "string",
        "description": "string"
      }
    ],
    "stay": [
      {
        "name": "string",
        "price": number,
        "location": "string",
        "description": "string"
      }
    ],
    "activities": [
      {
        "name": "string",
        "description": "string",
        "price": number,
        "duration": "number (hours)"
      }
    ]
  }
}
```

**Error Response** (400, if validation fails):
```json
{
  "detail": "ToDate must be after FromDate"
}
```

## How the Orchestration Works

### Flow

1. **Frontend** calls `POST /plan-trip` with a Trip object.
2. **main.py** validates the Trip using Pydantic:
   - Checks `ToDate > FromDate`
   - Validates `Budget > 0`
   - Returns 400 if invalid
3. **main.py** converts Trip to orchestrator payload:
   ```python
   payload = {
     "destination": trip.DestinationCity,
     "start_date": trip.FromDate.isoformat(),
     "end_date": trip.ToDate.isoformat(),
     "budget": trip.Budget,
   }
   ```
4. **Orchestrator** (`host_agent/task_manager.py`) runs sub-agents in parallel:
   ```python
   flights, stays, activities = await asyncio.gather(
       flight_execute(payload),
       stay_execute(payload),
       activities_execute(payload)
   )
   ```
   - Each agent is called via `await` (no network overhead).
   - Errors in one agent don't block others (wrapped in `_safe_call`).
5. **Responses aggregated** into a single result object.
6. **Return** to frontend with all recommendations.

### Key Implementation Details

- **Async execution**: `asyncio.gather()` runs agents in parallel (concurrent, not sequential).
- **Error handling**: If one agent fails, orchestrator returns a fallback message but continues.
- **Logging**: Each step logged for debugging (use `--log-level debug` if needed).
- **Pydantic validation**: Request/response models enforce type safety.

## What Each Agent Does

### Flight Agent (`Agents/flight_agent/`)
- Input: destination, date range, budget
- Output: JSON list of 2-3 flights with name, price, departure time, description
- LLM prompt: "Suggest flights between these cities within budget"

### Stay Agent (`Agents/stay_agent/`)
- Input: destination, date range, budget
- Output: JSON list of 2-3 accommodations with name, price, location, description
- LLM prompt: "Suggest engaging tourist/cultural stays"

### Activities Agent (`Agents/activities_agent/`)
- Input: destination, date range, budget
- Output: JSON list of 2-3 activities with name, description, price, duration
- LLM prompt: "Suggest engaging tourist/cultural activities"

All agents use **Google ADK** (Agent Development Kit) with a configured LLM (default: OpenAI via LiteLLM).

## Next Steps (Learning Path)

### Phase 1: Understand Orchestration
- [ ] Run the server and test `/plan-trip` manually.
- [ ] Add `print()` or logging statements to trace agent execution.
- [ ] Modify a prompt in one agent and observe the output.

### Phase 2: Improve Agent Logic
- [ ] Refine prompts to get better flight/stay/activity suggestions.
- [ ] Add response parsing to ensure JSON is valid.
- [ ] Add retry logic if an agent fails (e.g., `asyncio.wait_for()` with timeout).
- [ ] Add per-agent timeout (e.g., 30 seconds max per agent).

### Phase 3: Frontend Integration
- [ ] Create a React component that calls `POST /plan-trip`.
- [ ] Parse response and display flights, stays, activities in a UI.
- [ ] Add error handling for network/validation failures.

### Phase 4: Testing & Observability
- [ ] Write unit tests for orchestrator (mock agents, test error paths).
- [ ] Add OpenTelemetry tracing to measure per-agent latency.
- [ ] Create a simple dashboard showing response times and error rates.

### Phase 5: Advanced (Optional)
- [ ] Add agent-to-agent dependencies (e.g., activities depend on flight results).
- [ ] Implement filtering logic in orchestrator (e.g., only show flights under budget).
- [ ] Add caching for repeated queries (Redis).
- [ ] Containerize and create `docker-compose.yml` for production-like local dev.

## Debugging

### View logs in console
```bash
# Run with debug logging
uvicorn main:app --reload --log-level debug
```

### Test orchestrator in isolation
Create a simple test script:

```python
# test_orchestrator.py
import asyncio
from Agents.host_agent.task_manager import run

payload = {
    "destination": "London",
    "start_date": "2026-06-01",
    "end_date": "2026-06-07",
    "budget": 1500,
}

result = asyncio.run(run(payload))
print(result)
```

Run:
```bash
python test_orchestrator.py
```

### Use Swagger UI
- Open `http://localhost:8000/docs`
- Click "Try it out" on `/plan-trip`
- Enter sample data and execute

## Dependencies

See `requirements.txt`. Key packages:
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `pydantic` - Data validation
- `google-adk` - Agent framework
- `litellm` - LLM abstraction (OpenAI, Anthropic, etc.)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `ModuleNotFoundError` for agents | Check `.venv` is activated and `pip install -r requirements.txt` ran |
| LLM API key not found | Set `OPENAI_API_KEY` env var or update `Model/Model.py` |
| Agent times out | Increase timeout in orchestrator or check LLM API health |
| Pydantic validation error | Check date format is `YYYY-MM-DD`, Budget is a number |
| CORS error from frontend | Update `origins` list in `main.py` with your frontend URL |

## Future Architecture Evolution

**Today** (modular monolith):
- All agents in one process
- Fast to iterate
- Easy to debug

**Tomorrow** (if needed):
- Extract high-load agents to microservices (using `httpx` calls)
- Add K8s if running at scale
- Use gRPC instead of HTTP for latency-sensitive calls

See the architecture evaluation document (in main notes) for detailed analysis.

## Resources

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Pydantic Docs](https://docs.pydantic.dev/)
- [Google ADK Docs](https://github.com/googleapis/python-client-for-google-maps-services) (or equivalent in your setup)
- [asyncio Tutorial](https://docs.python.org/3/library/asyncio.html)

---

**Questions?** Check the code comments in `main.py` and `Agents/host_agent/task_manager.py`.
