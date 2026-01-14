export type Language = 'pt' | 'en' | 'zh';

export const translations = {
  pt: {
    // Header & Hero
    title: 'Digital FX',
    subtitle: 'Entenda como o câmbio é precificado. Nenhum segredo.',
    updatedNow: 'Atualizado agora',
    
    // Market Reference
    marketReference: 'Referência de Mercado',
    midMarket: 'Mid-market',
    bid: 'Bid (Compra)',
    ask: 'Ask (Venda)',
    spread: 'Spread de Câmbio',
    
    // Diagrams Section
    howItWorks: 'Como Funciona o Câmbio',
    
    // Path of Money Diagram
    pathTitle: 'O Caminho do Seu Dinheiro',
    pathDescription: 'Como o dinheiro viaja através dos sistemas',
    gbp: 'GBP',
    fxMarket: 'Mercado FX',
    bankRoute: 'Rota Bancária',
    wiseRoute: 'Rota Wise',
    coinsRoute: 'Rota Coins',
    localBank: 'Banco Local',
    swift: 'SWIFT/Bancos Correspondentes',
    allRoutesStart: 'Todas as rotas começam do mesmo preço de mercado.',
    coinsCuts: 'Coins reduz o número de intermediários.',
    
    // Deconstructing Spreads Diagram
    deconstructTitle: 'Desconstruindo Spreads de Câmbio',
    deconstructDescription: 'Cada provedor "come" uma parte diferente',
    hidden: 'Oculto',
    bankFxRate: 'Taxa FX Bancária',
    explicit: 'Explícito',
    wiseFee: 'Taxa Wise',
    zeroSpread: 'Zero-Spread',
    coinsFx: 'Coins Mercado FX',
    
    // Impact of Wide Spreads Diagram
    impactTitle: 'O Impacto de Spreads Largos',
    impactDescription: 'Pequenas diferenças acumulam em grandes custos',
    input: 'Entrada',
    bank: 'Banco',
    wise: 'Wise',
    coins: 'Coins',
    
    // Why IOF Varies Diagram
    iofTitle: 'Por Que o IOF Varia',
    iofDescription: 'A estrutura de liquidação determina o imposto',
    sending: 'Enviando GBP',
    foreignBanks: 'Bancos Estrangeiros',
    settlement: 'Liquidação Bancária Local',
    fullIof: 'IOF Completo',
    reducedIof: 'IOF Reduzido',
    transfersThrough: 'Transferências através de bancos estrangeiros estão sujeitas a impostos mais altos.',
    localSettlement: 'Liquidação local resulta em impostos mais baixos. Reduz camadas.',
    
    // SWIFT Diagram
    swiftMaze: 'SWIFT Maze vs Direct Path',
    swiftDescription: 'Mais paradas = mais custos ocultos + mais atrasos. Menos paradas = mais do seu dinheiro chega.',
    moreStops: 'Mais paradas',
    fewerStops: 'Menos paradas',
    
    // Transfer Simulator
    transferSimulator: 'Simulador de Transferência',
    youSend: 'Você envia',
    youReceive: 'Você recebe',
    bankTransfer: 'Transferência Bancária',
    cost: 'Custo',
    savings: 'Economia',
    differenceVs: 'Diferença vs',
    bestInThisScenario: 'Melhor neste cenário',
    costsMore: 'Custa mais que',
    
    // CTAs
    simulateNow: 'Simular Agora',
    createAccount: 'Criar Conta',
    learnMore: 'Saiba Como Funciona',
    
    // Audio
    marketArchitectureAudio: 'Áudio de Arquitetura de Mercado',
    audioDescription: 'Explicação de 2 minutos: Como funciona a precificação de câmbio, por que os spreads diferem e por que a execução baseada em mercado importa.',
    
    // Footer
    ratesUpdated: 'Taxas atualizadas em tempo real de APIs Wise e Binance. IOF varia por estrutura de liquidação. Todos os cálculos são transparentes e auditáveis.',
  },
  
  en: {
    // Header & Hero
    title: 'Digital FX',
    subtitle: 'Understand how exchange rates are priced. No secrets.',
    updatedNow: 'Updated now',
    
    // Market Reference
    marketReference: 'Market Reference',
    midMarket: 'Mid-market',
    bid: 'Bid (Buy)',
    ask: 'Ask (Sell)',
    spread: 'FX Spread',
    
    // Diagrams Section
    howItWorks: 'How FX Works',
    
    // Path of Money Diagram
    pathTitle: 'The Path of Your Money',
    pathDescription: 'How money travels through the system',
    gbp: 'GBP',
    fxMarket: 'FX Market',
    bankRoute: 'Bank Route',
    wiseRoute: 'Wise Route',
    coinsRoute: 'Coins Route',
    localBank: 'Local Bank',
    swift: 'SWIFT/Correspondent Banks',
    allRoutesStart: 'All routes start from the same market price.',
    coinsCuts: 'Coins cuts the number of middlemen.',
    
    // Deconstructing Spreads Diagram
    deconstructTitle: 'Deconstructing FX Spreads',
    deconstructDescription: 'Each provider "bites" a different amount',
    hidden: 'Hidden',
    bankFxRate: 'Bank FX Rate',
    explicit: 'Explicit',
    wiseFee: 'Wise Fee',
    zeroSpread: 'Zero-Spread',
    coinsFx: 'Coins Market FX',
    
    // Impact of Wide Spreads Diagram
    impactTitle: 'The Impact of Wide Spreads',
    impactDescription: 'Small differences add up to big costs',
    input: 'Input',
    bank: 'Bank',
    wise: 'Wise',
    coins: 'Coins',
    
    // Why IOF Varies Diagram
    iofTitle: 'Why IOF Tax Varies',
    iofDescription: 'Settlement structure determines the tax',
    sending: 'Sending GBP',
    foreignBanks: 'Foreign Banks',
    settlement: 'Local Bank Settlement',
    fullIof: 'Full 3.5% IOF',
    reducedIof: 'Reduced (~1.0%) IOF',
    transfersThrough: 'Transfers through foreign banks are subject to higher taxes.',
    localSettlement: 'Local settlement results in lower taxes. Cuts layers.',
    
    // SWIFT Diagram
    swiftMaze: 'SWIFT Maze vs Direct Path',
    swiftDescription: 'More stops = more hidden costs + more delays. Fewer stops = more of your money arrives.',
    moreStops: 'More stops',
    fewerStops: 'Fewer stops',
    
    // Transfer Simulator
    transferSimulator: 'Transfer Simulator',
    youSend: 'You send',
    youReceive: 'You receive',
    bankTransfer: 'Bank Transfer',
    cost: 'Cost',
    savings: 'Savings',
    differenceVs: 'Difference vs',
    bestInThisScenario: 'Best in this scenario',
    costsMore: 'Costs more than',
    
    // CTAs
    simulateNow: 'Simulate Now',
    createAccount: 'Create Account',
    learnMore: 'Learn How It Works',
    
    // Audio
    marketArchitectureAudio: 'Market Architecture Audio',
    audioDescription: '2-minute explanation: How FX pricing works, why spreads differ, and why market-based execution matters.',
    
    // Footer
    ratesUpdated: 'Rates updated in real-time from Wise and Binance APIs. IOF varies by settlement structure. All calculations are transparent and auditable.',
  },
  
  zh: {
    // Header & Hero
    title: 'Digital FX',
    subtitle: '了解汇率如何定价。没有秘密。',
    updatedNow: '刚刚更新',
    
    // Market Reference
    marketReference: '市场参考',
    midMarket: '中间价',
    bid: '买价',
    ask: '卖价',
    spread: '汇率差价',
    
    // Diagrams Section
    howItWorks: '外汇如何运作',
    
    // Path of Money Diagram
    pathTitle: '您的资金路径',
    pathDescription: '资金如何通过系统流动',
    gbp: 'GBP',
    fxMarket: '外汇市场',
    bankRoute: '银行路线',
    wiseRoute: 'Wise路线',
    coinsRoute: 'Coins路线',
    localBank: '当地银行',
    swift: 'SWIFT/代理银行',
    allRoutesStart: '所有路线从相同的市场价格开始。',
    coinsCuts: 'Coins减少了中间商的数量。',
    
    // Deconstructing Spreads Diagram
    deconstructTitle: '分解外汇点差',
    deconstructDescription: '每个提供商"咬"不同的金额',
    hidden: '隐藏',
    bankFxRate: '银行汇率',
    explicit: '明确',
    wiseFee: 'Wise费用',
    zeroSpread: '零点差',
    coinsFx: 'Coins市场汇率',
    
    // Impact of Wide Spreads Diagram
    impactTitle: '宽点差的影响',
    impactDescription: '小差异累积成大成本',
    input: '输入',
    bank: '银行',
    wise: 'Wise',
    coins: 'Coins',
    
    // Why IOF Varies Diagram
    iofTitle: '为什么IOF税变化',
    iofDescription: '结算结构决定税收',
    sending: '发送GBP',
    foreignBanks: '外国银行',
    settlement: '当地银行结算',
    fullIof: '完整3.5% IOF',
    reducedIof: '减少(~1.0%) IOF',
    transfersThrough: '通过外国银行的转账需要缴纳更高的税款。',
    localSettlement: '当地结算导致更低的税款。减少层级。',
    
    // SWIFT Diagram
    swiftMaze: 'SWIFT迷宫 vs 直接路径',
    swiftDescription: '更多站点 = 更多隐藏成本 + 更多延迟。更少站点 = 更多资金到达。',
    moreStops: '更多站点',
    fewerStops: '更少站点',
    
    // Transfer Simulator
    transferSimulator: '转账模拟器',
    youSend: '您发送',
    youReceive: '您收到',
    bankTransfer: '银行转账',
    cost: '成本',
    savings: '节省',
    differenceVs: '差异 vs',
    bestInThisScenario: '此场景中最佳',
    costsMore: '成本高于',
    
    // CTAs
    simulateNow: '立即模拟',
    createAccount: '创建账户',
    learnMore: '了解工作原理',
    
    // Audio
    marketArchitectureAudio: '市场架构音频',
    audioDescription: '2分钟解释：外汇定价如何运作、为什么点差不同以及为什么基于市场的执行很重要。',
    
    // Footer
    ratesUpdated: '来自Wise和Binance API的实时更新汇率。IOF因结算结构而异。所有计算都是透明和可审计的。',
  },
} as const;

export type TranslationKey = keyof typeof translations.pt;
