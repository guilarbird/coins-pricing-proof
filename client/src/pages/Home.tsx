import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, RefreshCw } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Home() {
  // ============================================================================
  // MARKET REFERENCE (FIXED FOR THIS EXAMPLE)
  // ============================================================================
  // Using Wise's published mid-market rate as reference
  const MARKET_MID_GBPBRL = 7.21137; // Wise mid-market GBP/BRL
  const MARKET_MID_TIMESTAMP = '13 Jan 2026, 20:00 GMT';

  // ============================================================================
  // USER INPUTS (ADJUSTABLE)
  // ============================================================================
  const [gbpAmount, setGbpAmount] = useState(1000);
  const [bankSpreadBps, setBankSpreadBps] = useState(80); // 0.8%
  const [bankFeePct, setBankFeePct] = useState(0.8); // 0.8%
  const [iofTaxPct] = useState(3.5); // Fixed by Brazilian law
  const [coinsNetworkFeeUsd] = useState(5); // Fixed network cost

  // ============================================================================
  // CALCULATIONS
  // ============================================================================

  // Step 1: Market reference baseline
  const marketReferenceAmount = gbpAmount * MARKET_MID_GBPBRL;

  // ============================================================================
  // BANK TRANSFER MODEL
  // ============================================================================
  // Step 1: Apply FX spread
  const bankExecutionRate = MARKET_MID_GBPBRL * (1 - bankSpreadBps / 10000);
  const bankAfterSpread = gbpAmount * bankExecutionRate;
  const bankSpreadCost = marketReferenceAmount - bankAfterSpread;

  // Step 2: Apply explicit fee
  const bankExplicitFee = bankAfterSpread * (bankFeePct / 100);

  // Step 3: Apply IOF tax
  const bankIofTax = bankAfterSpread * (iofTaxPct / 100);

  // Final amount
  const bankFinalAmount = bankAfterSpread - bankExplicitFee - bankIofTax;
  const bankTotalCost = bankSpreadCost + bankExplicitFee + bankIofTax;
  const bankTotalCostPct = (bankTotalCost / marketReferenceAmount) * 100;

  // ============================================================================
  // WISE TRANSFER MODEL (BENCHMARK)
  // ============================================================================
  // Wise: mid-market rate + £9.99 fixed fee + 3.5% IOF
  const WISE_FIXED_FEE_GBP = 9.99;
  const wiseAfterFee = gbpAmount - WISE_FIXED_FEE_GBP;
  const wiseAfterConversion = wiseAfterFee * MARKET_MID_GBPBRL;
  const wiseIofTax = wiseAfterConversion * (iofTaxPct / 100);
  const wiseFinalAmount = wiseAfterConversion - wiseIofTax;
  const wiseTotalCost = (gbpAmount * MARKET_MID_GBPBRL) - wiseFinalAmount;
  const wiseTotalCostPct = (wiseTotalCost / marketReferenceAmount) * 100;

  // ============================================================================
  // COINS TRANSFER MODEL (MARKET-BASED)
  // ============================================================================
  // Coins: market rate + $5 network fee + 3.5% IOF
  // Note: We use USDBRL rate for network fee conversion
  const USDBRL_RATE = 5.19; // From snapshot
  const coinsNetworkFeeBrl = coinsNetworkFeeUsd * USDBRL_RATE;
  const coinsAfterNetwork = marketReferenceAmount - coinsNetworkFeeBrl;
  const coinsIofTax = coinsAfterNetwork * (iofTaxPct / 100);
  const coinsFinalAmount = coinsAfterNetwork - coinsIofTax;
  const coinsTotalCost = marketReferenceAmount - coinsFinalAmount;
  const coinsTotalCostPct = (coinsTotalCost / marketReferenceAmount) * 100;

  // ============================================================================
  // COMPARISONS
  // ============================================================================
  const coinsVsBankSavings = bankFinalAmount - coinsFinalAmount;
  const coinsVsWiseSavings = wiseFinalAmount - coinsFinalAmount;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L18 6V12L12 16L6 12V6L12 2Z"
                  fill="currentColor"
                  className="text-purple-600"
                />
                <path
                  d="M12 8L15 10V14L12 16L9 14V10L12 8Z"
                  fill="currentColor"
                  className="text-red-500"
                />
              </svg>
              <span className="font-bold text-lg">Coins.xyz</span>
            </div>
            <Badge variant="outline" className="bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Live
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">GBP → BRL Transfer Pricing</h1>
          <p className="text-lg text-muted-foreground">
            A direct comparison of how different transfer structures price a GBP to BRL conversion. All scenarios start from the same market reference.
          </p>
        </div>

        {/* Market Reference Section */}
        <div className="mb-12 p-6 bg-slate-900/50 dark:bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Market Reference (Baseline)</h2>
            <p className="text-sm text-muted-foreground">
              This is what you would receive at mid-market rates with zero markup or fees.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Mid-Market Rate</div>
              <div className="text-2xl font-bold">7.21137 BRL/GBP</div>
              <div className="text-xs text-muted-foreground mt-1">Source: Wise</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Timestamp</div>
              <div className="text-2xl font-bold">13 Jan 2026</div>
              <div className="text-xs text-muted-foreground mt-1">20:00 GMT</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Reference Amount</div>
              <div className="text-2xl font-bold">R${marketReferenceAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
              <div className="text-xs text-muted-foreground mt-1">£{gbpAmount.toLocaleString()} × 7.21137</div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Adjust amount:</label>
            <input
              type="number"
              value={gbpAmount}
              onChange={(e) => setGbpAmount(Number(e.target.value))}
              className="w-32 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-foreground"
              min="100"
              max="1000000"
              step="100"
            />
            <span className="text-sm text-muted-foreground">GBP</span>
          </div>
        </div>

        {/* Three-Way Comparison */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How Much You Receive</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bank Transfer */}
            <div className="border border-red-900/50 bg-red-950/20 rounded-lg p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Traditional Bank</h3>
                <p className="text-xs text-muted-foreground">
                  Typical bank transfer with hidden FX markup
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Spread:</span>
                  <span className="font-mono">{bankSpreadBps} bps</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fee:</span>
                  <span className="font-mono">{bankFeePct}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IOF Tax:</span>
                  <span className="font-mono">{iofTaxPct}%</span>
                </div>
              </div>

              <div className="border-t border-red-900/30 pt-4">
                <div className="text-xs text-muted-foreground mb-1">You receive</div>
                <div className="text-2xl font-bold text-red-400 mb-2">
                  R${bankFinalAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-red-400">
                  Cost: R${bankTotalCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ({bankTotalCostPct.toFixed(2)}%)
                </div>
              </div>

              {/* Adjustable Parameters */}
              <div className="mt-6 pt-6 border-t border-red-900/30 space-y-4">
                <div>
                  <label className="text-xs font-medium mb-2 block">Spread (bps):</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="10"
                    value={bankSpreadBps}
                    onChange={(e) => setBankSpreadBps(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground mt-1">{bankSpreadBps} bps = {(bankSpreadBps / 100).toFixed(2)}%</div>
                </div>
                <div>
                  <label className="text-xs font-medium mb-2 block">Fee (%):</label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={bankFeePct}
                    onChange={(e) => setBankFeePct(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground mt-1">{bankFeePct.toFixed(1)}%</div>
                </div>
              </div>
            </div>

            {/* Wise */}
            <div className="border border-yellow-900/50 bg-yellow-950/20 rounded-lg p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Wise</h3>
                <p className="text-xs text-muted-foreground">
                  Mid-market rate + transparent fee
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-mono">7.21137 (mid)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transfer Fee:</span>
                  <span className="font-mono">£9.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IOF Tax:</span>
                  <span className="font-mono">{iofTaxPct}%</span>
                </div>
              </div>

              <div className="border-t border-yellow-900/30 pt-4">
                <div className="text-xs text-muted-foreground mb-1">You receive</div>
                <div className="text-2xl font-bold text-yellow-400 mb-2">
                  R${wiseFinalAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-yellow-400">
                  Cost: R${wiseTotalCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ({wiseTotalCostPct.toFixed(2)}%)
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-yellow-900/30">
                <p className="text-xs text-muted-foreground">
                  Wise vs Bank: <span className="text-yellow-400 font-semibold">
                    {wiseFinalAmount > bankFinalAmount ? '+' : ''} R${Math.abs(wiseFinalAmount - bankFinalAmount).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                  </span>
                </p>
              </div>
            </div>

            {/* Coins */}
            <div className="border border-green-900/50 bg-green-950/20 rounded-lg p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Coins.xyz</h3>
                <p className="text-xs text-muted-foreground">
                  Market rate + network fee only
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-mono">7.21137 (mid)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network Fee:</span>
                  <span className="font-mono">${coinsNetworkFeeUsd}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IOF Tax:</span>
                  <span className="font-mono">{iofTaxPct}%</span>
                </div>
              </div>

              <div className="border-t border-green-900/30 pt-4">
                <div className="text-xs text-muted-foreground mb-1">You receive</div>
                <div className="text-2xl font-bold text-green-400 mb-2">
                  R${coinsFinalAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-green-400">
                  Cost: R${coinsTotalCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ({coinsTotalCostPct.toFixed(2)}%)
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-green-900/30 space-y-2">
                <p className="text-xs text-muted-foreground">
                  vs Bank: <span className="text-green-400 font-semibold">
                    +R${coinsVsBankSavings.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  vs Wise: <span className="text-green-400 font-semibold">
                    {coinsVsWiseSavings > 0 ? '+' : ''} R${coinsVsWiseSavings.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mb-12 p-6 bg-slate-900/50 dark:bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <h2 className="text-lg font-semibold mb-6">Step-by-Step Breakdown (Bank Model)</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-start pb-4 border-b border-slate-700/50">
              <div>
                <div className="font-semibold">1. Market Reference</div>
                <div className="text-xs text-muted-foreground">£{gbpAmount.toLocaleString()} × 7.21137</div>
              </div>
              <div className="text-right">
                <div className="font-mono">R${marketReferenceAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="flex justify-between items-start pb-4 border-b border-slate-700/50">
              <div>
                <div className="font-semibold">2. FX Spread Applied ({bankSpreadBps} bps)</div>
                <div className="text-xs text-muted-foreground">Rate becomes 7.21137 × (1 - {bankSpreadBps}/10000)</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-orange-400">-R${bankSpreadCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="flex justify-between items-start pb-4 border-b border-slate-700/50">
              <div>
                <div className="font-semibold">3. Explicit Fee ({bankFeePct}%)</div>
                <div className="text-xs text-muted-foreground">Charged on converted amount</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-red-400">-R${bankExplicitFee.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="flex justify-between items-start pb-4 border-b border-slate-700/50">
              <div>
                <div className="font-semibold">4. IOF Tax ({iofTaxPct}%)</div>
                <div className="text-xs text-muted-foreground">Brazilian tax on international transfers</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-red-400">-R${bankIofTax.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            <div className="flex justify-between items-start pt-2">
              <div className="font-semibold">Final Amount</div>
              <div className="text-right">
                <div className="font-mono text-lg font-bold">R${bankFinalAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footnotes */}
        <div className="p-6 bg-slate-900/50 dark:bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <h3 className="font-semibold mb-4">Important Notes</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>IOF Tax:</strong> The 3.5% IOF (Imposto sobre Operações Financeiras) is a Brazilian tax that applies to all international transfers, regardless of the provider. It cannot be avoided.
            </p>
            <p>
              <strong>Bank Model:</strong> The bank parameters (80 bps spread, 0.8% fee) are typical estimates. Actual bank rates vary. You can adjust the sliders to see how different spreads affect the final amount.
            </p>
            <p>
              <strong>Coins Execution:</strong> Coins uses a stablecoin (USDT) intermediate step: GBP → USDT → USDT/BRL order book → BRL. The rate reflects the on-exchange order book, not an opaque bank rate.
            </p>
            <p>
              <strong>Sources:</strong> Market reference from Wise's published mid-market rate. Bank spread estimates based on Airwallex research. IOF rate from PagBrasil (July 2025).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
