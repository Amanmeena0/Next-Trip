import { TIP_CARDS } from '../constants/appConstants';

export function TipCardsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
      {TIP_CARDS.map(({ icon, title, text, bg, titleColor, textColor }) => (
        <div
          key={title}
          className={`surface-panel cursor-pointer p-4 transition-all duration-300 hover:shadow-lift sm:p-5 md:p-6 ${bg}`}
        >
          <div className="flex items-start gap-3 md:gap-4 mb-2 md:mb-3">
            <span className={`material-symbols-outlined ${titleColor} shrink-0 text-xl md:text-2xl`}>
              {icon}
            </span>
            <h4 className={`font-bold text-sm md:text-base ${titleColor} flex-1`}>
              {title}
            </h4>
          </div>
          <p className={`text-xs md:text-sm ${textColor} leading-relaxed`}>
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}
