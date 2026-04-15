import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  header?: string;
}

export default function Card({
  children,
  className = '',
  padding = true,
  header,
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm border border-sage-100
        ${padding ? 'p-6' : ''}
        ${className}
      `}
    >
      {header && (
        <h3 className="text-lg font-semibold text-sage-800 mb-4">{header}</h3>
      )}
      {children}
    </div>
  );
}
