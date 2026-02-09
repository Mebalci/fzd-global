import { useMemo, useState } from "react";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import hzCnc from "../assets/hizmet-cnc.png";
import hzLazer from "../assets/hizmet-lazer.png";
import hzOzel from "../assets/hizmet-özel.png";

const PHONE_E164 = "905545445201";
const ACCENT = "#d79f35";

const SERVICES = [
  {
    id: "cnc",
    tag: "CNC",
    title: "CNC Mobilya Kesim",
    subtitle: "MDF • Kontraplak • Masif",
    image: hzCnc,
    bullets: ["Montaja hazır parça kesimi", "Tekil & seri üretim", "Ölçüye özel kesim"],
    detail:
      "MDF, kontraplak ve masif ahşap malzemelerde ölçünüze uygun CNC kesim yapıyoruz. Dosya (DXF/PDF) veya ölçü ile üretime geçebiliriz.",
    specs: [
      { k: "Kalınlık", v: "3mm – 40mm" },
      { k: "Format", v: "DXF / PDF" },
      { k: "Üretim", v: "Tekil / Seri" },
      { k: "Odak", v: "Temiz kenar" },
    ],
  },
  {
    id: "lazer",
    tag: "LAZER",
    title: "Lazer Kesim",
    subtitle: "İnce detay • dekoratif işler",
    image: hzLazer,
    bullets: ["İnce detay kesim", "Dekoratif üretim", "Hızlı prototip"],
    detail:
      "Ahşap ve pleksi gibi malzemelerde lazer kesim ile ince detaylı işler üretiyoruz. Dekoratif paneller, yazı/figür ve özel kesimler için uygundur.",
    specs: [
      { k: "Malzeme", v: "Ahşap / Pleksi" },
      { k: "Detay", v: "İnce çizgiler" },
      { k: "Uygulama", v: "Dekor / Pano" },
      { k: "Süre", v: "Hızlı" },
    ],
  },  
  {
    id: "ozel",
    tag: "ÖZEL",
    title: "Özel Üretim",
    subtitle: "Tasarımınız → Üretim",
    image: hzOzel,
    bullets: ["Ölçüye özel imalat", "Proje bazlı üretim", "Dosya optimizasyon desteği"],
    detail:
      "Özel ölçü üretimlerde tasarımınızı üretime çeviriyoruz. DXF/PDF ile ilerleyebilir veya ölçü üzerinden birlikte netleştirebiliriz.",
    specs: [
      { k: "Dosya", v: "DXF / PDF" },
      { k: "Yaklaşım", v: "Proje bazlı" },
      { k: "Destek", v: "Optimizasyon" },
      { k: "Teslim", v: "Planlı" },
    ],
  },
];

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

function ServiceRow({ s, activeRow, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "w-full text-left rounded-2xl p-3 border transition",        
        activeRow
          ? "bg-white border-[2px] shadow-sm"
          : "bg-white border-black/10 hover:bg-black/5"
      )}
      style={activeRow ? { borderColor: ACCENT } : undefined}
    >
      <div className="flex items-center gap-3">
        <div
          className={cx(
            "w-14 h-14 rounded-2xl overflow-hidden border bg-white",
            activeRow ? "border-black/10" : "border-black/10"
          )}
        >
          <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className={cx(
              "inline-flex rounded-full px-3 py-1 text-[11px] font-black tracking-wider",
              activeRow ? "text-black" : "bg-black/5 text-black/60"
            )}
            style={activeRow ? { backgroundColor: "rgba(215,159,53,0.18)" } : undefined}
          >
            {s.tag}
          </div>

          <div className="mt-2 font-black leading-tight truncate text-black">{s.title}</div>
          <div className="text-xs mt-1 truncate text-black/55">{s.subtitle}</div>
        </div>        
      </div>
    </button>
  );
}

export default function Hizmetler() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const active = useMemo(
    () => SERVICES.find((x) => x.id === activeId) || SERVICES[0],
    [activeId]
  );

  const waText = encodeURIComponent(
    `Merhaba, "${active.title}" hizmeti için teklif almak istiyorum. Dosya/ölçü paylaşacağım.`
  );

  const ListContent = ({ onPick }) => (
    <div className="p-3 space-y-2">
      {SERVICES.map((s) => (
        <ServiceRow
          key={s.id}
          s={s}
          activeRow={s.id === activeId}
          onClick={() => {
            setActiveId(s.id);
            onPick?.();
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <FloatingWhatsApp phoneE164={PHONE_E164} />

      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-10 pb-6">        

        <div className="mt-3 flex items-start justify-between gap-4">
          <div>           
            
          </div>

          {/* Mobilde seçim butonu */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="
              lg:hidden
              shrink-0
              rounded-2xl border border-black/10
              px-4 py-3
              font-black
              hover:bg-black/5 transition
            "
          >
            Hizmet Seç ☰
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 pb-14">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Desktop sol liste */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="rounded-3xl border border-black/10 bg-white overflow-hidden">
              <div className="p-5 border-b border-black/5">
                <div className="text-sm font-black">Hizmet Listesi</div>                
              </div>
              <ListContent />
            </div>
          </aside>

          {/* Sağ detay */}
          <main className="lg:col-span-8">
            <div className="rounded-3xl border border-black/10 bg-white overflow-hidden">
              {/* Görsel */}
              <div className="relative h-[240px] md:h-[320px] bg-black">
                <img
                  src={active.image}
                  alt={active.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />

                <div className="relative h-full p-6 md:p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="rounded-full px-4 py-2 text-xs font-black tracking-wider text-black"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {active.tag}
                    </span>
                    <span className="text-xs text-white/70">{active.subtitle}</span>
                  </div>

                  <h2 className="mt-3 text-3xl md:text-4xl font-black text-white">
                    {active.title}
                  </h2>
                  <p className="mt-3 text-white/80 max-w-2xl">{active.detail}</p>
                </div>
              </div>

              {/* İçerik */}
              <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8">
                {/* Öne çıkanlar */}
                <div>
                  <div className="text-sm font-black">Öne çıkanlar</div>
                  <div className="mt-4 space-y-3">
                    {active.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                        <span className="text-black/75">{b}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/${PHONE_E164}?text=${waText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      mt-7 inline-flex w-full items-center justify-center
                      rounded-2xl px-6 py-4 font-black text-black
                      hover:brightness-110 transition
                    "
                    style={{ backgroundColor: ACCENT }}
                  >
                    WhatsApp’tan Teklif Al
                  </a>
                </div>

                {/* Net bilgiler */}
                <div>
                  <div className="text-sm font-black">Detaylar</div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {active.specs.map((s, i) => (
                      <div key={i} className="rounded-2xl border border-black/10 p-4 bg-white">
                        <div className="text-[11px] font-bold tracking-wider text-black/50">
                          {s.k.toUpperCase()}
                        </div>
                        <div className="mt-2 font-black">{s.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobilde hızlı seçim: seçili hizmetin başlığı altında küçük info */}
            <div className="lg:hidden mt-4 text-xs text-black/50">
              Hizmet değiştirmek için yukarıdaki “Hizmet Seç” menüsünü kullanın.
            </div>
          </main>
        </div>
      </div>

      {/* ✅ Mobil Drawer */}
      <div className={cx("lg:hidden", drawerOpen ? "block" : "hidden")}>
        {/* overlay */}
        <button
          type="button"
          aria-label="Kapat"
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-[9998] bg-black/50"
        />

        {/* panel */}
        <div
          className="
            fixed z-[9999] top-0 right-0 h-full w-[92%] max-w-[420px]
            bg-white shadow-2xl
            border-l border-black/10
            flex flex-col
          "
        >
          <div className="p-5 border-b border-black/10 flex items-center justify-between">
            <div>
              <div className="text-sm font-black">Hizmet Seç</div>
              <div className="text-xs text-black/50 mt-1">Listeden bir hizmet seçin</div>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="rounded-xl border border-black/10 px-3 py-2 font-black hover:bg-black/5 transition"
            >
              ✕
            </button>
          </div>

          <div className="overflow-auto">
            <ListContent onPick={() => setDrawerOpen(false)} />
          </div>

          <div className="p-4 border-t border-black/10">
            <a
              href={`https://wa.me/${PHONE_E164}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center rounded-2xl px-6 py-4 font-black text-black"
              style={{ backgroundColor: ACCENT }}
            >
              Seçili Hizmet İçin Teklif Al →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
