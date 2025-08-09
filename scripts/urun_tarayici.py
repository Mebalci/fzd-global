# scripts/urun_tarayici.py
import os, json, base64, time
from datetime import datetime
import requests

API_KEY = os.getenv("TRENDYOL_API_KEY")
API_SECRET = os.getenv("TRENDYOL_API_SECRET")
SUPPLIER_ID = os.getenv("TRENDYOL_SUPPLIER_ID")

BASE_URL = f"https://api.trendyol.com/sapigw/suppliers/{SUPPLIER_ID}/products"
PAGE_SIZE = 200  # 2000+ ürün için büyük sayfa

def headers():
    if not API_KEY or not API_SECRET or not SUPPLIER_ID:
        raise SystemExit("❌ TRENDYOL_* env değişkenleri tanımlı değil.")
    token = base64.b64encode(f"{API_KEY}:{API_SECRET}".encode()).decode()
    return {
        "Authorization": f"Basic {token}",
        "Accept": "application/json",
        # 🔴 Trendyol burada 'User-Agent' bekliyor (şartsız, aksi 403 verebiliyor)
        "User-Agent": f"{SUPPLIER_ID} - GitHubActions"
    }

def get_page(page, size):
    params = {"approved": "true", "page": page, "size": size}
    r = requests.get(BASE_URL, headers=headers(), params=params, timeout=30)
    if r.status_code == 403:
        # Hata ayıklama için kısa not (secrets'ı asla yazdırmıyoruz)
        raise SystemExit(
            "❌ 403 Forbidden: Genelde 'User-Agent' header yok/yanlış veya API anahtarları geçersiz.\n"
            " - headers(): User-Agent eklendi mi?\n"
            " - Repo Secrets: TRENDYOL_API_KEY / TRENDYOL_API_SECRET / TRENDYOL_SUPPLIER_ID doğru mu?\n"
            " - SupplierID doğru mu? (URL içinde)"
        )
    r.raise_for_status()
    return r.json()

def flatten(item):
    return {
        "id": item.get("id"),
        "title": item.get("title"),
        "brand": item.get("brand", {}).get("name") if isinstance(item.get("brand"), dict) else item.get("brand"),
        "description": item.get("description"),
        "price": item.get("listPrice"),
        "salePrice": item.get("salePrice"),
        "quantity": item.get("quantity"),
        "images": [img.get("url") for img in item.get("images", [])] if item.get("images") else [],
        "category": item.get("categoryName"),
        "url": item.get("productUrl")
    }

def fetch_all():
    all_items = []
    page = 0
    while True:
        data = get_page(page, PAGE_SIZE)
        content = data.get("content", [])
        all_items.extend(flatten(p) for p in content)
        total_pages = data.get("totalPages", 1)
        page += 1
        if page >= total_pages:
            break
        time.sleep(0.2)  # nazik olalım :)
    return all_items

def main():
    products = fetch_all()
    out = {"updatedAt": datetime.utcnow().isoformat(), "products": products}
    os.makedirs("public", exist_ok=True)
    with open("public/urunler.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"✅ {len(products)} ürün yazıldı: public/urunler.json")

if __name__ == "__main__":
    main()
