// Country flag icons - subtle, professional markers for regional FX context
// Minimal, monochrome-friendly design that works on dark backgrounds

export function GbFlag({ className = "w-5 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#012169" rx="2" />
      {/* Diagonal whites */}
      <path d="M0 0L60 40M60 0L0 40" stroke="white" strokeWidth="6" />
      {/* Diagonal reds */}
      <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="2" />
      {/* Cross whites */}
      <path d="M30 0V40M0 20H60" stroke="white" strokeWidth="10" />
      {/* Cross reds */}
      <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

export function BrFlag({ className = "w-5 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#009739" rx="2" />
      {/* Yellow diamond */}
      <path d="M30 4L56 20L30 36L4 20Z" fill="#FEDD00" />
      {/* Blue circle */}
      <circle cx="30" cy="20" r="10" fill="#012169" />
      {/* White band */}
      <path d="M20 18.5C24 16 36 16 40 21.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function UsFlag({ className = "w-5 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#B22234" rx="2" />
      {/* White stripes */}
      <rect y="3" width="60" height="3" fill="white" />
      <rect y="9" width="60" height="3" fill="white" />
      <rect y="15" width="60" height="3" fill="white" />
      <rect y="21" width="60" height="3" fill="white" />
      <rect y="27" width="60" height="3" fill="white" />
      <rect y="33" width="60" height="3" fill="white" />
      {/* Blue canton */}
      <rect width="24" height="21" fill="#3C3B6E" />
    </svg>
  )
}

export function FlagIcon({
  country,
  className = "w-5 h-4",
}: {
  country: "GB" | "BR" | "US"
  className?: string
}) {
  switch (country) {
    case "GB":
      return <GbFlag className={className} />
    case "BR":
      return <BrFlag className={className} />
    case "US":
      return <UsFlag className={className} />
  }
}
