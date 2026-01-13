"""
Script para testar integração com APIs reais
Testa Binance, Coins.xyz e ValorPro com credenciais fornecidas
"""

import requests
import json
import hmac
import hashlib
import time
from datetime import datetime, timezone

# Credenciais
BINANCE_API_KEY = "JC3QdyIeWfDoOSHsqkVBnzRf5k2mTqiKMGzyERqWc6d9ff4LKuWG5U7cfQNi8Eqt"
BINANCE_API_SECRET = "vm71pOIt5JO1p4sn2LcPdKDOCjH4jjw4UyxA2JTn0vEZQYvkTX5kvu21DbqFYFUf"

COINS_API_KEY = "KCAxSTjlPBOl4tjlrsuj34jPHWNfQkLHz9Ve12IouyIOTl7gegJS70TiFeIYQur6"
COINS_API_SECRET = "WnvS796CmtEyiIbTB0Ob7luDNQwogf8jDPGRTO5dpieBtU8eY3Wejd7bmrlRNrbh"

VALORPRO_BASE_URL = "https://{}.api.valorpro.com.br"
VALORPRO_CLIENT_ID = "6169548488978162486763756013"
VALORPRO_CLIENT_SECRET = "2f60183Bb7C4b80525CCe55592728a8D"

def test_binance():
    """Testa Binance API"""
    print("\n" + "="*70)
    print("TESTE 1: BINANCE API")
    print("="*70)
    
    try:
        # GBPUSDT
        print("\n1. Testando GBPUSDT...")
        url = "https://api.binance.com/api/v3/ticker/bookTicker?symbol=GBPUSDT"
        headers = {"X-MBX-APIKEY": BINANCE_API_KEY}
        resp = requests.get(url, headers=headers, timeout=5)
        print(f"Status: {resp.status_code}")
        
        if resp.status_code == 200:
            data = resp.json()
            print(f"✓ GBPUSDT: {data['bidPrice']} / {data['askPrice']}")
        else:
            print(f"✗ Erro: {resp.text[:200]}")
        
        # USDTBRL
        print("\n2. Testando USDTBRL...")
        url = "https://api.binance.com/api/v3/ticker/bookTicker?symbol=USDTBRL"
        resp = requests.get(url, headers=headers, timeout=5)
        print(f"Status: {resp.status_code}")
        
        if resp.status_code == 200:
            data = resp.json()
            print(f"✓ USDTBRL: {data['bidPrice']} / {data['askPrice']}")
        else:
            print(f"✗ Erro: {resp.text[:200]}")
    
    except Exception as e:
        print(f"✗ Exceção: {e}")

def test_coins():
    """Testa Coins.xyz API"""
    print("\n" + "="*70)
    print("TESTE 2: COINS.XYZ API")
    print("="*70)
    
    try:
        # GBPUSDT
        print("\n1. Testando GBPUSDT...")
        url = "https://api.coins.xyz/v1/ticker/GBPUSDT"
        headers = {"X-API-KEY": COINS_API_KEY}
        resp = requests.get(url, headers=headers, timeout=5)
        print(f"Status: {resp.status_code}")
        
        if resp.status_code == 200:
            data = resp.json()
            print(f"✓ GBPUSDT: {data.get('bid')} / {data.get('ask')}")
            print(f"Response: {json.dumps(data, indent=2)[:300]}")
        else:
            print(f"✗ Erro: {resp.text[:200]}")
        
        # USDTBRL
        print("\n2. Testando USDTBRL...")
        url = "https://api.coins.xyz/v1/ticker/USDTBRL"
        resp = requests.get(url, headers=headers, timeout=5)
        print(f"Status: {resp.status_code}")
        
        if resp.status_code == 200:
            data = resp.json()
            print(f"✓ USDTBRL: {data.get('bid')} / {data.get('ask')}")
            print(f"Response: {json.dumps(data, indent=2)[:300]}")
        else:
            print(f"✗ Erro: {resp.text[:200]}")
    
    except Exception as e:
        print(f"✗ Exceção: {e}")

def test_valorpro():
    """Testa ValorPro API"""
    print("\n" + "="*70)
    print("TESTE 3: VALORPRO API")
    print("="*70)
    
    try:
        # USDTBRL
        print("\n1. Testando USDTBRL...")
        
        timestamp = str(int(time.time() * 1000))
        path = "/v1/ticker/USDTBRL"
        
        # Construir assinatura
        message = f"{path}{timestamp}"
        signature = hmac.new(
            VALORPRO_CLIENT_SECRET.encode(),
            message.encode(),
            hashlib.sha256
        ).hexdigest()
        
        url = f"{VALORPRO_BASE_URL.format('api')}{path}"
        headers = {
            "X-Client-Id": VALORPRO_CLIENT_ID,
            "X-Timestamp": timestamp,
            "X-Signature": signature
        }
        
        print(f"URL: {url}")
        print(f"Headers: {json.dumps({k: v[:20]+'...' if len(v) > 20 else v for k, v in headers.items()}, indent=2)}")
        
        resp = requests.get(url, headers=headers, timeout=5)
        print(f"Status: {resp.status_code}")
        
        if resp.status_code == 200:
            data = resp.json()
            print(f"✓ USDTBRL: {data.get('bid')} / {data.get('ask')}")
            print(f"Response: {json.dumps(data, indent=2)[:300]}")
        else:
            print(f"✗ Erro: {resp.text[:200]}")
    
    except Exception as e:
        print(f"✗ Exceção: {e}")

if __name__ == "__main__":
    print("\n" + "="*70)
    print("TESTE DE INTEGRAÇÃO COM APIs REAIS")
    print("="*70)
    
    test_binance()
    test_coins()
    test_valorpro()
    
    print("\n" + "="*70)
    print("RESUMO")
    print("="*70)
    print("""
Se todas as APIs retornarem 200, o módulo price_holders.py funcionará com dados reais.
Se retornarem 401/403, as credenciais estão incorretas.
Se retornarem 404, os endpoints podem estar errados.
Se retornarem 451, o acesso pode estar bloqueado pela localização.

Próximo passo: Configurar credenciais no ambiente do Manus via webdev_request_secrets.
""")
