import { useEffect, useState } from "react";
import { Copy, Check, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  useEffect(() => {
    const loadSnapshot = async () => {
      try {
        const res = await fetch("/snapshot.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSnapshot(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading data");
        console.error("Failed to load snapshot:", err);
      }
    };
    loadSnapshot();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied");
    setTimeout(() => setCopied(null), 2000);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Reload</Button>
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Coins" className="h-8 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Coins</h1>
              <p className="text-xs text-muted-foreground">Understanding GBP → BRL Transfers</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {comp.timestamp ? new Date(comp.timestamp).toLocaleString("en-GB") : ""}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 space-y-16">
        {/* OVERVIEW */}
        <section className="space-y-6 max-w-3xl">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-foreground">Understanding GBP → BRL Transfers</h1>
            <p className="text-lg text-muted-foreground">How international transfers are priced — clearly and transparently</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <p className="text-sm text-foreground">
              International transfers often look simple on the surface, but the final amount you receive depends heavily on <strong>how</strong> the conversion is structured.
            </p>
            <p className="text-sm text-foreground">
              This page explains, step by step, how a GBP → BRL transfer is priced, where costs are introduced, and why different structures lead to very different outcomes — even for the same amount.
            </p>
            <p className="text-xs text-muted-foreground">
              All numbers below are derived from <strong>public market data</strong>, are <strong>time-stamped</strong>, and can be independently verified.
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
            <h2 className="text-3xl font-bold text-foreground">Step 1 — The market reference price</h2>
            <p className="text-muted-foreground max-w-2xl">
              <strong>The price of money before any institution intervenes</strong>
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              At any given moment, currencies trade at a market price. This price reflects global supply and demand and exists <strong>before</strong> banks apply FX markups, transfer fees are charged, or commercial adjustments are introduced.
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              This is the <strong>reference point</strong>, not what banks typically execute at.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Market references (live snapshot)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(prices).map(([pair, data]: any) => (
                <Card key={pair} className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-mono">{pair}</CardTitle>
                    <CardDescription className="text-xs">
                      Source: {data.source} • {data.staleness_seconds}s ago
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Bid</p>
                      <p className="text-sm font-mono font-bold text-foreground">{data.bid.toFixed(8)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Ask</p>
                      <p className="text-sm font-mono font-bold text-foreground">{data.ask.toFixed(8)}</p>
                    </div>
                    <div className="border-t border-border pt-3">
                      <p className="text-xs text-muted-foreground">Mid (reference)</p>
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

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground"><strong>Example</strong></p>
              <p className="text-sm text-foreground">
                £{(comp.amount_gbp || 0).toLocaleString("en-GB")} at the <strong>market reference price</strong> equals:
              </p>
              <p className="text-3xl font-bold text-primary">
                R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                This value represents the theoretical outcome if no party modified the exchange rate.
              </p>
            </div>
          </div>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">Now observe</span>
          </div>
        </div>

        {/* STEP 2: Execution Rate */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Step 2 — The execution rate</h2>
            <p className="text-muted-foreground max-w-2xl">
              <strong>Where banks change the price before conversion</strong>
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Banks do <strong>not</strong> execute transfers at the market reference price. Before your funds are converted, the exchange rate itself is adjusted using an <strong>FX markup</strong>. This adjustment is embedded in the rate and is <strong>not shown as a fee</strong>.
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Bank transfer: £{(comp.amount_gbp || 0).toLocaleString("en-GB")} → BRL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Market reference (Mid)</p>
                <p className="text-2xl font-bold text-foreground">
                  R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">FX markup applied: {bank.fx_markup_bps || 0} basis points (0.80%)</p>
                <p className="text-lg font-bold text-red-500">
                  −R${(bank.fx_cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This means the conversion starts from a <strong>worse rate</strong> than the market reference.
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4 bg-muted/50 p-4 rounded">
                <p className="text-sm text-muted-foreground">Amount after rate adjustment</p>
                <p className="text-2xl font-bold text-foreground">
                  R${(bank.brl_after_fx || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  At this stage, value is already lost — before any explicit fee appears.
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
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">And then</span>
          </div>
        </div>

        {/* STEP 3: Explicit Fee */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Step 3 — The explicit transfer fee</h2>
            <p className="text-muted-foreground max-w-2xl">
              <strong>A visible fee added after the adjusted rate</strong>
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              After applying the adjusted exchange rate, banks typically charge an explicit transfer fee. This fee is charged <strong>on top of</strong> a conversion that already used a marked-up rate.
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Final bank outcome</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Market reference value</p>
                <p className="text-2xl font-bold text-foreground">
                  R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">FX markup: embedded in rate</p>
                <p className="text-lg font-bold text-red-500">
                  −R${(bank.fx_cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Explicit fee: {bank.fee_pct || 0}%</p>
                <p className="text-lg font-bold text-red-500">
                  −R${(bank.fee_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4 bg-red-50 dark:bg-red-950/20 p-4 rounded">
                <p className="text-sm text-muted-foreground">You receive</p>
                <p className="text-3xl font-bold text-foreground">
                  R${(bank.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  <strong>Total cost: {(bank.cost_bps || 0).toFixed(0)} basis points</strong>
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
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">An alternative structure</span>
          </div>
        </div>

        {/* STEP 4: Alternative Structure */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Step 4 — Using the market price directly</h2>
            <p className="text-muted-foreground max-w-2xl">
              It is possible to structure a conversion where the market reference rate is used directly, no FX markup is applied to the exchange rate, and all costs are explicit, flat, and visible.
            </p>
          </div>

          <Card className="bg-card border-border border-primary/50">
            <CardHeader>
              <CardTitle>Alternative structure: £{(comp.amount_gbp || 0).toLocaleString("en-GB")} → USDT → BRL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Market reference (Mid)</p>
                <p className="text-2xl font-bold text-foreground">
                  R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Network cost: {coins.network_fee_usdt || 0} USDT (~R${(coins.cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })})</p>
                <p className="text-lg font-bold text-primary">
                  −R${(coins.cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  No adjustment to exchange rate
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4 bg-primary/10 p-4 rounded">
                <p className="text-sm text-muted-foreground">You receive</p>
                <p className="text-3xl font-bold text-primary">
                  R${(coins.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  <strong>Total cost: {(coins.cost_bps || 0).toFixed(2)} basis points</strong>
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

        {/* FLOW DIAGRAMS - Dark Section */}
        <section className="space-y-8 -mx-4 px-4 py-12 bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-lg">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">How the structures differ</h2>
            <p className="text-slate-300 max-w-2xl">
              Visual comparison of cost erosion in traditional bank transfers vs. market-based structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional Bank Flow */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Traditional bank transfer</h3>
              <div className="space-y-3">
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <p className="text-sm text-slate-200 font-mono">GBP</p>
                  <p className="text-2xl font-bold text-white">£{(comp.amount_gbp || 0).toLocaleString("en-GB")}</p>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-red-400" />
                </div>
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                  <p className="text-xs text-red-300 mb-1">FX Markup Applied</p>
                  <p className="text-sm text-red-200 font-mono">−{bank.fx_markup_bps || 0} bps</p>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-slate-400" />
                </div>
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <p className="text-xs text-slate-300 mb-1">Adjusted Exchange Rate</p>
                  <p className="text-xl font-bold text-white">
                    R${(bank.brl_after_fx || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-red-400" />
                </div>
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                  <p className="text-xs text-red-300 mb-1">Explicit Fee</p>
                  <p className="text-sm text-red-200 font-mono">−{bank.fee_pct || 0}%</p>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-red-400" />
                </div>
                <div className="bg-red-950/50 border border-red-700 rounded-lg p-4">
                  <p className="text-xs text-red-300 mb-1">BRL Received</p>
                  <p className="text-2xl font-bold text-red-200">
                    R${(bank.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-red-300 mt-2">Cost: {(bank.cost_bps || 0).toFixed(0)} bps</p>
                </div>
              </div>
            </div>

            {/* Market-Based Flow */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Market-based structure</h3>
              <div className="space-y-3">
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <p className="text-sm text-slate-200 font-mono">GBP</p>
                  <p className="text-2xl font-bold text-white">£{(comp.amount_gbp || 0).toLocaleString("en-GB")}</p>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-primary" />
                </div>
                <div className="bg-primary/20 border border-primary rounded-lg p-4">
                  <p className="text-xs text-primary/80 mb-1">Market Reference Rate</p>
                  <p className="text-sm text-primary font-mono">No adjustment</p>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-slate-400" />
                </div>
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <p className="text-xs text-slate-300 mb-1">USDT Intermediate</p>
                  <p className="text-xl font-bold text-white">
                    R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-primary" />
                </div>
                <div className="bg-primary/20 border border-primary rounded-lg p-4">
                  <p className="text-xs text-primary/80 mb-1">Network Cost</p>
                  <p className="text-sm text-primary font-mono">−R${(coins.cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-primary" />
                </div>
                <div className="bg-primary/30 border border-primary rounded-lg p-4">
                  <p className="text-xs text-primary/80 mb-1">BRL Received</p>
                  <p className="text-2xl font-bold text-primary">
                    R${(coins.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-primary/80 mt-2">Cost: {(coins.cost_bps || 0).toFixed(2)} bps</p>
                </div>
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
            <h2 className="text-3xl font-bold text-foreground">Comparison</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Bank structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">You receive</p>
                  <p className="text-3xl font-bold text-foreground">
                    R${(bank.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">Cost</p>
                  <p className="text-2xl font-bold text-red-500">
                    {(bank.cost_bps || 0).toFixed(0)} bps
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Market-based structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">You receive</p>
                  <p className="text-3xl font-bold text-primary">
                    R${(coins.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">Cost</p>
                  <p className="text-2xl font-bold text-primary">
                    {(coins.cost_bps || 0).toFixed(2)} bps
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/10 border-primary/50">
            <CardHeader>
              <CardTitle className="text-primary">Net difference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Additional amount received</p>
                <p className="text-4xl font-bold text-primary">
                  +R${(delta.brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Cost difference</p>
                <p className="text-lg text-primary">
                  {(delta.bps || 0).toFixed(2)} basis points
                </p>
              </div>
              <div className="border-t border-border pt-4 bg-primary/5 p-3 rounded">
                <p className="text-xs text-muted-foreground">
                  Same £{(comp.amount_gbp || 0).toLocaleString("en-GB")}. Different structure. Materially different outcome.
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
            This page demonstrates how international transfers are structured and priced.
            All calculations are reproducible, time-stamped, and verifiable.
          </p>
        </div>
      </footer>
    </div>
  );
}
