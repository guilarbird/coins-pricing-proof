"""
PHASE 5: PROOF SNAPSHOT
Gera snapshot JSON com todos os dados para auditoria
"""

import json
import hashlib
from datetime import datetime, timezone
from typing import Dict
from comparator import Comparator
from price_holders import PriceOracle

class ProofSnapshot:
    """Gera snapshot auditável de prova econômica"""
    
    def __init__(self, oracle: PriceOracle):
        self.oracle = oracle
        self.comparator = Comparator(oracle)
    
    def generate(self,
                 amount_gbp: float = 100_000,
                 bank_fx_markup_bps: float = 80,
                 bank_fee_pct: float = 0.80,
                 pricing_mode: str = "indicative",
                 network_fee_usdt: float = 5.0,
                 client_name: str = "Ed") -> Dict:
        """
        Gera snapshot completo de prova
        
        Returns:
            Dict com snapshot JSON
        """
        
        # Obter comparação
        comparison = self.comparator.compare(
            amount_gbp=amount_gbp,
            bank_fx_markup_bps=bank_fx_markup_bps,
            bank_fee_pct=bank_fee_pct,
            pricing_mode=pricing_mode,
            network_fee_usdt=network_fee_usdt
        )
        
        # Obter preços
        prices = self.oracle.get_all_prices()
        
        # Construir snapshot
        snapshot = {
            "version": "1.0",
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "client": client_name,
            "inputs": {
                "amount_gbp": amount_gbp,
                "bank_fx_markup_bps": bank_fx_markup_bps,
                "bank_fee_pct": bank_fee_pct,
                "pricing_mode": pricing_mode,
                "network_fee_usdt": network_fee_usdt,
            },
            "price_holders": prices,
            "comparison": comparison,
            "proof_message": self._generate_proof_message(comparison),
            "audit_trail": {
                "sources": list(set([p['source'] for p in prices.values()])),
                "timestamp": comparison['timestamp'],
            }
        }
        
        # Gerar hash para integridade
        snapshot_json = json.dumps(snapshot, sort_keys=True)
        snapshot['integrity_hash'] = hashlib.sha256(snapshot_json.encode()).hexdigest()
        
        return snapshot
    
    def _generate_proof_message(self, comparison: Dict) -> str:
        """Gera mensagem copiável de prova"""
        
        amount = comparison['amount_gbp']
        bank_net = comparison['bank']['brl_received']
        coins_net = comparison['coins']['brl_received']
        delta = comparison['delta']['brl']
        delta_bps = comparison['delta']['bps']
        ts = comparison['timestamp']
        
        message = (
            f"Snapshot £{amount:,.0f} → "
            f"Bank: R${bank_net:,.2f} | "
            f"Coins: R${coins_net:,.2f} | "
            f"Δ: R${delta:,.2f} ({delta_bps:.2f} bps). "
            f"Timestamp: {ts}. "
            f"Sources: {', '.join(comparison['bank']['name'] + ' vs ' + comparison['coins']['name'])}"
        )
        
        return message


# Test
if __name__ == "__main__":
    oracle = PriceOracle(use_simulated=True)
    snapshot_gen = ProofSnapshot(oracle)
    
    snapshot = snapshot_gen.generate(
        amount_gbp=100_000,
        bank_fx_markup_bps=80,
        bank_fee_pct=0.80,
        pricing_mode="indicative",
        network_fee_usdt=5.0,
        client_name="Ed"
    )
    
    print("=" * 80)
    print("PHASE 5: PROOF SNAPSHOT")
    print("=" * 80)
    
    print("\n📋 SNAPSHOT JSON (para auditoria)")
    print("-" * 80)
    print(json.dumps(snapshot, indent=2))
    
    print("\n" + "=" * 80)
    print("📋 MENSAGEM COPIÁVEL")
    print("=" * 80)
    print(f"\n{snapshot['proof_message']}")
    
    print("\n" + "=" * 80)
    print("🔐 INTEGRIDADE")
    print("=" * 80)
    print(f"\nHash SHA256: {snapshot['integrity_hash']}")
    
    # Salvar snapshot em arquivo
    with open('/home/ubuntu/coins-pricing-proof/snapshot.json', 'w') as f:
        json.dump(snapshot, f, indent=2)
    
    print("\n✓ Snapshot salvo em: /home/ubuntu/coins-pricing-proof/snapshot.json")
