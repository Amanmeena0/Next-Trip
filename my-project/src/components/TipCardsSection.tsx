import { TIP_CARDS } from '../constants/appConstants';

export function TipCardsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
      {TIP_CARDS.map(({ icon, title, text, bg, titleColor, textColor }) => (
        <div key={title} className={`p-4 sm:p-5 md:p-6 ${bg} rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105`}>
          <div className="flex items-start gap-3 md:gap-4 mb-2 md:mb-3">
            <span className={`material-symbols-outlined ${titleColor} flex-shrink-0 text-xl md:text-2xl`}>
              {icon}
            </span>
            <h4 className={`font-bold text-sm md:text-base ${titleColor} flex-1`}>{title}</h4>
          </div>
          <p className={`text-xs md:text-sm ${textColor} leading-relaxed`}>{text}</p>
        </div>
      ))}
    </div>
  );
}
