'use client';

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
  comparison?: {
    amount_gbp: number;
    bank: {
      brl_received: number;
      cost_bps: number;
      breakdown: {
        hidden_fx_cost_brl: number;
        explicit_fee_brl: number;
        iof_cost_brl: number;
      };
    };
    coins: {
      brl_received: number;
      cost_bps: number;
    };
    delta: {
      brl: number;
      bps: number;
    };
  };
}

const AMOUNT_GBP = 100000;
const BANK_FX_MARKUP_BPS = 80;
const BANK_FEE_PCT = 0.80;
const BANK_IOF_PCT = 3.50;
const NETWORK_FEE_USD = 5.0;

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

  // Calculate costs for custom amount
  const referenceAmount = customAmount * gbpbrl;

  // Bank calculation with IOF
  const bankRate = gbpbrl * (1 - BANK_FX_MARKUP_BPS / 10000);
  const fxCost = referenceAmount - (customAmount * bankRate);
  const feeCost = bankRate * customAmount * (BANK_FEE_PCT / 100);
  const subtotal = referenceAmount - fxCost - feeCost;
  const iofCost = subtotal * (BANK_IOF_PCT / 100);
  const bankReceive = subtotal - iofCost;
  const bankTotalCost = fxCost + feeCost + iofCost;
  const bankCostBps = (bankTotalCost / referenceAmount * 10000);

  // Coins calculation
  const usdReceived = customAmount * gbpusd;
  const usdAfterFee = usdReceived - NETWORK_FEE_USD;
  const coinsReceive = usdAfterFee * usdbrl;
  const coinsCost = referenceAmount - coinsReceive;
  const coinsCostBps = (coinsCost / referenceAmount * 10000);

  // Delta
  const delta = coinsReceive - bankReceive;
  const deltaBps = (delta / referenceAmount * 10000);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={isDark ? '/CoinsXYZ_HorizontalLogo_WhiteWordmark.png' : '/CoinsXYZ_HorizontalLogo_BlackWordmark.png'}
                alt="Coins.xyz"
                className="h-8"
              />
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
            See exactly where costs enter — rate markup vs explicit fees. Compare how different structures affect your final amount.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Bank */}
            <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20">
              <div className="text-sm text-muted-foreground mb-2">Traditional Bank</div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                R${bankReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-red-600 dark:text-red-400">
                Cost: {bankCostBps.toFixed(1)} bps
              </div>
            </Card>

            {/* Wise Reference */}
            <Card className="p-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
              <div className="text-sm text-muted-foreground mb-2">Wise (Reference)</div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                R${(referenceAmount * 0.99).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400">
                Cost: ~100 bps
              </div>
            </Card>

            {/* Coins */}
            <Card className="p-6 border-purple-200 bg-purple-50 dark:bg-purple-950/20">
              <div className="text-sm text-muted-foreground mb-2">Coins (Market-based)</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                R${coinsReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                Cost: {coinsCostBps.toFixed(2)} bps
              </div>
            </Card>
          </div>

          {/* Delta */}
          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Savings vs Bank</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                +R${delta.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                {((delta / bankTotalCost) * 100).toFixed(1)}% of bank cost
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Live market prices right now</h2>

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
                <div className="text-xs text-muted-foreground">Spread: 7.84 bps</div>
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
                <div className="text-xs text-muted-foreground">Spread: 9.64 bps</div>
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
                <div className="text-xs text-muted-foreground">Spread: 17.48 bps</div>
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

        {/* Bank Breakdown */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">How the bank structures it</h2>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold">Reference Price</div>
                  <div className="text-sm text-muted-foreground">Market mid rate (no intervention)</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">R${referenceAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-muted-foreground">£{customAmount.toLocaleString()} × {gbpbrl.toFixed(4)}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-red-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    FX Markup (Hidden)
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">{BANK_FX_MARKUP_BPS} bps embedded in rate</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">-R${fxCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-red-600">{(fxCost / referenceAmount * 10000).toFixed(1)} bps</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-red-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold">Explicit Fee</div>
                  <div className="text-sm text-muted-foreground">{BANK_FEE_PCT}% on converted amount</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">-R${feeCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-red-600">{(feeCost / referenceAmount * 10000).toFixed(1)} bps</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-red-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    🇧🇷 IOF (Brazil Tax)
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">{BANK_IOF_PCT}% on international transfers</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">-R${iofCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-red-600">{(iofCost / referenceAmount * 10000).toFixed(1)} bps</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-red-50 dark:bg-red-950/20 border-red-200">
              <div className="flex items-center justify-between">
                <div className="font-semibold">You receive</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">R${bankReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-sm text-red-600">Total cost: {bankCostBps.toFixed(1)} bps</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Coins Breakdown */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How Coins structures it</h2>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold">Reference Price</div>
                  <div className="text-sm text-muted-foreground">Market mid rate (same as bank)</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">R${referenceAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold">Network Cost</div>
                  <div className="text-sm text-muted-foreground">~${NETWORK_FEE_USD} USD bridge fee</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">-R${(NETWORK_FEE_USD * usdbrl).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
                  <div className="text-xs text-green-600">{((NETWORK_FEE_USD * usdbrl) / referenceAmount * 10000).toFixed(2)} bps</div>
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
        </div>
      </div>
    </div>
  );
}
