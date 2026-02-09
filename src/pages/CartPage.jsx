import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const BRAND = "ONRYLMZ";
const PHONE_E164 = "905545445201";

const formatPrice = (n) =>
  new Intl.NumberFormat("tr-TR").format(n);

// ---------- ICONS ----------
const IconTrash = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 7h16" stroke="currentColor" strokeWidth="2" />
    <path d="M10 11v7M14 11v7" stroke="currentColor" strokeWidth="2" />
    <path d="M6 7l1 14h10l1-14" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 5.9L4 29l8.3-1.5c1.2.6 2.5.9 3.7.9 6.6 0 12-5.4 12-12S22.6 3 16 3z" />
  </svg>
);

export default function CartPage() {
  const { items, removeFromCart, setQty, clearCart, total } = useCart();

  const waMessage = useMemo(() => {
    if (!items.length) return "Merhaba, bilgi almak istiyorum.";
    const lines = items.map(
      (it, i) =>
        `${i + 1}) ${it.title} x${it.qty} = ${formatPrice(
          it.discounted * it.qty
        )} ₺`
    );
    lines.push(`\nToplam: ${formatPrice(total)} ₺`);
    lines.push("\nTeslimat bilgisi için dönüş rica ederim.");
    return lines.join("\n");
  }, [items, total]);

  const sendWhatsAppOrder = () => {
    window.open(
      `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(waMessage)}`,
      "_blank"
    );
  };

  // ---------- EMPTY ----------
  if (!items.length) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-black mb-4">Sepetiniz Boş</h1>
          <p className="text-gray-600 mb-8">
            Henüz sepete ürün eklemediniz.
          </p>
          <Link
            to="/urunler"
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900"
          >
            Ürünlere Git →
          </Link>
        </div>
      </div>
    );
  }

  // ---------- PAGE ----------
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-black mb-10">Sepet</h1>

        {/* ITEMS */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex flex-col md:flex-row md:items-center gap-6 p-6 border-b last:border-b-0"
            >
              {it.image && (
                <img
                  src={it.image}
                  alt={it.title}
                  className="w-24 h-24 rounded-xl object-cover bg-gray-100"
                />
              )}

              <div className="flex-1">
                <div className="font-bold text-lg">{it.title}</div>
                <div className="text-sm text-gray-500">
                  {formatPrice(it.discounted)} ₺ / adet
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(it.id, Math.max(1, it.qty - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={it.qty}
                    onChange={(e) =>
                      setQty(it.id, Number(e.target.value))
                    }
                    className="w-14 text-center border-x"
                  />
                  <button
                    onClick={() =>
                      setQty(it.id, Math.min(it.stock, it.qty + 1))
                    }
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-[120px]">
                  <div className="font-bold">
                    {formatPrice(it.discounted * it.qty)} ₺
                  </div>
                  <button
                    onClick={() => removeFromCart(it.id)}
                    className="text-sm text-red-600 inline-flex items-center gap-1 mt-1"
                  >
                    <IconTrash className="w-4 h-4" />
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg text-gray-600">Toplam</span>
            <span className="text-3xl font-black">
              {formatPrice(total)} ₺
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={clearCart}
              className="py-4 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100"
            >
              Sepeti Temizle
            </button>

            <button
              onClick={sendWhatsAppOrder}
              className="py-4 rounded-xl bg-[#25D366] text-white font-black inline-flex items-center justify-center gap-2 hover:brightness-110"
            >
              <IconWhatsApp className="w-5 h-5" />
              WhatsApp’tan Sipariş Ver
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Siparişiniz WhatsApp üzerinden onaylanır.
          </p>
        </div>
      </div>
    </div>
  );
}
