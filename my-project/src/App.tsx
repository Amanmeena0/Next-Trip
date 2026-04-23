import { useState } from "react";

type NavItem = { label: string; icon: string; active: boolean };
type BudgetCategory = { icon: string; label: string; value: string; color: string };
type TipCard = { icon: string; title: string; text: string; bg: string; titleColor: string; textColor: string };

const mobileNavItems: NavItem[] = [
  { label: "Explore", icon: "explore", active: false },
  { label: "Plan", icon: "edit_calendar", active: true },
  { label: "Trips", icon: "map", active: false },
  { label: "Profile", icon: "person", active: false },
];

const budgetCategories: BudgetCategory[] = [
  { icon: "flight", label: "Flights", value: "$850", color: "text-blue-600" },
  { icon: "hotel", label: "Stay", value: "$1,200", color: "text-green-600" },
  { icon: "restaurant", label: "Daily", value: "$450", color: "text-orange-600" },
];

const tipCards: TipCard[] = [
  {
    icon: "tips_and_updates",
    title: "Insider Tip",
    text: "Book your Shinkansen tickets 2 weeks in advance for better rates.",
    bg: "bg-[#0059a0]/10 border border-[#0059a0]/20",
    titleColor: "text-[#004178]",
    textColor: "text-[#004883]",
  },
  {
    icon: "verified",
    title: "Best Value",
    text: "The JR Pass might not be worth it for this specific route. Use IC cards.",
    bg: "bg-[#6bfe9c]/10 border border-[#6bfe9c]/20",
    titleColor: "text-[#006d37]",
    textColor: "text-[#00743a]",
  },
];

export default function TripFlow() {
  const [budget, setBudget] = useState<number>(2500);
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [planned, setPlanned] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePlanTrip = () => {
    if (!origin || !destination) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPlanned(true);
    }, 1200);
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-[Manrope] antialiased min-h-screen">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
        .glass-panel { background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        input[type=range]::-webkit-slider-thumb { background: #003c90; }
        input[type=range] { accent-color: #003c90; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.8s linear infinite; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-blue-700">travel_explore</span>
          <h1 className="text-xl font-bold tracking-tight text-blue-700" style={{ fontFamily: "Plus Jakarta Sans" }}>
            TripFlow
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-6">
            {["Plan", "Explore", "Trips"].map((item, i) => (
              <a
                key={item}
                href="#"
                className={`font-semibold text-sm transition-colors ${i === 0 ? "text-blue-700" : "text-slate-500 hover:text-blue-600"}`}
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="w-8 h-8 rounded-full bg-[#d9e2ff] flex items-center justify-center overflow-hidden border border-[#0f52ba]/20">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeMjNq8abFuMV5k1texBCe138GU6_0q2kEEgBLP8hy0qbU9Z_rDiNi0TcXMdYaPAI1PzBIoPTv6M1Htz3bnDEYq944WpS8z6d050F5YrNIPj5iiNEXBV85v7UkbZnm6ioZZdMb8y0Gj_HXzwNtRj3xIOWSGd0klUMgLxlTb0Dh6CIWipCeFunf13vNXr8X9hAZuBWyzvx2ddxHR6wljYs3A2zS6RkIok43W9QiRDhAZRZpy4FXZeOwo1DtymPDWYZpLhTJL7w5-rw"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Panel */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-xl shadow-[0_-4px_20px_rgba(15,82,186,0.08)] border border-white/50">
              <div className="mb-6">
                <h2 className="text-3xl font-semibold text-[#003c90] mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>
                  Create New Itinerary
                </h2>
                <p className="text-sm text-[#434653]">Tell us where you want to go and we'll handle the rest.</p>
              </div>

              <div className="space-y-6">
                {/* Origin & Destination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#737784] block">Origin</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737784] text-sm">location_on</span>
                      <input
                        type="text"
                        placeholder="City, Country"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#c3c6d5] rounded-lg focus:ring-2 focus:ring-[#003c90]/20 focus:outline-none transition-all text-base"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#737784] block">Destination</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737784] text-sm">flight_land</span>
                      <input
                        type="text"
                        placeholder="Where to?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#c3c6d5] rounded-lg focus:ring-2 focus:ring-[#003c90]/20 focus:outline-none transition-all text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#737784] block">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#c3c6d5] rounded-lg focus:ring-2 focus:ring-[#003c90]/20 focus:outline-none transition-all text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#737784] block">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#c3c6d5] rounded-lg focus:ring-2 focus:ring-[#003c90]/20 focus:outline-none transition-all text-base"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-4 pt-4 border-t border-[#c3c6d5]/30">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#737784]">Budget Range</label>
                    <span className="px-3 py-1 bg-[#6bfe9c] text-[#00743a] rounded-full text-xs font-bold">
                      ${budget.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={10000}
                    step={100}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-[#e6e8ea] rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#737784] font-semibold uppercase">
                    <span>$500 (Budget)</span>
                    <span>$10k (Luxury)</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handlePlanTrip}
                  disabled={loading}
                  className="w-full py-4 bg-[#003c90] text-white rounded-xl font-semibold text-base shadow-lg shadow-[#003c90]/20 active:scale-95 duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined spinner text-xl">autorenew</span>
                      Planning...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">auto_awesome</span>
                      Plan My Trip
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Promo Card */}
            <div className="relative overflow-hidden rounded-xl h-48 group cursor-pointer">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7qXqw-X_vNKOrrRcziUy0FvnCz6tZhIIFZf5bPjXWWD4pUMg4dlhNu1qMB5N0QSNTPhgSYQ3CfbLkMuIw1frE0d-jn79cA0V1qBClrnZR9_kzUmhbWCiUvy87pUVBVLMogJcuQO_O5YmkBrb5YG8olfnRUWA_G9qrzWnlOI3WTk9LG8hPG0mAJodPKejyK08msWsKChiP_Paq9Dy8NY8cLbFaUxArXxYHHIKaWXNxyiO1ten9GfEKyQj8RpNhofqkSG9X6engoCQ"
                alt="Scenic alpine lake"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">Travel Insight</span>
                <h3 className="text-white text-2xl font-semibold leading-tight" style={{ fontFamily: "Plus Jakarta Sans" }}>
                  Explore the Alps this Autumn
                </h3>
              </div>
            </div>
          </section>

          {/* Right Panel */}
          <section className="lg:col-span-7">
            <div className="h-full flex flex-col gap-6">
              {!planned ? (
                /* Empty State */
                <div className="flex-1 glass-panel border-2 border-dashed border-[#c3c6d5]/50 rounded-2xl flex flex-col items-center justify-center p-12 text-center min-h-72">
                  <div className="w-20 h-20 rounded-full bg-[#eceef0] flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-[#737784]/50">map</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#191c1e] mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>
                    Ready to explore?
                  </h3>
                  <p className="max-w-xs mx-auto text-[#434653] text-base">
                    Fill out the form to generate a customized AI trip summary, budget breakdown, and itinerary tips.
                  </p>
                </div>
              ) : (
                /* Populated State */
                <div className="flex flex-col gap-6 animate-[fadeIn_0.4s_ease-out]">
                  <style>{`@keyframes fadeIn { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }`}</style>

                  {/* Itinerary Hero Card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-l-4 border-blue-600">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-[#003c90]" style={{ fontFamily: "Plus Jakarta Sans" }}>
                            {destination ? `7 Days in ${destination}` : "7 Days in Kyoto"}
                          </h3>
                          <p className="text-[#434653] text-sm mt-1">
                            {startDate && endDate ? `${startDate} – ${endDate}` : "Oct 12 – Oct 19"} • ${budget.toLocaleString()} Budget
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">Planned</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        {budgetCategories.map(({ icon, label, value, color }) => (
                          <div key={label} className="p-4 bg-[#f7f9fb] rounded-xl">
                            <span className={`material-symbols-outlined ${color} mb-2 block`}>{icon}</span>
                            <p className="text-xs text-[#737784] font-bold uppercase tracking-wider">{label}</p>
                            <p className="font-bold text-[#191c1e]">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tip Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tipCards.map(({ icon, title, text, bg, titleColor, textColor }) => (
                      <div key={title} className={`p-4 ${bg} rounded-xl`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`material-symbols-outlined ${titleColor}`}>{icon}</span>
                          <h4 className={`font-bold text-sm ${titleColor}`}>{title}</h4>
                        </div>
                        <p className={`text-xs ${textColor} leading-relaxed`}>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 shadow-[0_-4px_20px_rgba(15,82,186,0.08)] rounded-t-2xl">
        {mobileNavItems.map(({ label, icon, active }) => (
          <button
            key={label}
            className={`flex flex-col items-center justify-center transition-colors ${active ? "text-blue-700 bg-blue-50/50 rounded-xl px-4 py-1" : "text-slate-400"}`}
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: "Plus Jakarta Sans" }}>{label}</span>
          </button>
        ))}
      </nav>

      {/* FAB */}
      <button className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[#0f52ba] text-[#bcceff] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 lg:hidden">
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  );
}