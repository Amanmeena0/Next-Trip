# ADK A2A Trip Planner - Complete Debugging Guide

## 🔍 Common Issues & Solutions

### Issue 1: Agent Connection Errors
**Symptoms:** "Connection refused", "Failed to reach agent", "404 not found"

#### Solution A: Verify All Agents Are Running
```bash
# Terminal 1: Host Agent
uvicorn agents.host_agent.__main__:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2: Flight Agent
uvicorn agents.flight_agent.__main__:app --host 0.0.0.0 --port 8001 --reload

# Terminal 3: Stay Agent
uvicorn agents.stay_agent.__main__:app --host 0.0.0.0 --port 8002 --reload

# Terminal 4: Activities Agent
uvicorn agents.activities_agent.__main__:app --host 0.0.0.0 --port 8003 --reload
```

#### Solution B: Check Agent Health Endpoints
```python
import requests
import json

# Test each agent endpoint
agents = {
    "host": "http://localhost:8000",
    "flight": "http://localhost:8001",
    "stay": "http://localhost:8002",
    "activities": "http://localhost:8003"
}

for name, url in agents.items():
    try:
        # Test metadata endpoint
        response = requests.get(f"{url}/.well-known/agent.json", timeout=2)
        print(f"✅ {name} agent: {response.status_code}")
        print(json.dumps(response.json(), indent=2))
    except Exception as e:
        print(f"❌ {name} agent: {e}")
```

#### Solution C: Fix Localhost Issues
If running on different machines, update the client calls:

**In your Streamlit app or client code:**
```python
# WRONG (localhost won't work if agent is on different machine)
agent_url = "http://localhost:8000/run"

# CORRECT (use actual IP)
agent_url = "http://192.168.x.x:8000/run"  # Use your actual IP

# OR use environment variables
import os
HOST_AGENT_URL = os.getenv("HOST_AGENT_URL", "http://localhost:8000")
```

---

### Issue 2: LLM Authentication Errors

#### For Gemini:
```python
import os
os.environ["GOOGLE_API_KEY"] = "your-gemini-api-key"

from google.adk.agents import Agent

agent = Agent(
    name="trip_planner",
    model="gemini-2.0-flash",  # Update model name
    instruction="Plan trips...",
)
```

**Setup:**
```bash
export GOOGLE_API_KEY="your-key-from-ai.google.dev"
```

#### For OpenAI:
```python
import os
os.environ["OPENAI_API_KEY"] = "your-openai-api-key"

from google.adk.agents import Agent
from google.adk.agents import LiteLlm

agent = Agent(
    name="trip_planner",
    model=LiteLlm(model="gpt-4o-mini"),  # Note: LiteLlm wrapper
    instruction="Plan trips...",
)
```

**Setup:**
```bash
export OPENAI_API_KEY="your-key-from-platform.openai.com"
```

#### Verify API Key Works:
```python
import httpx
import json

# Test Gemini
headers = {"x-goog-api-key": "your-key"}
response = httpx.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    json={"contents": [{"parts": [{"text": "Hello"}]}]},
    headers=headers
)
print(response.status_code)

# Test OpenAI
headers = {"Authorization": "Bearer your-key"}
response = httpx.post(
    "https://api.openai.com/v1/chat/completions",
    json={
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": "Hello"}],
        "max_tokens": 10
    },
    headers=headers
)
print(response.status_code)
```

---

### Issue 3: Data Generation Errors (No Output)

#### Problem: Agent Returns Empty or Malformed JSON
```python
# In your agent handlers, ensure proper response formatting

from pydantic import BaseModel, Field
from typing import Optional, List

class ItineraryOption(BaseModel):
    """Trip option response"""
    title: str = Field(..., description="Option title")
    total_cost: float = Field(..., description="Total cost in USD")
    duration_hours: int = Field(..., description="Total duration in hours")
    flights: List[str] = Field(default_factory=list)
    stays: List[str] = Field(default_factory=list)
    activities: List[str] = Field(default_factory=list)

class TripPlannerResponse(BaseModel):
    """Main trip response"""
    options: List[ItineraryOption]
    recommended_option: int = Field(default=0, description="Index of recommended option")
    notes: str = Field(default="")

# Ensure agent returns structured output
response_schema = {
    "type": "object",
    "properties": {
        "options": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "total_cost": {"type": "number"},
                    "duration_hours": {"type": "number"},
                    "flights": {"type": "array"},
                    "stays": {"type": "array"},
                    "activities": {"type": "array"}
                }
            }
        }
    }
}
```

#### Solution: Add Error Handling in Your A2A Client
```python
import httpx
import json
from typing import Dict, Any

class A2AClient:
    def __init__(self, agent_url: str):
        self.agent_url = agent_url
    
    async def call_agent(self, task_request: Dict[str, Any]) -> Dict[str, Any]:
        """Call A2A agent with error handling"""
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    f"{self.agent_url}/run",
                    json=task_request,
                    headers={"Content-Type": "application/json"}
                )
                response.raise_for_status()
                
                result = response.json()
                
                # Validate response has data
                if not result or "output" not in result:
                    return {
                        "error": "Agent returned empty response",
                        "status": "failed",
                        "raw": result
                    }
                
                return result
        
        except httpx.TimeoutException:
            return {"error": "Agent timeout (>60s)", "status": "timeout"}
        except httpx.ConnectError:
            return {"error": f"Cannot connect to agent at {self.agent_url}", "status": "connection_error"}
        except Exception as e:
            return {"error": str(e), "status": "error", "type": type(e).__name__}
```

#### In Streamlit:
```python
import streamlit as st
import asyncio
from datetime import datetime

st.set_page_config(page_title="Trip Planner", layout="wide")

# Debug mode
if st.checkbox("🔧 Debug Mode"):
    st.write("Agent URLs:")
    st.code({
        "host": st.session_state.get("host_url", "http://localhost:8000"),
        "flight": st.session_state.get("flight_url", "http://localhost:8001"),
        "stay": st.session_state.get("stay_url", "http://localhost:8002"),
        "activities": st.session_state.get("activities_url", "http://localhost:8003"),
    })

# Trip planning interface
col1, col2 = st.columns(2)

with col1:
    origin = st.text_input("From City:", value="New York")
    destination = st.text_input("To City:", value="Paris")

with col2:
    start_date = st.date_input("Start Date:")
    end_date = st.date_input("End Date:")

budget = st.slider("Budget (USD):", 500, 5000, 2000)

if st.button("🚀 Plan the Trip"):
    st.info("Planning your trip... This may take a moment.")
    
    with st.spinner("Contacting agents..."):
        try:
            # Call your A2A client
            task = {
                "input": {
                    "origin": origin,
                    "destination": destination,
                    "start_date": str(start_date),
                    "end_date": str(end_date),
                    "budget": budget,
                    "preferences": st.session_state.get("preferences", {})
                }
            }
            
            # Call host agent
            response = asyncio.run(a2a_client.call_agent(task))
            
            if response.get("status") == "failed":
                st.error(f"❌ Error: {response.get('error')}")
                st.json(response)
            elif response.get("error"):
                st.error(f"❌ {response['error']}")
            else:
                st.success("✅ Trip planned successfully!")
                
                # Display results
                output = response.get("output", {})
                st.write(output)
                
                # Show detailed view
                with st.expander("📊 Detailed Response"):
                    st.json(response)
        
        except Exception as e:
            st.error(f"❌ Unexpected error: {str(e)}")
            st.write(f"Error type: {type(e).__name__}")
```

---

### Issue 4: Timeout or Slow Response

**Problem:** Agent takes too long, Streamlit times out

```python
# Increase timeout in your HTTP calls
async with httpx.AsyncClient(timeout=120.0) as client:  # 2 minutes
    response = await client.post(...)

# In Streamlit, add progress indicator
with st.spinner("⏳ Your agents are working (may take up to 2 minutes)..."):
    # Long running operation
```

---

## 🤖 Using Hugging Face Models Instead

If Gemini and OpenAI aren't working, Hugging Face models are a great alternative!

### Option 1: Using Hugging Face Inference API (Online)

```python
from google.adk.agents import Agent, LiteLlm
import os

os.environ["HUGGINGFACEHUB_API_TOKEN"] = "your-hf-token"

# Create agent with Hugging Face model
agent = Agent(
    name="trip_planner",
    model=LiteLlm(model="huggingface/mistral-7b-instruct"),
    instruction="You are a helpful trip planner agent...",
    description="Plans trips based on user preferences"
)

# Other popular HF models via LiteLLM:
# - huggingface/meta-llama/llama-2-70b-chat-hf
# - huggingface/mistral-7b-instruct
# - huggingface/zephyr-7b-beta
# - huggingface/neural-chat-7b-v3-1
```

**Setup:**
```bash
pip install litellm huggingface_hub

export HUGGINGFACEHUB_API_TOKEN="hf_xxxxx"  # Get from huggingface.co/settings/tokens
```

### Option 2: Using Ollama (Local Llama/Mistral)

Best for development without API costs:

```python
from google.adk.agents import Agent, LiteLlm
import os

agent = Agent(
    name="trip_planner",
    model=LiteLlm(model="ollama/mistral"),  # Or ollama/llama2
    instruction="You are a helpful trip planner...",
    description="Plans trips based on user preferences"
)
```

**Setup:**
```bash
# Install Ollama from ollama.ai
ollama pull mistral  # or llama2, neural-chat, etc.
ollama serve

# Then in your code:
export OLLAMA_BASE_URL="http://localhost:11434"
```

### Option 3: Using Hugging Face Transformers (Local Models)

For maximum control and privacy:

```python
# Install transformers
pip install transformers torch

# Create a custom agent using transformers
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
from google.adk.agents import Agent

class HuggingFaceModel:
    def __init__(self, model_name="mistral-7b-instruct"):
        self.generator = pipeline(
            "text-generation",
            model=model_name,
            torch_dtype="auto",
            device_map="auto"
        )
    
    def generate(self, prompt: str) -> str:
        output = self.generator(prompt, max_length=500, num_return_sequences=1)
        return output[0]["generated_text"]

# Use with ADK
hf_model = HuggingFaceModel("mistral-7b-instruct")

# For custom model integration, you may need to create a custom Model class
# that ADK can use
```

### Popular Free HuggingFace Models:

| Model | Speed | Quality | Free Tier | Use Case |
|-------|-------|---------|-----------|----------|
| Mistral-7B | ⚡⚡⚡ | ⭐⭐⭐⭐ | ✅ | General purpose |
| Llama-2-70B | ⚡⚡ | ⭐⭐⭐⭐⭐ | ✅ | Complex reasoning |
| Zephyr-7B | ⚡⚡⚡ | ⭐⭐⭐⭐ | ✅ | Instruction following |
| Neural-Chat-7B | ⚡⚡⚡ | ⭐⭐⭐⭐ | ✅ | Chat tasks |
| Phi-2-3B | ⚡⚡⚡⚡ | ⭐⭐⭐ | ✅ | Lightweight |

---

## 📋 Checklist Before Running

- [ ] All 4 agent servers are running (8000-8003)
- [ ] API keys are set in environment variables
- [ ] Network connectivity between agents is working
- [ ] Streamlit app can reach http://localhost:8000
- [ ] Requirements.txt is installed correctly
- [ ] Python 3.9+ is being used
- [ ] Virtual environment is activated

---

## 🔧 Quick Diagnostic Script

```python
#!/usr/bin/env python3
"""Run this to diagnose all issues"""

import os
import sys
import requests
import json
from datetime import datetime

print(f"🔍 Diagnostic Report - {datetime.now()}\n")

# 1. Check Python version
print(f"✓ Python: {sys.version}")

# 2. Check API keys
print("\n🔑 API Keys Status:")
print(f"  - GOOGLE_API_KEY: {'✅' if os.getenv('GOOGLE_API_KEY') else '❌'}")
print(f"  - OPENAI_API_KEY: {'✅' if os.getenv('OPENAI_API_KEY') else '❌'}")
print(f"  - HUGGINGFACEHUB_API_TOKEN: {'✅' if os.getenv('HUGGINGFACEHUB_API_TOKEN') else '❌'}")

# 3. Check agent servers
print("\n🌐 Agent Servers:")
agents = {
    "Host": "http://localhost:8000",
    "Flight": "http://localhost:8001",
    "Stay": "http://localhost:8002",
    "Activities": "http://localhost:8003"
}

for name, url in agents.items():
    try:
        r = requests.get(f"{url}/.well-known/agent.json", timeout=2)
        print(f"  ✅ {name}: {r.status_code}")
    except:
        print(f"  ❌ {name}: Not responding")

# 4. Check required packages
print("\n📦 Required Packages:")
packages = [
    'google-adk', 'litellm', 'fastapi', 'uvicorn', 'httpx', 
    'pydantic', 'streamlit', 'openai'
]
try:
    import pkg_resources
    installed = {pkg.key for pkg in pkg_resources.working_set}
    for pkg in packages:
        status = "✅" if pkg.lower() in installed else "❌"
        print(f"  {status} {pkg}")
except:
    print("  ⚠️  Could not check packages")

print("\n" + "="*50)
```

---

## 🚀 Final Debugging Steps

1. **Check Streamlit logs:**
   ```bash
   streamlit run streamlit_app.py --logger.level=debug
   ```

2. **Check FastAPI logs:** Look at terminal output where agents are running

3. **Use curl to test agents:**
   ```bash
   curl -X POST http://localhost:8000/run \
     -H "Content-Type: application/json" \
     -d '{"input": {"destination": "Paris"}}'
   ```

4. **Enable request/response logging in A2A client:**
   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

---

