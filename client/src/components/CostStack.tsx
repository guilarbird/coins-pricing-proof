import React from 'react';

interface CostStackProps {
  amount: number;
  gbpBrlMid: number;
  bankFinal: number;
  wiseFinal: number;
  coinsFinal: number;
  language: 'pt' | 'en' | 'zh';
}

export function CostStack({ amount, gbpBrlMid, bankFinal, wiseFinal, coinsFinal, language }: CostStackProps) {
  const baseline = gbpBrlMid * amount;
  
  // Calculate percentages of baseline
  const bankPercent = (bankFinal / baseline) * 100;
  const wisePercent = (wiseFinal / baseline) * 100;
  const coinsPercent = (coinsFinal / baseline) * 100;
  
  // Calculate costs as percentages
  const bankCostPercent = 100 - bankPercent;
  const wiseCostPercent = 100 - wisePercent;
  const coinsCostPercent = 100 - coinsPercent;
  
  const labels = {
    pt: {
      title: 'Onde Cada Um "Come" da Taxa',
      baseline: 'Referência de Mercado (100%)',
      bank: 'Banco Tradicional',
      wise: 'Wise',
      coins: 'Coins',
      spread: 'Spread',
      fee: 'Taxa',
      iof: 'IOF',
      swift: 'SWIFT/Correspondent',
      network: 'Rede',
      structure: 'Estrutura',
      youReceive: 'Você recebe',
    },
    en: {
      title: 'Where Each Provider Takes Their Cut',
      baseline: 'Market Reference (100%)',
      bank: 'Traditional Bank',
      wise: 'Wise',
      coins: 'Coins',
      spread: 'Spread',
      fee: 'Fee',
      iof: 'IOF',
      swift: 'SWIFT/Correspondent',
      network: 'Network',
      structure: 'Structure',
      youReceive: 'You receive',
    },
    zh: {
      title: '每个提供商从费率中获取多少',
      baseline: '市场参考 (100%)',
      bank: '传统银行',
      wise: 'Wise',
      coins: 'Coins',
      spread: '点差',
      fee: '费用',
      iof: 'IOF',
      swift: 'SWIFT/代理',
      network: '网络',
      structure: '结构',
      youReceive: '您收到',
    },
  };
  
  const t = labels[language];
  
  return (
    <div className="glass-card p-6 space-y-6">
      <h3 className="text-xl font-semibold text-ice-blue">{t.title}</h3>
      
      {/* Baseline */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">{t.baseline}</span>
          <span className="font-semibold text-amber-400">100%</span>
        </div>
        <div className="h-8 bg-amber-500/20 border border-amber-500/40 rounded flex items-center px-3">
          <div className="text-xs font-semibold text-amber-400">R$ {baseline.toFixed(0)}</div>
        </div>
      </div>
      
      {/* Bank */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">{t.bank}</span>
          <span className="font-semibold text-red-400">{bankPercent.toFixed(1)}% {t.youReceive}</span>
        </div>
        <div className="h-8 bg-gradient-to-r from-red-500/20 to-red-500/5 border border-red-500/40 rounded flex items-center px-3 overflow-hidden">
          <div 
            className="h-full bg-red-500/30 rounded flex items-center px-2 text-xs font-semibold text-red-300"
            style={{ width: `${bankCostPercent}%` }}
          >
            {bankCostPercent > 5 && `${bankCostPercent.toFixed(1)}%`}
          </div>
          <div className="ml-2 text-xs text-slate-400 flex-1">
            Spread 2.5% + Fee 0.8% + IOF 3.5% + SWIFT
          </div>
        </div>
      </div>
      
      {/* Wise */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">{t.wise}</span>
          <span className="font-semibold text-amber-400">{wisePercent.toFixed(1)}% {t.youReceive}</span>
        </div>
        <div className="h-8 bg-gradient-to-r from-amber-500/20 to-amber-500/5 border border-amber-500/40 rounded flex items-center px-3 overflow-hidden">
          <div 
            className="h-full bg-amber-500/30 rounded flex items-center px-2 text-xs font-semibold text-amber-300"
            style={{ width: `${wiseCostPercent}%` }}
          >
            {wiseCostPercent > 5 && `${wiseCostPercent.toFixed(1)}%`}
          </div>
          <div className="ml-2 text-xs text-slate-400 flex-1">
            Fee £9.99 + IOF ~1.1% + Local Partner
          </div>
        </div>
      </div>
      
      {/* Coins */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">{t.coins}</span>
          <span className="font-semibold text-emerald-400">{coinsPercent.toFixed(1)}% {t.youReceive}</span>
        </div>
        <div className="h-8 bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border border-emerald-500/40 rounded flex items-center px-3 overflow-hidden">
          <div 
            className="h-full bg-emerald-500/30 rounded flex items-center px-2 text-xs font-semibold text-emerald-300"
            style={{ width: `${coinsCostPercent}%` }}
          >
            {coinsCostPercent > 5 && `${coinsCostPercent.toFixed(1)}%`}
          </div>
          <div className="ml-2 text-xs text-slate-400 flex-1">
            Network $5 + IOF (structure) + Direct
          </div>
        </div>
      </div>
      
      {/* Insight */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-sm text-blue-300">
          💡 <strong>Insight:</strong> {language === 'pt' 
            ? `Cada intermediário adiciona custos. Coins reduz intermediários, deixando mais do seu dinheiro chegar.`
            : language === 'zh'
            ? `每个中介都增加成本。Coins减少中介，让更多的钱到达。`
            : `Each intermediary adds costs. Coins reduces intermediaries, letting more of your money arrive.`
          }
        </p>
      </div>
    </div>
  );
}
