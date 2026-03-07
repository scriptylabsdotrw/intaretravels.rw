interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  theme?: 'light' | 'dark';
}

export function Breadcrumb({ items, theme = 'dark' }: BreadcrumbProps) {
  const isDark = theme === 'dark';
  
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <svg 
                className={`w-4 h-4 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <a 
                href={item.href} 
                className={`text-sm font-medium transition-colors ${
                  isDark 
                    ? 'text-neutral-400 hover:text-white' 
                    : 'text-neutral-600 hover:text-primary-700'
                }`}
              >
                {item.label}
              </a>
            ) : (
              <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
