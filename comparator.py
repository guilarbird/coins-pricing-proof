"""
PHASE 4: FINAL COMPARATOR
Compara lado a lado: Banco vs Coins Rail
"""

from price_holders import PriceOracle
from bank_decomposition import BankCostDecomposition
from crypto_rail import CryptoRail
from typing import Dict
from datetime import datetime, timezone

class Comparator:
    """Comparador final com delta claro"""
    
    def __init__(self, oracle: PriceOracle):
        self.oracle = oracle
        self.bank = BankCostDecomposition(oracle)
        self.rail = CryptoRail(oracle)
    
    def compare(self,
                amount_gbp: float = 100_000,
                bank_fx_markup_bps: float = 80,
                bank_fee_pct: float = 0.80,
                bank_iof_pct: float = 3.50,
                pricing_mode: str = "indicative",
                network_fee_usdt: float = 5.0) -> Dict:
        """
        Compara banco vs rail cripto
        
        Returns:
            Dict com comparação completa
        """
        
        # Calcular ambos os cenários
        bank_result = self.bank.calculate(
            amount_gbp=amount_gbp,
            bank_fx_markup_bps=bank_fx_markup_bps,
            bank_fee_pct=bank_fee_pct,
            iof_pct=bank_iof_pct
        )
        
        rail_result = self.rail.calculate(
            amount_gbp=amount_gbp,
            pricing_mode=pricing_mode,
            network_fee_usdt=network_fee_usdt
        )
        
        # Extrair valores principais
        bank_net = bank_result['summary']['bank_net_brl']
        bank_cost_bps = bank_result['summary']['total_cost_bps']
        bank_iof_brl = bank_result['summary'].get('iof_cost_brl', 0)
        
        rail_net = rail_result['summary']['brl_received']
        rail_cost_bps = rail_result['summary']['cost_bps']
        
        # Calcular delta
        delta_brl = rail_net - bank_net
        reference_brl = bank_result['reference']['reference_brl']
        delta_bps = (delta_brl / reference_brl * 10_000) if reference_brl > 0 else 0
        
        # Tempo estimado
        bank_time = "1-2 dias úteis"
        rail_time = "minutos a horas"
        
        return {
            "amount_gbp": amount_gbp,
            "reference_brl": reference_brl,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "bank": {
                "name": "Banco Tradicional",
                "brl_received": bank_net,
                "cost_brl": bank_result['summary']['total_cost_brl'],
                "cost_bps": bank_cost_bps,
                "time": bank_time,
                "fx_markup_bps": bank_fx_markup_bps,
                "fee_pct": bank_fee_pct,
                "iof_pct": bank_iof_pct,
                "breakdown": {
                    "hidden_fx_cost_brl": bank_result['fx_markup']['hidden_cost_brl'],
                    "explicit_fee_brl": bank_result['explicit_fee']['fee_cost_brl'],
                    "iof_cost_brl": bank_iof_brl,
                }
            },
            "coins": {
                "name": "Coins.xyz Rail",
                "brl_received": rail_net,
                "cost_brl": rail_result['summary']['cost_brl'],
                "cost_bps": rail_cost_bps,
                "time": rail_time,
                "pricing_mode": pricing_mode,
                "network_fee_usdt": network_fee_usdt,
                "breakdown": {
                    "gbpusd_slippage_bps": rail_result['summary']['cost_breakdown']['gbpusd_slippage_bps'],
                    "network_fee_brl": rail_result['summary']['cost_breakdown']['network_fee_brl'],
                    "usdbrl_slippage_bps": rail_result['summary']['cost_breakdown']['usdbrl_slippage_bps'],
                }
            },
            "delta": {
                "brl": delta_brl,
                "bps": delta_bps,
                "savings_pct": (delta_brl / bank_result['summary']['total_cost_brl'] * 100) if bank_result['summary']['total_cost_brl'] > 0 else 0,
                "winner": "Coins.xyz" if delta_brl > 0 else "Banco" if delta_brl < 0 else "Empate"
            }
        }


# Test
if __name__ == "__main__":
    oracle = PriceOracle(use_simulated=True)
    comp = Comparator(oracle)
    
    result = comp.compare(
        amount_gbp=100_000,
        bank_fx_markup_bps=80,
        bank_fee_pct=0.80,
        pricing_mode="indicative",
        network_fee_usdt=5.0
    )
    
    print("=" * 80)
    print("PHASE 4: COMPARADOR FINAL")
    print("=" * 80)
    
    print(f"\n💷 ENTRADA: £{result['amount_gbp']:,.0f}")
    print(f"📍 REFERÊNCIA (Mid): R${result['reference_brl']:,.2f}")
    print(f"⏰ Timestamp: {result['timestamp']}")
    
    print("\n" + "=" * 80)
    print("COLUNA ESQUERDA: BANCO TRADICIONAL")
    print("=" * 80)
    
    bank = result['bank']
    print(f"\n💰 BRL Recebido:        R${bank['brl_received']:,.2f}")
    print(f"💸 Custo Total:         R${bank['cost_brl']:,.2f}")
    print(f"📊 Custo em bps:        {bank['cost_bps']:.2f} bps")
    print(f"⏱️  Tempo:               {bank['time']}")
    print(f"\n📋 Parâmetros:")
    print(f"   - FX Markup:         {bank['fx_markup_bps']:.0f} bps")
    print(f"   - Taxa explícita:    {bank['fee_pct']:.2f}%")
    print(f"\n📉 Breakdown:")
    print(f"   - FX markup (escondido): R${bank['breakdown']['hidden_fx_cost_brl']:,.2f}")
    print(f"   - Taxa explícita:       R${bank['breakdown']['explicit_fee_brl']:,.2f}")
    
    print("\n" + "=" * 80)
    print("COLUNA DIREITA: COINS.XYZ RAIL")
    print("=" * 80)
    
    coins = result['coins']
    print(f"\n💰 BRL Recebido:        R${coins['brl_received']:,.2f}")
    print(f"💸 Custo Total:         R${coins['cost_brl']:,.2f}")
    print(f"📊 Custo em bps:        {coins['cost_bps']:.2f} bps")
    print(f"⏱️  Tempo:               {coins['time']}")
    print(f"\n📋 Parâmetros:")
    print(f"   - Modo:              {coins['pricing_mode']}")
    print(f"   - Taxa de rede:      {coins['network_fee_usdt']:.2f} USDT")
    print(f"\n📉 Breakdown:")
    print(f"   - GBPUSDT slippage:  {coins['breakdown']['gbpusdt_slippage_bps']:.2f} bps")
    print(f"   - Taxa de rede:      R${coins['breakdown']['network_fee_brl']:,.2f}")
    print(f"   - USDTBRL slippage:  {coins['breakdown']['usdtbrl_slippage_bps']:.2f} bps")
    
    print("\n" + "=" * 80)
    print("DELTA (DIFERENÇA)")
    print("=" * 80)
    
    delta = result['delta']
    print(f"\n🏆 Vencedor:            {delta['winner']}")
    print(f"💵 Δ BRL:               R${delta['brl']:,.2f}")
    print(f"📊 Δ bps:               {delta['bps']:.2f} bps")
    print(f"📈 Economia:            {delta['savings_pct']:.1f}% do custo bancário")
    
    print("\n" + "=" * 80)
