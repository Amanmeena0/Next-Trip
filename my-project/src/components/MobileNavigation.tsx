import { MOBILE_NAV_ITEMS } from '../constants/appConstants';

export function MobileNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-3 sm:px-4 py-3 sm:py-4 bg-[#fbf5eb]/96 border-t border-[#e2ccae] shadow-lg backdrop-blur-md">
      {MOBILE_NAV_ITEMS.map(({ label, icon, active }) => (
        <button
          key={label}
          className={`flex flex-col items-center justify-center transition-all gap-1.5 px-3 sm:px-4 py-2 rounded-lg ${
            active
              ? 'text-nature-brown-800 bg-[#ead7bc] font-semibold'
              : 'text-nature-brown-600 hover:text-nature-brown-800 hover:bg-[#f4e7d4]'
          }`}
        >
          <span className="text-lg sm:text-xl">{icon === 'explore' ? '🔍' : icon === 'edit_calendar' ? '📅' : icon === 'map' ? '🗺️' : '👤'}</span>
          <span className="text-xs sm:text-sm font-semibold">{label}</span>
        </button>
      ))}
    </nav>
  );
}
