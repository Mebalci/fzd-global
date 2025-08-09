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
        "Content-Type": "application/json",
        # Yaygın bir UA kullan
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    }

BASE = f"https://apigw.trendyol.com/integration/product/sellers/{SUPPLIER_ID}/products"

def get_page(page, size):
    params = {"approved": "true", "page": page, "size": size}
    r = requests.get(BASE, headers=_headers(), params=params, timeout=30)
    r.raise_for_status()
    return r.json()

def fetch_all():
    all_items, page = [], 0
    while True:
        data = get_page(page, PAGE_SIZE)
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
    return all_items

def main():
    items = fetch_all()
    out = {"updatedAt": datetime.utcnow().isoformat(), "products": items}
    os.makedirs("public", exist_ok=True)
    with open("public/urunler.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"✅ {len(items)} ürün yazıldı: public/urunler.json")

if __name__ == "__main__":
    main()
