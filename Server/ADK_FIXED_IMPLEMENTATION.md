# ADK A2A Trip Planner - Fixed Implementation with Hugging Face Support

## File Structure
```
next-trip/
├── agents/
│   ├── host_agent/
│   │   ├── __init__.py
│   │   ├── __main__.py
│   │   └── agent.py
│   ├── flight_agent/
│   │   ├── __init__.py
│   │   ├── __main__.py
│   │   └── agent.py
│   ├── stay_agent/
│   │   ├── __init__.py
│   │   ├── __main__.py
│   │   └── agent.py
│   └── activities_agent/
│       ├── __init__.py
│       ├── __main__.py
│       └── agent.py
├── common/
│   ├── __init__.py
│   ├── a2a_client.py
│   ├── models.py
│   └── config.py
├── streamlit_app.py
├── requirements.txt
├── .env.example
└── diagnostic.py
```

---

## 1️⃣ setup common/config.py

```python
# common/config.py

import os
from enum import Enum
from dataclasses import dataclass

class LLMProvider(Enum):
    GEMINI = "gemini"
    OPENAI = "openai"
    HUGGINGFACE = "huggingface"
    OLLAMA = "ollama"

@dataclass
class AgentConfig:
    """Configuration for all agents"""
    
    # LLM Settings
    llm_provider: LLMProvider = LLMProvider(os.getenv("LLM_PROVIDER", "openai"))
    llm_model: str = os.getenv("LLM_MODEL", "gpt-4o-mini")
    
    # API Keys (read from environment)
    google_api_key: str = os.getenv("GOOGLE_API_KEY", "")
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    huggingface_token: str = os.getenv("HUGGINGFACEHUB_API_TOKEN", "")
    
    # Server Settings
    host_agent_port: int = int(os.getenv("HOST_AGENT_PORT", 8000))
    flight_agent_port: int = int(os.getenv("FLIGHT_AGENT_PORT", 8001))
    stay_agent_port: int = int(os.getenv("STAY_AGENT_PORT", 8002))
    activities_agent_port: int = int(os.getenv("ACTIVITIES_AGENT_PORT", 8003))
    
    # Server URLs
    host_agent_url: str = os.getenv("HOST_AGENT_URL", "http://localhost:8000")
    flight_agent_url: str = os.getenv("FLIGHT_AGENT_URL", "http://localhost:8001")
    stay_agent_url: str = os.getenv("STAY_AGENT_URL", "http://localhost:8002")
    activities_agent_url: str = os.getenv("ACTIVITIES_AGENT_URL", "http://localhost:8003")
    
    # Agent timeouts (in seconds)
    agent_timeout: int = int(os.getenv("AGENT_TIMEOUT", "120"))
    
    # Debug mode
    debug: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    def get_model_string(self) -> str:
        """Get the model string for the configured provider"""
        if self.llm_provider == LLMProvider.GEMINI:
            return self.llm_model  # e.g., "gemini-2.0-flash"
        elif self.llm_provider == LLMProvider.OPENAI:
            return f"gpt-4o-mini"
        elif self.llm_provider == LLMProvider.HUGGINGFACE:
            return f"huggingface/{self.llm_model}"
        elif self.llm_provider == LLMProvider.OLLAMA:
            return f"ollama/{self.llm_model}"
        else:
            return self.llm_model

# Create global config instance
config = AgentConfig()
```

---

## 2️⃣ Create common/models.py (Request/Response schemas)

```python
# common/models.py

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum

class FlightOption(BaseModel):
    """Flight booking option"""
    airline: str
    departure_time: str
    arrival_time: str
    duration_hours: float
    stops: int
    price: float
    description: str

class FlightResponse(BaseModel):
    """Flight agent response"""
    options: List[FlightOption]
    recommended_index: int = 0
    total_flights: int

class HotelOption(BaseModel):
    """Hotel booking option"""
    name: str
    rating: float
    price_per_night: float
    total_price: float
    amenities: List[str]
    location: str
    description: str

class StayResponse(BaseModel):
    """Stay agent response"""
    options: List[HotelOption]
    recommended_index: int = 0
    total_nights: int

class ActivityOption(BaseModel):
    """Activity option"""
    name: str
    description: str
    price: float
    duration_hours: float
    rating: float

class ActivitiesResponse(BaseModel):
    """Activities agent response"""
    options: List[ActivityOption]
    recommended_indices: List[int] = Field(default_factory=list)

class TripRequest(BaseModel):
    """User's trip request"""
    origin: str
    destination: str
    start_date: str  # YYYY-MM-DD
    end_date: str    # YYYY-MM-DD
    budget: float = Field(gt=0)
    preferences: Dict[str, Any] = Field(default_factory=dict)

class TripPlan(BaseModel):
    """Complete trip plan"""
    flights: FlightResponse
    stays: StayResponse
    activities: ActivitiesResponse
    total_cost: float
    total_duration_days: int
    recommended_itinerary: str
    warnings: List[str] = Field(default_factory=list)
```

---

## 3️⃣ Create common/a2a_client.py (Fixed A2A Client)

```python
# common/a2a_client.py

import httpx
import json
import logging
from typing import Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger(__name__)

class A2AClient:
    """A2A (Agent-to-Agent) HTTP Client with error handling"""
    
    def __init__(self, agent_url: str, timeout: float = 120.0):
        self.agent_url = agent_url
        self.timeout = timeout
        
    async def call(self, task_input: Dict[str, Any]) -> Dict[str, Any]:
        """
        Call agent via A2A protocol
        
        Args:
            task_input: The input to pass to the agent
            
        Returns:
            Agent response as dict, or error dict if failed
        """
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                # Prepare request
                payload = {
                    "input": task_input,
                    "session_id": f"session-{datetime.now().timestamp()}"
                }
                
                logger.debug(f"Calling agent: {self.agent_url}")
                logger.debug(f"Payload: {json.dumps(payload, indent=2)}")
                
                # Make request
                response = await client.post(
                    f"{self.agent_url}/run",
                    json=payload,
                    headers={"Content-Type": "application/json"}
                )
                
                logger.debug(f"Response status: {response.status_code}")
                
                # Handle HTTP errors
                response.raise_for_status()
                
                # Parse response
                result = response.json()
                logger.debug(f"Response: {json.dumps(result, indent=2)}")
                
                # Validate response structure
                if not result:
                    return self._error_response("Empty response from agent")
                
                return result
        
        except httpx.TimeoutException as e:
            return self._error_response(
                f"Agent timeout (>{self.timeout}s). Make sure agent is not overloaded.",
                error_type="timeout"
            )
        
        except httpx.ConnectError as e:
            return self._error_response(
                f"Cannot connect to agent at {self.agent_url}. Is the agent server running?",
                error_type="connection_error"
            )
        
        except httpx.HTTPStatusError as e:
            return self._error_response(
                f"Agent returned HTTP {e.response.status_code}: {e.response.text}",
                error_type="http_error"
            )
        
        except json.JSONDecodeError as e:
            return self._error_response(
                f"Invalid JSON response from agent: {str(e)}",
                error_type="invalid_json"
            )
        
        except Exception as e:
            return self._error_response(
                f"Unexpected error: {str(e)}",
                error_type=type(e).__name__
            )
    
    def _error_response(self, message: str, error_type: str = "error") -> Dict[str, Any]:
        """Format error response"""
        return {
            "status": "error",
            "error_type": error_type,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
    
    async def health_check(self) -> bool:
        """Check if agent is healthy"""
        try:
            async with httpx.AsyncClient(timeout=5) as client:
                response = await client.get(
                    f"{self.agent_url}/.well-known/agent.json"
                )
                return response.status_code == 200
        except:
            return False
```

---

## 4️⃣ Create Host Agent (agents/host_agent/agent.py)

```python
# agents/host_agent/agent.py

import os
import logging
from google.adk.agents import Agent, LiteLlm
from common.config import config, LLMProvider

logger = logging.getLogger(__name__)

def create_host_agent() -> Agent:
    """Create host agent that orchestrates sub-agents"""
    
    # Set up API keys based on provider
    if config.llm_provider == LLMProvider.GOOGLE_API_KEY:
        os.environ["GOOGLE_API_KEY"] = config.google_api_key
    elif config.llm_provider == LLMProvider.OPENAI:
        os.environ["OPENAI_API_KEY"] = config.openai_api_key
    elif config.llm_provider == LLMProvider.HUGGINGFACE:
        os.environ["HUGGINGFACEHUB_API_TOKEN"] = config.huggingface_token
    
    # Determine model
    if config.llm_provider == LLMProvider.GEMINI:
        model = config.llm_model  # Direct string for Gemini
    else:
        # Use LiteLLM wrapper for other providers
        model = LiteLlm(model=config.get_model_string())
    
    instruction = """You are the main Trip Planner coordinator. 
    
Your job is to:
1. Accept user input about their trip (origin, destination, dates, budget)
2. Delegate to specialized agents:
   - Flight Agent (plans flights)
   - Stay Agent (plans accommodation)
   - Activities Agent (recommends activities)
3. Combine results into a comprehensive itinerary
4. Highlight recommendations and trade-offs

Always ensure all agents provide data in valid JSON format.
If any agent fails, report it clearly to the user."""

    return Agent(
        name="host_agent",
        model=model,
        instruction=instruction,
        description="Coordinates trip planning by delegating to specialized agents"
    )

# Create the agent instance
root_agent = create_host_agent()
```

---

## 5️⃣ Create Host Agent Server (agents/host_agent/__main__.py)

```python
# agents/host_agent/__main__.py

import asyncio
import logging
from fastapi import FastAPI
from a2a.server.apps import A2AStarletteApplication
from a2a.server.request_handlers import DefaultRequestHandler
from a2a.server.tasks import InMemoryTaskStore
from a2a.types import AgentCapabilities, AgentCard, AgentSkill
from google.adk.a2a.executor.a2a_agent_executor import A2aAgentExecutor
from google.adk.runners import Runner
from google.adk.sessions.in_memory_session_service import InMemorySessionService
from google.adk.memory.in_memory_memory_service import InMemoryMemoryService
from google.adk.artifacts.in_memory_artifact_service import InMemoryArtifactService
from google.adk.auth.credential_service.in_memory_credential_service import InMemoryCredentialService

from .agent import root_agent
from common.config import config

# Setup logging
logging.basicConfig(
    level=logging.DEBUG if config.debug else logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create agent executor
session_service = InMemorySessionService()
memory_service = InMemoryMemoryService()
artifact_service = InMemoryArtifactService()
credential_service = InMemoryCredentialService()

runner = Runner(
    agent=root_agent,
    session_service=session_service,
    memory_service=memory_service,
    artifact_service=artifact_service,
    credential_service=credential_service
)

executor = A2aAgentExecutor(runner=runner)

# Create A2A server
task_store = InMemoryTaskStore()
request_handler = DefaultRequestHandler(executor=executor)

app = A2AStarletteApplication(
    request_handler=request_handler,
    task_store=task_store,
)

# Agent metadata for discovery
app.agent_card = AgentCard(
    name="Host Agent",
    description="Trip planner coordinator that delegates to specialized agents",
    capabilities=[
        AgentCapabilities.RUN,
        AgentCapabilities.LIST_TASKS,
        AgentCapabilities.GET_TASK,
    ],
    skills=[
        AgentSkill(
            name="trip_planning",
            description="Coordinates trip planning across multiple agents"
        )
    ]
)

if __name__ == "__main__":
    import uvicorn
    
    logger.info(f"Starting Host Agent on port {config.host_agent_port}")
    logger.info(f"Using LLM Provider: {config.llm_provider.value}")
    logger.info(f"Using Model: {config.get_model_string()}")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=config.host_agent_port,
        log_level="debug" if config.debug else "info"
    )
```

---

## 6️⃣ Create Streamlit App (streamlit_app.py)

```python
# streamlit_app.py

import streamlit as st
import asyncio
import logging
import json
from datetime import datetime, timedelta
from common.a2a_client import A2AClient
from common.config import config
from common.models import TripRequest

# Setup logging
logging.basicConfig(level=logging.DEBUG if config.debug else logging.INFO)
logger = logging.getLogger(__name__)

# Streamlit config
st.set_page_config(
    page_title="🌍 Trip Planner",
    page_icon="✈️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Title
st.title("✈️ Next Trip - AI-Powered Travel Planner")
st.markdown("Plan your next adventure with our multi-agent AI system")

# Sidebar for settings
with st.sidebar:
    st.header("⚙️ Configuration")
    
    debug_mode = st.checkbox(
        "🔧 Debug Mode",
        value=config.debug,
        help="Show detailed logs and agent responses"
    )
    
    if debug_mode:
        st.subheader("Agent Endpoints")
        st.code(json.dumps({
            "host": config.host_agent_url,
            "flight": config.flight_agent_url,
            "stay": config.stay_agent_url,
            "activities": config.activities_agent_url,
        }, indent=2), language="json")
        
        st.subheader("LLM Configuration")
        st.write(f"Provider: **{config.llm_provider.value}**")
        st.write(f"Model: **{config.get_model_string()}**")
    
    # Health check
    st.subheader("🏥 Agent Health")
    if st.button("Check Agent Status"):
        health_client = A2AClient(config.host_agent_url, timeout=5)
        is_healthy = asyncio.run(health_client.health_check())
        if is_healthy:
            st.success("✅ Host Agent is running!")
        else:
            st.error("❌ Cannot reach Host Agent. Make sure it's running on port 8000")

# Main form
st.header("📋 Trip Details")

col1, col2 = st.columns(2)

with col1:
    origin = st.text_input(
        "From City:",
        value="New York",
        placeholder="Enter departure city"
    )
    destination = st.text_input(
        "To City:",
        value="Paris",
        placeholder="Enter destination city"
    )

with col2:
    today = datetime.now().date()
    start_date = st.date_input(
        "Start Date:",
        value=today + timedelta(days=7)
    )
    end_date = st.date_input(
        "End Date:",
        value=today + timedelta(days=14)
    )

# Budget and preferences
col3, col4 = st.columns(2)

with col3:
    budget = st.slider(
        "💰 Budget (USD):",
        min_value=500,
        max_value=10000,
        value=2000,
        step=100
    )

with col4:
    travel_style = st.selectbox(
        "🎒 Travel Style:",
        ["Budget", "Comfort", "Luxury"],
        help="Affects hotel and activity recommendations"
    )

# Preferences
st.subheader("🎯 Preferences")
col5, col6 = st.columns(2)

with col5:
    st.multiselect(
        "Must-Have Activities:",
        ["Museums", "Nightlife", "Food", "Nature", "Sports", "Shopping"],
        key="must_have"
    )

with col6:
    st.multiselect(
        "Avoid:",
        ["Crowded Places", "Expensive", "Long Travel", "High Altitudes"],
        key="avoid"
    )

# Plan Trip Button
st.markdown("---")

if st.button("🚀 Plan My Trip", use_container_width=True, type="primary"):
    
    # Validation
    if not origin or not destination:
        st.error("❌ Please fill in both origin and destination cities")
    elif start_date >= end_date:
        st.error("❌ Start date must be before end date")
    else:
        # Create request
        trip_request = TripRequest(
            origin=origin,
            destination=destination,
            start_date=start_date.isoformat(),
            end_date=end_date.isoformat(),
            budget=budget,
            preferences={
                "travel_style": travel_style,
                "must_have": st.session_state.get("must_have", []),
                "avoid": st.session_state.get("avoid", [])
            }
        )
        
        # Call agent
        st.info("⏳ Planning your trip... This may take a moment.")
        
        with st.spinner("📡 Contacting agents..."):
            try:
                client = A2AClient(
                    config.host_agent_url,
                    timeout=config.agent_timeout
                )
                
                response = asyncio.run(
                    client.call(trip_request.dict())
                )
                
                # Handle response
                if response.get("status") == "error":
                    st.error(f"❌ Error: {response.get('message')}")
                    if debug_mode:
                        st.json(response)
                
                elif "error" in response:
                    st.error(f"❌ {response.get('error', 'Unknown error')}")
                    if debug_mode:
                        st.json(response)
                
                else:
                    st.success("✅ Trip planned successfully!")
                    
                    # Display output
                    output = response.get("output", response)
                    
                    # Pretty display
                    st.markdown(f"""
                    ### 🎉 Your Trip Plan
                    
                    **Origin:** {origin}  
                    **Destination:** {destination}  
                    **Duration:** {(end_date - start_date).days} days  
                    **Budget:** ${budget:,.2f}  
                    **Style:** {travel_style}
                    """)
                    
                    # Show full response
                    with st.expander("📊 Detailed Plan"):
                        st.json(output)
                    
                    # Debug info
                    if debug_mode:
                        with st.expander("🔍 Raw Response"):
                            st.json(response)
            
            except Exception as e:
                st.error(f"❌ Unexpected error: {str(e)}")
                logger.exception("Error planning trip")
                if debug_mode:
                    st.write(f"Error type: {type(e).__name__}")
                    st.write(str(e))

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center'>
<p>Powered by Google ADK & A2A Protocol | Built with Streamlit</p>
</div>
""", unsafe_allow_html=True)
```

---

## 7️⃣ Requirements.txt

```txt
# Core ADK
google-adk>=0.1.0
google-adk-a2a>=0.1.0

# LLM & Model Providers
litellm>=1.5.0
openai>=1.0.0
google-ai-generativelanguage>=0.6.0

# Web & API
fastapi>=0.104.0
uvicorn>=0.24.0
httpx>=0.25.0
starlette>=0.27.0

# Data & Config
pydantic>=2.0.0
python-dotenv>=1.0.0

# UI
streamlit>=1.28.0

# Optional: For local Hugging Face models
transformers>=4.30.0
torch>=2.0.0
huggingface-hub>=0.17.0

# Utilities
python-dateutil>=2.8.2
pytz>=2023.3
```

---

## 8️⃣ .env.example

```env
# LLM Provider: gemini, openai, huggingface, or ollama
LLM_PROVIDER=openai

# Model names (depends on provider)
LLM_MODEL=gpt-4o-mini

# API Keys
GOOGLE_API_KEY=your-gemini-api-key-here
OPENAI_API_KEY=your-openai-api-key-here
HUGGINGFACEHUB_API_TOKEN=your-huggingface-token-here

# Agent Ports
HOST_AGENT_PORT=8000
FLIGHT_AGENT_PORT=8001
STAY_AGENT_PORT=8002
ACTIVITIES_AGENT_PORT=8003

# Agent URLs (use IP if agents on different machines)
HOST_AGENT_URL=http://localhost:8000
FLIGHT_AGENT_URL=http://localhost:8001
STAY_AGENT_URL=http://localhost:8002
ACTIVITIES_AGENT_URL=http://localhost:8003

# Timeouts (seconds)
AGENT_TIMEOUT=120

# Debug
DEBUG=True
```

---

## 🚀 Quick Start

1. **Clone and setup:**
```bash
git clone <your-repo>
cd next-trip
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

2. **Configure:**
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. **Start agents (in separate terminals):**
```bash
uvicorn agents.host_agent.__main__:app --port 8000 --reload
uvicorn agents.flight_agent.__main__:app --port 8001 --reload
uvicorn agents.stay_agent.__main__:app --port 8002 --reload
uvicorn agents.activities_agent.__main__:app --port 8003 --reload
```

4. **Start Streamlit:**
```bash
streamlit run streamlit_app.py
```

5. **Use with Hugging Face (free):**
```bash
# Install Ollama first from ollama.ai
ollama pull mistral  # Download model

# In separate terminal:
ollama serve

# Then in .env:
LLM_PROVIDER=ollama
LLM_MODEL=mistral
```

---

