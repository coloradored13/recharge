'use client';

import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Textarea({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-sage-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-3 py-2 rounded-lg border
          text-sage-900 placeholder-sage-400
          transition-colors duration-200
          resize-y min-h-[100px]
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
