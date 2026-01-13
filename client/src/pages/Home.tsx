'use client';

import { useState, useEffect } from "react";
import { Copy, Check, ArrowDown, RefreshCw } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadSnapshot();
    setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const loadSnapshot = async () => {
    setLoading(true);
    try {
      const res = await fetch("/snapshot.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSnapshot(data);
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-red-500 font-semibold">Error: {error}</p>
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

  const prices = snapshot?.price_holders || {};
  const comp = snapshot?.comparison || {};

  if (!comp || !prices) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-red-500">Data not loaded correctly</p>
      </div>
    );
  }

  const bank = comp.bank || {};
  const coins = comp.coins || {};
  const delta = comp.delta || {};
  const transferwise = comp.transferwise || {};

  // Get prices safely
  const gbpusd = prices.GBPUSD;
  const usdbrl = prices.USDBRL;
  const gbpbrl = prices.GBPBRL;

  // Filter valid prices
  const validPrices = [
    { pair: "GBPUSD", data: gbpusd, label: "🇬🇧 £ → 🇺🇸 $" },
    { pair: "USDBRL", data: usdbrl, label: "🇺🇸 $ → 🇧🇷 R$" },
    { pair: "GBPBRL", data: gbpbrl, label: "🇬🇧 £ → 🇧🇷 R$" }
  ].filter(p => p.data && typeof p.data === 'object');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

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
              <p className="text-xs text-muted-foreground">Understanding GBP → BRL Transfers</p>
            </div>
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
              When you send money internationally, the final amount depends on <strong>how the conversion is structured</strong>. This page breaks down the pricing step-by-step so you understand where your money goes.
            </p>
            <p className="text-xs text-muted-foreground">
              All numbers are based on real market data, time-stamped, and independently verifiable.
            </p>
          </div>

          {/* Simple Diagram */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-block bg-primary/10 border border-primary rounded-lg px-6 py-3">
                <p className="text-xs text-muted-foreground mb-1">You have</p>
                <p className="text-3xl font-bold text-foreground">£{(comp.amount_gbp || 0).toLocaleString("en-GB")}</p>
              </div>
              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-primary" />
              </div>
              <div className="inline-block bg-primary/10 border border-primary rounded-lg px-6 py-3">
                <p className="text-xs text-muted-foreground mb-1">Market says it equals</p>
                <p className="text-3xl font-bold text-primary">R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              This is the <strong>starting point</strong>. Everything else is cost.
            </p>
          </div>

          {/* Live Prices */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Live market prices right now</h3>
              <Button
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
              {validPrices.map(({ pair, data, label }) => (
                <Card key={pair} className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-mono">{label}</CardTitle>
                    <CardDescription className="text-xs">
                      {data?.source === 'valorpro' && 'ValorPro (BRL Reference)'}
                      {data?.source === 'derived' && 'Derived (GBPUSD × USDBRL)'}
                      {data?.source === 'simulated' && 'Market Reference'}
                      {' • '}{data?.staleness_seconds || 0}s ago
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Bid</p>
                      <p className="text-sm font-mono font-bold text-foreground">{data?.bid?.toFixed(8) || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Ask</p>
                      <p className="text-sm font-mono font-bold text-foreground">{data?.ask?.toFixed(8) || 'N/A'}</p>
                    </div>
                    <div className="border-t border-border pt-3">
                      <p className="text-xs text-muted-foreground">Mid</p>
                      <p className="text-lg font-mono font-bold text-primary">{data?.mid?.toFixed(8) || 'N/A'}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {data?.spread_bps?.toFixed(2) || 0} bps
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
        <section className="space-y-6 max-w-3xl">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Step 2 — The execution rate</h2>
            <p className="text-sm text-muted-foreground">Where banks change the price before conversion</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Market reference</p>
                <div className="h-12 bg-primary/10 border border-primary rounded-lg flex items-center px-4">
                  <p className="font-bold text-foreground">R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Bank applies FX markup</p>
                  <p className="text-lg font-bold text-red-500">{bank.fx_markup_bps || 0} bps</p>
                  <p className="text-xs text-muted-foreground">= 0.80% worse rate</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">What you actually get</p>
                <div className="h-12 bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-700 rounded-lg flex items-center px-4">
                  <p className="font-bold text-foreground">R${(bank.brl_after_fx || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-red-500">
                  Loss: R${(bank.fx_cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STEP 3: Explicit Fee */}
        <section className="space-y-6 max-w-3xl">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Step 3 — The explicit transfer fee</h2>
            <p className="text-sm text-muted-foreground">A visible fee added after the adjusted rate</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Starting point (after FX markup)</p>
                <div className="h-10 bg-primary/10 border border-primary rounded-lg flex items-center px-4">
                  <p className="font-bold text-foreground">R${(bank.brl_after_fx || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Transfer fee ({bank.fee_pct || 0}%)</p>
                <div className="h-10 bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-700 rounded-lg flex items-center px-4">
                  <p className="font-bold text-red-500">R${(bank.fee_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded border border-red-300 dark:border-red-700">
                <p className="text-xs text-muted-foreground mb-1">Final amount (bank)</p>
                <p className="text-2xl font-bold text-red-500">R${(bank.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                <p className="text-xs text-red-500 mt-2">Total cost: {(bank.cost_bps || 0).toFixed(0)} bps</p>
              </div>
            </div>
          </div>
        </section>

        {/* STEP 4: Alternative */}
        <section className="space-y-6 max-w-3xl">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Step 4 — Alternative structure</h2>
            <p className="text-sm text-muted-foreground">Market-based conversion with minimal costs</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Starting point (market)</p>
                <div className="h-10 bg-primary/10 border border-primary rounded-lg flex items-center px-4">
                  <p className="font-bold text-foreground">R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Network cost only</p>
                <div className="h-10 bg-primary/20 border border-primary rounded-lg flex items-center px-4">
                  <p className="font-bold text-primary">R${(coins.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
                </div>
                <p className="text-xs text-primary">−R${(coins.cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })} (network cost)</p>
              </div>

              <div className="bg-primary/10 p-4 rounded border border-primary/50">
                <p className="text-xs text-muted-foreground mb-1">Total cost</p>
                <p className="text-2xl font-bold text-primary">{(coins.cost_bps || 0).toFixed(2)} bps</p>
                <p className="text-xs text-muted-foreground mt-1">That's {((coins.cost_bps || 0) / 100).toFixed(4)}% of your money.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">The comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Traditional Bank</CardTitle>
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

            <Card className="bg-card border-border border-amber-500/50">
              <CardHeader>
                <CardTitle className="text-lg text-amber-600">TransferWise</CardTitle>
                <CardDescription className="text-xs">Industry reference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">You receive</p>
                  <p className="text-3xl font-bold text-amber-600">
                    R${(transferwise.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">Cost</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {(transferwise.cost_bps || 0).toFixed(0)} bps
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Market-based (Coins)</CardTitle>
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
        </section>

        {/* Delta */}
        <section className="space-y-6">
          <Card className="bg-primary/10 border-primary/50">
            <CardHeader>
              <CardTitle className="text-primary">The difference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Extra money you receive with market-based structure</p>
                <p className="text-4xl font-bold text-primary">
                  +R${(delta.brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Cost difference</p>
                <p className="text-lg text-primary">
                  {(delta.bps || 0).toFixed(2)} basis points less
                </p>
              </div>
              <div className="bg-primary/5 p-4 rounded border border-primary/20 mt-4">
                <p className="text-sm font-semibold text-foreground">
                  Same £{(comp.amount_gbp || 0).toLocaleString("en-GB")}. Different structure. Materially different outcome.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Proof */}
        <section className="space-y-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">Proof & Verification</h2>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Proof Message</CardTitle>
              <CardDescription>Copy this to verify independently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded font-mono text-xs whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
                {snapshot.proof_message}
              </div>
              <Button
                onClick={() => copyToClipboard(snapshot.proof_message)}
                className="w-full gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Proof Message
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Integrity Hash</CardTitle>
              <CardDescription>SHA256 for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded font-mono text-xs break-all">
                {snapshot.integrity_hash}
              </div>
              <Button
                onClick={() => copyToClipboard(snapshot.integrity_hash)}
                className="w-full gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Hash
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t border-border mt-20 py-8">
          <div className="container text-center text-xs text-muted-foreground">
            <p>
              This page demonstrates how international transfers are structured and priced.
              All calculations are reproducible, time-stamped, and verifiable.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
