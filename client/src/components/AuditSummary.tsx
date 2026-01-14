import React from 'react';
import { CheckCircle } from 'lucide-react';
import { formatCurrency } from '../lib/formatters';

interface AuditSummaryProps {
  amount: number;
  gbpBrlMid: number;
  coinsFinal: number;
  bankFinal: number;
  wiseFinal: number;
  language: 'pt' | 'en' | 'zh';
}

export function AuditSummary({
  amount,
  gbpBrlMid,
  coinsFinal,
  bankFinal,
  wiseFinal,
  language,
}: AuditSummaryProps) {
  const baseline = gbpBrlMid * amount;
  const savingsVsBank = bankFinal - coinsFinal;
  const savingsVsWise = wiseFinal - coinsFinal;
  
  const labels = {
    pt: {
      title: 'Resumo de Auditoria',
      youSend: 'Você envia',
      marketBaseline: 'Referência de Mercado (mid-market)',
      youReceiveCoins: 'Você recebe (Coins)',
      savingsVsBank: 'Economia vs Banco',
      savingsVsWise: 'Diferença vs Wise',
      allCostsShown: 'Todos os custos mostrados',
      sourcesLinked: 'Fontes vinculadas',
      updatedEvery: 'Atualizado a cada 30s',
      conclusion: 'Todos os provedores começam da mesma referência de mercado. A diferença é a estrutura de liquidação: número de intermediários, onde as taxas ficam embutidas e como o imposto é aplicado. Coins foca em execução de mercado com menos camadas, tornando os custos visíveis e mensuráveis.',
    },
    en: {
      title: 'Audit Summary',
      youSend: 'You send',
      marketBaseline: 'Market Baseline (mid-market)',
      youReceiveCoins: 'You receive (Coins)',
      savingsVsBank: 'Savings vs Bank',
      savingsVsWise: 'Difference vs Wise',
      allCostsShown: 'All costs shown',
      sourcesLinked: 'Sources linked',
      updatedEvery: 'Updated every 30s',
      conclusion: 'All providers start from the same market reference. The difference is the settlement structure: number of intermediaries, where fees are embedded, and how taxes apply. Coins focuses on market execution with fewer layers, making costs visible and measurable.',
    },
    zh: {
      title: '审计摘要',
      youSend: '您发送',
      marketBaseline: '市场基准(中间价)',
      youReceiveCoins: '您收到(Coins)',
      savingsVsBank: '相比银行的节省',
      savingsVsWise: '相比Wise的差异',
      allCostsShown: '显示所有成本',
      sourcesLinked: '源链接',
      updatedEvery: '每30秒更新一次',
      conclusion: '所有提供商从相同的市场参考开始。差异在于结算结构：中介数量、费用嵌入位置以及税收如何适用。Coins专注于市场执行，层级更少，使成本可见且可衡量。',
    },
  };
  
  const t = labels[language];
  
  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-ice-blue">{t.title}</h2>
      
      {/* Three Key Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* You Send */}
        <div className="border-l-4 border-blue-500 pl-4 py-3">
          <p className="text-xs text-slate-400 mb-1">{t.youSend}</p>
          <p className="text-2xl font-bold text-blue-400">£{amount.toLocaleString()}</p>
        </div>
        
        {/* Market Baseline */}
        <div className="border-l-4 border-amber-500 pl-4 py-3">
          <p className="text-xs text-slate-400 mb-1">{t.marketBaseline}</p>
          <p className="text-2xl font-bold text-amber-400">{formatCurrency(baseline, 'BRL', language)}</p>
        </div>
        
        {/* You Receive */}
        <div className="border-l-4 border-emerald-500 pl-4 py-3">
          <p className="text-xs text-slate-400 mb-1">{t.youReceiveCoins}</p>
          <p className="text-2xl font-bold text-emerald-400">{formatCurrency(coinsFinal, 'BRL', language)}</p>
        </div>
      </div>
      
      {/* Savings Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <p className="text-sm text-slate-400 mb-2">{t.savingsVsBank}</p>
          <p className="text-xl font-bold text-emerald-400">
            {savingsVsBank > 0 ? '+' : ''}{formatCurrency(savingsVsBank, 'BRL', language)}
          </p>
          {savingsVsBank > 0 && (
            <p className="text-xs text-emerald-300 mt-1">
              {((savingsVsBank / baseline) * 100).toFixed(2)}% of baseline
            </p>
          )}
        </div>
        
        <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-4">
          <p className="text-sm text-slate-400 mb-2">{t.savingsVsWise}</p>
          <p className={`text-xl font-bold ${savingsVsWise > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
            {savingsVsWise > 0 ? '+' : ''}{formatCurrency(savingsVsWise, 'BRL', language)}
          </p>
          {savingsVsWise <= 0 && (
            <p className="text-xs text-slate-400 mt-1">
              Wise is competitive in this scenario
            </p>
          )}
        </div>
      </div>
      
      {/* Audit Badges */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-300">{t.allCostsShown}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-300">{t.sourcesLinked}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-300">{t.updatedEvery}</span>
        </div>
      </div>
      
      {/* Conclusion */}
      <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-4">
        <p className="text-sm text-slate-300 leading-relaxed italic">
          "{t.conclusion}"
        </p>
      </div>
    </div>
  );
}
