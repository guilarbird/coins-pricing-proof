'use client';

import { ChevronDown, TrendingUp, TrendingDown, Play, Pause, Volume2, HelpCircle, Globe, Info } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { FXDiagrams } from '../components/FXDiagrams';
import { CostStack } from '../components/CostStack';
import { AuditSummary } from '../components/AuditSummary';
import { StablecoinRail } from '../components/StablecoinRail';
import { translations } from '../lib/translations';
import { formatCurrency, formatPercent } from '../lib/formatters';

type Language = 'pt' | 'en' | 'zh';

// Old translations kept for reference - now using centralized translations.ts

const BANK_SPREAD_BPS = 250; // 2.5%
const BANK_FEE_PCT = 0.008; // 0.8%
const BANK_IOF_PCT = 0.035; // 3.5%
const WISE_FEE_GBP = 6.23; // Fixed fee for 1000 GBP
const WISE_IOF_PCT = 0.011; // ~1.1% (structure-dependent)
const COINS_NETWORK_FEE_USD = 5;
const COINS_IOF_PCT = 0.035; // 3.5%

export default function Home() {
  const [language, setLanguage] = useState<Language>('pt');
  const [amount, setAmount] = useState(1000);
  const [fxRates, setFxRates] = useState({
    gbpUsd: 1.27,
    usdBrl: 5.19,
    usdtBrl: 5.3754,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const t = translations[language];

  // Fetch FX rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const [gbpUsdRes, usdBrlRes, usdtBrlRes] = await Promise.all([
          fetch('https://api.wise.com/v1/rates?source=GBP&target=USD'),
          fetch('https://api.wise.com/v1/rates?source=USD&target=BRL'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=USDTBRL'),
        ]);

        const gbpUsdData = await gbpUsdRes.json();
        const usdBrlData = await usdBrlRes.json();
        const usdtBrlData = await usdtBrlRes.json();

        setFxRates({
          gbpUsd: gbpUsdData.rate || 1.27,
          usdBrl: usdBrlData.rate || 5.19,
          usdtBrl: parseFloat(usdtBrlData.price) || 5.3754,
        });
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate pricing
  const gbpBrlMid = fxRates.gbpUsd * fxRates.usdBrl;

  // Bank Transfer
  const bankExecutionRate = gbpBrlMid * (1 - BANK_SPREAD_BPS / 10000);
  const bankConverted = amount * bankExecutionRate;
  const bankFee = bankConverted * BANK_FEE_PCT;
  const bankIof = bankConverted * BANK_IOF_PCT;
  const bankFinal = bankConverted - bankFee - bankIof;
  const bankCost = gbpBrlMid * amount - bankFinal;

  // Wise
  const wiseConverted = amount * gbpBrlMid;
  const wiseFee = WISE_FEE_GBP * gbpBrlMid;
  const wiseIof = wiseConverted * WISE_IOF_PCT;
  const wiseFinal = wiseConverted - wiseFee - wiseIof;
  const wiseCost = gbpBrlMid * amount - wiseFinal;

  // Coins
  const coinsConverted = amount * gbpBrlMid;
  const coinsNetworkFee = COINS_NETWORK_FEE_USD * fxRates.usdBrl;
  const coinsIof = coinsConverted * COINS_IOF_PCT;
  const coinsFinal = coinsConverted - coinsNetworkFee - coinsIof;
  const coinsCost = gbpBrlMid * amount - coinsFinal;

  const savings = bankFinal - coinsFinal;
  const isCoinsBest = coinsFinal > bankFinal && coinsFinal > wiseFinal;

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-navy text-ice-blue">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-slate/30 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="/logo-whi.png" alt="coins.xyz" className="h-8" />
          </div>
          <button
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card hover:bg-white/10"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-ice-blue via-slate-200 to-ice-blue bg-clip-text text-transparent">
          {t.title}
        </h1>
        <p className="text-lg text-slate-400 mb-2">{t.subtitle}</p>
        <p className="text-sm text-slate-500">Updated now</p>
      </section>

      {/* Market Reference */}
      <section className="container py-8">
        <h2 className="text-2xl font-semibold tracking-wider mb-6">{t.marketReference}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* GBP/USD */}
          <div className="glass-card p-6">
            <p className="text-slate-400 text-sm mb-2">GBP/USD</p>
            <p className="text-3xl font-bold mb-4">{fxRates.gbpUsd.toFixed(4)}</p>
            <p className="text-xs text-slate-500 mb-4">{t.midMarket}</p>
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-bid font-semibold">Bid (Compra)</span>
                <span className="text-bid">{(fxRates.gbpUsd - 0.0005).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ask font-semibold">Ask (Venda)</span>
                <span className="text-ask">{(fxRates.gbpUsd + 0.0005).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-spread font-semibold">{t.spread}</span>
                <span className="text-spread">0.0010 (7.87 bps)</span>
              </div>
            </div>
          </div>

          {/* USD/BRL (Wise) */}
          <div className="glass-card p-6">
            <p className="text-slate-400 text-sm mb-2">USD/BRL (Wise)</p>
            <p className="text-3xl font-bold mb-4">{fxRates.usdBrl.toFixed(4)}</p>
            <p className="text-xs text-slate-500 mb-4">{t.midMarket}</p>
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-bid font-semibold">Bid (Compra)</span>
                <span className="text-bid">{(fxRates.usdBrl - 0.01).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ask font-semibold">Ask (Venda)</span>
                <span className="text-ask">{(fxRates.usdBrl + 0.01).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-spread font-semibold">{t.spread}</span>
                <span className="text-spread">0.0200 (38.54 bps)</span>
              </div>
            </div>
          </div>

          {/* USDT/BRL (Binance) */}
          <div className="glass-card p-6">
            <p className="text-slate-400 text-sm mb-2">USDT/BRL (Binance)</p>
            <p className="text-3xl font-bold mb-4">{fxRates.usdtBrl.toFixed(4)}</p>
            <p className="text-xs text-slate-500 mb-4">{t.midMarket}</p>
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-bid font-semibold">Bid (Compra)</span>
                <span className="text-bid">{(fxRates.usdtBrl - 0.02).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ask font-semibold">Ask (Venda)</span>
                <span className="text-ask">{(fxRates.usdtBrl + 0.02).toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-spread font-semibold">{t.spread}</span>
                <span className="text-spread">0.0400 (75.08 bps)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Diagrams Section */}
      <section className="container py-8">
        <h2 className="text-2xl font-semibold tracking-wider mb-6">Como Funciona o Câmbio</h2>
        <FXDiagrams language={language} isAudioPlaying={isPlaying} audioTime={currentTime} />
      </section>

      {/* Audio Explanation */}
      <section className="container py-8">
        <h2 className="text-2xl font-semibold tracking-wider mb-6">Market Architecture Audio</h2>
        <div className="glass-card p-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={togglePlayback}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center hover:shadow-lg transition-all"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-slate-900" />
              ) : (
                <Play className="w-6 h-6 text-slate-900" />
              )}
            </button>
            <div className="flex-1">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-gold transition-all"
                  style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[1, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handlePlaybackRateChange(rate)}
                  className={`px-2 py-1 text-xs rounded transition-all ${
                    playbackRate === rate
                      ? 'bg-gradient-gold text-slate-900 font-semibold'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
          <audio
            ref={audioRef}
            src="/fx-pricing-explanation.wav"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
          <p className="text-sm text-slate-400">
            2-minute explanation: How FX pricing works, why spreads differ, and why market-based execution matters.
          </p>
        </div>
      </section>

      {/* Transfer Simulator */}
      <section className="container py-8">
        <h2 className="text-2xl font-semibold tracking-wider mb-6">{t.transferSimulator}</h2>
        <div className="glass-card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">{t.youSend}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-ice-blue placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-slate-400 font-semibold">
                  GBP
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">{t.youReceive}</label>
              <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-ice-blue font-bold text-lg">
                {formatCurrency(coinsFinal, 'BRL', language)}
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bank */}
            <div className="border-l-4 border-red-500 pl-4 py-4">
              <p className="text-sm text-slate-400 mb-2">{t.bankTransfer}</p>
              <p className="text-2xl font-bold text-red-400 mb-2">{formatCurrency(bankFinal, 'BRL', language)}</p>
              <p className="text-xs text-red-400">
                {t.cost}: {formatCurrency(bankCost, 'BRL', language)} ({formatPercent((bankCost / (gbpBrlMid * amount)) * 100)})
              </p>
            </div>

            {/* Wise */}
            <div className="border-l-4 border-amber-500 pl-4 py-4">
              <p className="text-sm text-slate-400 mb-2">{t.wise}</p>
              <p className="text-2xl font-bold text-amber-400 mb-2">{formatCurrency(wiseFinal, 'BRL', language)}</p>
              <p className="text-xs text-amber-400">
                {t.cost}: {formatCurrency(wiseCost, 'BRL', language)} ({formatPercent((wiseCost / (gbpBrlMid * amount)) * 100)})
              </p>
            </div>

            {/* Coins */}
            <div className="border-l-4 border-emerald-500 pl-4 py-4 relative">
              {isCoinsBest && (
                <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded border border-emerald-500/30 font-semibold">
                  Best
                </div>
              )}
              <p className="text-sm text-slate-400 mb-2">{t.coins}</p>
              <p className="text-2xl font-bold text-emerald-400 mb-2">{formatCurrency(coinsFinal, 'BRL', language)}</p>
              {isCoinsBest ? (
                <p className="text-xs text-emerald-400">
                  Savings vs Bank: {formatCurrency(savings, 'BRL', language)} ({formatPercent((savings / (gbpBrlMid * amount)) * 100)})
                </p>
              ) : (
                <p className="text-xs text-slate-400">
                  Difference vs Bank: {formatCurrency(bankFinal - coinsFinal, 'BRL', language)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-4">
          <button className="btn-premium flex-1">
            {t.simulateNow}
          </button>
          <button className="px-6 py-3 rounded-lg glass-card hover:bg-white/10 font-semibold transition-all flex-1">
            {t.createAccount}
          </button>
        </div>
      </section>

      {/* Audit Summary - Above the fold */}
      <section className="container py-8">
        <AuditSummary
          amount={amount}
          gbpBrlMid={gbpBrlMid}
          coinsFinal={coinsFinal}
          bankFinal={bankFinal}
          wiseFinal={wiseFinal}
          language={language}
        />
      </section>

      {/* Cost Stack Visualization */}
      <section className="container py-12">
        <CostStack
          amount={amount}
          gbpBrlMid={gbpBrlMid}
          bankFinal={bankFinal}
          wiseFinal={wiseFinal}
          coinsFinal={coinsFinal}
          language={language}
        />
      </section>

      {/* Stablecoin Rail Explainer */}
      <section className="container py-12">
        <StablecoinRail language={language} />
      </section>

      {/* Diagrams */}
      <section className="container py-12">
        <h2 className="text-2xl font-semibold tracking-wider mb-6">How It Works</h2>
        <FXDiagrams language={language} />
      </section>

      {/* Footer */}
      <section className="container py-12 border-t border-white/10 mt-12">
        <p className="text-sm text-slate-500 text-center">
          Rates updated in real-time from Wise and Binance APIs. IOF varies by settlement structure. All calculations are transparent and auditable.
        </p>
      </section>
    </div>
  );
}
