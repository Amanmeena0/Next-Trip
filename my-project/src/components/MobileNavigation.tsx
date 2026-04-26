import { MOBILE_NAV_ITEMS } from '../constants/appConstants';

export function MobileNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 sm:py-4 bg-gradient-to-t from-nature-blue-50 to-white/90 backdrop-blur-xl border-t-2 border-nature-green-200 shadow-lg rounded-t-2xl md:rounded-t-3xl">
      {MOBILE_NAV_ITEMS.map(({ label, icon, active }) => (
        <button
          key={label}
          className={`flex flex-col items-center justify-center transition-all gap-1 px-3 sm:px-4 py-2 rounded-xl ${
            active
              ? 'text-nature-blue-900 bg-nature-green-100 border-2 border-nature-green-300 font-semibold'
              : 'text-nature-brown-600 hover:text-nature-blue-700 hover:bg-nature-blue-50 border-2 border-transparent'
          }`}
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">{icon}</span>
          <span className="text-xs font-semibold">{label}</span>
        </button>
      ))}
    </nav>
  );
}
