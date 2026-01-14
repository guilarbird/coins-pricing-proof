import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';

interface PriceData {
  pair: string;
  bid: number;
  ask: number;
  mid: number;
  source: string;
  timestamp: string;
}

interface SnapshotData {
  timestamp: string;
  prices: {
    GBPUSD?: PriceData;
    USDBRL?: PriceData;
    GBPBRL?: PriceData;
  };
}

// ============================================================================
// CONFIGURABLE PARAMETERS
// ============================================================================
const AMOUNT_GBP = 100000;

// Bank model parameters
const BANK_SPREAD_BPS = 110;      // Execution rate adjustment (basis points)
const BANK_EXPLICIT_FEE_PCT = 0.80; // Explicit transfer fee (%)

// Coins model parameters
const COINS_NETWORK_FEE_USD = 5.0; // Network cost (USD)

export default function Home() {
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [customAmount, setCustomAmount] = useState(AMOUNT_GBP);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const loadSnapshot = async () => {
      try {
        const response = await fetch('/snapshot.json');
        if (response.ok) {
          const data = await response.json();
          setSnapshot(data);
        }
      } catch (error) {
        console.error('Failed to load snapshot:', error);
      }
    };

    loadSnapshot();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/snapshot.json');
      if (response.ok) {
        const data = await response.json();
        setSnapshot(data);
      }
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!snapshot) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <RefreshCw className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading pricing data...</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // MARKET REFERENCE (ONE SOURCE OF TRUTH)
  // ============================================================================
  const gbpusd_mid = snapshot?.prices?.GBPUSD?.mid || 1.27;
  const usdbrl_mid = snapshot?.prices?.USDBRL?.mid || 5.19;
  const gbpbrl_mid = gbpusd_mid * usdbrl_mid; // Derived market reference

  // ============================================================================
  // BANK TRANSFER MODEL
  // ============================================================================
  // Step 1: Market reference amount (what the market would give)
  const bank_market_reference = customAmount * gbpbrl_mid;

  // Step 2: Bank applies execution rate (with spread)
  const bank_execution_rate = gbpbrl_mid * (1 - BANK_SPREAD_BPS / 10000);
  const bank_after_execution = customAmount * bank_execution_rate;
  const bank_spread_cost = bank_market_reference - bank_after_execution;

  // Step 3: Bank charges explicit fee on the converted amount
  const bank_explicit_fee = bank_after_execution * (BANK_EXPLICIT_FEE_PCT / 100);
  const bank_final_amount = bank_after_execution - bank_explicit_fee;

  // Total cost breakdown
  const bank_total_cost = bank_spread_cost + bank_explicit_fee;

  // ============================================================================
  // COINS RAIL MODEL
  // ============================================================================
  // Step 1: Use market reference directly
  const coins_market_reference = customAmount * gbpbrl_mid;

  // Step 2: Subtract network fee only
  const coins_network_fee = COINS_NETWORK_FEE_USD * usdbrl_mid;
  const coins_final_amount = coins_market_reference - coins_network_fee;

  // ============================================================================
  // COMPARISON
  // ============================================================================
  const difference = coins_final_amount - bank_final_amount;
  const difference_pct = (difference / bank_market_reference) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L18 6V12L12 16L6 12V6L12 2Z" fill="currentColor" className="text-purple-600" />
                <path d="M12 8L15 10V14L12 16L9 14V10L12 8Z" fill="currentColor" className="text-red-500" />
              </svg>
              <span className="font-bold text-lg">Coins.xyz</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Live
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">GBP → BRL Transfer Pricing</h1>
          <p className="text-muted-foreground text-lg">
            A transparent breakdown of how different transfer structures price a GBP to BRL conversion.
          </p>
        </div>

        {/* Amount Input */}
        <Card className="p-6 mb-12">
          <label className="block text-sm font-medium mb-3">Amount to send</label>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">£</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(Number(e.target.value))}
              className="flex-1 text-3xl font-bold bg-transparent border-b-2 border-primary outline-none"
            />
          </div>
        </Card>

        {/* Market Reference Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Market Reference</h2>
          <p className="text-muted-foreground mb-6">
            This is the baseline: what you would receive at mid-market rates with no markup or fees.
          </p>

          <div className="space-y-4">
            {/* Prices */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="p-4">
                <div className="text-xs text-muted-foreground mb-2">GBP/USD (Binance)</div>
                <div className="text-2xl font-bold">{gbpusd_mid.toFixed(4)}</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-muted-foreground mb-2">USD/BRL (ValorPro)</div>
                <div className="text-2xl font-bold">{usdbrl_mid.toFixed(4)}</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs text-muted-foreground mb-2">GBP/BRL (Derived)</div>
                <div className="text-2xl font-bold">{gbpbrl_mid.toFixed(4)}</div>
              </Card>
            </div>

            {/* Market reference amount */}
            <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Market Reference Amount</div>
                  <div className="text-sm text-muted-foreground">£{customAmount.toLocaleString()} × {gbpbrl_mid.toFixed(4)}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">R${bank_market_reference.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </Card>

            {/* Refresh button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded hover:bg-muted disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh prices
              </button>
            </div>
          </div>
        </div>

        {/* Bank Transfer Model */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Bank Transfer Model</h2>
          <p className="text-muted-foreground mb-6">
            How a traditional bank structures the transfer. Parameters: {BANK_SPREAD_BPS} bps execution spread + {BANK_EXPLICIT_FEE_PCT}% explicit fee.
          </p>

          <div className="space-y-4">
            {/* Step 1: Execution rate */}
            <Card className="p-6">
              <div className="mb-4">
                <div className="text-sm font-semibold text-muted-foreground mb-2">Step 1: Execution Rate</div>
                <div className="text-xs text-muted-foreground mb-3">
                  Bank applies {BANK_SPREAD_BPS} bps spread to market rate
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Market rate:</span>
                  <span className="font-mono">{gbpbrl_mid.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Spread ({BANK_SPREAD_BPS} bps):</span>
                  <span className="font-mono">-{(BANK_SPREAD_BPS / 10000).toFixed(4)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Execution rate:</span>
                  <span className="font-mono">{bank_execution_rate.toFixed(4)}</span>
                </div>
              </div>
            </Card>

            {/* Amount after execution */}
            <Card className="p-6 bg-red-50 dark:bg-red-950/20 border-red-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">After execution rate</div>
                  <div className="text-sm text-muted-foreground">£{customAmount.toLocaleString()} × {bank_execution_rate.toFixed(4)}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">R${bank_after_execution.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-red-600">Cost: R${bank_spread_cost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </Card>

            {/* Step 2: Explicit fee */}
            <Card className="p-6">
              <div className="mb-4">
                <div className="text-sm font-semibold text-muted-foreground mb-2">Step 2: Explicit Fee</div>
                <div className="text-xs text-muted-foreground mb-3">
                  {BANK_EXPLICIT_FEE_PCT}% charged on converted amount
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Converted amount:</span>
                  <span className="font-mono">R${bank_after_execution.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee ({BANK_EXPLICIT_FEE_PCT}%):</span>
                  <span className="font-mono">-R${bank_explicit_fee.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </Card>

            {/* Final amount */}
            <Card className="p-6 bg-red-50 dark:bg-red-950/20 border-red-200">
              <div className="flex justify-between items-center">
                <div className="font-semibold">You receive (Bank)</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">R${bank_final_amount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-red-600">Total cost: R${bank_total_cost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Coins Rail Model */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Coins Rail Model</h2>
          <p className="text-muted-foreground mb-6">
            Uses market reference directly. Only cost: network fee (${COINS_NETWORK_FEE_USD} USD).
          </p>

          <div className="space-y-4">
            {/* Market reference */}
            <Card className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Market reference</div>
                  <div className="text-sm text-muted-foreground">£{customAmount.toLocaleString()} × {gbpbrl_mid.toFixed(4)}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">R${coins_market_reference.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </Card>

            {/* Network fee */}
            <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Network fee</div>
                  <div className="text-sm text-muted-foreground">${COINS_NETWORK_FEE_USD} USD × {usdbrl_mid.toFixed(4)}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">-R${coins_network_fee.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </Card>

            {/* Final amount */}
            <Card className="p-6 bg-purple-50 dark:bg-purple-950/20 border-purple-200">
              <div className="flex justify-between items-center">
                <div className="font-semibold">You receive (Coins)</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">R${coins_final_amount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-purple-600">Total cost: R${coins_network_fee.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Comparison */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Comparison</h2>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-red-50 dark:bg-red-950/20 border-red-200">
              <div className="text-sm text-muted-foreground mb-2">Bank</div>
              <div className="text-2xl font-bold text-red-600 mb-2">R${bank_final_amount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
              <div className="text-xs text-red-600">Cost: R${bank_total_cost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
            </Card>

            <Card className="p-6 bg-purple-50 dark:bg-purple-950/20 border-purple-200">
              <div className="text-sm text-muted-foreground mb-2">Coins</div>
              <div className="text-2xl font-bold text-purple-600 mb-2">R${coins_final_amount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
              <div className="text-xs text-purple-600">Cost: R${coins_network_fee.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
            </Card>
          </div>

          <Card className="p-6 mt-6 bg-green-50 dark:bg-green-950/20 border-green-200">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Difference</div>
              <div className="text-3xl font-bold text-green-600 mb-1">+R${difference.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
              <div className="text-sm text-green-600">{difference_pct.toFixed(2)}% of market reference</div>
            </div>
          </Card>
        </div>

        {/* Footnote */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950/20 rounded border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-muted-foreground space-y-2">
            <p><strong>Bank parameters:</strong> Execution spread {BANK_SPREAD_BPS} bps + explicit fee {BANK_EXPLICIT_FEE_PCT}%</p>
            <p><strong>Coins parameters:</strong> Network fee ${COINS_NETWORK_FEE_USD} USD</p>
            <p><strong>Market reference:</strong> GBPUSD (Binance) × USDBRL (ValorPro) = GBPBRL (derived)</p>
            <p><strong>Prices refreshed:</strong> {new Date(snapshot.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
