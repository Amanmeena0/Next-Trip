import streamlit as st
import requests


def render_section(title: str, value):
    st.subheader(title)
    if isinstance(value, (list, dict)):
        st.json(value)
    else:
        st.markdown(str(value))


st.set_page_config(page_title="ADK-Powered Travel Planner", page_icon="✈️")
st.title("🌍 ADK-Powered Travel Planner")
origin = st.text_input("Where are you flying from?", placeholder="e.g., New York")
destination = st.text_input("Destination", placeholder="e.g., Paris")
start_date = st.date_input("Start Date")
end_date = st.date_input("End Date")
budget = st.number_input("Budget (in USD)", min_value=100, step=50)
if st.button("Plan My Trip ✨"):
    if not all([origin, destination, start_date, end_date, budget]):
        st.warning("Please fill in all the details.")
    else:
        payload = {
            "origin": origin,
            "destination": destination,
            "start_date": str(start_date),
            "end_date": str(end_date),
            "budget": budget
        }
        try:
            response = requests.post("http://localhost:8000/run", json=payload, timeout=60)
            if response.ok:
                data = response.json()
                render_section("✈️ Flights", data.get("flights", "No flights returned."))
                render_section("🏨 Stays", data.get("stay", "No stay options returned."))
                render_section("🗺️ Activities", data.get("activities", "No activities found."))
            else:
                st.error(f"Failed to fetch travel plan ({response.status_code}).")
                if response.text:
                    st.code(response.text)
        except requests.RequestException:
            st.error("Could not connect to host agent at http://localhost:8000/run. Start the host service and try again.")