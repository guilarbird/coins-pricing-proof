export type Language = 'pt' | 'en' | 'zh';

export const translations = {
  pt: {
    // Header
    coinsXyz: 'Coins.xyz',
    live: 'Ao vivo',
    
    // Title & Subtitle
    title: 'Precificação de Transferência GBP → BRL',
    subtitle: 'Comparação direta de como diferentes estruturas de transferência precificam uma conversão de GBP para BRL. Todos os cenários começam da mesma referência de mercado.',
    
    // Market Reference Section
    marketReference: 'Referência de Mercado (Baseline)',
    marketRefDescription: 'Isto é o que você receberia com taxas mid-market com zero markup ou taxas.',
    midMarketRate: 'Taxa Mid-Market',
    timestamp: 'Timestamp',
    referenceAmount: 'Valor de Referência',
    adjustAmount: 'Ajustar valor:',
    source: 'Fonte',
    
    // Three-Way Comparison
    howMuchYouReceive: 'Quanto Você Recebe',
    
    // Bank Card
    traditionalBank: 'Banco Tradicional',
    bankDescription: 'Transferência bancária típica com markup de câmbio oculto',
    spread: 'Spread',
    fee: 'Taxa',
    iofTax: 'Imposto IOF',
    youReceive: 'Você recebe',
    adjustSpread: 'Ajustar Spread (bps):',
    bpsPercentage: 'bps = ',
    
    // Wise Card
    wise: 'Wise',
    wiseDescription: 'Transferência com taxa mid-market + taxa fixa + IOF',
    
    // Coins Card
    coins: 'Coins',
    coinsDescription: 'Execução baseada em mercado com taxa de rede + IOF',
    vsBankShort: 'vs Banco',
    vsWiseShort: 'vs Wise',
    
    // Breakdown Section
    breakdown: 'Breakdown de Custos',
    marketReferenceLabel: 'Referência de Mercado',
    fxSpreadApplied: 'Spread de Câmbio Aplicado',
    explicitFee: 'Taxa Explícita',
    iofTaxLabel: 'Imposto IOF',
    totalCost: 'Custo Total',
    
    // Explanations
    explanations: 'Explicações',
    iofTaxExplanation: 'O IOF de 3,5% (Imposto sobre Operações Financeiras) é um imposto brasileiro que se aplica a todas as transferências internacionais, independentemente do provedor. Não pode ser evitado.',
    spreadExplanation: 'O spread é a diferença entre o preço de compra e venda. Bancos tradicionais embutem isso no câmbio; Wise cobra uma taxa explícita.',
    feeExplanation: 'Taxas explícitas são cobradas pelo provedor. Coins cobra uma taxa de rede fixa em USD.',
    sourcesLabel: 'Fontes:',
    sourcesDescription: 'Referência de mercado da taxa mid-market publicada pela Wise. Estimativas de spread bancário baseadas em pesquisa Airwallex. Taxa IOF de PagBrasil (julho 2025).',
    
    // Diagrams
    howItWorks: 'Como Funciona',
    pathOfMoney: 'O Caminho do Seu Dinheiro',
    deconstructingFxSpreads: 'Desconstruindo Spreads de Câmbio',
    impactOfWideSpreads: 'O Impacto de Spreads Largos',
    whyIofVaries: 'Por Que o IOF Varia',
    swiftMaze: 'Labirinto SWIFT vs Caminho Direto',
    
    // Footer
    ratesUpdated: 'Taxas atualizadas em tempo real de APIs Wise e Binance. IOF varia por estrutura de liquidação. Todos os cálculos são transparentes e auditáveis.',
  },
  
  en: {
    // Header
    coinsXyz: 'Coins.xyz',
    live: 'Live',
    
    // Title & Subtitle
    title: 'GBP → BRL Transfer Pricing',
    subtitle: 'A direct comparison of how different transfer structures price a GBP to BRL conversion. All scenarios start from the same market reference.',
    
    // Market Reference Section
    marketReference: 'Market Reference (Baseline)',
    marketRefDescription: 'This is what you would receive at mid-market rates with zero markup or fees.',
    midMarketRate: 'Mid-Market Rate',
    timestamp: 'Timestamp',
    referenceAmount: 'Reference Amount',
    adjustAmount: 'Adjust amount:',
    source: 'Source',
    
    // Three-Way Comparison
    howMuchYouReceive: 'How Much You Receive',
    
    // Bank Card
    traditionalBank: 'Traditional Bank',
    bankDescription: 'Typical bank transfer with hidden FX markup',
    spread: 'Spread',
    fee: 'Fee',
    iofTax: 'IOF Tax',
    youReceive: 'You receive',
    adjustSpread: 'Adjust Spread (bps):',
    bpsPercentage: 'bps = ',
    
    // Wise Card
    wise: 'Wise',
    wiseDescription: 'Transfer with mid-market rate + fixed fee + IOF',
    
    // Coins Card
    coins: 'Coins',
    coinsDescription: 'Market-based execution with network fee + IOF',
    vsBankShort: 'vs Bank',
    vsWiseShort: 'vs Wise',
    
    // Breakdown Section
    breakdown: 'Cost Breakdown',
    marketReferenceLabel: 'Market Reference',
    fxSpreadApplied: 'FX Spread Applied',
    explicitFee: 'Explicit Fee',
    iofTaxLabel: 'IOF Tax',
    totalCost: 'Total Cost',
    
    // Explanations
    explanations: 'Explanations',
    iofTaxExplanation: 'The 3.5% IOF (Imposto sobre Operações Financeiras) is a Brazilian tax that applies to all international transfers, regardless of the provider. It cannot be avoided.',
    spreadExplanation: 'Spread is the difference between buy and sell prices. Traditional banks embed this in the exchange rate; Wise charges an explicit fee.',
    feeExplanation: 'Explicit fees are charged by the provider. Coins charges a fixed network fee in USD.',
    sourcesLabel: 'Sources:',
    sourcesDescription: 'Market reference from Wise\'s published mid-market rate. Bank spread estimates based on Airwallex research. IOF rate from PagBrasil (July 2025).',
    
    // Diagrams
    howItWorks: 'How It Works',
    pathOfMoney: 'The Path of Your Money',
    deconstructingFxSpreads: 'Deconstructing FX Spreads',
    impactOfWideSpreads: 'The Impact of Wide Spreads',
    whyIofVaries: 'Why IOF Tax Varies',
    swiftMaze: 'SWIFT Maze vs Direct Path',
    
    // Footer
    ratesUpdated: 'Rates updated in real-time from Wise and Binance APIs. IOF varies by settlement structure. All calculations are transparent and auditable.',
  },
  
  zh: {
    // Header
    coinsXyz: 'Coins.xyz',
    live: '实时',
    
    // Title & Subtitle
    title: 'GBP → BRL 转账定价',
    subtitle: '直接比较不同转账结构如何为 GBP 到 BRL 的转换定价。所有场景都从相同的市场参考开始。',
    
    // Market Reference Section
    marketReference: '市场参考（基准）',
    marketRefDescription: '这是您以中间价获得零加价或费用的金额。',
    midMarketRate: '中间价',
    timestamp: '时间戳',
    referenceAmount: '参考金额',
    adjustAmount: '调整金额：',
    source: '来源',
    
    // Three-Way Comparison
    howMuchYouReceive: '您将收到多少',
    
    // Bank Card
    traditionalBank: '传统银行',
    bankDescription: '典型的银行转账，隐藏的外汇加价',
    spread: '点差',
    fee: '费用',
    iofTax: 'IOF 税',
    youReceive: '您收到',
    adjustSpread: '调整点差 (bps):',
    bpsPercentage: 'bps = ',
    
    // Wise Card
    wise: 'Wise',
    wiseDescription: '中间价转账 + 固定费用 + IOF',
    
    // Coins Card
    coins: 'Coins',
    coinsDescription: '基于市场的执行 + 网络费用 + IOF',
    vsBankShort: '对比银行',
    vsWiseShort: '对比 Wise',
    
    // Breakdown Section
    breakdown: '成本明细',
    marketReferenceLabel: '市场参考',
    fxSpreadApplied: '应用的外汇点差',
    explicitFee: '明确费用',
    iofTaxLabel: 'IOF 税',
    totalCost: '总成本',
    
    // Explanations
    explanations: '说明',
    iofTaxExplanation: '3.5% IOF（金融业务税）是巴西税，适用于所有国际转账，无论提供商如何。无法避免。',
    spreadExplanation: '点差是买卖价格之间的差异。传统银行将其嵌入汇率中；Wise 收取明确费用。',
    feeExplanation: '明确费用由提供商收取。Coins 收取固定的美元网络费用。',
    sourcesLabel: '来源：',
    sourcesDescription: 'Wise 公布的中间价的市场参考。基于 Airwallex 研究的银行点差估计。PagBrasil 的 IOF 汇率（2025 年 7 月）。',
    
    // Diagrams
    howItWorks: '工作原理',
    pathOfMoney: '您的资金路径',
    deconstructingFxSpreads: '分解外汇点差',
    impactOfWideSpreads: '宽点差的影响',
    whyIofVaries: '为什么 IOF 税变化',
    swiftMaze: 'SWIFT 迷宫 vs 直接路径',
    
    // Footer
    ratesUpdated: '来自 Wise 和 Binance API 的实时更新汇率。IOF 因结算结构而异。所有计算都是透明和可审计的。',
  },
} as const;

export type TranslationKey = keyof typeof translations.pt;

export default translations;
