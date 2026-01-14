export type Language = 'pt' | 'en' | 'zh';

/**
 * Format currency based on language/locale
 * PT-BR: R$ 1.000,00 (dot for thousands, comma for decimal)
 * EN: R$ 1,000.00 (comma for thousands, dot for decimal)
 * ZH: ¥1,000.00 (comma for thousands, dot for decimal)
 */
export function formatCurrency(amount: number, currency: 'BRL' | 'GBP', language: Language): string {
  let locale = 'en-GB'; // Default
  
  if (language === 'pt') {
    locale = 'pt-BR';
  } else if (language === 'en') {
    locale = 'en-GB';
  } else if (language === 'zh') {
    locale = 'zh-CN';
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback if locale not supported
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/**
 * Format number with locale-specific separators
 * PT-BR: 1.000,00
 * EN: 1,000.00
 */
export function formatNumber(amount: number, language: Language, decimals: number = 2): string {
  let locale = 'en-GB';
  
  if (language === 'pt') {
    locale = 'pt-BR';
  } else if (language === 'en') {
    locale = 'en-GB';
  } else if (language === 'zh') {
    locale = 'zh-CN';
  }

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch (error) {
    return amount.toFixed(decimals);
  }
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}
