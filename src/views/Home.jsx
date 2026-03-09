'use client';

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { urunleriGetir } from "../api";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

import lazerImg from "../assets/lazer.png";
import logoWhite from "../assets/logo-onrylmz-beyaz.png";

import ozel from "../assets/1.png";
import deco from "../assets/2.png";
import taki from "../assets/3.png";

import hzCnc from "../assets/hizmet-cnc.png";
import hzLazer from "../assets/hizmet-lazer.png";
import hzOzel from "../assets/hizmet-ozel.png";

import DiscountPopup from "../components/DiscountPopup";

const BRAND = "ONRYLMZ";
const PHONE_DISPLAY = "0554 544 52 01";
const PHONE_E164 = "905545445201";

const SEO_TITLE = "ONRYLMZ | Ankara CNC & Lazer Kesim • Ahşap Mobilya Üretim";
const SEO_DESC =
  "Ankara'da CNC mobilya kesim, lazer kesim, gravür ve özel ahşap üretim. Ölçü/dosyayı gönderin, hızlı teklif alın. Trendyol takı dolapları da sitede.";

function setMetaDescription(content) {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export default function Home() {
  const [urunler, setUrunler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    document.title = SEO_TITLE;
    setMetaDescription(SEO_DESC);
  }, []);

  useEffect(() => {
    urunleriGetir()
      .then((data) => setUrunler((data || []).filter((u) => (u.quantity ?? 0) > 0)))
      .finally(() => setLoading(false));
  }, []);

  const trendyolFeatured = useMemo(() => urunler.slice(0, 6), [urunler]);

  const waText = encodeURIComponent(
    "Merhaba, CNC/Lazer kesim için teklif almak istiyorum. Dosya/ölçü paylaşacağım."
  ); 

  // Hizmetler kutu görselleri 
  const serviceImages = [
    hzCnc.src, // CNC
    hzLazer.src, // LAZER
    hzOzel.src, // ÖZEL
  ];

  // Portfolyo kart görselleri 
  const portfolioImages = {
    cncBuyuk: logoWhite.src,
    lazerPanel: deco.src,
    gravurLogo: logoWhite.src,
    ozelUretim: ozel.src,
    kurumsal: taki.src,
    kompleks: logoWhite.src,
  };

  return (
    <div className="bg-white">
      <DiscountPopup percent={15} brand={BRAND} />
      {/* Sürüklenebilir WhatsApp butonu */}
      <FloatingWhatsApp phoneE164={PHONE_E164} />

      {/* ================= HERO ================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-10xl px-3 md:px-8 py-10">
          <div className="overflow-hidden rounded-[28px] border border-black/10 bg-[#0b0d10] shadow-[0_30px_90px_-55px_rgba(0,0,0,0.55)]">
            <div className="grid lg:grid-cols-12 min-h-[620px]">

              {/* SOL */}
              <div className="relative lg:col-span-8 min-h-[520px] min-w-0">
                <img
                  src={lazerImg.src}
                  alt="ONRYLMZ Ankara CNC & Lazer Kesim"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="eager"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                {/* etiket */}
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/15 px-4 py-2 backdrop-blur text-xs text-white/90">
                  <span className="w-2 h-2 rounded-full bg-[#d79f35]" />
                  <span className="font-semibold">Ankara • CNC • Lazer Kesim</span>
                </div>

                {/* metin */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 min-w-0">
                  <h1
                    className="
                      text-white font-black leading-[0.9]
                      text-[clamp(2.4rem,4.6vw,5rem)]
                      drop-shadow-[0_6px_18px_rgba(0,0,0,0.65)]
                      max-w-[24ch] min-w-0 break-words
                    "
                  >
                    HAYALİNİZİ
                    <br />
                    ŞEKİLLENDİRİYORUZ
                  </h1>

                  <p className="mt-4 text-white/85 text-base md:text-lg max-w-2xl">
                    CNC kesim, lazer kesim, gravür ve özel ahşap üretim ihtiyaçlarınız için
                    dosyanızı/ölçünüzü gönderin — hızlı teklif verelim.
                  </p>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${PHONE_E164}?text=${waText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full px-8 py-4 font-extrabold bg-[#d79f35] text-black hover:brightness-110 transition"
                    >
                      WhatsApp’tan Teklif Al
                    </a>

                    <Link
                      href="/hizmetler"
                      className="inline-flex items-center justify-center rounded-full px-8 py-4 font-extrabold bg-white/90 text-black hover:bg-white transition"
                    >
                      Hizmetleri İncele
                    </Link>
                  </div>
                </div>
              </div>

              {/* SAĞ */}
              <aside className="relative lg:col-span-4 bg-gradient-to-b from-[#0f131a] to-[#0b0d10] min-w-0">
                <div
                  className="absolute inset-0 opacity-45 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 25% 15%, rgba(215,159,53,0.22), transparent 58%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06), transparent 55%)",
                  }}
                />

                <div className="relative h-full flex flex-col items-center justify-center text-center px-8 py-10 min-w-0">
                  <img
                    src={logoWhite.src}
                    alt="ONRYLMZ Logo"
                    className="w-[clamp(300px,26vw,520px)] max-w-[95%] h-auto drop-shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
                  />

                  <div className="mt-5 text-white/80 text-sm tracking-[0.28em]">
                    {BRAND}
                  </div>
                  <div className="mt-2 text-white text-2xl font-extrabold">
                    ÖZEL ÜRETİM
                  </div>

                  <div className="mt-6 w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="text-xs text-white/60">Telefon</div>
                    <a
                      href={`tel:${PHONE_E164}`}
                      className="mt-2 block text-xl font-black text-white hover:text-[#d79f35] transition"
                    >
                      {PHONE_DISPLAY}
                    </a>

                    <div className="mt-4 text-xs text-white/60 leading-relaxed">
                      CNC • Lazer Kesim
                      <br />
                      Ahşap Mobilya
                    </div>
                  </div>

                  <div className="mt-5 text-xs text-white/50">
                    Teklif için iletişime geçin.
                  </div>
                </div>
              </aside>

            </div>
          </div>
        </div>
      </section>

      {/* ================= HİZMETLER ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px),repeating-linear-gradient(90deg, transparent, transparent 1px, #000 1px, #000 2px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <div className="mono text-xl tracking-[0.3em] text-[#d79f35] mb-4">HİZMETLER</div>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-black leading-tight mb-6">
                Ne Yapıyoruz?
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-12">
              {["CNC KESİM", "LAZER KESİM", "ÖZEL ÜRETİM"].map((service, i) => (
                <button
                  key={i}
                  onClick={() => setActiveService(i)}
                  className={`mono text-xs px-6 py-3 border-2 font-bold service-tab ${
                    activeService === i
                      ? "active"
                      : "bg-white text-black border-black hover:bg-black hover:text-white"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* SOL içerik */}
              <div>
                {activeService === 0 && (
                  <div className="space-y-6">
                    <h3 className="text-4xl font-black">CNC Mobilya Kesim</h3>
                    <p className="text-xl text-gray-700 leading-relaxed">
                      MDF, kontraplak ve masif ahşapta milimetrik hassasiyet.
                      Montaja hazır parça kesimi ve seri üretim desteği.
                    </p>
                    <div className="space-y-3">
                      {[
                        "±0.1mm hassas kesim hedefi",
                        "3mm - 40mm kalınlık aralığı",
                        "Panel malzemelerle uyumlu",
                        "Tekil ve seri üretim",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1 h-6 bg-[#d79f35] mt-1"></div>
                          <span className="text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeService === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-4xl font-black">Lazer Kesim & Detay</h3>
                    <p className="text-xl text-gray-700 leading-relaxed">
                      Ahşap ve akrilik malzemelerde hassas kesim. İnce detaylar ve
                      dekoratif işler için ideal.
                    </p>
                    <div className="space-y-3">
                      {[
                        "Dekoratif kesim ve üretim",
                        "Ahşap, pleksi, akrilik, karton",
                        "Kompleks geometri ve detay işleri",
                        "Hızlı prototip yaklaşımı",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1 h-6 bg-[#d79f35] mt-1"></div>
                          <span className="text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeService === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-4xl font-black">Özel Tasarım Üretim</h3>
                    <p className="text-xl text-gray-700 leading-relaxed">
                      Sizin tasarımınız, bizim üretimimiz. DXF/PDF’den üretime, ölçüye
                      özel imalat.
                    </p>
                    <div className="space-y-3">
                      {[
                        "DXF, PDF, AI, CDR desteği",
                        "Prototip ve seri üretim",
                        "Özel ölçü ve form",
                        "Dosya optimizasyon desteği",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1 h-6 bg-[#d79f35] mt-1"></div>
                          <span className="text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/hizmetler"
                  className="inline-block mt-8 px-8 py-4 bg-black text-white font-bold hover:bg-[#d79f35] hover:text-black transition-all"
                >
                  TÜM HİZMETLER →
                </Link>
              </div>

              {/* SAĞ kutu: her hizmet için ayrı resim */}
              <div className="relative h-[520px] rounded-3xl overflow-hidden border border-black/10 bg-black">
                <img
                  src={serviceImages[activeService]}
                  alt="Hizmet görseli"
                  className="absolute inset-0 h-full w-full object-cover opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/85" />

                <div className="relative h-full flex items-center justify-center text-center p-10">
                  <div className="max-w-sm">
                    <div className="mono text-6xl font-black text-white mb-3">
                      {activeService === 0 && "CNC"}
                      {activeService === 1 && "LAZER"}
                      {activeService === 2 && "ÖZEL"}
                    </div>

                    <div className="text-sm text-white/70 mono">
                      {["HASSAS KESİM", "İNCE DETAY", "TASARIMINIZ"][activeService]}
                    </div>

                    <div className="mt-10 mx-auto h-px w-24 bg-white/20" />

                    <div className="mt-8 text-white/80 text-sm leading-relaxed">
                      {activeService === 0 && "Mobilya parçaları, panel kesim ve seri üretim."}
                      {activeService === 1 && "Dekoratif kesim, gravür ve ince detay işleri."}
                      {activeService === 2 && "DXF/PDF’den üretime, ölçüye özel imalat."}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= PORTFOLYO ================= */}
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <div className="mono text-xl tracking-[0.3em] text-[#d79f35] mb-4">PORTFOLYO</div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-black leading-tight max-w-2xl">
                Yapılan İşlerden Seçmeler
              </h2>
              <Link
                href="/portfolyo"
                className="px-6 py-3 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-all self-start lg:self-end"
              >
                PORTFOLYO →
              </Link>
            </div>
          </div>

          {(() => {
            const Card = ({ className, title, sub, tag, image }) => (
              <div className={`relative overflow-hidden border-2 border-gray-800 hover:border-[#d79f35] transition-all cursor-pointer group ${className}`}>
                <img
                  src={image}
                  alt={`${tag} görseli`}
                  className="absolute inset-0 h-full w-full object-cover opacity-50 group-hover:opacity-60 transition"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mono text-xs text-[#d79f35] mb-2">{tag}</div>
                  <div className="text-2xl font-bold">{title}</div>
                  {sub ? <div className="text-sm text-gray-300 mt-2">{sub}</div> : null}
                </div>
              </div>
            );

            return (
              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-[200px]">
                <Card
                  className="md:col-span-6 lg:col-span-7 lg:row-span-2"
                  tag="CNC KESİM"
                  title="Özel Mobilya Parçaları"
                  sub="MDF & Kontraplak"
                  image={portfolioImages.cncBuyuk}
                />

                <Card
                  className="md:col-span-3 lg:col-span-5"
                  tag="LAZER KESİM"
                  title="Dekoratif Paneller"
                  image={portfolioImages.lazerPanel}
                />

                <Card
                  className="md:col-span-3 lg:col-span-5"
                  tag="GRAVÜR"
                  title="Logo & Markalama"
                  image={portfolioImages.gravurLogo}
                />

                <Card
                  className="md:col-span-6 lg:col-span-7"
                  tag="ÖZEL ÜRETİM"
                  title="Takı Dolabı Tasarımları"
                  image={portfolioImages.ozelUretim}
                />

                <Card
                  className="md:col-span-3 lg:col-span-5 lg:row-span-2"
                  tag="PROJE"
                  title={
                    <>
                      Kurumsal
                      <br />
                      Çözümler
                    </>
                  }
                  image={portfolioImages.kurumsal}
                />

                <Card
                  className="md:col-span-3 lg:col-span-7"
                  tag="DETAY"
                  title="Kompleks Geometri İşleri"
                  image={portfolioImages.kompleks}
                />
              </div>
            );
          })()}
        </div>
      </section>

      {/* ================= TRENDYOL ÜRÜNLERİ ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <div className="mono text-xl tracking-[0.3em] text-[#d79f35] mb-4">ÜRÜN KATALOĞU</div>            
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mono text-[#d79f35] animate-pulse">YÜKLENİYOR...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendyolFeatured.map((urun, i) => (
                  <div key={urun.id || i} className="group">
                    <ProductCard urun={urun} />
                  </div>
                ))}
              </div>

              <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/trendyol"
                  className="px-8 py-4 bg-black text-white font-bold hover:bg-[#d79f35] hover:text-black transition-all text-center"
                >
                  TÜM ÜRÜNLER →
                </Link>
                <Link
                  href="/sepet"
                  className="px-8 py-4 border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all text-center"
                >
                  SEPET
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      
          {/* ================= İLETİŞİM ================= */}
      <section className="relative overflow-hidden bg-[#d79f35] text-black py-16 md:py-24">
        {/* hafif desen */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 18px, #000 18px, #000 19px)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            {/* üst başlık */}
            <div className="grid lg:grid-cols-12 gap-10 items-end mb-10 md:mb-14">
              <div className="lg:col-span-7">
                <div className="mono text-sm md:text-base tracking-[0.32em] mb-4 text-black/70">
                  İLETİŞİM
                </div>

                {/* daha düzenli başlık: satır kırılmaları kontrollü */}
                <h2 className="font-black leading-[0.98] text-[clamp(2rem,4.2vw,3.4rem)]">
                  Proje için teklif alın
                </h2>

                <p className="mt-4 text-base md:text-lg leading-relaxed text-black/80 max-w-2xl">
                  DXF/PDF dosyanızı veya ölçülerinizi gönderin. Genelde 24 saat içinde detaylı fiyat teklifi veriyoruz.
                </p>
              </div>

              {/* hızlı iletişim satırı */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur p-5 md:p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#d79f35]"
                        fill="none"
                        stroke="currentColor"
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

                    <div className="min-w-0">
                      <div className="mono text-xs tracking-[0.25em] text-black/60">
                        TELEFON
                      </div>
                      <a
                        href={`tel:${PHONE_E164}`}
                        className="block text-xl md:text-2xl font-black hover:underline"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${PHONE_E164}?text=${waText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 w-full inline-flex items-center justify-center rounded-2xl px-8 py-4 bg-black text-white font-extrabold hover:bg-black/90 transition"
                  >
                    WhatsApp’tan Yaz →
                  </a>
                </div>
              </div>
            </div>

            {/* alt içerik: sol bilgi + sağ kart */}
            <div className="grid lg:grid-cols-12 gap-10 items-stretch">             

              {/* Teklif kartı */}
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black text-white p-7 md:p-9 h-full">
                  <div className="mono text-xs tracking-[0.28em] text-[#d79f35] mb-6">
                    // HIZLI HAZIRLIK
                  </div>

                  <div className="space-y-3 text-sm md:text-base text-white/80">
                    {[
                      "Dosya formatı: DXF / PDF / AI / CDR",
                      "Malzeme: MDF / Kontraplak / Masif / Pleksi",
                      "Kalınlık: 3mm – 40mm",
                      "İstenilen ölçü / adet bilgisi",
                    ].map((t, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-2 inline-block w-2 h-2 rounded-full bg-black/70" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-sm text-white/70">
                    Not: Dosyanız yoksa ölçü + görsel gönderin, birlikte netleştiririz.
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                    <img
                      src={logoWhite.src}
                      alt={`${BRAND} logo`}
                      className="h-10 w-auto opacity-95"
                    />
                    <div className="min-w-0">
                      <div className="font-bold">{BRAND}</div>
                      <div className="text-sm text-white/60">
                        CNC & Lazer Kesim • Ankara
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      
    </div>
  );
}
