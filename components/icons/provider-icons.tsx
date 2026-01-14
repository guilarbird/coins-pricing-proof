// Provider icons - uses real logos for BTG, Wise, Barclays, Tether, Binance, Valor PRO, and Coins.xyz symbol
// Logo images stored in /public

import Image from "next/image"

export function BankIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <Image
      src="/logo-btg.png"
      alt="BTG Pactual"
      width={24}
      height={24}
      className={`${className} object-contain rounded-sm`}
    />
  )
}

export function WiseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <Image
      src="/logo-wise.png"
      alt="Wise"
      width={24}
      height={24}
      className={`${className} object-contain rounded-sm`}
    />
  )
}

export function BarclaysIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <Image src="/logo-barclays.png" alt="Barclays" width={24} height={24} className={`${className} object-contain`} />
  )
}

export function TetherIcon({
  className = "w-6 h-6",
  variant = "color",
}: { className?: string; variant?: "color" | "bw" }) {
  return (
    <Image
      src={variant === "bw" ? "/logo-tether-bw.jpg" : "/logo-tether.png"}
      alt="Tether USDT"
      width={24}
      height={24}
      className={`${className} object-contain`}
    />
  )
}

export function BinanceIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <Image
      src="/logo-binance.jpg"
      alt="Binance"
      width={24}
      height={24}
      className={`${className} object-contain rounded-sm`}
    />
  )
}

export function ValorProIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <Image
      src="/logo-valorpro.jpg"
      alt="Valor PRO"
      width={24}
      height={24}
      className={`${className} object-contain rounded-sm`}
    />
  )
}

export function CoinsIcon({
  className = "w-6 h-6",
  variant = "colored",
}: { className?: string; variant?: "colored" | "white" | "black" }) {
  const src =
    variant === "white"
      ? "/coins-symbol-white.png"
      : variant === "black"
        ? "/coins-symbol-black.png"
        : "/coins-symbol-colored.png"

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt="Coins.xyz"
      width={24}
      height={24}
      className={`${className} object-contain`}
    />
  )
}

export function ProviderIcon({
  provider,
  className = "w-5 h-5",
}: {
  provider: "bank" | "wise" | "coins" | "barclays" | "tether" | "binance" | "valorpro"
  className?: string
}) {
  switch (provider) {
    case "bank":
      return <BankIcon className={className} />
    case "wise":
      return <WiseIcon className={className} />
    case "coins":
      return <CoinsIcon className={className} variant="colored" />
    case "barclays":
      return <BarclaysIcon className={className} />
    case "tether":
      return <TetherIcon className={className} variant="color" />
    case "binance":
      return <BinanceIcon className={className} />
    case "valorpro":
      return <ValorProIcon className={className} />
    default:
      return null
  }
}

export function ProviderLogo({
  provider,
  showName = true,
  size = "md",
  className = "",
}: {
  provider: "bank" | "wise" | "coins" | "barclays" | "tether" | "binance" | "valorpro"
  showName?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const sizes = {
    sm: { icon: "w-4 h-4", text: "text-xs" },
    md: { icon: "w-5 h-5", text: "text-sm" },
    lg: { icon: "w-6 h-6", text: "text-base" },
  }

  const names = {
    bank: "BTG Pactual",
    wise: "Wise",
    coins: "Coins.xyz",
    barclays: "Barclays",
    tether: "Tether USDT",
    binance: "Binance",
    valorpro: "Valor PRO",
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ProviderIcon provider={provider} className={sizes[size].icon} />
      {showName && <span className={`font-medium ${sizes[size].text}`}>{names[provider]}</span>}
    </div>
  )
}
