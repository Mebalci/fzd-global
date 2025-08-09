# scripts/urun_tarayici.py
import os, json, base64, time
from datetime import datetime
import requests

API_KEY = os.getenv("TRENDYOL_API_KEY")
API_SECRET = os.getenv("TRENDYOL_API_SECRET")
SUPPLIER_ID = os.getenv("TRENDYOL_SUPPLIER_ID")

PAGE_SIZE = 200

def _headers():
    if not API_KEY or not API_SECRET or not SUPPLIER_ID:
        raise SystemExit("❌ TRENDYOL_* env değişkenleri boş.")
    token = base64.b64encode(f"{API_KEY}:{API_SECRET}".encode()).decode()
    return {
        "Authorization": f"Basic {token}",
        "Accept": "application/json",
        "User-Agent": f"{SUPPLIER_ID} - GitHubActions"
    }

PRIMARY_BASE = f"https://api.trendyol.com/sapigw/suppliers/{SUPPLIER_ID}/products"
FALLBACK_BASE = f"https://api.trendyol.com/integration/product/sellers/{SUPPLIER_ID}/products"

def get_page(base_url, page, size):
    params = {"approved": "true", "page": page, "size": size}
    r = requests.get(base_url, headers=_headers(), params=params, timeout=30)
    r.raise_for_status()
    return r.json()

def fetch_all():
    # önce sapigw, 403/404 olursa integration'a düş
    base_urls = [PRIMARY_BASE, FALLBACK_BASE]
    last_err = None
    for base in base_urls:
        try:
            all_items, page = [], 0
            while True:
                data = get_page(base, page, PAGE_SIZE)
                content = data.get("content", [])
                for p in content:
                    brand = p.get("brand")
                    all_items.append({
                        "id": p.get("id"),
                        "title": p.get("title"),
                        "brand": brand.get("name") if isinstance(brand, dict) else brand,
                        "description": p.get("description"),
                        "price": p.get("listPrice"),
                        "salePrice": p.get("salePrice"),
                        "quantity": p.get("quantity"),
                        "images": [i.get("url") for i in (p.get("images") or [])],
                        "category": p.get("categoryName"),
                        "url": p.get("productUrl"),
                    })
                page += 1
                if page >= data.get("totalPages", 1):
                    break
                time.sleep(0.2)
            print(f"✅ Endpoint OK: {base}")
            return all_items
        except requests.HTTPError as e:
            last_err = e
            status = getattr(e.response, "status_code", "?")
            print(f"⚠️  Endpoint fail ({status}): {base} -> denemeye devam...")
            continue
    # ikisi de düştüyse net hata ver
    raise SystemExit(
        f"❌ Ürün çekme başarısız. Son hata: {last_err}\n"
        "Kontrol et:\n"
        " - TRENDYOL_API_KEY / TRENDYOL_API_SECRET doğru mu?\n"
        " - TRENDYOL_SUPPLIER_ID (sadece rakam) doğru mu?\n"
        " - Hesabında ilgili endpoint yetkisi açık mı?"
    )

def main():
    items = fetch_all()
    out = {"updatedAt": datetime.utcnow().isoformat(), "products": items}
    os.makedirs("public", exist_ok=True)
    with open("public/urunler.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"✅ {len(items)} ürün yazıldı: public/urunler.json")

if __name__ == "__main__":
    main()
