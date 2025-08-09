# scripts/urun_tarayici.py
import os
import json
import time
import base64
import requests
from datetime import datetime, timezone

API_KEY = os.getenv("TRENDYOL_API_KEY")
API_SECRET = os.getenv("TRENDYOL_API_SECRET")
SUPPLIER_ID = os.getenv("TRENDYOL_SUPPLIER_ID")

if not (API_KEY and API_SECRET and SUPPLIER_ID):
    raise SystemExit("Missing TRENDYOL_API_KEY / TRENDYOL_API_SECRET / TRENDYOL_SUPPLIER_ID")

BASE = f"https://api.trendyol.com/sapigw/suppliers/{SUPPLIER_ID}"
OUT_DIR = "public"
OUT_FILE = os.path.join(OUT_DIR, "urunler.json")
PAGE_SIZE = 200          # güvenli üst limit
SLEEP_BETWEEN = 0.3      # istekler arası bekleme (sn)
MAX_RETRY = 3

def headers():
    token = base64.b64encode(f"{API_KEY}:{API_SECRET}".encode()).decode()
    return {
        "Authorization": f"Basic {token}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "fzd-global-sync/1.0"
    }

def get_page(page: int, size: int):
    url = f"{BASE}/products"
    params = {
        "page": page,
        "size": size,
        "approved": "true"
        # istersen "onSale": "true" ekleyebilirsin
    }
    for attempt in range(1, MAX_RETRY + 1):
        try:
            res = requests.get(url, headers=headers(), params=params, timeout=30)
            if res.status_code == 429:
                # Rate limit — reset header varsa ona göre bekle
                reset = int(res.headers.get("x-ratelimit-reset", "2"))
                time.sleep(reset + 1)
                continue
            res.raise_for_status()
            return res.json(), res.headers
        except Exception as e:
            if attempt == MAX_RETRY:
                raise
            time.sleep(1.5 * attempt)
    return None, {}

def map_product(p: dict) -> dict:
    # Görsel listesi
    imgs = []
    if isinstance(p.get("images"), list):
        for im in p["images"]:
            url = im.get("url")
            if url:
                imgs.append(url)

    # Stok hesabı (items[].quantity toplamı)
    qty = 0
    if isinstance(p.get("items"), list):
        for it in p["items"]:
            q = it.get("quantity", 0) or 0
            qty += int(q)

    # Fiyat alanları
    list_price = p.get("listPrice") or p.get("listPriceWithVat") or 0
    sale_price = p.get("salePrice") or p.get("salePriceWithVat") or list_price or 0

    # Marka ismi
    brand_name = ""
    if isinstance(p.get("brand"), dict):
        brand_name = p["brand"].get("name") or ""
    else:
        brand_name = p.get("brandName") or p.get("brand") or ""

    pid = p.get("productId") or p.get("id") or p.get("barcode") or p.get("productMainId")

    return {
        "id": str(pid),
        "title": p.get("title") or p.get("productMainId") or "Ürün",
        "brand": brand_name,
        "description": p.get("description") or "",
        "price": float(list_price) if list_price else 0,
        "salePrice": float(sale_price) if sale_price else 0,
        "quantity": qty,
        "images": imgs,
        "category": p.get("categoryName") or "",
        "url": p.get("productUrl") or ""
    }

def fetch_all():
    page = 0
    total_elements = 1_000_000  # döngü başlasın diye
    all_products = []

    while page * PAGE_SIZE < total_elements:
        data, hdr = get_page(page, PAGE_SIZE)
        content = data.get("content", [])
        total_elements = data.get("totalElements", len(all_products) + len(content))

        for p in content:
            all_products.append(map_product(p))

        page += 1
        time.sleep(SLEEP_BETWEEN)

    # Stabil diff için ada göre sırala
    all_products.sort(key=lambda x: (x["brand"] or "", x["title"] or ""))

    return all_products

def main():
    products = fetch_all()
    payload = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "products": products
    }
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"✅ {len(products)} ürün yazıldı → {OUT_FILE}")

if __name__ == "__main__":
    main()
