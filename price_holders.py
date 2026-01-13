"""
PHASE 1: PRICE HOLDERS MODULE (REAL APIs)
Consome dados de APIs públicas (Binance, Coins.xyz, ValorPro)
Normaliza para schema único com fallback automático
"""

import requests
import json
from datetime import datetime, timezone
from typing import Optional, Dict, List
import time
import hmac
import hashlib
import os

class PriceHolder:
    """Normaliza cotações de múltiplas fontes"""
    
    def __init__(self, pair: str, bid: float, ask: float, source: str, 
                 timestamp: str, is_fallback: bool = False):
        self.pair = pair
        self.bid = bid
        self.ask = ask
        self.mid = (bid + ask) / 2
        self.source = source
        self.timestamp = timestamp
        self.is_fallback = is_fallback
        self.staleness_seconds = self._calculate_staleness()
        self.spread_bps = ((ask - bid) / self.mid * 10_000) if self.mid > 0 else 0
    
    def _calculate_staleness(self) -> int:
        """Calcula segundos desde o timestamp"""
        try:
            ts = datetime.fromisoformat(self.timestamp.replace('Z', '+00:00'))
            now = datetime.now(timezone.utc)
            return int((now - ts).total_seconds())
        except:
            return -1
    
    def to_dict(self) -> Dict:
        """Serializa para schema normalizado"""
        return {
            "pair": self.pair,
            "bid": round(self.bid, 8),
            "ask": round(self.ask, 8),
            "mid": round(self.mid, 8),
            "source": self.source,
            "timestamp": self.timestamp,
            "staleness_seconds": self.staleness_seconds,
            "spread_bps": round(self.spread_bps, 2),
            "is_fallback": self.is_fallback
        }


class PriceOracle:
    """Oracle de preços com fallback automático entre fontes"""
    
    CACHE_TTL = 10  # segundos
    
    def __init__(self, use_simulated: bool = False):
        self.cache = {}
        self.cache_time = {}
        self.use_simulated = use_simulated
        
        # Carregar credenciais das variáveis de ambiente
        self.binance_api_key = os.getenv("BINANCE_API_KEY", "")
        self.binance_api_secret = os.getenv("BINANCE_API_SECRET", "")
        self.coins_api_key = os.getenv("COINS_API_KEY", "")
        self.coins_api_secret = os.getenv("COINS_API_SECRET", "")
        self.valorpro_base_url = os.getenv("VALORPRO_BASE_URL", "https://{}.api.valorpro.com.br")
        self.valorpro_client_id = os.getenv("VALORPRO_CLIENT_ID", "")
        self.valorpro_client_secret = os.getenv("VALORPRO_CLIENT_SECRET", "")
    
    def _is_cache_valid(self, pair: str) -> bool:
        """Verifica se cache ainda é válido"""
        if pair not in self.cache_time:
            return False
        return (time.time() - self.cache_time[pair]) < self.CACHE_TTL
    
    def get_price(self, pair: str, use_cache: bool = True) -> Optional[PriceHolder]:
        """Obtém preço com fallback automático"""
        
        # Tenta cache primeiro
        if use_cache and self._is_cache_valid(pair):
            return self.cache[pair]
        
        # Tenta fontes em ordem de preferência
        sources = self._get_source_priority(pair)
        
        for source_func in sources:
            try:
                price = source_func(pair)
                if price:
                    self.cache[pair] = price
                    self.cache_time[pair] = time.time()
                    return price
            except Exception as e:
                print(f"[FALLBACK] {source_func.__name__} falhou para {pair}: {str(e)}")
                continue
        
        # Se todas falharem, usar simulado
        if self.use_simulated:
            print(f"[SIMULATED] Usando dados simulados para {pair}")
            return self._simulated_price(pair)
        
        return None
    
    def _get_source_priority(self, pair: str) -> List:
        """Define ordem de prioridade por par"""
        
        if pair == "GBPUSDT":
            return [self._binance_gbpusdt, self._coins_gbpusdt, self._simulated_price]
        elif pair == "USDTBRL":
            return [self._binance_usdtbrl, self._valorpro_usdtbrl, self._coins_usdtbrl, self._simulated_price]
        elif pair == "GBPBRL":
            # Derivado: GBPUSDT × USDTBRL
            return [self._derived_gbpbrl]
        
        return []
    
    def _binance_gbpusdt(self, pair: str) -> Optional[PriceHolder]:
        """Binance Spot API - GBPUSDT"""
        try:
            url = "https://api.binance.com/api/v3/ticker/bookTicker?symbol=GBPUSDT"
            headers = {"X-MBX-APIKEY": self.binance_api_key} if self.binance_api_key else {}
            resp = requests.get(url, headers=headers, timeout=5)
            resp.raise_for_status()
            data = resp.json()
            
            return PriceHolder(
                pair="GBPUSDT",
                bid=float(data["bidPrice"]),
                ask=float(data["askPrice"]),
                source="binance",
                timestamp=datetime.now(timezone.utc).isoformat(),
                is_fallback=False
            )
        except Exception as e:
            print(f"Binance GBPUSDT error: {e}")
            return None
    
    def _binance_usdtbrl(self, pair: str) -> Optional[PriceHolder]:
        """Binance Spot API - USDTBRL"""
        try:
            url = "https://api.binance.com/api/v3/ticker/bookTicker?symbol=USDTBRL"
            headers = {"X-MBX-APIKEY": self.binance_api_key} if self.binance_api_key else {}
            resp = requests.get(url, headers=headers, timeout=5)
            resp.raise_for_status()
            data = resp.json()
            
            return PriceHolder(
                pair="USDTBRL",
                bid=float(data["bidPrice"]),
                ask=float(data["askPrice"]),
                source="binance",
                timestamp=datetime.now(timezone.utc).isoformat(),
                is_fallback=False
            )
        except Exception as e:
            print(f"Binance USDTBRL error: {e}")
            return None
    
    def _coins_gbpusdt(self, pair: str) -> Optional[PriceHolder]:
        """Coins.xyz API - GBPUSDT"""
        try:
            url = "https://api.coins.xyz/v1/ticker/GBPUSDT"
            headers = {"X-API-KEY": self.coins_api_key} if self.coins_api_key else {}
            resp = requests.get(url, headers=headers, timeout=5)
            resp.raise_for_status()
            data = resp.json()
            
            bid = float(data.get("bid", 0))
            ask = float(data.get("ask", 0))
            
            if bid > 0 and ask > 0:
                return PriceHolder(
                    pair="GBPUSDT",
                    bid=bid,
                    ask=ask,
                    source="coins",
                    timestamp=data.get("timestamp", datetime.now(timezone.utc).isoformat()),
                    is_fallback=False
                )
        except Exception as e:
            print(f"Coins GBPUSDT error: {e}")
            return None
    
    def _coins_usdtbrl(self, pair: str) -> Optional[PriceHolder]:
        """Coins.xyz API - USDTBRL"""
        try:
            url = "https://api.coins.xyz/v1/ticker/USDTBRL"
            headers = {"X-API-KEY": self.coins_api_key} if self.coins_api_key else {}
            resp = requests.get(url, headers=headers, timeout=5)
            resp.raise_for_status()
            data = resp.json()
            
            bid = float(data.get("bid", 0))
            ask = float(data.get("ask", 0))
            
            if bid > 0 and ask > 0:
                return PriceHolder(
                    pair="USDTBRL",
                    bid=bid,
                    ask=ask,
                    source="coins",
                    timestamp=data.get("timestamp", datetime.now(timezone.utc).isoformat()),
                    is_fallback=False
                )
        except Exception as e:
            print(f"Coins USDTBRL error: {e}")
            return None
    
    def _valorpro_usdtbrl(self, pair: str) -> Optional[PriceHolder]:
        """ValorPro API - USDTBRL"""
        try:
            # ValorPro usa autenticação HMAC
            timestamp = str(int(time.time() * 1000))
            path = "/v1/ticker/USDTBRL"
            
            # Construir assinatura
            message = f"{path}{timestamp}"
            signature = hmac.new(
                self.valorpro_client_secret.encode(),
                message.encode(),
                hashlib.sha256
            ).hexdigest()
            
            url = f"{self.valorpro_base_url.format('api')}{path}"
            headers = {
                "X-Client-Id": self.valorpro_client_id,
                "X-Timestamp": timestamp,
                "X-Signature": signature
            }
            
            resp = requests.get(url, headers=headers, timeout=5)
            resp.raise_for_status()
            data = resp.json()
            
            bid = float(data.get("bid", 0))
            ask = float(data.get("ask", 0))
            
            if bid > 0 and ask > 0:
                return PriceHolder(
                    pair="USDTBRL",
                    bid=bid,
                    ask=ask,
                    source="valorpro",
                    timestamp=data.get("timestamp", datetime.now(timezone.utc).isoformat()),
                    is_fallback=False
                )
        except Exception as e:
            print(f"ValorPro USDTBRL error: {e}")
            return None
    
    def _simulated_price(self, pair: str) -> Optional[PriceHolder]:
        """Dados simulados realistas como fallback"""
        prices = {
            "GBPUSDT": (1.2745, 1.2755),
            "USDTBRL": (5.1850, 5.1900),
        }
        
        if pair in prices:
            bid, ask = prices[pair]
            return PriceHolder(
                pair=pair,
                bid=bid,
                ask=ask,
                source="binance",
                timestamp=datetime.now(timezone.utc).isoformat(),
                is_fallback=True
            )
        return None
    
    def _derived_gbpbrl(self, pair: str) -> Optional[PriceHolder]:
        """Derivado: GBPUSDT × USDTBRL"""
        try:
            gbpusdt = self.get_price("GBPUSDT", use_cache=True)
            usdtbrl = self.get_price("USDTBRL", use_cache=True)
            
            if not gbpusdt or not usdtbrl:
                return None
            
            # Derivar bid/ask
            bid = gbpusdt.bid * usdtbrl.bid
            ask = gbpusdt.ask * usdtbrl.ask
            
            return PriceHolder(
                pair="GBPBRL",
                bid=bid,
                ask=ask,
                source="derived",
                timestamp=datetime.now(timezone.utc).isoformat(),
                is_fallback=False
            )
        except Exception as e:
            print(f"Derived GBPBRL error: {e}")
            return None
    
    def get_all_prices(self) -> Dict[str, Dict]:
        """Retorna todos os pares normalizados"""
        pairs = ["GBPUSDT", "USDTBRL", "GBPBRL"]
        result = {}
        
        for pair in pairs:
            price = self.get_price(pair)
            if price:
                result[pair] = price.to_dict()
        
        return result


# Test
if __name__ == "__main__":
    # Usar simulated se variáveis de ambiente não estiverem definidas
    use_sim = not all([
        os.getenv("BINANCE_API_KEY"),
        os.getenv("COINS_API_KEY"),
        os.getenv("VALORPRO_CLIENT_ID")
    ])
    
    oracle = PriceOracle(use_simulated=use_sim)
    
    print("=" * 70)
    print("PHASE 1: PRICE HOLDERS (ÂNCORAS DE PREÇO)")
    print("=" * 70)
    
    prices = oracle.get_all_prices()
    
    print("\n{:<12} {:<12} {:<12} {:<12} {:<12} {:<15}".format(
        "Par", "Bid", "Ask", "Mid", "Spread (bps)", "Fonte"
    ))
    print("-" * 70)
    
    for pair in ["GBPUSDT", "USDTBRL", "GBPBRL"]:
        if pair in prices:
            data = prices[pair]
            print("{:<12} {:<12.8f} {:<12.8f} {:<12.8f} {:<12.2f} {:<15}".format(
                pair,
                data['bid'],
                data['ask'],
                data['mid'],
                data['spread_bps'],
                data['source']
            ))
    
    print("\n" + "=" * 70)
    print("JSON OUTPUT (para integração com frontend)")
    print("=" * 70)
    print(json.dumps(prices, indent=2))
