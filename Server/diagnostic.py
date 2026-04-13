#!/usr/bin/env python3
"""
ADK A2A Trip Planner - Diagnostic Script
Run this to identify all issues with your setup
"""

import os
import sys
import json
import asyncio
import subprocess
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple

# Color codes for output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'

def print_header(text: str):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}")
    print(f"  {text}")
    print(f"{'='*60}{Colors.END}\n")

def print_success(text: str):
    print(f"{Colors.GREEN}✅  {text}{Colors.END}")

def print_error(text: str):
    print(f"{Colors.RED}❌  {text}{Colors.END}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠️   {text}{Colors.END}")

def print_info(text: str):
    print(f"{Colors.BLUE}ℹ️   {text}{Colors.END}")

def check_python_version():
    """Check Python version"""
    print_header("Python Environment")
    
    version = sys.version_info
    print_info(f"Python {version.major}.{version.minor}.{version.micro}")
    
    if version.major >= 3 and version.minor >= 9:
        print_success(f"Python {version.major}.{version.minor} - Supported")
    else:
        print_error(f"Python {version.major}.{version.minor} - Upgrade to 3.9+")
    
    print_info(f"Executable: {sys.executable}")

def check_packages() -> Dict[str, bool]:
    """Check if required packages are installed"""
    print_header("Package Installation")
    
    required = {
        'google.adk': 'google-adk',
        'fastapi': 'fastapi',
        'uvicorn': 'uvicorn',
        'httpx': 'httpx',
        'pydantic': 'pydantic',
        'streamlit': 'streamlit',
        'a2a': 'a2a-py',
        'litellm': 'litellm',
    }
    
    results = {}
    for module, package in required.items():
        try:
            __import__(module)
            print_success(f"{package:30} ✓")
            results[package] = True
        except ImportError:
            print_error(f"{package:30} ✗ (pip install {package})")
            results[package] = False
    
    return results

def check_api_keys() -> Dict[str, bool]:
    """Check API keys"""
    print_header("API Keys Configuration")
    
    keys = {
        'GOOGLE_API_KEY': 'Google/Gemini',
        'OPENAI_API_KEY': 'OpenAI',
        'HUGGINGFACEHUB_API_TOKEN': 'Hugging Face',
        'ANTHROPIC_API_KEY': 'Anthropic',
    }
    
    results = {}
    for env_var, provider in keys.items():
        key = os.getenv(env_var)
        if key:
            # Mask the key for security
            masked = key[:10] + '*' * (len(key) - 15) + key[-5:] if len(key) > 15 else key[:5] + '*' * (len(key) - 5)
            print_success(f"{provider:20} {masked}")
            results[provider] = True
        else:
            print_warning(f"{provider:20} Not set (export {env_var}=...)")
            results[provider] = False
    
    return results

async def check_agent_servers() -> Tuple[Dict[str, bool], List[str]]:
    """Check if agent servers are running"""
    print_header("Agent Servers Status")
    
    agents = {
        "Host": "http://localhost:8000",
        "Flight": "http://localhost:8001",
        "Stay": "http://localhost:8002",
        "Activities": "http://localhost:8003",
    }
    
    results = {}
    failing = []
    
    try:
        import httpx
        
        for name, url in agents.items():
            try:
                async with httpx.AsyncClient(timeout=3) as client:
                    response = await client.get(f"{url}/.well-known/agent.json")
                    if response.status_code == 200:
                        print_success(f"{name:15} {url:30} [Running]")
                        results[name] = True
                    else:
                        print_warning(f"{name:15} {url:30} [HTTP {response.status_code}]")
                        results[name] = False
                        failing.append(name)
            except httpx.ConnectError:
                print_error(f"{name:15} {url:30} [Connection refused]")
                results[name] = False
                failing.append(name)
            except httpx.TimeoutException:
                print_error(f"{name:15} {url:30} [Timeout]")
                results[name] = False
                failing.append(name)
            except Exception as e:
                print_error(f"{name:15} {url:30} [{type(e).__name__}]")
                results[name] = False
                failing.append(name)
    
    except ImportError:
        print_error("httpx not installed - cannot check servers")
    
    return results, failing

def check_env_file():
    """Check .env file"""
    print_header("Environment File")
    
    env_file = Path(".env")
    if env_file.exists():
        print_success(f".env file found at {env_file.absolute()}")
        
        # Check for required variables
        with open(env_file) as f:
            content = f.read()
        
        required_vars = [
            "LLM_PROVIDER",
            "OPENAI_API_KEY",
            "GOOGLE_API_KEY",
            "HOST_AGENT_URL",
        ]
        
        for var in required_vars:
            if f"{var}=" in content:
                print_success(f"  {var} is set")
            else:
                print_warning(f"  {var} is not set")
    else:
        print_error(".env file not found")
        print_info("Create one by copying .env.example: cp .env.example .env")

def check_network_connectivity():
    """Check network connectivity"""
    print_header("Network Connectivity")
    
    try:
        import httpx
        
        urls = {
            "Google": "https://www.google.com",
            "OpenAI": "https://api.openai.com",
            "Hugging Face": "https://huggingface.co",
        }
        
        for name, url in urls.items():
            try:
                response = httpx.get(url, timeout=5)
                print_success(f"{name:15} reachable ({response.status_code})")
            except Exception as e:
                print_error(f"{name:15} unreachable ({type(e).__name__})")
    
    except ImportError:
        print_warning("httpx not installed - skipping network check")

def check_ports_availability():
    """Check if ports are available"""
    print_header("Port Availability")
    
    try:
        import socket
        
        ports = {
            8000: "Host Agent",
            8001: "Flight Agent",
            8002: "Stay Agent",
            8003: "Activities Agent",
            8501: "Streamlit",
        }
        
        for port, service in ports.items():
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            result = sock.connect_ex(('localhost', port))
            sock.close()
            
            if result == 0:
                print_warning(f"Port {port:5} [{service:20}] - IN USE (may conflict)")
            else:
                print_success(f"Port {port:5} [{service:20}] - Available")
    
    except Exception as e:
        print_warning(f"Could not check ports: {e}")

def check_git_repo():
    """Check git repository status"""
    print_header("Git Repository")
    
    try:
        result = subprocess.run(
            ['git', 'status', '--porcelain'],
            capture_output=True,
            text=True,
            timeout=5
        )
        
        if result.returncode == 0:
            print_success("Git repository found")
            
            # Check for common issues
            if '.env' not in result.stdout:
                print_success(".env is properly ignored (.gitignore)")
            else:
                print_warning(".env might not be ignored!")
        else:
            print_warning("Not a git repository or git not available")
    
    except Exception as e:
        print_warning(f"Could not check git: {e}")

def check_file_structure():
    """Check project file structure"""
    print_header("Project Structure")
    
    required_dirs = [
        'agents/host_agent',
        'agents/flight_agent',
        'agents/stay_agent',
        'agents/activities_agent',
        'common',
    ]
    
    required_files = [
        'streamlit_app.py',
        'requirements.txt',
        '.env',
    ]
    
    for dir_name in required_dirs:
        if Path(dir_name).exists():
            print_success(f"📁 {dir_name}")
        else:
            print_error(f"📁 {dir_name} - MISSING")
    
    for file_name in required_files:
        if Path(file_name).exists():
            size = Path(file_name).stat().st_size
            print_success(f"📄 {file_name:30} ({size:,} bytes)")
        else:
            print_warning(f"📄 {file_name:30} - MISSING")

def generate_recommendations(
    packages: Dict[str, bool],
    keys: Dict[str, bool],
    servers: Dict[str, bool],
):
    """Generate recommendations based on checks"""
    print_header("Recommendations")
    
    issues = []
    
    # Package issues
    missing_packages = [k for k, v in packages.items() if not v]
    if missing_packages:
        issues.append(f"Missing packages: {', '.join(missing_packages)}")
        print_error(f"Install missing packages:\n  pip install {' '.join(missing_packages)}")
    
    # API key issues
    missing_keys = [k for k, v in keys.items() if not v]
    if missing_keys:
        issues.append(f"Missing API keys: {', '.join(missing_keys)}")
        if 'OpenAI' not in missing_keys or 'Google/Gemini' not in missing_keys:
            print_warning("At least one LLM provider is configured")
        else:
            print_error("Configure at least one LLM provider (OpenAI, Google, or Hugging Face)")
    
    # Server issues
    not_running = [k for k, v in servers.items() if not v]
    if not_running:
        print_error(f"Agents not running: {', '.join(not_running)}")
        print_info("Start agents with:")
        print_info("  uvicorn agents.host_agent.__main__:app --port 8000 &")
        print_info("  uvicorn agents.flight_agent.__main__:app --port 8001 &")
        print_info("  uvicorn agents.stay_agent.__main__:app --port 8002 &")
        print_info("  uvicorn agents.activities_agent.__main__:app --port 8003 &")
    
    if not issues:
        print_success("✅ All checks passed! Your setup looks good.")
        print_info("Start agents and then run: streamlit run streamlit_app.py")

async def main():
    """Run all diagnostics"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("╔════════════════════════════════════════════════════════╗")
    print("║     ADK A2A Trip Planner - Diagnostic Report          ║")
    print("║     Generated:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "          ║")
    print("╚════════════════════════════════════════════════════════╝")
    print(f"{Colors.END}")
    
    # Run checks
    check_python_version()
    packages = check_packages()
    keys = check_api_keys()
    check_env_file()
    check_network_connectivity()
    check_ports_availability()
    check_file_structure()
    check_git_repo()
    
    servers, failing = await check_agent_servers()
    
    # Recommendations
    generate_recommendations(packages, keys, servers)
    
    print("\n" + "="*60 + "\n")

if __name__ == "__main__":
    asyncio.run(main())
