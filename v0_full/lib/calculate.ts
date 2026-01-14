import type { PricingModel, PricingProvider, SimulatorInput, ComparisonResult, IofMode, CostLayer } from "./types"

interface ProviderConfig {
  provider: PricingProvider
  providerNameKey: string
  spreadBps: number
  feeBps: number
  iofStandard: number
  iofOptimized: number
  iofVariable: boolean
  layers: number
  notesKey?: string
}

const PROVIDER_CONFIGS: ProviderConfig[] = [
  {
    provider: "bank",
    providerNameKey: "providers.bank",
    spreadBps: 250,
    feeBps: 80, // Corrected: 80 bps = 0.8%
    iofStandard: 3.5,
    iofOptimized: 3.5, // banks don't optimize
    iofVariable: false,
    layers: 4,
  },
  {
    provider: "wise",
    providerNameKey: "providers.wise",
    spreadBps: 50,
    feeBps: 89,
    iofStandard: 3.5,
    iofOptimized: 1.1,
    iofVariable: false,
    layers: 2,
  },
  {
    provider: "coins",
    providerNameKey: "providers.coins",
    spreadBps: 15,
    feeBps: 30,
    iofStandard: 3.5,
    iofOptimized: 0.38,
    iofVariable: true, // IOF depends on structure
    layers: 1,
    notesKey: "simulator.coinsIofNote",
  },
]

function calculateProviderModel(config: ProviderConfig, input: SimulatorInput, iofMode: IofMode): PricingModel {
  const { sendAmountGBP, gbpUsdRate, usdBrlRate } = input

  // Calculate base output in BRL
  const sendAmountUSD = sendAmountGBP * gbpUsdRate
  const baseOutputBRL = sendAmountUSD * usdBrlRate

  // Determine IOF rate based on mode
  let iofPercent: number
  let iofDisplayKey: string

  if (config.iofVariable && iofMode === "variable") {
    iofPercent = config.iofOptimized
    iofDisplayKey = "simulator.iofVariable"
  } else if (iofMode === "optimized") {
    iofPercent = config.iofOptimized
    iofDisplayKey = "simulator.iofOptimized"
  } else {
    iofPercent = config.iofStandard
    iofDisplayKey = "simulator.iofStandard"
  }

  // Calculate total cost in bps
  const iofBps = iofPercent * 100
  const totalCostBps = config.spreadBps + config.feeBps + iofBps

  // Calculate final amounts
  const totalCostFactor = totalCostBps / 10000
  const receiveBRL = baseOutputBRL * (1 - totalCostFactor)
  const totalCostBRL = baseOutputBRL - receiveBRL

  // Build cost layers for visualization
  const costLayers: CostLayer[] = [
    {
      labelKey: "simulator.fxSpread",
      valueBps: config.spreadBps,
      color: "bg-chart-1",
    },
    {
      labelKey: "simulator.explicitFees",
      valueBps: config.feeBps,
      color: "bg-chart-2",
    },
    {
      labelKey: "simulator.iof",
      valueBps: iofBps,
      valuePercent: iofPercent,
      color: "bg-chart-3",
    },
  ]

  return {
    provider: config.provider,
    providerNameKey: config.providerNameKey,
    receiveBRL,
    totalCostBRL,
    totalCostBps,
    spreadBps: config.spreadBps,
    feeBpsOrFlat: config.feeBps,
    iofMode,
    iofPercent,
    iofDisplayKey,
    layersCount: config.layers,
    notesKey: config.notesKey,
    costLayers,
  }
}

export function calculateComparison(input: SimulatorInput): ComparisonResult {
  const iofMode = input.iofModeOverride || "standard"

  // Calculate models for all providers
  const models = PROVIDER_CONFIGS.map((config) => calculateProviderModel(config, input, iofMode))

  // Find best provider (highest receiveBRL)
  const sortedByReceive = [...models].sort((a, b) => b.receiveBRL - a.receiveBRL)
  const best = sortedByReceive[0]
  const bestProvider = best.provider

  // Calculate savings vs bank and wise
  const bankModel = models.find((m) => m.provider === "bank")!
  const wiseModel = models.find((m) => m.provider === "wise")!

  const savingsVsBank = best.receiveBRL - bankModel.receiveBRL
  const savingsVsWise = best.receiveBRL - wiseModel.receiveBRL

  // Determine label: "savings" only if positive, else "difference"
  const savingsLabel = savingsVsBank >= 0 && savingsVsWise >= 0 ? "savings" : "difference"

  return {
    bestProvider,
    models,
    savingsVsBank,
    savingsVsWise,
    savingsLabel,
  }
}

// For Coins-specific IOF display
export function getCoinsIofDescription(iofMode: IofMode): string {
  if (iofMode === "variable") {
    return "simulator.coinsIofVariable"
  }
  return "simulator.iofNote"
}
