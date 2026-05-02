import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export function FormInput({ label, icon, ...props }: InputProps) {
  return (
    <div className="space-y-2 sm:space-y-2.5">
      <label className="section-label block">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className={`input-field ${
            icon ? 'pl-9 sm:pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
}
