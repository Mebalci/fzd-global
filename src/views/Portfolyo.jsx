'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { WORKS } from "../data/works";

const PHONE_E164 = "905545445201";
const ACCENT = "#d79f35";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

function PortfolioRow({ w, activeRow, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "w-full text-left rounded-2xl p-3 border transition",
        activeRow ? "bg-white border-[2px] shadow-sm" : "bg-white border-black/10 hover:bg-black/5"
      )}
      style={activeRow ? { borderColor: ACCENT } : undefined}
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-black/10 bg-white">
          <img src={w.image} alt={w.title} className="w-full h-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className={cx(
              "inline-flex rounded-full px-3 py-1 text-[11px] font-black tracking-wider",
              activeRow ? "text-black" : "bg-black/5 text-black/60"
            )}
            style={activeRow ? { backgroundColor: "rgba(215,159,53,0.18)" } : undefined}
          >
            {w.tag}
          </div>

          <div className="mt-2 font-black leading-tight truncate text-black">{w.title}</div>
          <div className="text-xs mt-1 truncate text-black/55">{w.subtitle}</div>
        </div>
      </div>
    </button>
  );
}

export default function Portfolyo({ slug }) {
  const router = useRouter();

  const defaultWork = WORKS[0];

  const [activeId, setActiveId] = useState(defaultWork.id);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!slug) {      
      setActiveId(defaultWork.id);
      return;
    }

    const found = WORKS.find((w) => w.slug === slug);
    if (found) setActiveId(found.id);
    else router.replace(`/portfolyo/${defaultWork.slug}`);
  }, [slug]);

  const active = useMemo(
    () => WORKS.find((x) => x.id === activeId) || defaultWork,
    [activeId]
  );

  const onPickWork = (w) => {
    setActiveId(w.id);
    setDrawerOpen(false);
    router.push(`/portfolyo/${w.slug}`);
  };

  const waText = encodeURIComponent(
    `Merhaba, "${active.title}" işine benzer bir proje için fiyat almak istiyorum.`
  );

  const ListContent = ({ onPickDone }) => (
    <div className="p-3 space-y-2">
      {WORKS.map((w) => (
        <PortfolioRow
          key={w.id}
          w={w}
          activeRow={w.id === activeId}
          onClick={() => {
            onPickWork(w);
            onPickDone?.();
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <FloatingWhatsApp phoneE164={PHONE_E164} />

      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-10 pb-6">
        <div className="mt-3 flex items-start justify-between gap-4">
          <div />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden shrink-0 rounded-2xl border border-black/10 px-4 py-3 font-black hover:bg-black/5 transition"
          >
            İş Seç ☰
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 pb-14">
        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="hidden lg:block lg:col-span-4">
            <div className="rounded-3xl border border-black/10 bg-white overflow-hidden">
              <div className="p-5 border-b border-black/5">
                <div className="text-sm font-black">Portfolyo Listesi</div>
              </div>
              <ListContent />
            </div>
          </aside>

          <main className="lg:col-span-8">
            <div className="rounded-3xl border border-black/10 bg-white overflow-hidden">
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

                  <h1 className="mt-3 text-3xl md:text-4xl font-black text-white">{active.title}</h1>
                  <p className="mt-3 text-white/80 max-w-2xl">{active.summary}</p>
                </div>
              </div>

              <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-sm font-black">İş kapsamı</div>
                  <div className="mt-4 space-y-3">
                    {active.scope.map((b, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                        <span className="text-black/75">{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7">
                    <div className="text-sm font-black">Öne çıkanlar</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {active.highlights.map((h, i) => (
                        <span key={i} className="rounded-full px-3 py-2 text-xs font-black border border-black/10 bg-white">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${PHONE_E164}?text=${waText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 font-black text-black hover:brightness-110 transition"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Benzer Proje İçin Teklif Al
                  </a>
                </div>

                <div className="space-y-7">
                  <div>
                    <div className="text-sm font-black">Malzemeler</div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {active.materials.map((m, i) => (
                        <div key={i} className="rounded-2xl border border-black/10 p-4 bg-white">
                          <div className="text-[11px] font-bold tracking-wider text-black/50">MALZEME</div>
                          <div className="mt-2 font-black">{m}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-black">Üretim adımları</div>
                    <div className="mt-4 space-y-3">
                      {active.process.map((p, i) => (
                        <div key={i} className="rounded-2xl border border-black/10 p-4 bg-white flex items-start justify-between gap-4">
                          <div className="font-black">{p.k}</div>
                          <div className="text-black/65 text-sm text-right">{p.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:hidden mt-4 text-xs text-black/50">
              İş değiştirmek için “İş Seç” menüsünü kullanın.
            </div>
          </main>
        </div>
      </div>

      {/* Mobil Drawer */}
      <div className={cx("lg:hidden", drawerOpen ? "block" : "hidden")}>
        <button
          type="button"
          aria-label="Kapat"
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-[9998] bg-black/50"
        />

        <div className="fixed z-[9999] top-0 right-0 h-full w-[92%] max-w-[420px] bg-white shadow-2xl border-l border-black/10 flex flex-col">
          <div className="p-5 border-b border-black/10 flex items-center justify-between">
            <div>
              <div className="text-sm font-black">İş Seç</div>
              <div className="text-xs text-black/50 mt-1">Portfolyodan bir iş seçin</div>
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
            <ListContent onPickDone={() => setDrawerOpen(false)} />
          </div>

          <div className="p-4 border-t border-black/10">
            <a
              href={`https://wa.me/${PHONE_E164}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center rounded-2xl px-6 py-4 font-black text-black"
              style={{ backgroundColor: ACCENT }}
            >
              Seçili İş İçin Teklif Al →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
