export function BankIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 6v3h20V6L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 9v9a2 2 0 002 2h16a2 2 0 002-2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13v4M15 13v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WiseIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CoinsIcon() {
  const gradientId = `coins-gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#${gradientId})`} opacity="0.2" stroke={`url(#${gradientId})`} strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill={`url(#${gradientId})`} />
      <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
