const translations = {
  pt: {
    // Header
    coinsXyz: 'Coins.xyz',
    live: 'Ao vivo',
    
    // Title & Subtitle
    title: 'Precificação de Transferência GBP → BRL',
    subtitle: 'Comparação direta de como diferentes estruturas de transferência precificam uma conversão de GBP para BRL. Todos os cenários começam a partir da mesma referência de mercado.',
    
    // Market Reference Section
    marketReference: 'Referência de Mercado (Baseline)',
    marketRefDescription: 'Isto é o que você receberia com taxas de mid-market sem markup ou taxas.',
    midMarketRate: 'Taxa Mid-Market',
    timestamp: 'Timestamp',
    referenceAmount: 'Valor de Referência',
    source: 'Fonte',
    adjustAmount: 'Ajustar valor:',
    gbp: 'GBP',
    
    // How Much You Receive
    howMuchYouReceive: 'Quanto Você Recebe',
    
    // Provider Names & Descriptions
    traditionalBank: 'Banco Tradicional',
    bankDescription: 'Transferência bancária típica com markup de FX oculto',
    wise: 'Wise',
    wiseDescription: 'Transferência com taxa mid-market + taxa fixa + IOF',
    coins: 'Coins',
    coinsDescription: 'Execução baseada em mercado com taxa de rede + IOF',
    
    // Pricing Components
    spread: 'Spread',
    spreadBps: 'Spread de FX',
    bps: 'bps',
    fee: 'Taxa',
    iofTax: 'Imposto IOF',
    youReceive: 'Você recebe',
    cost: 'Custo',
    structureDependent: 'Depende da estrutura',
    costsMore: 'Custa mais que',
    
    // Comparisons
    vsBankShort: 'vs Banco',
    vsWiseShort: 'vs Wise',
    
    // Adjustments
    adjustSpread: 'Ajustar Spread (bps)',
    bpsPercentage: 'bps =',
    
    // Cost Breakdown
    breakdown: 'Breakdown de Custos',
    marketReferenceLabel: 'Referência de Mercado',
    fxSpreadApplied: 'Spread de FX Aplicado',
    explicitFee: 'Taxa Explícita',
    totalCost: 'Custo Total',
    
    // Explanations Section
    explanations: 'Explicações',
    iofTaxExplanation: 'O IOF (Imposto sobre Operações Financeiras) de 3,5% é um imposto brasileiro que se aplica a todas as transferências internacionais, independentemente do provedor. Não pode ser evitado.',
    spreadExplanation: 'Spread é a diferença entre preços de compra e venda. Bancos tradicionais embutem isso na taxa de câmbio; Wise cobra uma taxa explícita.',
    feeExplanation: 'Taxas explícitas são cobradas pelo provedor. Coins cobra uma taxa de rede fixa em USD.',
    
    // Sources
    sourcesLabel: 'Fontes',
    sourcesDescription: 'Referência de mercado da taxa mid-market publicada pela Wise. Estimativas de spread bancário baseadas em pesquisa Airwallex. Taxa IOF de PagBrasil (julho 2025).',
    ratesUpdated: 'Taxas atualizadas em tempo real de APIs Wise e Binance. IOF varia por estrutura de liquidação. Todos os cálculos são transparentes e auditáveis.',
    
    // Diagrams
    pathOfYourMoney: 'O Caminho do Seu Dinheiro',
    deconstructingFxSpreads: 'Decompondo Spreads de FX',
    impactOfWideSpreads: 'O Impacto de Spreads Largos',
    whyIofVaries: 'Por Que o IOF Varia',
    swiftMaze: 'Labirinto SWIFT vs Caminho Direto',
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
    source: 'Source',
    adjustAmount: 'Adjust amount:',
    gbp: 'GBP',
    
    // How Much You Receive
    howMuchYouReceive: 'How Much You Receive',
    
    // Provider Names & Descriptions
    traditionalBank: 'Traditional Bank',
    bankDescription: 'Typical bank transfer with hidden FX markup',
    wise: 'Wise',
    wiseDescription: 'Transfer with mid-market rate + fixed fee + IOF',
    coins: 'Coins',
    coinsDescription: 'Market-based execution with network fee + IOF',
    
    // Pricing Components
    spread: 'Spread',
    spreadBps: 'FX Spread',
    bps: 'bps',
    fee: 'Fee',
    iofTax: 'IOF Tax',
    youReceive: 'You receive',
    cost: 'Cost',
    structureDependent: 'Depends on structure',
    costsMore: 'Costs more than',
    
    // Comparisons
    vsBankShort: 'vs Bank',
    vsWiseShort: 'vs Wise',
    
    // Adjustments
    adjustSpread: 'Adjust Spread (bps)',
    bpsPercentage: 'bps =',
    
    // Cost Breakdown
    breakdown: 'Cost Breakdown',
    marketReferenceLabel: 'Market Reference',
    fxSpreadApplied: 'FX Spread Applied',
    explicitFee: 'Explicit Fee',
    totalCost: 'Total Cost',
    
    // Explanations Section
    explanations: 'Explanations',
    iofTaxExplanation: 'The 3.5% IOF (Imposto sobre Operações Financeiras) is a Brazilian tax that applies to all international transfers, regardless of the provider. It cannot be avoided.',
    spreadExplanation: 'Spread is the difference between buy and sell prices. Traditional banks embed this in the exchange rate; Wise charges an explicit fee.',
    feeExplanation: 'Explicit fees are charged by the provider. Coins charges a fixed network fee in USD.',
    
    // Sources
    sourcesLabel: 'Sources',
    sourcesDescription: 'Market reference from Wise\'s published mid-market rate. Bank spread estimates based on Airwallex research. IOF rate from PagBrasil (July 2025).',
    ratesUpdated: 'Rates updated in real-time from Wise and Binance APIs. IOF varies by settlement structure. All calculations are transparent and auditable.',
    
    // Diagrams
    pathOfYourMoney: 'The Path of Your Money',
    deconstructingFxSpreads: 'Deconstructing FX Spreads',
    impactOfWideSpreads: 'The Impact of Wide Spreads',
    whyIofVaries: 'Why IOF Tax Varies',
    swiftMaze: 'SWIFT Maze vs Direct Path',
  },
  
  zh: {
    // Header
    coinsXyz: 'Coins.xyz',
    live: '实时',
    
    // Title & Subtitle
    title: 'GBP → BRL 转账定价',
    subtitle: '直接比较不同转账结构如何定价 GBP 到 BRL 的转换。所有场景都从相同的市场参考开始。',
    
    // Market Reference Section
    marketReference: '市场参考（基准）',
    marketRefDescription: '这是您以中间市场汇率获得的金额，无加价或费用。',
    midMarketRate: '中间市场汇率',
    timestamp: '时间戳',
    referenceAmount: '参考金额',
    source: '来源',
    adjustAmount: '调整金额：',
    gbp: 'GBP',
    
    // How Much You Receive
    howMuchYouReceive: '您将收到多少',
    
    // Provider Names & Descriptions
    traditionalBank: '传统银行',
    bankDescription: '典型的银行转账，隐藏 FX 加价',
    wise: 'Wise',
    wiseDescription: '中间市场汇率 + 固定费用 + IOF 的转账',
    coins: 'Coins',
    coinsDescription: '基于市场的执行，网络费 + IOF',
    
    // Pricing Components
    spread: '点差',
    spreadBps: 'FX 点差',
    bps: '基点',
    fee: '费用',
    iofTax: 'IOF 税',
    youReceive: '您收到',
    cost: '成本',
    structureDependent: '取决于结构',
    costsMore: '成本高于',
    
    // Comparisons
    vsBankShort: '对比银行',
    vsWiseShort: '对比 Wise',
    
    // Adjustments
    adjustSpread: '调整点差 (bps)',
    bpsPercentage: 'bps =',
    
    // Cost Breakdown
    breakdown: '成本明细',
    marketReferenceLabel: '市场参考',
    fxSpreadApplied: '应用的 FX 点差',
    explicitFee: '显式费用',
    totalCost: '总成本',
    
    // Explanations Section
    explanations: '解释',
    iofTaxExplanation: '3.5% IOF（金融交易税）是巴西税，适用于所有国际转账，无论提供商如何。无法避免。',
    spreadExplanation: '点差是买卖价格之间的差异。传统银行将其嵌入汇率；Wise 收取明确费用。',
    feeExplanation: '显式费用由提供商收取。Coins 收取固定的美元网络费。',
    
    // Sources
    sourcesLabel: '来源',
    sourcesDescription: '来自 Wise 发布的中间市场汇率的市场参考。基于 Airwallex 研究的银行点差估计。来自 PagBrasil 的 IOF 费率（2025 年 7 月）。',
    ratesUpdated: '来自 Wise 和 Binance API 的实时更新汇率。IOF 因结算结构而异。所有计算都是透明且可审计的。',
    
    // Diagrams
    pathOfYourMoney: '您的钱的路径',
    deconstructingFxSpreads: '分解 FX 点差',
    impactOfWideSpreads: '宽点差的影响',
    whyIofVaries: '为什么 IOF 税变化',
    swiftMaze: 'SWIFT 迷宫对直接路径',
  },
} as const;

export type TranslationKey = keyof typeof translations.pt;

export default translations;
