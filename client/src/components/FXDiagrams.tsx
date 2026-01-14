import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Language = 'pt' | 'en' | 'zh';

interface FXDiagramsProps {
  language: Language;
  isAudioPlaying?: boolean;
  audioTime?: number;
}

const translations = {
  pt: {
    pathTitle: 'O Caminho do Seu Dinheiro',
    pathDescription: 'Como o dinheiro viaja através dos sistemas',
    deconstructTitle: 'Desconstruindo Spreads de Câmbio',
    deconstructDescription: 'Cada provedor "come" uma parte diferente',
    impactTitle: 'O Impacto de Spreads Largos',
    impactDescription: 'Pequenas diferenças acumulam em grandes custos',
    iofTitle: 'Por Que o IOF Varia',
    iofDescription: 'A estrutura de liquidação determina o imposto',
    gbp: 'GBP',
    fxMarket: 'Mercado FX',
    bankRoute: 'Rota Bancária',
    wiseRoute: 'Rota Wise',
    coinsRoute: 'Rota Coins',
    localBank: 'Banco Local',
    swift: 'SWIFT/Bancos Correspondentes',
    allRoutes: 'Todas as rotas começam do mesmo preço de mercado.',
    coinsCuts: 'Coins reduz o número de intermediários.',
    hidden: 'Oculto',
    bankFxRate: 'Taxa FX Bancária',
    explicit: 'Explícito',
    wiseFee: 'Taxa Wise',
    zeroSpread: 'Zero-Spread',
    coinsFx: 'Coins Mercado FX',
    sending: 'Enviando GBP',
    foreignBanks: 'Bancos Estrangeiros',
    settlement: 'Liquidação Bancária Local',
    fullIof: 'IOF Completo',
    reducedIof: 'IOF Reduzido',
    structure: 'Estrutura',
    transfersThrough: 'Transferências através de bancos estrangeiros estão sujeitas a impostos mais altos.',
    localSettlement: 'Liquidação local resulta em impostos mais baixos. Reduz camadas.',
  },
  en: {
    pathTitle: 'The Path of Your Money',
    pathDescription: 'How money travels through the system',
    deconstructTitle: 'Deconstructing FX Spreads',
    deconstructDescription: 'Each provider "bites" a different amount',
    impactTitle: 'The Impact of Wide Spreads',
    impactDescription: 'Small differences add up to big costs',
    iofTitle: 'Why IOF Tax Varies',
    iofDescription: 'Settlement structure determines the tax',
    gbp: 'GBP',
    fxMarket: 'FX Market',
    bankRoute: 'Bank Route',
    wiseRoute: 'Wise Route',
    coinsRoute: 'Coins Route',
    localBank: 'Local Bank',
    swift: 'SWIFT/Correspondent Banks',
    allRoutes: 'All routes start from the same market price.',
    coinsCuts: 'Coins cuts the number of middlemen.',
    hidden: 'Hidden',
    bankFxRate: 'Bank FX Rate',
    explicit: 'Explicit',
    wiseFee: 'Wise Fee',
    zeroSpread: 'Zero-Spread',
    coinsFx: 'Coins Market FX',
    sending: 'Sending GBP',
    foreignBanks: 'Foreign Banks',
    settlement: 'Local Bank Settlement',
    fullIof: 'Full 3.5% IOF',
    reducedIof: 'Reduced (~1.0%) IOF',
    structure: 'Structure',
    transfersThrough: 'Transfers through foreign banks are subject to higher taxes.',
    localSettlement: 'Local settlement results in lower taxes. Cuts layers.',
  },
  zh: {
    pathTitle: '您的资金路径',
    pathDescription: '资金如何通过系统流动',
    deconstructTitle: '分解外汇点差',
    deconstructDescription: '每个提供商"咬"不同的金额',
    impactTitle: '宽点差的影响',
    impactDescription: '小差异累积成大成本',
    iofTitle: '为什么IOF税变化',
    iofDescription: '结算结构决定税收',
    gbp: 'GBP',
    fxMarket: '外汇市场',
    bankRoute: '银行路线',
    wiseRoute: 'Wise路线',
    coinsRoute: 'Coins路线',
    localBank: '当地银行',
    swift: 'SWIFT/代理银行',
    allRoutes: '所有路线从相同的市场价格开始。',
    coinsCuts: 'Coins减少了中间商的数量。',
    hidden: '隐藏',
    bankFxRate: '银行汇率',
    explicit: '明确',
    wiseFee: 'Wise费用',
    zeroSpread: '零点差',
    coinsFx: 'Coins市场汇率',
    sending: '发送GBP',
    foreignBanks: '外国银行',
    settlement: '当地银行结算',
    fullIof: '完整3.5% IOF',
    reducedIof: '减少(~1.0%) IOF',
    structure: '结构',
    transfersThrough: '通过外国银行的转账需要缴纳更高的税款。',
    localSettlement: '当地结算导致更低的税款。减少层级。',
  },
};

export function FXDiagrams({ language, isAudioPlaying = false, audioTime = 0 }: FXDiagramsProps) {
  const t = translations[language];
  const [expandedDiagram, setExpandedDiagram] = useState<string | null>(null);

  // Auto-expand diagrams based on audio timeline
  React.useEffect(() => {
    if (isAudioPlaying) {
      if (audioTime < 30) {
        setExpandedDiagram('path');
      } else if (audioTime < 60) {
        setExpandedDiagram('spreads');
      } else if (audioTime < 90) {
        setExpandedDiagram('impact');
      } else if (audioTime < 120) {
        setExpandedDiagram('iof');
      }
    }
  }, [audioTime, isAudioPlaying]);

  const toggleDiagram = (id: string) => {
    setExpandedDiagram(expandedDiagram === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Diagram 1: Path of Money */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleDiagram('path')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="text-left">
            <h3 className="text-xl font-semibold text-ice-blue">{t.pathTitle}</h3>
            <p className="text-sm text-slate-400">{t.pathDescription}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedDiagram === 'path' ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedDiagram === 'path' && (
          <div className="px-6 pb-6 border-t border-white/10">
            <svg viewBox="0 0 800 400" className="w-full h-auto" style={{
              opacity: expandedDiagram === 'path' ? 1 : 0.7,
              transition: 'opacity 0.3s ease'
            }}>
              {/* GBP Start */}
              <rect x="50" y="150" width="120" height="60" rx="8" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" />
              <text x="110" y="185" fontSize="16" fontWeight="bold" fill="#E0F2FE" textAnchor="middle">🇬🇧 GBP</text>

              {/* Arrow 1 */}
              <line x1="170" y1="180" x2="220" y2="180" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* FX Market */}
              <rect x="220" y="150" width="120" height="60" rx="8" fill="rgba(251, 191, 36, 0.1)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="2" />
              <text x="280" y="185" fontSize="16" fontWeight="bold" fill="#FBBF24" textAnchor="middle">💱 {t.fxMarket}</text>

              {/* Arrow 2 */}
              <line x1="340" y1="180" x2="390" y2="180" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* Three Routes */}
              {/* Bank Route */}
              <g>
                <rect x="50" y="280" width="140" height="80" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="2" />
                <text x="120" y="310" fontSize="14" fontWeight="bold" fill="#EF4444" textAnchor="middle">{t.bankRoute}</text>
                <text x="120" y="330" fontSize="11" fill="#CBD5E1" textAnchor="middle">Spread: 2.5%</text>
                <text x="120" y="345" fontSize="11" fill="#CBD5E1" textAnchor="middle">Fee: 0.8%</text>
                <text x="120" y="360" fontSize="11" fill="#CBD5E1" textAnchor="middle">IOF: 3.5%</text>
              </g>

              {/* Wise Route */}
              <g>
                <rect x="330" y="280" width="140" height="80" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="2" />
                <text x="400" y="310" fontSize="14" fontWeight="bold" fill="#F59E0B" textAnchor="middle">{t.wiseRoute}</text>
                <text x="400" y="330" fontSize="11" fill="#CBD5E1" textAnchor="middle">Fee: £9.99</text>
                <text x="400" y="345" fontSize="11" fill="#CBD5E1" textAnchor="middle">IOF: ~1.1%</text>
                <text x="400" y="360" fontSize="11" fill="#CBD5E1" textAnchor="middle">Local Bank</text>
              </g>

              {/* Coins Route */}
              <g>
                <rect x="610" y="280" width="140" height="80" rx="8" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" />
                <text x="680" y="310" fontSize="14" fontWeight="bold" fill="#10B981" textAnchor="middle">{t.coinsRoute}</text>
                <text x="680" y="330" fontSize="11" fill="#CBD5E1" textAnchor="middle">Network: $5</text>
                <text x="680" y="345" fontSize="11" fill="#10B981" textAnchor="middle">IOF: Structure-dependent</text>
                <text x="680" y="360" fontSize="11" fill="#CBD5E1" textAnchor="middle">Direct</text>
              </g>

              {/* Arrows down */}
              <line x1="280" y1="210" x2="120" y2="280" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" strokeDasharray="5,5" />
              <line x1="280" y1="210" x2="400" y2="280" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" strokeDasharray="5,5" />
              <line x1="280" y1="210" x2="680" y2="280" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" strokeDasharray="5,5" />

              {/* BRL End */}
              <rect x="50" y="30" width="700" height="50" rx="8" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" />
              <text x="400" y="65" fontSize="14" fill="#10B981" textAnchor="middle" fontWeight="bold">🇧🇷 BRL</text>

              {/* Arrow marker definition */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="rgba(255, 255, 255, 0.3)" />
                </marker>
              </defs>
            </svg>
            <p className="text-sm text-slate-400 mt-4">{t.allRoutes} {t.coinsCuts}</p>
          </div>
        )}
      </div>

      {/* Diagram 2: Deconstructing Spreads */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleDiagram('spreads')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="text-left">
            <h3 className="text-xl font-semibold text-ice-blue">{t.deconstructTitle}</h3>
            <p className="text-sm text-slate-400">{t.deconstructDescription}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedDiagram === 'spreads' ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedDiagram === 'spreads' && (
          <div className="px-6 pb-6 border-t border-white/10">
            <svg viewBox="0 0 600 400" className="w-full h-auto" style={{
              opacity: expandedDiagram === 'spreads' ? 1 : 0.7,
              transition: 'opacity 0.3s ease'
            }}>
              {/* Glass tube container */}
              <rect x="200" y="50" width="200" height="300" rx="20" fill="rgba(224, 242, 254, 0.05)" stroke="rgba(224, 242, 254, 0.2)" strokeWidth="2" />

              {/* Layer 1: Hidden Bank FX Rate (0.7%) - Red */}
              <rect x="210" y="60" width="180" height="70" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" />
              <text x="220" y="85" fontSize="12" fill="#EF4444" fontWeight="bold">{t.hidden}</text>
              <text x="220" y="105" fontSize="11" fill="#CBD5E1">{t.bankFxRate}</text>
              <text x="520" y="100" fontSize="14" fill="#EF4444" fontWeight="bold">0.7%</text>

              {/* Layer 2: Explicit Wise Fee (0.5%) - Amber */}
              <rect x="210" y="140" width="180" height="70" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" />
              <text x="220" y="165" fontSize="12" fill="#F59E0B" fontWeight="bold">{t.explicit}</text>
              <text x="220" y="185" fontSize="11" fill="#CBD5E1">{t.wiseFee}</text>
              <text x="520" y="180" fontSize="14" fill="#F59E0B" fontWeight="bold">0.5%</text>

              {/* Layer 3: Zero-Spread Coins (0.0%) - Green */}
              <rect x="210" y="220" width="180" height="70" rx="4" fill="rgba(16, 185, 129, 0.2)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
              <text x="220" y="245" fontSize="12" fill="#10B981" fontWeight="bold">{t.zeroSpread}</text>
              <text x="220" y="265" fontSize="11" fill="#CBD5E1">{t.coinsFx}</text>
              <text x="520" y="260" fontSize="14" fill="#10B981" fontWeight="bold">0.0%</text>

              {/* Bottom label */}
              <text x="300" y="350" fontSize="12" fill="#CBD5E1" textAnchor="middle">
                Cada camada representa custos ocultos
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Diagram 3: Impact of Wide Spreads */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleDiagram('impact')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="text-left">
            <h3 className="text-xl font-semibold text-ice-blue">{t.impactTitle}</h3>
            <p className="text-sm text-slate-400">{t.impactDescription}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedDiagram === 'impact' ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedDiagram === 'impact' && (
          <div className="px-6 pb-6 border-t border-white/10">
            <svg viewBox="0 0 600 350" className="w-full h-auto" style={{
              opacity: expandedDiagram === 'impact' ? 1 : 0.7,
              transition: 'opacity 0.3s ease'
            }}>
              {/* Input */}
              <rect x="50" y="80" width="150" height="60" rx="8" fill="rgba(224, 242, 254, 0.1)" stroke="rgba(224, 242, 254, 0.3)" strokeWidth="2" />
              <text x="125" y="100" fontSize="14" fill="#E0F2FE" textAnchor="middle" fontWeight="bold">£10,000</text>
              <text x="125" y="125" fontSize="11" fill="#CBD5E1" textAnchor="middle">Input</text>

              {/* Arrow */}
              <line x1="200" y1="110" x2="250" y2="110" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" markerEnd="url(#arrowhead2)" />

              {/* Output bars */}
              {/* Bank: R$ 64,407 - Tallest (Red) */}
              <g>
                <rect x="280" y="180" width="80" height="120" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" />
                <text x="320" y="250" fontSize="13" fill="#EF4444" textAnchor="middle" fontWeight="bold">R$ 64,407</text>
                <text x="320" y="270" fontSize="10" fill="#CBD5E1" textAnchor="middle">Bank</text>
              </g>

              {/* Wise: R$ 63,010 - Medium (Amber) */}
              <g>
                <rect x="380" y="200" width="80" height="100" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="2" />
                <text x="420" y="260" fontSize="13" fill="#F59E0B" textAnchor="middle" fontWeight="bold">R$ 63,010</text>
                <text x="420" y="280" fontSize="10" fill="#CBD5E1" textAnchor="middle">Wise</text>
              </g>

              {/* Coins: R$ 60,675 - Shortest (Green) */}
              <g>
                <rect x="480" y="240" width="80" height="60" rx="4" fill="rgba(16, 185, 129, 0.3)" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" />
                <text x="520" y="275" fontSize="13" fill="#10B981" textAnchor="middle" fontWeight="bold">R$ 60,675</text>
                <text x="520" y="295" fontSize="10" fill="#CBD5E1" textAnchor="middle">Coins</text>
              </g>

              {/* Arrow marker definition */}
              <defs>
                <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="rgba(255, 255, 255, 0.3)" />
                </marker>
              </defs>

              {/* Bottom note */}
              <text x="300" y="330" fontSize="11" fill="#CBD5E1" textAnchor="middle">
                Pequenas diferenças de spread acumulam em grandes custos.
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Diagram 4: Why IOF Varies */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleDiagram('iof')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="text-left">
            <h3 className="text-xl font-semibold text-ice-blue">{t.iofTitle}</h3>
            <p className="text-sm text-slate-400">{t.iofDescription}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedDiagram === 'iof' ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedDiagram === 'iof' && (
          <div className="px-6 pb-6 border-t border-white/10">
            <svg viewBox="0 0 700 350" className="w-full h-auto" style={{
              opacity: expandedDiagram === 'iof' ? 1 : 0.7,
              transition: 'opacity 0.3s ease'
            }}>
              {/* Top: Sending GBP */}
              <rect x="250" y="20" width="200" height="50" rx="8" fill="rgba(224, 242, 254, 0.1)" stroke="rgba(224, 242, 254, 0.3)" strokeWidth="2" />
              <text x="350" y="50" fontSize="14" fill="#E0F2FE" textAnchor="middle" fontWeight="bold">{t.sending}</text>

              {/* Arrow down */}
              <line x1="350" y1="70" x2="350" y2="110" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" markerEnd="url(#arrowhead3)" />

              {/* Bifurcation point */}
              <circle cx="350" cy="120" r="8" fill="rgba(251, 191, 36, 0.4)" stroke="rgba(251, 191, 36, 0.6)" strokeWidth="2" />

              {/* Left branch: Foreign Banks */}
              <line x1="350" y1="128" x2="200" y2="180" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" markerEnd="url(#arrowhead3)" />
              <rect x="80" y="180" width="240" height="60" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
              <text x="200" y="205" fontSize="13" fill="#EF4444" textAnchor="middle" fontWeight="bold">{t.foreignBanks}</text>
              <text x="200" y="225" fontSize="11" fill="#CBD5E1" textAnchor="middle">Múltiplas camadas de liquidação</text>

              {/* Right branch: Local Settlement */}
              <line x1="350" y1="128" x2="500" y2="180" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" markerEnd="url(#arrowhead3)" />
              <rect x="380" y="180" width="240" height="60" rx="8" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
              <text x="500" y="205" fontSize="13" fill="#10B981" textAnchor="middle" fontWeight="bold">{t.settlement}</text>
              <text x="500" y="225" fontSize="11" fill="#CBD5E1" textAnchor="middle">Liquidação direta local</text>

              {/* Arrows down to IOF */}
              <line x1="200" y1="240" x2="200" y2="280" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" strokeDasharray="5,5" />
              <line x1="500" y1="240" x2="500" y2="280" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" strokeDasharray="5,5" />

              {/* IOF Results */}
              <rect x="80" y="280" width="240" height="50" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="2" />
              <text x="200" y="300" fontSize="12" fill="#EF4444" textAnchor="middle" fontWeight="bold">{t.fullIof}</text>
              <text x="200" y="320" fontSize="10" fill="#CBD5E1" textAnchor="middle">3.5% IOF</text>

              <rect x="380" y="280" width="240" height="50" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" />
              <text x="500" y="300" fontSize="12" fill="#10B981" textAnchor="middle" fontWeight="bold">{t.reducedIof}</text>
              <text x="500" y="320" fontSize="10" fill="#CBD5E1" textAnchor="middle">~1.0% IOF</text>

              {/* Arrow marker definition */}
              <defs>
                <marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="rgba(255, 255, 255, 0.3)" />
                </marker>
              </defs>
            </svg>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>• {t.transfersThrough}</p>
              <p>• {t.localSettlement}</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-slate-500 mb-2">💡 <strong>Coins Note:</strong> IOF is not fixed. It depends on how the settlement is structured. We optimize for lower tax regimes where possible.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Diagram 5: SWIFT Maze vs Direct Path */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggleDiagram('swift')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="text-left">
            <h3 className="text-xl font-semibold text-ice-blue">SWIFT Maze vs Direct Path</h3>
            <p className="text-sm text-slate-400">How correspondent banking adds costs</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedDiagram === 'swift' ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedDiagram === 'swift' && (
          <div className="px-6 pb-6 border-t border-white/10">
            <svg viewBox="0 0 900 380" className="w-full h-auto">
              {/* SWIFT Path Label */}
              <text x="50" y="30" fontSize="14" fontWeight="bold" fill="#EF4444">Traditional Bank (SWIFT)</text>
              
              {/* SWIFT Boxes */}
              <rect x="50" y="50" width="90" height="45" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" />
              <text x="95" y="78" fontSize="11" fontWeight="bold" fill="#EF4444" textAnchor="middle">GBP</text>
              
              <line x1="140" y1="72" x2="170" y2="72" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
              
              <rect x="170" y="50" width="90" height="45" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" />
              <text x="215" y="75" fontSize="10" fontWeight="bold" fill="#EF4444" textAnchor="middle">Bank A</text>
              <text x="215" y="88" fontSize="8" fill="#CBD5E1" textAnchor="middle">Fee</text>
              
              <line x1="260" y1="72" x2="290" y2="72" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
              
              <rect x="290" y="50" width="90" height="45" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" />
              <text x="335" y="70" fontSize="9" fontWeight="bold" fill="#EF4444" textAnchor="middle">Correspondent</text>
              <text x="335" y="82" fontSize="9" fontWeight="bold" fill="#EF4444" textAnchor="middle">Bank 1</text>
              <text x="335" y="95" fontSize="8" fill="#CBD5E1" textAnchor="middle">Fee+Spread</text>
              
              <line x1="380" y1="72" x2="410" y2="72" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
              
              <rect x="410" y="50" width="90" height="45" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" />
              <text x="455" y="70" fontSize="9" fontWeight="bold" fill="#EF4444" textAnchor="middle">Correspondent</text>
              <text x="455" y="82" fontSize="9" fontWeight="bold" fill="#EF4444" textAnchor="middle">Bank 2</text>
              <text x="455" y="95" fontSize="8" fill="#CBD5E1" textAnchor="middle">Fee+Spread</text>
              
              <line x1="500" y1="72" x2="530" y2="72" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
              
              <rect x="530" y="50" width="90" height="45" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" />
              <text x="575" y="78" fontSize="10" fontWeight="bold" fill="#EF4444" textAnchor="middle">Local Bank</text>
              
              <line x1="620" y1="72" x2="650" y2="72" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
              
              <rect x="650" y="50" width="90" height="45" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" />
              <text x="695" y="78" fontSize="11" fontWeight="bold" fill="#EF4444" textAnchor="middle">BRL</text>
              
              {/* Direct Path Label */}
              <text x="50" y="180" fontSize="14" fontWeight="bold" fill="#10B981">Market-based (Coins)</text>
              
              {/* Direct Boxes */}
              <rect x="50" y="200" width="90" height="45" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" />
              <text x="95" y="228" fontSize="11" fontWeight="bold" fill="#10B981" textAnchor="middle">GBP</text>
              
              <line x1="140" y1="222" x2="180" y2="222" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
              
              <rect x="180" y="200" width="120" height="45" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" />
              <text x="240" y="228" fontSize="10" fontWeight="bold" fill="#10B981" textAnchor="middle">Market Execution</text>
              
              <line x1="300" y1="222" x2="340" y2="222" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
              
              <rect x="340" y="200" width="120" height="45" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" />
              <text x="400" y="228" fontSize="10" fontWeight="bold" fill="#10B981" textAnchor="middle">Local Settlement</text>
              
              <line x1="460" y1="222" x2="500" y2="222" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
              
              <rect x="500" y="200" width="90" height="45" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" />
              <text x="545" y="228" fontSize="11" fontWeight="bold" fill="#10B981" textAnchor="middle">BRL</text>
              
              {/* Bottom labels */}
              <text x="450" y="310" fontSize="12" fill="#EF4444" fontWeight="bold" textAnchor="middle">More stops = More hidden costs + More delays</text>
              <text x="450" y="330" fontSize="12" fill="#10B981" fontWeight="bold" textAnchor="middle">Fewer stops = More of your money arrives</text>
              
              {/* Key insight */}
              <rect x="50" y="350" width="800" height="20" rx="4" fill="rgba(251, 191, 36, 0.1)" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1" />
              <text x="450" y="364" fontSize="11" fill="#FBBF24" textAnchor="middle" fontWeight="bold">Each intermediary takes a fee and adds a spread. Coins eliminates unnecessary middlemen.</text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
