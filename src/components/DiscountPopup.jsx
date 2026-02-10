import { useEffect, useState } from "react";

const STORAGE_KEY = "discount_popup_closed_at";
const SUPPRESS_MS = 60 * 1000; // 1 dakika

export default function DiscountPopup({
  percent = 15,
  brand = "ONRYLMZ",
  ctaHref = "/trendyol",
  ctaText = "Ürünlere Git →",
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closedAt = localStorage.getItem(STORAGE_KEY);
    if (closedAt && Date.now() - Number(closedAt) < SUPPRESS_MS) return;
    setOpen(true);
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4">
      {/* backdrop */}
      <button
        aria-label="Kapat"
        onClick={close}
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
      />

      {/* panel */}
      <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-white/10 bg-[#0b0d10] text-white shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]">
        {/* glow */}
        <div
          className="absolute -top-24 -left-24 h-64 w-64 rounded-full opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(215,159,53,0.75), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.25), transparent 60%)",
          }}
        />

        <div className="relative p-7 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80">
            <span className="w-2 h-2 rounded-full bg-[#d79f35]" />
            <span className="tracking-[0.22em] uppercase">{brand}</span>
          </div>

          <h3 className="mt-4 text-3xl sm:text-4xl font-black leading-tight">
            Tüm ürünlerde <span className="text-[#d79f35]">%{percent}</span> İndirim
          </h3>

          <p className="mt-3 text-white/75 leading-relaxed">
            Web sitemize özel fiyat avantajı — hemen keşfet.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={close}
              className="rounded-2xl px-6 py-4 font-extrabold bg-white/10 hover:bg-white/15 transition"
            >
              Kapat
            </button>

            <a
              href={ctaHref}
              className="text-center rounded-2xl px-6 py-4 font-extrabold bg-[#d79f35] text-black hover:brightness-110 transition"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
