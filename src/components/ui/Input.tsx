'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-sage-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-3 py-2 rounded-lg border
          text-sage-900 placeholder-sage-400
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-0
          ${
            error
              ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
              : 'border-sage-200 focus:ring-sage-500 focus:border-sage-500'
          }
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-sage-500">{helperText}</p>
      )}
    </div>
  );
}
