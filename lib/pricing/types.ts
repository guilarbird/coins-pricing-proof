export type PricingProvider = "bank" | "wise" | "coins"

export type IofMode = "standard" | "optimized" | "variable"

export interface CostLayer {
  labelKey: string // i18n key for label
  valueBps: number // value in basis points
  valuePercent?: number // optional percentage value (for IOF)
  color: string // Tailwind color class
}

export interface PricingModel {
  provider: PricingProvider
  providerNameKey: string // i18n key for provider name
  receiveBRL: number // final BRL amount received
  totalCostBRL: number // total cost in BRL
  totalCostBps: number // total cost in bps
  spreadBps: number // FX spread in basis points
  feeBpsOrFlat: number // explicit fees (bps or flat)
  iofMode: IofMode // IOF regime
  iofPercent: number // IOF percentage applied
  iofDisplayKey: string // i18n key for IOF display
  layersCount: number // settlement layers count
  notesKey?: string // i18n key for provider-specific notes
  costLayers: CostLayer[] // breakdown for visualization
}

export interface SimulatorInput {
  sendAmountGBP: number
  gbpUsdRate: number
  usdBrlRate: number
  usdtBrlRate: number
  iofModeOverride?: IofMode
}

export interface ComparisonResult {
  bestProvider: PricingProvider
  models: PricingModel[]
  savingsVsBank: number
  savingsVsWise: number
  savingsLabel: "savings" | "difference" // determines UI label
}
