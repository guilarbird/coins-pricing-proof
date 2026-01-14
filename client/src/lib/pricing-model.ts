/**
 * PricingModel
 * Represents a pricing structure for a transfer provider
 * All costs are transparent and explicitly shown
 */
export interface PricingModel {
  // Provider identification
  providerId: 'bank' | 'wise' | 'coins';
  providerName: string;
  description: string;

  // FX Spread (in basis points)
  // 1 bps = 0.01% = 0.0001
  fxSpreadBps: number;

  // Explicit fees
  explicitFeeType: 'fixed_gbp' | 'fixed_usd' | 'percentage' | 'none';
  explicitFeeValue: number; // GBP, USD, or percentage depending on type

  // IOF Tax (Brazilian tax on international transfers)
  // Can be fixed or structure-dependent
  iofTaxPct: number | 'structure-dependent';
  iofDescription: string;
  iofStandardPct?: number; // Used when regime = 'standard'
  iofOptimizedPct?: number; // Used when regime = 'optimized'

  // Metadata
  settlementMethod: 'swift' | 'direct' | 'stablecoin';
  settlementTime: string; // e.g., "1-3 business days"
}

/**
 * Default pricing models for the three providers
 */
export const DEFAULT_PRICING_MODELS: PricingModel[] = [
  {
    providerId: 'bank',
    providerName: 'Traditional Bank',
    description: 'Typical bank transfer with hidden FX markup',
    fxSpreadBps: 80, // Hidden in the rate
    explicitFeeType: 'percentage',
    explicitFeeValue: 0.8,
    iofTaxPct: 3.5,
    iofStandardPct: 3.5,
    iofOptimizedPct: 3.5,
    iofDescription: 'Full IOF (3.5%) applies',
    settlementMethod: 'swift',
    settlementTime: '3-5 business days',
  },
  {
    providerId: 'wise',
    providerName: 'Wise',
    description: 'Transfer with mid-market rate + fixed fee + IOF',
    fxSpreadBps: 0, // Mid-market (no FX spread)
    explicitFeeType: 'fixed_gbp',
    explicitFeeValue: 9.99,
    iofTaxPct: 3.5,
    iofStandardPct: 3.5,
    iofOptimizedPct: 3.5,
    iofDescription: 'Full IOF (3.5%) applies',
    settlementMethod: 'direct',
    settlementTime: '1-2 business days',
  },
  {
    providerId: 'coins',
    providerName: 'Coins',
    description: 'Market-based execution with network fee + IOF',
    fxSpreadBps: 0, // Market execution (no FX spread)
    explicitFeeType: 'fixed_usd',
    explicitFeeValue: 5,
    iofTaxPct: 'structure-dependent',
    iofStandardPct: 3.5,
    iofOptimizedPct: 1.0,
    iofDescription: 'Depends on settlement structure (Standard: 3.5%, Optimized: ~1%)',
    settlementMethod: 'stablecoin',
    settlementTime: '< 1 hour',
  },
];

/**
 * Calculate final amount received after all costs
 */
export function calculateFinalAmount(
  gbpAmount: number,
  marketMidRate: number,
  model: PricingModel,
  overrideSpreadBps?: number,
  iofRegime?: 'standard' | 'optimized',
): {
  marketReferenceAmount: number;
  fxSpreadCost: number;
  explicitFeeCost: number;
  iofTaxCost: number;
  finalAmount: number;
  totalCostBrl: number;
  totalCostPct: number;
  iofTaxPct: number;
} {
  const spreadBps = overrideSpreadBps ?? model.fxSpreadBps;
  const marketReferenceAmount = gbpAmount * marketMidRate;

  // Apply FX spread
  const executionRate = marketMidRate * (1 - spreadBps / 10000);
  const amountAfterSpread = gbpAmount * executionRate;
  const fxSpreadCost = marketReferenceAmount - amountAfterSpread;

  // Apply explicit fee
  let explicitFeeCost = 0;
  let amountAfterFee = amountAfterSpread;

  if (model.explicitFeeType === 'fixed_gbp') {
    explicitFeeCost = model.explicitFeeValue * marketMidRate; // Convert GBP fee to BRL
    amountAfterFee = amountAfterSpread - explicitFeeCost;
  } else if (model.explicitFeeType === 'fixed_usd') {
    const USDBRL_RATE = 5.19;
    explicitFeeCost = model.explicitFeeValue * USDBRL_RATE; // Convert USD fee to BRL
    amountAfterFee = amountAfterSpread - explicitFeeCost;
  } else if (model.explicitFeeType === 'percentage') {
    explicitFeeCost = amountAfterSpread * (model.explicitFeeValue / 100);
    amountAfterFee = amountAfterSpread - explicitFeeCost;
  }

  // Apply IOF tax
  let iofTaxPct = 3.5; // Default
  if (typeof model.iofTaxPct === 'number') {
    iofTaxPct = model.iofTaxPct;
  } else if (model.iofTaxPct === 'structure-dependent') {
    // Use regime to determine IOF
    if (iofRegime === 'optimized' && model.iofOptimizedPct !== undefined) {
      iofTaxPct = model.iofOptimizedPct;
    } else if (model.iofStandardPct !== undefined) {
      iofTaxPct = model.iofStandardPct;
    }
  }
  const iofTaxCost = amountAfterFee * (iofTaxPct / 100);
  const finalAmount = amountAfterFee - iofTaxCost;

  const totalCostBrl = fxSpreadCost + explicitFeeCost + iofTaxCost;
  const totalCostPct = (totalCostBrl / marketReferenceAmount) * 100;

  return {
    marketReferenceAmount,
    fxSpreadCost,
    explicitFeeCost,
    iofTaxCost,
    finalAmount,
    totalCostBrl,
    totalCostPct,
    iofTaxPct,
  };
}
