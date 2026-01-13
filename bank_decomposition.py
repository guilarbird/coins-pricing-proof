"""
PHASE 2: BANK COST DECOMPOSITION
Mostra como o banco cobra: FX markup + taxa explícita
Usa Price Holders como referência
"""

from price_holders import PriceOracle
from datetime import datetime, timezone
from typing import Dict

class BankCostDecomposition:
    """Decompõe custos bancários de forma auditável"""
    
    def __init__(self, oracle: PriceOracle):
        self.oracle = oracle
    
    def calculate(self, 
                  amount_gbp: float = 100000,
                  bank_fx_markup_bps: float = 80,
                  bank_fee_pct: float = 0.80) -> Dict:
        """
        Calcula custos bancários com decomposição clara
        
        Args:
            amount_gbp: Montante em GBP
            bank_fx_markup_bps: Markup FX em basis points (padrão: 80 bps)
            bank_fee_pct: Taxa explícita em % (padrão: 0.80%)
        
        Returns:
            Dict com decomposição completa
        """
        
        # Obter referência de preço
        gbpbrl_price = self.oracle.get_price("GBPBRL")
        if not gbpbrl_price:
            raise ValueError("Não foi possível obter cotação GBPBRL")
        
        gbpbrl_mid = gbpbrl_price.mid
        
        # 1. Referência: quanto você receberia ao mid
        reference_brl = amount_gbp * gbpbrl_mid
        
        # 2. Taxa FX: banco aplica markup
        # bank_rate = mid × (1 - markup_bps/10000)
        bank_rate = gbpbrl_mid * (1 - bank_fx_markup_bps / 10_000)
        
        # Custo escondido de FX
        hidden_fx_cost_brl = reference_brl - (amount_gbp * bank_rate)
        hidden_fx_cost_bps = (hidden_fx_cost_brl / reference_brl * 10_000) if reference_brl > 0 else 0
        
        # 3. Taxa explícita
        fee_cost_brl = bank_rate * amount_gbp * (bank_fee_pct / 100)
        fee_cost_bps = (fee_cost_brl / reference_brl * 10_000) if reference_brl > 0 else 0
        
        # 4. Total recebido pelo banco
        bank_net_brl = reference_brl - hidden_fx_cost_brl - fee_cost_brl
        total_cost_bps = hidden_fx_cost_bps + fee_cost_bps
        
        return {
            "inputs": {
                "amount_gbp": amount_gbp,
                "bank_fx_markup_bps": bank_fx_markup_bps,
                "bank_fee_pct": bank_fee_pct,
            },
            "reference": {
                "gbpbrl_mid": gbpbrl_mid,
                "reference_brl": reference_brl,
                "price_source": gbpbrl_price.source,
                "price_timestamp": gbpbrl_price.timestamp,
            },
            "fx_markup": {
                "bank_rate": bank_rate,
                "markup_bps": bank_fx_markup_bps,
                "hidden_cost_brl": hidden_fx_cost_brl,
                "hidden_cost_bps": hidden_fx_cost_bps,
            },
            "explicit_fee": {
                "fee_pct": bank_fee_pct,
                "fee_cost_brl": fee_cost_brl,
                "fee_cost_bps": fee_cost_bps,
            },
            "summary": {
                "bank_net_brl": bank_net_brl,
                "total_cost_brl": hidden_fx_cost_brl + fee_cost_brl,
                "total_cost_bps": total_cost_bps,
            }
        }


# Test
if __name__ == "__main__":
    oracle = PriceOracle(use_simulated=True)
    decomp = BankCostDecomposition(oracle)
    
    # Cenário padrão
    result = decomp.calculate(
        amount_gbp=100_000,
        bank_fx_markup_bps=80,
        bank_fee_pct=0.80
    )
    
    print("=" * 70)
    print("PHASE 2: DECOMPOSIÇÃO DE CUSTOS BANCÁRIOS")
    print("=" * 70)
    
    print("\n📊 ENTRADA")
    print(f"  Montante:              £{result['inputs']['amount_gbp']:,.2f}")
    print(f"  Markup FX (banco):     {result['inputs']['bank_fx_markup_bps']:.0f} bps")
    print(f"  Taxa explícita:        {result['inputs']['bank_fee_pct']:.2f}%")
    
    print("\n📍 REFERÊNCIA (Preço do Mundo)")
    print(f"  GBPBRL Mid:            {result['reference']['gbpbrl_mid']:.8f}")
    print(f"  Fonte:                 {result['reference']['price_source']}")
    print(f"  Timestamp:             {result['reference']['price_timestamp']}")
    print(f"  BRL @ Mid:             R${result['reference']['reference_brl']:,.2f}")
    
    print("\n💰 CUSTO 1: FX Markup (Escondido)")
    print(f"  Taxa do banco:         {result['fx_markup']['bank_rate']:.8f}")
    print(f"  Markup aplicado:       {result['fx_markup']['markup_bps']:.0f} bps")
    print(f"  Custo em BRL:          R${result['fx_markup']['hidden_cost_brl']:,.2f}")
    print(f"  Custo em bps:          {result['fx_markup']['hidden_cost_bps']:.2f} bps")
    
    print("\n💳 CUSTO 2: Taxa Explícita")
    print(f"  Taxa:                  {result['explicit_fee']['fee_pct']:.2f}%")
    print(f"  Custo em BRL:          R${result['explicit_fee']['fee_cost_brl']:,.2f}")
    print(f"  Custo em bps:          {result['explicit_fee']['fee_cost_bps']:.2f} bps")
    
    print("\n✅ RESUMO FINAL")
    print(f"  BRL Líquido (banco):   R${result['summary']['bank_net_brl']:,.2f}")
    print(f"  Custo Total (BRL):     R${result['summary']['total_cost_brl']:,.2f}")
    print(f"  Custo Total (bps):     {result['summary']['total_cost_bps']:.2f} bps")
    
    print("\n" + "=" * 70)
