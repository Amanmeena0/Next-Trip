import { MOBILE_NAV_ITEMS } from '../constants/appConstants';

export function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 z-50 flex w-full items-center justify-around border-t border-primary/25 bg-primary/95 px-3 py-3 text-primary-foreground shadow-lift backdrop-blur-xl md:hidden sm:px-4 sm:py-4">
      {MOBILE_NAV_ITEMS.map(({ label, icon, active }) => (
        <button
          key={label}
          className={`flex flex-col items-center justify-center gap-1.5 rounded-xl px-3 py-2 transition-all sm:px-4 ${
            active
              ? 'bg-white/15 font-semibold text-primary-foreground'
              : 'text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground'
          }`}
        >
          <span className="text-lg sm:text-xl">{icon === 'explore' ? '🔍' : icon === 'edit_calendar' ? '📅' : icon === 'map' ? '🗺️' : '👤'}</span>
          <span className="text-xs sm:text-sm font-semibold">{label}</span>
        </button>
      ))}
    </nav>
  );
}
