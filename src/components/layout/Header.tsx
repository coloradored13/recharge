import React from 'react';

interface HeaderProps {
  name?: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export default function Header({ name }: HeaderProps) {
  return (
    <header className="hidden md:flex items-center justify-between h-16 px-6 border-b border-sage-100 bg-white/80 backdrop-blur-sm">
      <div>
        <h1 className="text-lg font-semibold text-sage-800">
          {getGreeting()}
          {name ? `, ${name}` : ''}
        </h1>
        <p className="text-sm text-sage-500">{formatDate()}</p>
      </div>
    </header>
  );
}
