"""
PHASE 3: CRYPTO RAIL (GBP → USDT → BRL)
Mostra conversão via rail cripto com custos transparentes
"""

from price_holders import PriceOracle
from datetime import datetime, timezone
from typing import Dict

class CryptoRail:
    """Calcula conversão via rail cripto com decomposição"""
    
    def __init__(self, oracle: PriceOracle):
        self.oracle = oracle
    
    def calculate(self,
                  amount_gbp: float = 100_000,
                  pricing_mode: str = "indicative",
                  network_fee_usdt: float = 5.0) -> Dict:
        """
        Calcula conversão GBP → USDT → BRL
        
        Args:
            amount_gbp: Montante em GBP
            pricing_mode: "indicative" (mid) ou "conservative" (ask/bid)
            network_fee_usdt: Taxa de rede em USDT (padrão: 5 USDT)
        
        Returns:
            Dict com decomposição completa
        """
        
        # Obter preços
        gbpusdt_price = self.oracle.get_price("GBPUSDT")
        usdtbrl_price = self.oracle.get_price("USDTBRL")
        gbpbrl_price = self.oracle.get_price("GBPBRL")
        
        if not all([gbpusdt_price, usdtbrl_price, gbpbrl_price]):
            raise ValueError("Não foi possível obter cotações necessárias")
        
        # Referência
        gbpbrl_mid = gbpbrl_price.mid
        reference_brl = amount_gbp * gbpbrl_mid
        
        # PASSO 1: GBP → USDT
        if pricing_mode == "conservative":
            # Usar ask (pior para comprador)
            gbpusdt_rate = gbpusdt_price.ask
        else:
            # Usar mid (indicativo)
            gbpusdt_rate = gbpusdt_price.mid
        
        usdt_received = amount_gbp * gbpusdt_rate
        
        # PASSO 2: Subtrair taxa de rede
        usdt_after_fee = usdt_received - network_fee_usdt
        
        # PASSO 3: USDT → BRL
        if pricing_mode == "conservative":
            # Usar bid (pior para vendedor)
            usdtbrl_rate = usdtbrl_price.bid
        else:
            # Usar mid (indicativo)
            usdtbrl_rate = usdtbrl_price.mid
        
        brl_received = usdt_after_fee * usdtbrl_rate
        
        # Cálculos de custo
        effective_gbpbrl_rate = brl_received / amount_gbp if amount_gbp > 0 else 0
        cost_brl = reference_brl - brl_received
        cost_bps = (cost_brl / reference_brl * 10_000) if reference_brl > 0 else 0
        
        # Breakdown de custos
        cost_gbpusdt_bps = ((gbpusdt_price.mid - gbpusdt_rate) / gbpusdt_price.mid * 10_000) if gbpusdt_price.mid > 0 else 0
        cost_network_brl = network_fee_usdt * usdtbrl_rate
        cost_usdtbrl_bps = ((usdtbrl_price.mid - usdtbrl_rate) / usdtbrl_price.mid * 10_000) if usdtbrl_price.mid > 0 else 0
        
        return {
            "inputs": {
                "amount_gbp": amount_gbp,
                "pricing_mode": pricing_mode,
                "network_fee_usdt": network_fee_usdt,
            },
            "reference": {
                "gbpbrl_mid": gbpbrl_mid,
                "reference_brl": reference_brl,
            },
            "step_1_gbp_to_usdt": {
                "rate_used": gbpusdt_rate,
                "rate_type": "ask" if pricing_mode == "conservative" else "mid",
                "gbpusdt_mid": gbpusdt_price.mid,
                "usdt_received": usdt_received,
                "source": gbpusdt_price.source,
                "timestamp": gbpusdt_price.timestamp,
            },
            "step_2_network_fee": {
                "fee_usdt": network_fee_usdt,
                "usdt_after_fee": usdt_after_fee,
            },
            "step_3_usdt_to_brl": {
                "rate_used": usdtbrl_rate,
                "rate_type": "bid" if pricing_mode == "conservative" else "mid",
                "usdtbrl_mid": usdtbrl_price.mid,
                "brl_received": brl_received,
                "source": usdtbrl_price.source,
                "timestamp": usdtbrl_price.timestamp,
            },
            "summary": {
                "brl_received": brl_received,
                "effective_gbpbrl_rate": effective_gbpbrl_rate,
                "cost_brl": cost_brl,
                "cost_bps": cost_bps,
                "cost_breakdown": {
                    "gbpusdt_slippage_bps": cost_gbpusdt_bps,
                    "network_fee_brl": cost_network_brl,
                    "usdtbrl_slippage_bps": cost_usdtbrl_bps,
                }
            }
        }


# Test
if __name__ == "__main__":
    oracle = PriceOracle(use_simulated=True)
    rail = CryptoRail(oracle)
    
    # Cenário indicativo
    result_indicative = rail.calculate(
        amount_gbp=100_000,
        pricing_mode="indicative",
        network_fee_usdt=5.0
    )
    
    # Cenário conservador
    result_conservative = rail.calculate(
        amount_gbp=100_000,
        pricing_mode="conservative",
        network_fee_usdt=5.0
    )
    
    print("=" * 70)
    print("PHASE 3: CRYPTO RAIL (GBP → USDT → BRL)")
    print("=" * 70)
    
    for mode, result in [("INDICATIVE (Mid)", result_indicative), 
                          ("CONSERVATIVE (Ask/Bid)", result_conservative)]:
        print(f"\n🔄 MODO: {mode}")
        print("-" * 70)
        
        print("\n📍 REFERÊNCIA")
        print(f"  GBPBRL Mid:            {result['reference']['gbpbrl_mid']:.8f}")
        print(f"  BRL @ Mid:             R${result['reference']['reference_brl']:,.2f}")
        
        print("\n1️⃣  GBP → USDT")
        print(f"  Taxa (Mid):            {result['step_1_gbp_to_usdt']['gbpusdt_mid']:.8f}")
        print(f"  Taxa usada ({result['step_1_gbp_to_usdt']['rate_type']}):      {result['step_1_gbp_to_usdt']['rate_used']:.8f}")
        print(f"  USDT recebido:         {result['step_1_gbp_to_usdt']['usdt_received']:,.2f}")
        print(f"  Fonte:                 {result['step_1_gbp_to_usdt']['source']}")
        
        print("\n2️⃣  Taxa de Rede")
        print(f"  Taxa:                  {result['step_2_network_fee']['fee_usdt']:.2f} USDT")
        print(f"  USDT após taxa:        {result['step_2_network_fee']['usdt_after_fee']:,.2f}")
        
        print("\n3️⃣  USDT → BRL")
        print(f"  Taxa (Mid):            {result['step_3_usdt_to_brl']['usdtbrl_mid']:.8f}")
        print(f"  Taxa usada ({result['step_3_usdt_to_brl']['rate_type']}):      {result['step_3_usdt_to_brl']['rate_used']:.8f}")
        print(f"  BRL recebido:          R${result['step_3_usdt_to_brl']['brl_received']:,.2f}")
        print(f"  Fonte:                 {result['step_3_usdt_to_brl']['source']}")
        
        print("\n✅ RESUMO")
        print(f"  Taxa efetiva GBPBRL:   {result['summary']['effective_gbpbrl_rate']:.8f}")
        print(f"  BRL Líquido:           R${result['summary']['brl_received']:,.2f}")
        print(f"  Custo Total (BRL):     R${result['summary']['cost_brl']:,.2f}")
        print(f"  Custo Total (bps):     {result['summary']['cost_bps']:.2f} bps")
        
        print("\n  Breakdown de custos:")
        print(f"    - GBPUSDT slippage:  {result['summary']['cost_breakdown']['gbpusdt_slippage_bps']:.2f} bps")
        print(f"    - Taxa de rede:      R${result['summary']['cost_breakdown']['network_fee_brl']:,.2f}")
        print(f"    - USDTBRL slippage:  {result['summary']['cost_breakdown']['usdtbrl_slippage_bps']:.2f} bps")
    
    print("\n" + "=" * 70)
