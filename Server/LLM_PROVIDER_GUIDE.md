# LLM Provider Integration Guide

## 📊 Quick Comparison

| Provider | Cost | Speed | Quality | Setup | Local | Free Tier |
|----------|------|-------|---------|-------|-------|-----------|
| **Gemini** | $$ | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | Easy | ❌ | ✅ Limited |
| **OpenAI** | $$$ | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | Easy | ❌ | ✅ Limited |
| **Hugging Face** | Free | ⚡⚡ | ⭐⭐⭐⭐ | Medium | ✅ | ✅ Full |
| **Ollama** | Free | ⚡ | ⭐⭐⭐ | Medium | ✅ | ✅ Full |

---

## 1️⃣ Using Google Gemini

### Setup (5 minutes)

#### Step 1: Get API Key
```bash
# Visit https://aistudio.google.com/apikey
# Create new API key
# Copy to your clipboard
```

#### Step 2: Configure Environment
```bash
export GOOGLE_API_KEY="YOUR_KEY_HERE"
export LLM_PROVIDER="gemini"
export LLM_MODEL="gemini-2.0-flash"
```

#### Step 3: Create .env File
```env
LLM_PROVIDER=gemini
LLM_MODEL=gemini-2.0-flash
GOOGLE_API_KEY=your-actual-key-here
```

#### Step 4: Update Agent Code
```python
# In agents/host_agent/agent.py

from google.adk.agents import Agent
import os

os.environ["GOOGLE_API_KEY"] = "your-key"

agent = Agent(
    name="host_agent",
    model="gemini-2.0-flash",  # Direct string for Gemini
    instruction="You are a helpful trip planner...",
    description="Plans trips based on user preferences"
)
```

### Test It
```bash
# Test Gemini API directly
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'

# Expected: 200 OK with response
```

### Available Models
```
gemini-2.0-flash      # Fastest, best for trips
gemini-1.5-pro        # Most capable
gemini-1.5-flash      # Balanced
```

### Pros & Cons
✅ Free tier generous (60 req/min)
✅ No credit card for free tier
✅ Very fast
✅ Google Cloud integration
❌ Rate limited on free tier
❌ Not optimized for agentic workflows yet

---

## 2️⃣ Using OpenAI (GPT-4 / GPT-3.5)

### Setup (5 minutes)

#### Step 1: Get API Key
```bash
# Visit https://platform.openai.com/api/keys
# Create new secret key
# Add billing method (required for paid models)
```

#### Step 2: Configure Environment
```bash
export OPENAI_API_KEY="sk-xxx..."
export LLM_PROVIDER="openai"
export LLM_MODEL="gpt-4o-mini"
```

#### Step 3: Update .env
```env
LLM_PROVIDER=openai
LLM_MODEL=gpt-4o-mini
OPENAI_API_KEY=sk-your-key-here
```

#### Step 4: Update Agent Code
```python
# In agents/host_agent/agent.py

from google.adk.agents import Agent, LiteLlm
import os

os.environ["OPENAI_API_KEY"] = "your-key"

agent = Agent(
    name="host_agent",
    model=LiteLlm(model="gpt-4o-mini"),  # Use LiteLLM wrapper
    instruction="You are a helpful trip planner...",
    description="Plans trips based on user preferences"
)
```

### Test It
```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-YOUR_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 10
  }'

# Expected: 200 OK with response
```

### Available Models
```
gpt-4o              # Best for complex reasoning
gpt-4o-mini         # Best balance (RECOMMENDED)
gpt-3.5-turbo       # Cheapest
```

### Pricing
```
gpt-4o-mini:
  Input:  $0.15 / 1M tokens
  Output: $0.60 / 1M tokens
  
Trip planning example (~1000 tokens): ~$0.001 per trip
```

### Pros & Cons
✅ Most reliable
✅ Best for agent coordination
✅ Extensive documentation
✅ Good function calling support
❌ Paid only (no free tier)
❌ More expensive than Gemini
❌ Rate limited on free accounts

---

## 3️⃣ Using Hugging Face Models

### 3a) Cloud-Based (Inference API)

#### Setup (10 minutes)

##### Step 1: Get Token
```bash
# Visit https://huggingface.co/settings/tokens
# Create new token (read access minimum)
```

##### Step 2: Configure
```bash
export HUGGINGFACEHUB_API_TOKEN="hf_xxx..."
export LLM_PROVIDER="huggingface"
export LLM_MODEL="mistral-7b-instruct"
```

##### Step 3: Update Agent
```python
from google.adk.agents import Agent, LiteLlm
import os

os.environ["HUGGINGFACEHUB_API_TOKEN"] = "your-token"

agent = Agent(
    name="host_agent",
    model=LiteLlm(model="huggingface/mistral-7b-instruct"),
    instruction="You are a helpful trip planner...",
    description="Plans trips based on user preferences"
)
```

##### Step 4: Test
```bash
curl https://api-inference.huggingface.co/models/mistral-community/Mistral-7B-Instruct-v0.1 \
  -X POST \
  -H "Authorization: Bearer hf_YOUR_TOKEN" \
  -d '{"inputs":"Hello, how are you?"}'
```

### 3b) Local with Ollama (RECOMMENDED FOR FREE USE)

#### Installation (10 minutes)

##### Step 1: Install Ollama
```bash
# Visit https://ollama.ai
# Download and install for your OS (Mac, Linux, Windows)
```

##### Step 2: Pull a Model
```bash
ollama pull mistral         # Best balance (7B)
# or
ollama pull llama2          # More capable but slower
ollama pull neural-chat     # Fine-tuned for chat
```

##### Step 3: Run Ollama Server
```bash
# This keeps running in background
ollama serve
# Server runs on http://localhost:11434
```

##### Step 4: Configure for ADK
```bash
export OLLAMA_BASE_URL="http://localhost:11434"
export LLM_PROVIDER="ollama"
export LLM_MODEL="mistral"
```

##### Step 5: Update Agent
```python
from google.adk.agents import Agent, LiteLlm

agent = Agent(
    name="host_agent",
    model=LiteLlm(model="ollama/mistral"),  # or ollama/llama2
    instruction="You are a helpful trip planner...",
    description="Plans trips based on user preferences"
)
```

### 3c) Local with Transformers (Full Control)

#### Installation (15 minutes)

##### Step 1: Install Dependencies
```bash
pip install transformers torch sentencepiece
```

##### Step 2: Create Model Wrapper
```python
# In common/hf_model.py

from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import torch

class HuggingFaceLocalModel:
    def __init__(self, model_name="mistralai/Mistral-7B-Instruct-v0.1"):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Using device: {self.device}")
        
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.float16 if self.device == "cuda" else torch.float32,
            device_map="auto"
        )
        self.pipeline = pipeline(
            "text-generation",
            model=self.model,
            tokenizer=self.tokenizer,
            device=0 if self.device == "cuda" else -1,
            max_new_tokens=500
        )
    
    def generate(self, prompt: str) -> str:
        """Generate text from prompt"""
        result = self.pipeline(prompt)
        return result[0]['generated_text']
```

##### Step 3: Use in Agent
```python
# Note: ADK currently expects standard model APIs
# For custom models, you may need to create a wrapper

from common.hf_model import HuggingFaceLocalModel

# Create instance (takes time to download on first run)
hf_model = HuggingFaceLocalModel("mistralai/Mistral-7B-Instruct-v0.1")

# For now, use Ollama which is simpler with ADK
# OR use LiteLlm with Hugging Face Inference API
```

### Popular Hugging Face Models

| Model | Size | Speed | Quality | Specialty |
|-------|------|-------|---------|-----------|
| Mistral-7B | 7B | ⚡⚡⚡ | ⭐⭐⭐⭐ | **General** |
| Llama-2-70B | 70B | ⚡ | ⭐⭐⭐⭐⭐ | **Reasoning** |
| Zephyr-7B | 7B | ⚡⚡⚡ | ⭐⭐⭐⭐ | **Instructions** |
| Neural-Chat-7B | 7B | ⚡⚡⚡ | ⭐⭐⭐⭐ | **Chat** |
| Phi-2-3B | 3B | ⚡⚡⚡⚡ | ⭐⭐⭐ | **Mobile** |

### Pros & Cons

**Cloud (Inference API):**
✅ No local setup needed
✅ Free tier generous
✅ Works on any device
❌ Cloud-dependent
❌ Slower than local
❌ Rate limited

**Local (Ollama):**
✅ 100% free
✅ Fast (with GPU)
✅ No API keys
✅ Works offline
✅ Full privacy
❌ Requires good hardware
❌ First download is large

---

## 🔄 Switching Providers

### Minimal changes needed:

1. Update `.env`:
```bash
LLM_PROVIDER=openai  # Change this
LLM_MODEL=gpt-4o-mini  # And this
OPENAI_API_KEY=your-key  # Depending on provider
```

2. Update `common/config.py`:
```python
config.llm_provider = "openai"  # Already reads from .env
config.llm_model = "gpt-4o-mini"
```

3. Restart agents:
```bash
# Agents will auto-pick up new config
```

---

## 🚀 Recommended Setups

### For Development (Free)
```bash
# Use Ollama + Mistral
ollama pull mistral
ollama serve

# .env
LLM_PROVIDER=ollama
LLM_MODEL=mistral
```

### For Production (Paid)
```bash
# Use OpenAI
# .env
LLM_PROVIDER=openai
LLM_MODEL=gpt-4o-mini
OPENAI_API_KEY=sk-...
```

### For Balance
```bash
# Use Gemini
# .env
LLM_PROVIDER=gemini
LLM_MODEL=gemini-2.0-flash
GOOGLE_API_KEY=...
```

---

## 🐛 Troubleshooting

### "Module not found: litellm"
```bash
pip install litellm
```

### "Invalid API key"
```bash
# Check key format
echo $OPENAI_API_KEY  # Should start with "sk-"
echo $GOOGLE_API_KEY   # Should be long hex string
echo $HUGGINGFACEHUB_API_TOKEN  # Should start with "hf_"
```

### "Rate limit exceeded"
- **Gemini**: Free tier: 60 req/min
- **OpenAI**: Depends on plan
- **HuggingFace**: Depends on plan
- **Ollama**: Unlimited (local)

### "Timeout error"
```python
# Increase timeout in config
config.agent_timeout = 300  # 5 minutes instead of 2
```

### Model quality issues
- Try a larger model: `mistral` → `llama2` → `neural-chat`
- Improve prompts in agent instructions
- Add few-shot examples

---

## 📚 References

- [Google Gemini Docs](https://ai.google.dev)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Hugging Face Docs](https://huggingface.co/docs)
- [LiteLLM Docs](https://docs.litellm.ai)
- [Ollama Docs](https://github.com/ollama/ollama)

