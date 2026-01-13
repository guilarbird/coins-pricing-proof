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
  calculations: {
    bank: {
      total_cost_bps: number;
      you_receive: number;
    };
    coins: {
      total_cost_bps: number;
      you_receive: number;
    };
  };
  hash: string;
}

const AMOUNT_GBP = 100000;

export default function Home() {
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [customAmount, setCustomAmount] = useState(AMOUNT_GBP);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

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

  const gbpusd = snapshot?.prices?.GBPUSD?.mid || 1.27;
  const usdbrl = snapshot?.prices?.USDBRL?.mid || 5.19;
  const gbpbrl = gbpusd * usdbrl;

  // Calculations for custom amount
  const marketValue = customAmount * gbpbrl;
  
  // Bank structure: FX markup (80 bps) + explicit fee (0.8%)
  const bankFxMarkup = 0.008; // 80 bps embedded in rate
  const bankExplicitFee = 0.008; // 0.8% visible fee
  const bankRate = gbpbrl * (1 - bankFxMarkup);
  const bankReceive = customAmount * bankRate * (1 - bankExplicitFee);
  const bankCost = marketValue - bankReceive;
  const bankCostBps = (bankCost / marketValue) * 10000;

  // Coins calculation: market rate + network cost only
  const networkCost = 5; // USDT
  const coinsReceive = customAmount * gbpbrl - networkCost;
  const coinsCost = marketValue - coinsReceive;
  const coinsCostBps = (coinsCost / marketValue) * 10000;

  const delta = bankReceive - coinsReceive;
  const deltaPercent = (delta / bankReceive) * 100;

  // Wise reference (typical rates)
  const wiseRate = gbpbrl * 0.995; // ~50 bps markup
  const wiseFee = 0.004; // 0.4%
  const wiseReceive = customAmount * wiseRate * (1 - wiseFee);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/CoinsXYZ_HorizontalLogo_BlackWordmark.png" 
              alt="Coins.xyz" 
              className="h-6 dark:hidden"
            />
            <img 
              src="/CoinsXYZ_HorizontalLogo_WhiteWordmark.png" 
              alt="Coins.xyz" 
              className="h-6 hidden dark:block"
            />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Live
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              GBP → BRL Transfer Pricing
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              See exactly where costs enter — rate markup vs explicit fees. Compare how different structures affect your final amount.
            </p>

            {/* Amount Input */}
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <label className="block text-sm font-medium mb-3">Amount to send</label>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold">£</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value) || 0)}
                  className="flex-1 text-3xl font-bold bg-transparent border-b-2 border-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h3 className="font-semibold text-sm text-muted-foreground mb-6">You will receive</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Traditional Bank</p>
                  <p className="text-2xl font-bold text-red-600">
                    R${bankReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-red-600 mt-1">Cost: {bankCostBps.toFixed(1)} bps</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Wise (Reference)</p>
                  <p className="text-2xl font-bold text-amber-600">
                    R${wiseReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="border-t border-border pt-4 bg-primary/10 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Coins (Market-based)</p>
                  <p className="text-2xl font-bold text-primary">
                    R${coinsReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-primary mt-1">Cost: {coinsCostBps.toFixed(2)} bps</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-green-600">
                    +R${delta.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} vs Bank
                  </p>
                  <p className="text-xs text-muted-foreground">{deltaPercent.toFixed(2)}% more money</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                Last updated {new Date(snapshot.timestamp).toLocaleTimeString()}
              </p>
            </Card>
          </div>
        </div>

        {/* Market Prices Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Live market prices right now</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {snapshot?.prices?.GBPUSD && (
              <Card className="p-4 border border-border">
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">From Binance</p>
                  <p className="font-semibold text-lg">🇬🇧 GBP / 🇺🇸 USD</p>
                </div>
                <p className="text-3xl font-bold mb-3">{snapshot.prices.GBPUSD.mid.toFixed(4)}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Spread: {snapshot.prices.GBPUSD.spread_bps.toFixed(2)} bps</p>
                  <p>Updated {snapshot.prices.GBPUSD.staleness_seconds}s ago</p>
                </div>
              </Card>
            )}

            {snapshot?.prices?.USDBRL && (
              <Card className="p-4 border border-border">
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">From ValorPro</p>
                  <p className="font-semibold text-lg">🇺🇸 USD / 🇧🇷 BRL</p>
                </div>
                <p className="text-3xl font-bold mb-3">{snapshot.prices.USDBRL.mid.toFixed(4)}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Spread: {snapshot.prices.USDBRL.spread_bps.toFixed(2)} bps</p>
                  <p>Updated {snapshot.prices.USDBRL.staleness_seconds}s ago</p>
                </div>
              </Card>
            )}

            {gbpbrl && (
              <Card className="p-4 border border-border">
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Calculated from above</p>
                  <p className="font-semibold text-lg">🇬🇧 GBP / 🇧🇷 BRL</p>
                </div>
                <p className="text-3xl font-bold mb-3">{gbpbrl.toFixed(4)}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Binance × ValorPro</p>
                  <p>Market reference (no markup)</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* 4-Step Stepper */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">How transfer pricing works</h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div className="w-1 h-24 bg-border mt-4"></div>
              </div>
              <div className="flex-1 pb-8">
                <Card className="p-6 border border-border">
                  <h3 className="text-xl font-semibold mb-2">Market reference price</h3>
                  <p className="text-muted-foreground mb-4">
                    This is the real-time price of money before any institution modifies it. Binance gives us GBP/USD, ValorPro gives us USD/BRL. We multiply them to get the true market rate.
                  </p>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">£{customAmount.toLocaleString()} at market rate equals:</p>
                    <p className="text-2xl font-bold">R${marketValue.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div className="w-1 h-24 bg-border mt-4"></div>
              </div>
              <div className="flex-1 pb-8">
                <Card className="p-6 border border-border">
                  <h3 className="text-xl font-semibold mb-2">FX Markup (hidden cost)</h3>
                  <p className="text-muted-foreground mb-4">
                    The bank modifies the exchange rate before conversion. This 80 basis points is embedded in the rate you see — you don't see it as a separate fee, but it's already deducted.
                  </p>
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm text-muted-foreground mb-2">Market rate: {gbpbrl.toFixed(4)} → Bank rate: {(gbpbrl * (1 - 0.008)).toFixed(4)}</p>
                    <p className="text-2xl font-bold text-red-600">-R${(marketValue * 0.008).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div className="w-1 h-24 bg-border mt-4"></div>
              </div>
              <div className="flex-1 pb-8">
                <Card className="p-6 border border-border">
                  <h3 className="text-xl font-semibold mb-2">Explicit transfer fee (on top)</h3>
                  <p className="text-muted-foreground mb-4">
                    After the FX markup, the bank charges another 0.8% as a visible fee. This is applied to the already-reduced amount. Two costs, stacked.
                  </p>
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm text-muted-foreground mb-2">0.8% fee on R${(customAmount * bankRate).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}:</p>
                    <p className="text-2xl font-bold text-red-600">-R${(customAmount * bankRate * 0.008).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
              </div>
              <div className="flex-1">
                <Card className="p-6 border border-border bg-primary/5">
                  <h3 className="text-xl font-semibold mb-2">Market-based alternative</h3>
                  <p className="text-muted-foreground mb-4">
                    A different structure: use market rates directly (Binance + ValorPro), with only network costs. No hidden markup, no stacked fees.
                  </p>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Market rate + 5 USDT network cost:</p>
                    <p className="text-2xl font-bold text-primary">R${coinsReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
                    <p className="text-xs text-muted-foreground mt-2">Total cost: {coinsCostBps.toFixed(2)} bps</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Side-by-side comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Factor</th>
                  <th className="text-left py-3 px-4 font-semibold">Traditional Bank</th>
                  <th className="text-left py-3 px-4 font-semibold">Wise (Reference)</th>
                  <th className="text-left py-3 px-4 font-semibold">Coins (Market-based)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4">Rate source</td>
                  <td className="py-3 px-4">Internal (marked up)</td>
                  <td className="py-3 px-4">Market (slight markup)</td>
                  <td className="py-3 px-4">Binance + ValorPro</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4">FX Markup</td>
                  <td className="py-3 px-4">80 bps (hidden)</td>
                  <td className="py-3 px-4">~50 bps</td>
                  <td className="py-3 px-4">0 bps</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4">Explicit fee</td>
                  <td className="py-3 px-4">0.8%</td>
                  <td className="py-3 px-4">0.4%</td>
                  <td className="py-3 px-4">None</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4">Network cost</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">5 USDT (~R$26)</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary/50 bg-primary/5">
                  <td className="py-3 px-4 font-semibold">You receive</td>
                  <td className="py-3 px-4 font-semibold text-red-600">R${bankReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</td>
                  <td className="py-3 px-4 font-semibold text-amber-600">R${wiseReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</td>
                  <td className="py-3 px-4 font-semibold text-primary">R${coinsReceive.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</td>
                </tr>
                <tr className="hover:bg-secondary/50">
                  <td className="py-3 px-4 font-semibold">Total cost</td>
                  <td className="py-3 px-4 font-semibold text-red-600">{bankCostBps.toFixed(1)} bps</td>
                  <td className="py-3 px-4 font-semibold text-amber-600">~90 bps</td>
                  <td className="py-3 px-4 font-semibold text-primary">{coinsCostBps.toFixed(2)} bps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>This page demonstrates how international transfers are structured and priced. All prices come from Binance (GBP/USD) and ValorPro (USD/BRL).</p>
        </div>
      </footer>
    </div>
  );
}
