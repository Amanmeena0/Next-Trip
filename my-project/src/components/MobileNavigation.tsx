import { MOBILE_NAV_ITEMS } from '../constants/appConstants';

export function MobileNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-3 sm:px-4 py-3 sm:py-4 bg-white border-t border-nature-green-300 shadow-lg">
      {MOBILE_NAV_ITEMS.map(({ label, icon, active }) => (
        <button
          key={label}
          className={`flex flex-col items-center justify-center transition-all gap-1.5 px-3 sm:px-4 py-2 rounded-lg ${
            active
              ? 'text-nature-green-700 bg-nature-green-100 font-semibold'
              : 'text-nature-brown-600 hover:text-nature-blue-700 hover:bg-nature-blue-50'
          }`}
        >
          <span className="text-lg sm:text-xl">{icon === 'explore' ? '🔍' : icon === 'edit_calendar' ? '📅' : icon === 'map' ? '🗺️' : '👤'}</span>
          <span className="text-xs sm:text-sm font-semibold">{label}</span>
        </button>
      ))}
    </nav>
  );
}
