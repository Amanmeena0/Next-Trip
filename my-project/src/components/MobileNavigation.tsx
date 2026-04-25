import { MOBILE_NAV_ITEMS } from '../constants/appConstants';

export function MobileNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 shadow-[0_-4px_20px_rgba(15,82,186,0.08)] rounded-t-2xl">
      {MOBILE_NAV_ITEMS.map(({ label, icon, active }) => (
        <button
          key={label}
          className={`flex flex-col items-center justify-center transition-colors gap-1 px-4 py-1 rounded-xl ${
            active
              ? 'text-primary bg-blue-50/50'
              : 'text-outline hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined">{icon}</span>
          <span className="text-xs font-button">{label}</span>
        </button>
      ))}
    </nav>
  );
}
