'use client';

import FloatingWhatsApp from "../components/FloatingWhatsApp";
import logoWhite from "../assets/logo-onrylmz-beyaz.png";

const BRAND = "ONRYLMZ";
const PHONE_DISPLAY = "0554 544 52 01";
const PHONE_E164 = "905545445201";
const ACCENT = "#d79f35";

export default function Contact() {
  const waText = encodeURIComponent(
    "Merhaba, CNC / Lazer kesim için teklif almak istiyorum. Dosya veya ölçü paylaşacağım."
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <FloatingWhatsApp phoneE164={PHONE_E164} />

      {/* ================= HEADER ================= */}
      <div className="mx-auto max-w-6xl px-4 md:px-8 pt-14 pb-10">   
              
      </div>

      {/* ================= CONTENT ================= */}
      <div className="mx-auto max-w-6xl px-4 md:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* SOL BİLGİ */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-black/10 p-8">
              <div className="text-sm font-black mb-2">İletişim Bilgileri</div>

              <div className="mt-6 space-y-6">
                {/* Telefon    Önder, Taştop Sk. No:16 Altındağ / Ankara*/}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke={ACCENT}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs tracking-wider text-black/50 font-bold">
                      TELEFON
                    </div>
                    <a
                      href={`tel:${PHONE_E164}`}
                      className="block mt-1 text-xl font-black hover:underline"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                {/* Adres */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke={ACCENT}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs tracking-wider text-black/50 font-bold">
                      ADRES
                    </div>
                    <a
                      href={`https://www.google.com/maps?q=Önder, Taştop Sk. No:16 Altındağ / Ankara}`}
                      className="block mt-1 text-xl font-black hover:underline"
                    >
                      Önder, Taştop Sk. No:16 Altındağ / Ankara
                    </a>
                  </div>
                </div>

                

                {/* Hizmetler */}
                <div>
                  <div className="text-xs tracking-wider text-black/50 font-bold mb-3">
                    HİZMET ALANLARI
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "CNC Kesim",
                      "Lazer Kesim",
                      "Özel Üretim",
                      "Ahşap Mobilya",                      
                    ].map((item, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full border border-black/10 text-sm font-bold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${PHONE_E164}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="
                block w-full text-center
                rounded-3xl px-10 py-5
                font-black text-black
                hover:brightness-110 transition
              "
              style={{ backgroundColor: ACCENT }}
            >
              WhatsApp’tan Teklif Al →
            </a>
          </div>

          {/* SAĞ KUTU */}
          <div className="rounded-3xl border border-black/10 p-10 bg-black text-white">
            <img
              src={logoWhite.src}
              alt={`${BRAND} logo`}
              className="h-12 w-auto mb-8 opacity-95"
            />

            <div className="space-y-6">
              <div>
                <div className="text-xs tracking-wider text-white/50 font-bold">
                  ATÖLYE
                </div>
                <div className="mt-2 text-xl font-black">
                  CNC & Lazer Kesim Atölyesi
                </div>
              </div>

              <p className="text-white/75 leading-relaxed">
                Proje bazlı çalışmalar, ölçüye özel üretimler ve
                seri kesim ihtiyaçları için hızlı ve net çözümler sunarız.
              </p>

              <div className="pt-6 border-t border-white/10">
                <div className="text-xs tracking-wider text-white/50 font-bold">
                  ÇALIŞMA PRENSİBİ
                </div>

                <ul className="mt-4 space-y-3 text-white/80 text-sm">
                  <li>• Dosya veya ölçü alımı</li>
                  <li>• Hızlı değerlendirme</li>
                  <li>• Net fiyat teklifi</li>                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
