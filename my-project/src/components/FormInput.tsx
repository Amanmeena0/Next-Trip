import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export function FormInput({ label, icon, ...props }: InputProps) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="text-xs sm:text-sm font-semibold text-nature-blue-700 block">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-nature-blue-600 text-sm pointer-events-none">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-nature-green-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-nature-blue-400 focus:border-nature-blue-600 focus:outline-none transition-all text-sm sm:text-base placeholder:text-nature-brown-400 hover:border-nature-green-300 ${
            icon ? 'pl-9 sm:pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
}
