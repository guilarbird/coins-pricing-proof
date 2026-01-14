type Locale = "en" | "pt"

export function formatCurrency(amount: number, currency: "GBP" | "BRL" | "USD" | "USDT", locale: Locale): string {
  const localeString = locale === "pt" ? "pt-BR" : "en-GB"

  // USDT is not a standard ISO currency, handle separately
  if (currency === "USDT") {
    const formatted = new Intl.NumberFormat(localeString, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
    return `${formatted} USDT`
  }

  return new Intl.NumberFormat(localeString, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(amount: number, locale: Locale): string {
  const localeString = locale === "pt" ? "pt-BR" : "en-GB"

  return new Intl.NumberFormat(localeString, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatBps(bps: number): string {
  return `${bps} bps`
}

export function formatPercent(value: number, locale: Locale): string {
  const localeString = locale === "pt" ? "pt-BR" : "en-GB"

  return new Intl.NumberFormat(localeString, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100)
}

export function formatRate(rate: number, locale: Locale, decimals = 4): string {
  const localeString = locale === "pt" ? "pt-BR" : "en-GB"

  return new Intl.NumberFormat(localeString, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(rate)
}
