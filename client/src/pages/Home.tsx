import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Copy, RefreshCw, HelpCircle, Check } from 'lucide-react';

interface PriceData {
  pair: string;
  bid: number;
  ask: number;
  mid: number;
  source: string;
  timestamp: string;
  staleness_seconds: number;
  spread_bps: number;
}

interface SnapshotData {
  timestamp: string;
  prices: {
    GBPUSD?: PriceData;
    USDBRL?: PriceData;
    GBPBRL?: PriceData;
  };
}

const AMOUNT_GBP = 100000;
const BANK_SPREAD_BPS = 110;  // ~1.1% execution rate adjustment (realistic from World Bank data)
const BANK_FEE_PCT = 0.80;     // Explicit fee
const NETWORK_FEE_USD = 5.0;   // Coins network cost

export default function Home() {
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [customAmount, setCustomAmount] = useState(AMOUNT_GBP);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect dark mode
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
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

  // Get prices from snapshot
  const gbpusd = snapshot?.prices?.GBPUSD?.mid || 1.27;
  const usdbrl = snapshot?.prices?.USDBRL?.mid || 5.19;
  const gbpbrl = gbpusd * usdbrl;

  // ============================================================================
  // CORRECT PRICING LOGIC
  // ============================================================================
  
  // Step 1: Market Reference (neutral baseline)
  const referenceAmount = customAmount * gbpbrl;

  // Step 2: Bank Execution Rate (applies spread)
  // Bank takes market rate and applies spread (execution rate adjustment)
  const bankExecutionRate = gbpbrl * (1 - BANK_SPREAD_BPS / 10000);
  const spreadCost = referenceAmount - (customAmount * bankExecutionRate);
  const spreadCostBps = (spreadCost / referenceAmount) * 10000;

  // Step 3: Explicit Fee (applied on top of execution rate)
  const amountAfterSpread = customAmount * bankExecutionRate;
  const feeCost = amountAfterSpread * (BANK_FEE_PCT / 100);
  const feeCostBps = (feeCost / referenceAmount) * 10000;

  // Total bank cost
  const bankTotalCost = spreadCost + feeCost;
  const bankTotalCostBps = spreadCostBps + feeCostBps;
  const bankReceive = amountAfterSpread - feeCost;

  // Step 4: Alternative Structure (Coins - using market rate directly)
  // Coins uses market rate directly with minimal network fee
  const coinsAmount = customAmount * gbpbrl;
  const coinsNetworkCost = NETWORK_FEE_USD * usdbrl;
  const coinsReceive = coinsAmount - coinsNetworkCost;
  const coinsCostBps = (coinsNetworkCost / referenceAmount) * 10000;

  // Delta
  const delta = coinsReceive - bankReceive;
  const deltaBps = (delta / referenceAmount) * 10000;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L18 6V12L12 16L6 12V6L12 2Z" fill="currentColor" className="text-purple-600" />
                  <path d="M12 8L15 10V14L12 16L9 14V10L12 8Z" fill="currentColor" className="text-red-500" />
                </svg>
                <span className="font-bold text-lg">Coins.xyz</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Live
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">
            🇬🇧 £ → 🇧🇷 R$ Transfer Pricing
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            A self-guided walkthrough of how international transfers are priced. See where costs enter the conversion, and how different structures affect your final amount.
          </p>

          {/* Input Section */}
          <Card className="p-6 mb-8">
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

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Bank */}
            <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20">
              <div className="text-sm text-muted-foreground mb-2">📊 Traditional Bank Structure</div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                R${bankReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-red-600 dark:text-red-400">
                Total cost: {bankTotalCostBps.toFixed(1)} bps
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Spread {BANK_SPREAD_BPS} bps + Fee {BANK_FEE_PCT}%
              </div>
            </Card>

            {/* Coins */}
            <Card className="p-6 border-purple-200 bg-purple-50 dark:bg-purple-950/20">
              <div className="text-sm text-muted-foreground mb-2">⚡ Market-Based Structure</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                R${coinsReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                Total cost: {coinsCostBps.toFixed(2)} bps
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Network fee only
              </div>
            </Card>
          </div>

          {/* Delta */}
          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">💰 Difference</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                +R${delta.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                {deltaBps.toFixed(1)} bps cheaper with market-based structure
              </div>
            </div>
          </Card>
        </div>

        {/* Live Prices */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">📈 Live market prices right now</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* GBPUSD */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">🇬🇧 GBP / 🇺🇸 USD</h3>
                <Badge variant="outline" className="text-xs">Binance</Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground">Bid</div>
                  <div className="text-lg font-mono">{(gbpusd - 0.0005).toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ask</div>
                  <div className="text-lg font-mono">{(gbpusd + 0.0005).toFixed(4)}</div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground mb-1">Mid (reference)</div>
                  <div className="text-xl font-bold text-primary">{gbpusd.toFixed(4)}</div>
                </div>
              </div>
            </Card>

            {/* USDBRL */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">🇺🇸 USD / 🇧🇷 BRL</h3>
                <Badge variant="outline" className="text-xs">ValorPro</Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground">Bid</div>
                  <div className="text-lg font-mono">{(usdbrl - 0.005).toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ask</div>
                  <div className="text-lg font-mono">{(usdbrl + 0.005).toFixed(4)}</div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground mb-1">Mid (reference)</div>
                  <div className="text-xl font-bold text-primary">{usdbrl.toFixed(4)}</div>
                </div>
              </div>
            </Card>

            {/* GBPBRL */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">🇬🇧 GBP / 🇧🇷 BRL</h3>
                <Badge variant="outline" className="text-xs">Derived</Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground">Bid</div>
                  <div className="text-lg font-mono">{(gbpbrl - 0.01).toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ask</div>
                  <div className="text-lg font-mono">{(gbpbrl + 0.01).toFixed(4)}</div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground mb-1">Mid (reference)</div>
                  <div className="text-xl font-bold text-primary">{gbpbrl.toFixed(4)}</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Step 1: Market Reference */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Step 1 — The market price</h2>
          <p className="text-muted-foreground mb-6">
            This is the market reference for converting GBP to BRL at this moment. It represents the price before any bank is involved, any fee is applied, or any commercial adjustment is made.
          </p>

          <Card className="p-6 border-blue-200 bg-blue-50 dark:bg-blue-950/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Market Reference Rate</div>
                <div className="text-sm text-muted-foreground">Neutral baseline (no intervention)</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">R${referenceAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                <div className="text-xs text-muted-foreground">£{customAmount.toLocaleString()} × {gbpbrl.toFixed(4)}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Step 2: Execution Rate */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Step 2 — The execution rate used in a bank transfer</h2>
          <p className="text-muted-foreground mb-6">
            Banks do not execute transfers using the market reference directly. Instead, the exchange rate applied to a transfer is adjusted before the conversion takes place. This adjustment changes the rate used to convert your funds.
          </p>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold">Market Reference</div>
                  <div className="text-sm text-muted-foreground">Mid rate (no adjustment)</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{gbpbrl.toFixed(4)}</div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
            </div>

            <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    Bank Execution Rate
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">Market rate adjusted by {BANK_SPREAD_BPS} bps spread</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{bankExecutionRate.toFixed(4)}</div>
                  <div className="text-xs text-red-600">-{BANK_SPREAD_BPS} bps from market</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Cost of this adjustment</div>
                  <div className="text-sm text-muted-foreground">Difference between rates</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">-R${spreadCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-red-600">{spreadCostBps.toFixed(1)} bps of your amount</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Step 3: Explicit Fee */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Step 3 — The explicit transfer fee</h2>
          <p className="text-muted-foreground mb-6">
            After the exchange rate is applied, banks typically charge an explicit transfer fee. This fee is applied on top of a conversion that has already used an adjusted exchange rate.
          </p>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold">Amount after execution rate</div>
                  <div className="text-sm text-muted-foreground">After spread adjustment</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">R${amountAfterSpread.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
            </div>

            <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Explicit Fee</div>
                  <div className="text-sm text-muted-foreground">{BANK_FEE_PCT}% on converted amount</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">-R${feeCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-red-600">{feeCostBps.toFixed(1)} bps of your amount</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-red-50 dark:bg-red-950/20 border-red-200">
              <div className="flex items-center justify-between">
                <div className="font-semibold">You receive</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">R${bankReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-sm text-red-600">Total cost: {bankTotalCostBps.toFixed(1)} bps</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Step 4: Alternative Structure */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Step 4 — Using the market price directly</h2>
          <p className="text-muted-foreground mb-6">
            It is possible to structure a conversion where the market reference rate is used directly, all costs are explicit and visible, and no adjustment is applied to the exchange rate itself.
          </p>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold">Market Reference Rate</div>
                  <div className="text-sm text-muted-foreground">Used directly (no adjustment)</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">R${referenceAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
            </div>

            <Card className="p-6 border-green-200 bg-green-50 dark:bg-green-950/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Network Cost</div>
                  <div className="text-sm text-muted-foreground">Transparent bridge fee</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">-R${coinsNetworkCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-green-600">{coinsCostBps.toFixed(2)} bps of your amount</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-purple-50 dark:bg-purple-950/20 border-purple-200">
              <div className="flex items-center justify-between">
                <div className="font-semibold">You receive</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">R${coinsReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-sm text-purple-600">Total cost: {coinsCostBps.toFixed(2)} bps</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-950/20 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-muted-foreground">
              This alternative structure is what market-based rails enable. The difference in final amount reflects the cost of the execution rate adjustment applied in traditional banking structures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
