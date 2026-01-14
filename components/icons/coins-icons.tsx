// Coins.xyz Custom Iconography System
// Consistent visual language: 1.5px stroke, 2px corner radius, geometric forms
// Designed for institutional FX infrastructure aesthetic

import { cn } from "@/lib/utils"

interface IconProps {
  className?: string
  strokeWidth?: number
}

const defaultProps = {
  strokeWidth: 1.5,
}

// === NAVIGATION & UI ===

export function ChevronDownIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronRightIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowDownIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5v14M5 12l7 7 7-7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowRightIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CloseIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MenuIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

// === FX & TRADING ===

export function ExchangeIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 10L3 14l4 4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21 14H3" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        d="M17 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 10h18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function TrendUpIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 7l-8.5 8.5-5-5L2 17"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 7h6v6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TrendDownIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 17l-8.5-8.5-5 5L2 7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17h6v-6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChartBarIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="10" y="7" width="4" height="14" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  )
}

export function WalletIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M16 13h2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M6 6V5a2 2 0 012-2h8a2 2 0 012 2v1" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  )
}

// === SETTLEMENT & INFRASTRUCTURE ===

export function BlockchainIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

export function NetworkIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="5" cy="19" r="2.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="19" cy="19" r="2.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M12 7.5v4M10 13l-3.5 3.5M14 13l3.5 3.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  )
}

export function LayersIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path
        d="M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17l10 5 10-5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ShieldIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LockIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  )
}

// === DOCUMENTS & INFO ===

export function DocumentIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function InfoIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function QuestionIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M9 9a3 3 0 115 2.83c-.53.36-1 .85-1 1.46V14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  )
}

// === STATUS ===

export function CheckCircleIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M8 12l3 3 5-6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AlertCircleIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function ClockIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// === USERS & ENTITIES ===

export function UserIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function BuildingIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="3" width="16" height="18" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M9 21V17h6v4" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="8" y="7" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="13" y="7" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="8" y="12" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect x="13" y="12" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  )
}

export function GlobeIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={strokeWidth} />
      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M2 12h20" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M12 2c3 3.5 3 14.5 0 20" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

// === ACTIONS ===

export function SendIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
}

export function ReceiveIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10l5 5 5-5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 15V3" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function RefreshIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 4v6h-6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 20v-6h6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 10A9 9 0 005.6 5.6L3 8M3 14a9 9 0 0015.4 4.4L21 16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ExternalLinkIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 3h6v6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14L21 3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// === FLOW DIAGRAM SPECIFIC ===

export function SwiftIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Multiple parallel horizontal lines representing SWIFT network */}
      <path d="M2 6h20" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M4 10h16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M6 14h12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M8 18h8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Vertical connectors */}
      <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="18" cy="6" r="1.5" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  )
}

export function BankBuildingIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21h18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M5 21V11" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M19 21V11" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M9 21V14h6v7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M12 3l10 8H2l10-8z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      {/* Columns */}
      <path d="M7 11v7M17 11v7" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  )
}

export function OnChainRailIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central node */}
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Radiating connections */}
      <path d="M12 3v6M12 15v6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M3 12h6M15 12h6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Corner nodes */}
      <circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="12" cy="21" r="1.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="3" cy="12" r="1.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="21" cy="12" r="1.5" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  )
}

export function OtcDeskIcon({ className, strokeWidth = defaultProps.strokeWidth }: IconProps) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Desk surface */}
      <rect x="3" y="8" width="18" height="10" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Screen/terminal */}
      <rect x="7" y="4" width="10" height="6" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Data lines on screen */}
      <path d="M9 6h6M9 8h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
      {/* Support */}
      <path d="M10 18v2M14 18v2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}
