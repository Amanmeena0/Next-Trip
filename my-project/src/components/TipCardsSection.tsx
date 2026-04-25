import { TIP_CARDS } from '../constants/appConstants';

export function TipCardsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {TIP_CARDS.map(({ icon, title, text, bg, titleColor, textColor }) => (
        <div key={title} className={`p-3 sm:p-4 ${bg} rounded-lg sm:rounded-xl hover:shadow-md transition-shadow`}>
          <div className="flex items-start gap-2 mb-2">
            <span className={`material-symbols-outlined ${titleColor} flex-shrink-0 text-lg`}>
              {icon}
            </span>
            <h4 className={`font-bold text-xs sm:text-sm ${titleColor} flex-1`}>{title}</h4>
          </div>
          <p className={`text-xs ${textColor} leading-relaxed`}>{text}</p>
        </div>
      ))}
    </div>
  );
}
