// Currency icons - monochrome/ice-metal palette for Coins.xyz theme
// All inline SVG, no external URLs
"use client"

import Image from "next/image"

export function getCurrencySymbol(currency: string): string {
  switch (currency) {
    case "GBP":
      return "£"
    case "USD":
      return "$"
    case "BRL":
      return "R$"
    case "USDT":
      return "₮"
    default:
      return currency
  }
}

export function GbpIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Clip to circle */}
      <clipPath id="gbpCircle">
        <circle cx="12" cy="12" r="11" />
      </clipPath>
      <g clipPath="url(#gbpCircle)">
        {/* Blue background */}
        <rect x="0" y="0" width="24" height="24" fill="#012169" />
        {/* White diagonal stripes */}
        <path d="M0 0 L24 24 M24 0 L0 24" stroke="white" strokeWidth="4" />
        {/* Red diagonal stripes (thinner) */}
        <path d="M0 0 L24 24 M24 0 L0 24" stroke="#C8102E" strokeWidth="2" />
        {/* White cross */}
        <path d="M12 0 V24 M0 12 H24" stroke="white" strokeWidth="6" />
        {/* Red cross */}
        <path d="M12 0 V24 M0 12 H24" stroke="#C8102E" strokeWidth="3.5" />
      </g>
      {/* Circle border */}
      <circle cx="12" cy="12" r="11" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
    </svg>
  )
}

export function UsdIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Clip to circle */}
      <clipPath id="usdCircle">
        <circle cx="12" cy="12" r="11" />
      </clipPath>
      <g clipPath="url(#usdCircle)">
        {/* Red and white stripes */}
        <rect x="0" y="0" width="24" height="24" fill="#B22234" />
        <rect x="0" y="1.85" width="24" height="1.85" fill="white" />
        <rect x="0" y="5.54" width="24" height="1.85" fill="white" />
        <rect x="0" y="9.23" width="24" height="1.85" fill="white" />
        <rect x="0" y="12.92" width="24" height="1.85" fill="white" />
        <rect x="0" y="16.62" width="24" height="1.85" fill="white" />
        <rect x="0" y="20.31" width="24" height="1.85" fill="white" />
        {/* Blue canton */}
        <rect x="0" y="0" width="10" height="13" fill="#3C3B6E" />
        {/* Stars (simplified 5x4 grid) */}
        <g fill="white">
          {/* Row 1 */}
          <circle cx="1.5" cy="1.5" r="0.6" />
          <circle cx="3.5" cy="1.5" r="0.6" />
          <circle cx="5.5" cy="1.5" r="0.6" />
          <circle cx="7.5" cy="1.5" r="0.6" />
          <circle cx="9" cy="1.5" r="0.6" />
          {/* Row 2 */}
          <circle cx="2.5" cy="3" r="0.6" />
          <circle cx="4.5" cy="3" r="0.6" />
          <circle cx="6.5" cy="3" r="0.6" />
          <circle cx="8.5" cy="3" r="0.6" />
          {/* Row 3 */}
          <circle cx="1.5" cy="4.5" r="0.6" />
          <circle cx="3.5" cy="4.5" r="0.6" />
          <circle cx="5.5" cy="4.5" r="0.6" />
          <circle cx="7.5" cy="4.5" r="0.6" />
          <circle cx="9" cy="4.5" r="0.6" />
          {/* Row 4 */}
          <circle cx="2.5" cy="6" r="0.6" />
          <circle cx="4.5" cy="6" r="0.6" />
          <circle cx="6.5" cy="6" r="0.6" />
          <circle cx="8.5" cy="6" r="0.6" />
          {/* Row 5 */}
          <circle cx="1.5" cy="7.5" r="0.6" />
          <circle cx="3.5" cy="7.5" r="0.6" />
          <circle cx="5.5" cy="7.5" r="0.6" />
          <circle cx="7.5" cy="7.5" r="0.6" />
          <circle cx="9" cy="7.5" r="0.6" />
          {/* Row 6 */}
          <circle cx="2.5" cy="9" r="0.6" />
          <circle cx="4.5" cy="9" r="0.6" />
          <circle cx="6.5" cy="9" r="0.6" />
          <circle cx="8.5" cy="9" r="0.6" />
          {/* Row 7 */}
          <circle cx="1.5" cy="10.5" r="0.6" />
          <circle cx="3.5" cy="10.5" r="0.6" />
          <circle cx="5.5" cy="10.5" r="0.6" />
          <circle cx="7.5" cy="10.5" r="0.6" />
          <circle cx="9" cy="10.5" r="0.6" />
          {/* Row 8 */}
          <circle cx="2.5" cy="12" r="0.6" />
          <circle cx="4.5" cy="12" r="0.6" />
          <circle cx="6.5" cy="12" r="0.6" />
          <circle cx="8.5" cy="12" r="0.6" />
        </g>
      </g>
      {/* Circle border */}
      <circle cx="12" cy="12" r="11" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
    </svg>
  )
}

export function BrlIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Green circle background */}
      <circle cx="12" cy="12" r="11" fill="#009c3b" />
      {/* Yellow diamond */}
      <polygon points="12,3 22,12 12,21 2,12" fill="#ffdf00" />
      {/* Blue globe */}
      <circle cx="12" cy="12" r="5" fill="#002776" />
      {/* White curved band */}
      <path d="M7.5 12.5 Q12 10 16.5 12.5" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function UsdtIcon({
  className = "w-6 h-6",
  variant = "color",
}: { className?: string; variant?: "color" | "bw" }) {
  const src = variant === "bw" ? "/logo-tether-bw.jpg" : "/logo-tether.png"
  return (
    <div className={`${className} rounded-full overflow-hidden`}>
      <Image src={src || "/placeholder.svg"} alt="USDT" width={24} height={24} className="w-full h-full object-cover" />
    </div>
  )
}

export function BarclaysIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full overflow-hidden bg-[#00aeef] flex items-center justify-center`}>
      <Image
        src="/logo-barclays.png"
        alt="Barclays"
        width={24}
        height={24}
        className="w-[70%] h-[70%] object-contain"
      />
    </div>
  )
}

export function HsbcIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-md overflow-hidden bg-white flex items-center justify-center p-0.5`}>
      <Image src="/logo-hsbc.png" alt="HSBC" width={40} height={40} className="w-full h-full object-contain" />
    </div>
  )
}

export function BnyMellonIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-md overflow-hidden bg-white flex items-center justify-center p-0.5`}>
      <Image
        src="/logo-bny-mellon.png"
        alt="BNY Mellon"
        width={40}
        height={40}
        className="w-full h-full object-contain"
      />
    </div>
  )
}

export function BtgIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-md overflow-hidden bg-[#0a1e3c] flex items-center justify-center`}>
      <Image src="/logo-btg.png" alt="BTG Pactual" width={24} height={24} className="w-[85%] h-[85%] object-contain" />
    </div>
  )
}

export function CoinbaseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blue circle background */}
      <circle cx="12" cy="12" r="11" fill="#0052FF" />
      {/* White "C" letter */}
      <path
        d="M12 6C8.686 6 6 8.686 6 12s2.686 6 6 6c2.21 0 4.14-1.2 5.18-2.98l-2.6-1.5c-.52.9-1.5 1.48-2.58 1.48-1.66 0-3-1.34-3-3s1.34-3 3-3c1.08 0 2.06.58 2.58 1.48l2.6-1.5C16.14 7.2 14.21 6 12 6z"
        fill="white"
      />
    </svg>
  )
}

export function CurrencyIcon({
  currency,
  className = "w-6 h-6",
}: {
  currency: "GBP" | "USD" | "BRL" | "USDT" | "HSBC" | "BNY_MELLON" | "BTG" | "COINBASE"
  className?: string
}) {
  switch (currency) {
    case "GBP":
      return <GbpIcon className={className} />
    case "USD":
      return <UsdIcon className={className} />
    case "BRL":
      return <BrlIcon className={className} />
    case "USDT":
      return <UsdtIcon className={className} variant="color" />
    case "HSBC":
      return <HsbcIcon className={className} />
    case "BNY_MELLON":
      return <BnyMellonIcon className={className} />
    case "BTG":
      return <BtgIcon className={className} />
    case "COINBASE":
      return <CoinbaseIcon className={className} />
  }
}
