import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 4 | 6 | 8;
  className?: string;
}

export function Grid({ children, cols = 3, gap = 6, className = '' }: GridProps) {
  const colsClass = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[cols];

  const gapClass = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  }[gap];

  return (
    <div className={`grid grid-cols-1 ${colsClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
}
