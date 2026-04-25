import { TIP_CARDS } from '../constants/appConstants';

export function TipCardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {TIP_CARDS.map(({ icon, title, text, bg, titleColor, textColor }) => (
        <div key={title} className={`p-4 ${bg} rounded-xl`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`material-symbols-outlined ${titleColor}`}>
              {icon}
            </span>
            <h4 className={`font-bold text-sm ${titleColor}`}>{title}</h4>
          </div>
          <p className={`text-xs ${textColor} leading-relaxed`}>{text}</p>
        </div>
      ))}
    </div>
  );
}
