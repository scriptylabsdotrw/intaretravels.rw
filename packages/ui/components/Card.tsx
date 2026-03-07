import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-200 ${
        hover ? 'transition-shadow hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
