import { useEffect, useState } from "react";
import { Copy, Check, ArrowDown, RefreshCw, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SnapshotData {
  price_holders: Record<string, any>;
  comparison: any;
  proof_message: string;
  integrity_hash: string;
  audit_trail: {
    sources: string[];
    timestamp: string;
  };
}

export default function Home() {
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [isDark, setIsDark] = useState(false);

  const loadSnapshot = async () => {
    setLoading(true);
    try {
      const res = await fetch("/snapshot.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSnapshot(data);
      setLastRefresh(new Date());
      setError(null);
      toast.success("Data refreshed");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error loading data";
      setError(errorMsg);
      console.error("Failed to load snapshot:", err);
      toast.error("Failed to refresh");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSnapshot();
    // Detect dark mode
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied");
    setTimeout(() => setCopied(null), 2000);
  };

  if (error && !snapshot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={loadSnapshot}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const prices = snapshot.price_holders;
  const comp = snapshot.comparison;
  
  // Reorder prices to show GBPUSD, USDBRL, GBPBRL
  const orderedPrices = {
    'GBPUSD': prices.GBPUSD,
    'USDBRL': prices.USDBRL,
    'GBPBRL': prices.GBPBRL
  };

  if (!comp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-red-500">Comparison data not found</p>
      </div>
    );
  }

  const bank = comp.bank || {};
  const coins = comp.coins || {};
  const delta = comp.delta || {};

  // TransferWise reference
  const transferwiseRate = 6.58;
  const transferwiseFee = 0.70;
  const transferwiseAmount = (comp.amount_gbp || 0) * transferwiseRate * (1 - transferwiseFee / 100);
  const transferwiseCost = ((comp.reference_brl || 0) - transferwiseAmount) / (comp.reference_brl || 1) * 10000;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={isDark ? "/images/logo-light.png" : "/images/logo-dark.png"}
              alt="Coins.xyz"
              className="h-8 w-auto"
            />
            <div>
              <p className="text-xs text-muted-foreground">🇬🇧 £ → 🇧🇷 R$ Transfers</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 space-y-16">
        {/* OVERVIEW */}
        <section className="space-y-6 max-w-3xl">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-foreground">🇬🇧 £ → 🇧🇷 R$ Transfers</h1>
            <p className="text-lg text-muted-foreground">How international transfers are priced — clearly and transparently</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <p className="text-sm text-foreground">
              When you send money internationally, the final amount depends on <strong>how the conversion is structured</strong>. This page breaks down the pricing step-by-step so you understand where your money goes.
            </p>
            <p className="text-xs text-muted-foreground">
              All numbers are based on <strong>real market data</strong>, time-stamped, and independently verifiable.
            </p>
          </div>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
        </div>

        {/* STEP 1: Market Reference */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-foreground">Step 1 — The market reference price</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-5 h-5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is what currency traders pay for GBP and BRL right now, globally.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              <strong>The price of money before any bank gets involved</strong>
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              At this very moment, GBP and BRL trade at specific prices on global markets. This is the <strong>reference point</strong> — what you'd theoretically get if there were no middleman, no fees, no adjustments.
            </p>
          </div>

          {/* Simple Diagram */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-block bg-primary/10 border border-primary rounded-lg px-6 py-3">
                <p className="text-xs text-muted-foreground mb-1">🇬🇧 You have</p>
                <p className="text-3xl font-bold text-foreground">£{(comp.amount_gbp || 0).toLocaleString("en-GB")}</p>
              </div>
              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-primary" />
              </div>
              <div className="inline-block bg-primary/10 border border-primary rounded-lg px-6 py-3">
                <p className="text-xs text-muted-foreground mb-1">🇧🇷 Market says it equals</p>
                <p className="text-3xl font-bold text-primary">R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              This is the <strong>starting point</strong>. Everything else is cost.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
             <h3 className="text-sm font-semibold text-foreground mb-4">📊 Live market prices right now</h3>           <Button
                variant="outline"
                size="sm"
                onClick={loadSnapshot}
                disabled={loading}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(orderedPrices).map(([pair, data]: any) => (
                <Card key={pair} className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-mono">
                    {pair === 'GBPUSD' && '🇬🇧 £ → 🇺🇸 $'}
                    {pair === 'USDBRL' && '🇺🇸 $ → 🇧🇷 R$'}
                    {pair === 'GBPBRL' && '🇬🇧 £ → 🇧🇷 R$'}
                  </CardTitle>
                    <CardDescription className="text-xs">
                      {data.source === 'valorpro' && '🏦 ValorPro (Official BRL Rate)'}
                      {data.source === 'derived' && '🔗 Derived (£ × $ × R$)'}
                      {data.source === 'simulated' && '📈 Market Reference'}
                      {' • '}{data.staleness_seconds}s ago
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Bid (sell)</p>
                      <p className="text-sm font-mono font-bold text-foreground">{data.bid.toFixed(8)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Ask (buy)</p>
                      <p className="text-sm font-mono font-bold text-foreground">{data.ask.toFixed(8)}</p>
                    </div>
                    <div className="border-t border-border pt-3">
                      <p className="text-xs text-muted-foreground">Mid (average)</p>
                      <p className="text-lg font-mono font-bold text-primary">{data.mid.toFixed(8)}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {data.spread_bps.toFixed(2)} bps spread
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">Now, what banks do</span>
          </div>
        </div>

        {/* STEP 2: Execution Rate */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-foreground">Step 2 — The execution rate</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-5 h-5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Banks give you a worse exchange rate than the market. This is their hidden profit.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              <strong>Banks don't use the market price. They change it.</strong>
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Before converting your money, banks apply an <strong>FX markup</strong> — they make the exchange rate worse for you. This is hidden in the rate itself, not shown as a separate fee.
            </p>
          </div>

          {/* Diagram showing markup */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">🇧🇷 Market reference</p>
                <div className="h-12 bg-primary/10 border border-primary rounded-lg flex items-center px-4">
                  <p className="font-bold text-foreground">R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">🏦 Bank applies FX markup</p>
                  <p className="text-lg font-bold text-red-500">{bank.fx_markup_bps || 0} bps</p>
                  <p className="text-xs text-muted-foreground">= 0.80% worse rate</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">📉 What you actually get</p>
                <div className="h-12 bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-700 rounded-lg flex items-center px-4">
                  <p className="font-bold text-foreground">R${(bank.brl_after_fx || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-red-500">
                  ❌ Loss: R${(bank.fx_cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              You've already lost money, and we haven't even gotten to the explicit fee yet.
            </p>
          </div>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">Then they add a fee</span>
          </div>
        </div>

        {/* STEP 3: Explicit Fee */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-foreground">Step 3 — The explicit transfer fee</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-5 h-5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is the visible fee banks advertise. But it's on top of the already-marked-up rate.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              <strong>A separate fee, charged after the rate adjustment</strong>
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              After you've already lost money to the FX markup, banks charge an additional transfer fee. This is the visible cost, but it's applied to a conversion that already used a worse rate.
            </p>
          </div>

          {/* Final bank outcome diagram */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Starting point (market)</p>
                <div className="h-10 bg-primary/10 border border-primary rounded-lg flex items-center px-4">
                  <p className="font-bold text-foreground">R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">After FX markup</p>
                <div className="h-10 bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-700 rounded-lg flex items-center px-4">
                  <p className="font-bold text-foreground">R${(bank.brl_after_fx || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
                <p className="text-xs text-red-500">−R${(bank.fx_cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">After transfer fee ({bank.fee_pct || 0}%)</p>
                <div className="h-10 bg-red-100 dark:bg-red-950/40 border border-red-400 dark:border-red-600 rounded-lg flex items-center px-4">
                  <p className="font-bold text-foreground">R${(bank.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
                <p className="text-xs text-red-500">−R${(bank.fee_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded border border-red-300 dark:border-red-700">
                <p className="text-xs text-muted-foreground mb-1">Total cost</p>
                <p className="text-2xl font-bold text-red-600">{(bank.cost_bps || 0).toFixed(0)} basis points</p>
                <p className="text-xs text-muted-foreground mt-1">That's {((bank.cost_bps || 0) / 100).toFixed(2)}% of your money gone.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">There's another way</span>
          </div>
        </div>

        {/* STEP 4: Alternative Structure */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-foreground">Step 4 — Using the market price directly</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-5 h-5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Use the market rate directly, with only transparent network costs.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              <strong>What if there was no FX markup? Just the market rate + transparent costs.</strong>
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              It's possible to structure a transfer where you get the market reference rate directly, with only explicit network costs. No hidden markups. No adjusted rates.
            </p>
          </div>

          {/* Alternative structure diagram */}
          <div className="bg-card border border-border border-primary/50 rounded-lg p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">🇧🇷 Starting point (market)</p>
                <div className="h-10 bg-primary/10 border border-primary rounded-lg flex items-center px-4">
                  <p className="font-bold text-foreground">R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">⚡ Network cost only</p>
                <div className="h-10 bg-primary/20 border border-primary rounded-lg flex items-center px-4">
                  <p className="font-bold text-primary">R${(coins.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
                <p className="text-xs text-primary">−R${(coins.cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })} (network cost)</p>
              </div>

              <div className="bg-primary/10 p-4 rounded border border-primary/50">
                <p className="text-xs text-muted-foreground mb-1">✅ Total cost</p>
                <p className="text-2xl font-bold text-primary">{(coins.cost_bps || 0).toFixed(2)} bps</p>
                <p className="text-xs text-muted-foreground mt-1">That's {((coins.cost_bps || 0) / 100).toFixed(4)}% of your money.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
        </div>

        {/* COMPARISON */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Side-by-side comparison</h2>
            <p className="text-muted-foreground">Same amount of money. Different structures. Very different outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">🏦 Traditional Bank</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">🇧🇷 You receive</p>
                  <p className="text-3xl font-bold text-foreground">
                    R${(bank.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">❌ Cost</p>
                  <p className="text-2xl font-bold text-red-500">
                    {(bank.cost_bps || 0).toFixed(0)} bps
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ({((bank.cost_bps || 0) / 100).toFixed(2)}% of your money)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-amber-500/50">
              <CardHeader>
                <CardTitle className="text-lg text-amber-600">🌍 TransferWise</CardTitle>
                <CardDescription className="text-xs">Industry reference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">🇧🇷 You receive</p>
                  <p className="text-3xl font-bold text-amber-600">
                    R${transferwiseAmount.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">⚠️ Cost</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {transferwiseCost.toFixed(0)} bps
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ({(transferwiseCost / 100).toFixed(2)}% of your money)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg text-primary">⚡ Market-based (Coins)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">🇧🇷 You receive</p>
                  <p className="text-3xl font-bold text-primary">
                    R${(coins.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">✅ Cost</p>
                  <p className="text-2xl font-bold text-primary">
                    {(coins.cost_bps || 0).toFixed(2)} bps
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ({((coins.cost_bps || 0) / 100).toFixed(4)}% of your money)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/10 border-primary/50">
            <CardHeader>
              <CardTitle className="text-primary">💰 The difference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">✅ Extra money you receive with market-based structure</p>
                <p className="text-4xl font-bold text-primary">
                  +R${(delta.brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">📉 Cost difference</p>
                <p className="text-lg text-primary">
                  {(delta.bps || 0).toFixed(2)} basis points less
                </p>
              </div>
              <div className="bg-primary/5 p-4 rounded border border-primary/20 mt-4">
                <p className="text-sm font-semibold text-foreground">
                  Same 🇬🇧 £{(comp.amount_gbp || 0).toLocaleString("en-GB")}. Different structure. Materially different outcome.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
        </div>

        {/* VERIFICATION */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Verification & data integrity</h2>
            <p className="text-muted-foreground">
              All figures are derived from public market data and generated at the timestamp below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Proof Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded font-mono text-xs text-foreground overflow-auto max-h-32">
                  {snapshot.proof_message}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(snapshot.proof_message, "message")}
                  className="w-full"
                >
                  {copied === "message" ? (
                    <>
                      <Check className="w-4 h-4 mr-2" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" /> Copy Message
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">SHA256 Hash</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded font-mono text-xs text-foreground overflow-auto">
                  {snapshot.integrity_hash}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(snapshot.integrity_hash, "hash")}
                  className="w-full"
                >
                  {copied === "hash" ? (
                    <>
                      <Check className="w-4 h-4 mr-2" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" /> Copy Hash
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Data Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Market data sources</p>
                <div className="flex flex-wrap gap-2">
                  {snapshot.audit_trail.sources.map((source) => (
                    <Badge key={source} variant="secondary">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground mb-2">Generated</p>
                <p className="text-sm text-foreground font-mono">
                  {snapshot.audit_trail.timestamp}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container text-center text-xs text-muted-foreground">
          <p>
            🇬🇧 🇧🇷 This page demonstrates how international transfers are structured and priced.
          </p>
          <p className="mt-2">
            All calculations are reproducible, time-stamped, and verifiable.
          </p>
        </div>
      </footer>
    </div>
  );
}
