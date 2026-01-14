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
        gbpusd_price = self.oracle.get_price("GBPUSD")
        usdbrl_price = self.oracle.get_price("USDBRL")
        gbpbrl_price = self.oracle.get_price("GBPBRL")
        
        if not all([gbpusd_price, usdbrl_price, gbpbrl_price]):
            raise ValueError("Não foi possível obter cotações necessárias")
        
        # Referência
        gbpbrl_mid = gbpbrl_price.mid
        reference_brl = amount_gbp * gbpbrl_mid
        
        # PASSO 1: GBP → USD
        if pricing_mode == "conservative":
            # Usar ask (pior para comprador)
            gbpusd_rate = gbpusd_price.ask
        else:
            # Usar mid (indicativo)
            gbpusd_rate = gbpusd_price.mid
        
        usd_received = amount_gbp * gbpusd_rate
        
        # PASSO 2: Subtrair taxa de rede (em USD)
        usd_after_fee = usd_received - network_fee_usdt
        
        # PASSO 3: USD → BRL
        if pricing_mode == "conservative":
            # Usar bid (pior para vendedor)
            usdbrl_rate = usdbrl_price.bid
        else:
            # Usar mid (indicativo)
            usdbrl_rate = usdbrl_price.mid
        
        brl_received = usd_after_fee * usdbrl_rate
        
        # Cálculos de custo
        effective_gbpbrl_rate = brl_received / amount_gbp if amount_gbp > 0 else 0
        cost_brl = reference_brl - brl_received
        cost_bps = (cost_brl / reference_brl * 10_000) if reference_brl > 0 else 0
        
        # Breakdown de custos
        cost_gbpusd_bps = ((gbpusd_price.mid - gbpusd_rate) / gbpusd_price.mid * 10_000) if gbpusd_price.mid > 0 else 0
        cost_network_brl = network_fee_usdt * usdbrl_rate
        cost_usdbrl_bps = ((usdbrl_price.mid - usdbrl_rate) / usdbrl_price.mid * 10_000) if usdbrl_price.mid > 0 else 0
        
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
            "step_1_gbp_to_usd": {
                "rate_used": gbpusd_rate,
                "rate_type": "ask" if pricing_mode == "conservative" else "mid",
                "gbpusd_mid": gbpusd_price.mid,
                "usd_received": usd_received,
                "source": gbpusd_price.source,
                "timestamp": gbpusd_price.timestamp,
            },
            "step_2_network_fee": {
                "fee_usd": network_fee_usdt,
                "usd_after_fee": usd_after_fee,
            },
            "step_3_usd_to_brl": {
                "rate_used": usdbrl_rate,
                "rate_type": "bid" if pricing_mode == "conservative" else "mid",
                "usdbrl_mid": usdbrl_price.mid,
                "brl_received": brl_received,
                "source": usdbrl_price.source,
                "timestamp": usdbrl_price.timestamp,
            },
            "summary": {
                "brl_received": brl_received,
                "effective_gbpbrl_rate": effective_gbpbrl_rate,
                "cost_brl": cost_brl,
                "cost_bps": cost_bps,
                "cost_breakdown": {
                    "gbpusd_slippage_bps": cost_gbpusd_bps,
                    "network_fee_brl": cost_network_brl,
                    "usdbrl_slippage_bps": cost_usdbrl_bps,
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
