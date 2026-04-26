import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export function FormInput({ label, icon, ...props }: InputProps) {
  return (
    <div className="space-y-2 sm:space-y-2.5">
      <label className="text-sm sm:text-base font-semibold text-nature-blue-900 block">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white border border-nature-green-300 rounded-lg md:rounded-lg focus:ring-2 focus:ring-nature-green-400 focus:border-nature-green-600 focus:outline-none transition-all text-sm sm:text-base placeholder:text-nature-brown-500 hover:border-nature-green-400 ${
            icon ? 'pl-9 sm:pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
}
