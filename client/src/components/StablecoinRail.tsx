import React from 'react';

interface StablecoinRailProps {
  language: 'pt' | 'en' | 'zh';
}

export function StablecoinRail({ language }: StablecoinRailProps) {
  const labels = {
    pt: {
      title: 'O que é um Trilho de Liquidação Stablecoin?',
      definition: 'Stablecoin = Dólar digital',
      usedAs: 'Usado como trilho de liquidação',
      movesValue: 'Move valor como uma transferência bancária, mas com menos intermediários',
      priceFrom: 'Preço vem do mercado aberto',
      insight: 'Stablecoin não é uma "aposta". É infraestrutura de settlement. USDT é pareado ao dólar e usado para liquidação entre mercados.',
    },
    en: {
      title: 'What is a Stablecoin Settlement Rail?',
      definition: 'Stablecoin = Digital dollar',
      usedAs: 'Used as settlement rail',
      movesValue: 'Moves value like a wire transfer, but with fewer intermediaries',
      priceFrom: 'Price comes from open market',
      insight: 'Stablecoin is not a "bet". It\'s settlement infrastructure. USDT is dollar-pegged and used for settlement between markets.',
    },
    zh: {
      title: '什么是稳定币结算轨道?',
      definition: '稳定币 = 数字美元',
      usedAs: '用作结算轨道',
      movesValue: '像电汇一样移动价值，但中介更少',
      priceFrom: '价格来自公开市场',
      insight: '稳定币不是"赌注"。它是结算基础设施。USDT与美元挂钩，用于市场间的结算。',
    },
  };

  const t = labels[language];

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-xl font-semibold text-ice-blue">{t.title}</h3>
      
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-300">1</div>
          <div>
            <p className="font-semibold text-slate-300">{t.definition}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-300">2</div>
          <div>
            <p className="font-semibold text-slate-300">{t.usedAs}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-300">3</div>
          <div>
            <p className="font-semibold text-slate-300">{t.movesValue}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-300">4</div>
          <div>
            <p className="font-semibold text-slate-300">{t.priceFrom}</p>
          </div>
        </div>
      </div>
      
      {/* Flow Diagram */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-xs text-slate-400 mb-3">Settlement Flow:</p>
        <div className="flex items-center justify-between text-sm">
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mb-2">
              <span className="text-xs font-bold text-blue-300">GBP</span>
            </div>
            <span className="text-xs text-slate-400">Source</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 mx-2" />
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-2">
              <span className="text-xs font-bold text-purple-300">USDT</span>
            </div>
            <span className="text-xs text-slate-400">Rail</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500/30 to-emerald-500/30 mx-2" />
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-2">
              <span className="text-xs font-bold text-emerald-300">BRL</span>
            </div>
            <span className="text-xs text-slate-400">Destination</span>
          </div>
        </div>
      </div>
      
      {/* Key Insight */}
      <div className="mt-6 pt-6 border-t border-white/10 bg-slate-500/5 p-4 rounded-lg">
        <p className="text-sm text-slate-300 italic">
          💡 {t.insight}
        </p>
      </div>
    </div>
  );
}
