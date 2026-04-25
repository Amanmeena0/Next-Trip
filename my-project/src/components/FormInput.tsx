import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export function FormInput({ label, icon, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="text-label-caps font-label-caps text-outline block">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-body-md ${
            icon ? 'pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
}
