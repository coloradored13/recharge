import React from 'react';

type BadgeVariant =
  | 'default'
  | 'great'
  | 'good'
  | 'okay'
  | 'low'
  | 'struggling';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-sage-100 text-sage-700',
  great: 'bg-green-100 text-green-700',
  good: 'bg-blue-100 text-blue-700',
  okay: 'bg-yellow-100 text-yellow-700',
  low: 'bg-orange-100 text-orange-700',
  struggling: 'bg-red-100 text-red-700',
};

export default function Badge({
  variant = 'default',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        rounded-full text-xs font-medium
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
