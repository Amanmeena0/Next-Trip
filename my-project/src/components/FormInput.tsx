import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export function FormInput({ label, icon, ...props }: InputProps) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="text-xs sm:text-label-caps font-label-caps text-outline block">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm pointer-events-none">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all text-sm sm:text-body-md placeholder:text-outline-variant ${
            icon ? 'pl-9 sm:pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
}
