import { Link } from "react-router-dom";
import logoWhite from "../assets/logo-onrylmz-beyaz.png";

const BRAND = "ONRYLMZ";
const PHONE_DISPLAY = "0554 544 52 01";
const PHONE_E164 = "905545445201";
const ACCENT = "#d79f35";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0a0a0a] text-white border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* TOP */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* BRAND */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center border border-white/10 overflow-hidden">
                <img
                  src={logoWhite}
                  alt={`${BRAND} Logo`}
                  className="w-8 h-8 object-contain"
                />
              </div>

              <div className="min-w-0">
                <div className="text-xl font-black tracking-wide truncate">
                  {BRAND}
                </div>
                <div className="text-[11px] text-white/55 tracking-[0.22em] mt-1">
                  CNC • LAZER • ÖZEL ÜRETİM
                </div>
              </div>
            </Link>

            <p className="mt-5 text-white/70 leading-relaxed text-sm sm:text-base max-w-md">
              Ankara’da CNC kesim, lazer kesim ve özel ahşap üretim çözümleri.
              Dosyanızı/ölçünüzü gönderin, hızlı teklif alın.
            </p>

            {/* CTA (mobilde full) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
              <a
                href={`https://wa.me/${PHONE_E164}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center rounded-2xl px-5 py-3 font-black bg-white text-black hover:bg-white/90 transition"
              >
                WhatsApp
              </a>

              <a
                href={`tel:${PHONE_E164}`}
                className="w-full inline-flex items-center justify-center rounded-2xl px-5 py-3 font-black border border-white/15 text-white hover:border-white/30 transition"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div className="lg:col-span-7">
            {/* Mobilde daha derli toplu: 2 sütun + sosyal alt satır */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
              {/* MENÜ */}
              <div>
                <div className="text-[11px] font-black tracking-[0.28em] text-white/55 mb-4">
                  MENÜ
                </div>
                <ul className="space-y-3 text-white/75 font-semibold text-sm">
                  <li>
                    <Link to="/" className="hover:text-white transition">
                      Anasayfa
                    </Link>
                  </li>
                  <li>
                    <Link to="/hizmetler" className="hover:text-white transition">
                      Hizmetler
                    </Link>
                  </li>
                  <li>
                    <Link to="/portfolyo" className="hover:text-white transition">
                      Portfolyo
                    </Link>
                  </li>
                  <li>
                    <Link to="/iletisim" className="hover:text-white transition">
                      İletişim
                    </Link>
                  </li>
                </ul>
              </div>

              {/* İLETİŞİM */}
              <div>
                <div className="text-[11px] font-black tracking-[0.28em] text-white/55 mb-4">
                  İLETİŞİM
                </div>
                <ul className="space-y-3 text-white/75 font-semibold text-sm">
                  <li>
                    <a
                      href={`tel:${PHONE_E164}`}
                      className="hover:text-white transition"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/${PHONE_E164}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition"
                    >
                      WhatsApp’tan Yaz
                    </a>
                  </li>
                  <li className="text-white/55 text-sm font-medium leading-relaxed">
                    <a
                      href={`https://www.google.com/maps?q=Önder, Taştop Sk. No:16 Altındağ / Ankara}`}                      
                    >
                      Önder, Taştop Sk. No:16 Altındağ / Ankara
                    </a>
                  </li>
                </ul>
              </div>

              {/* SOSYAL (mobilde alt satıra insin) */}
              <div className="col-span-2 sm:col-span-1">
                <div className="text-[11px] font-black tracking-[0.28em] text-white/55 mb-4">
                  SOSYAL
                </div>

                <div className="flex items-center gap-3">
                  {/* Instagram */}
                  <a
                    href="#"
                    className="w-11 h-11 rounded-2xl border border-white/10 hover:border-white/25 transition flex items-center justify-center"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Zm5.25-.88a1.13 1.13 0 1 1 0 2.26a1.13 1.13 0 0 1 0-2.26Z" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${PHONE_E164}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 rounded-2xl border border-white/10 hover:border-white/25 transition flex items-center justify-center"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 0 0-8.66 15l-1.34 5l5.13-1.34A10 10 0 1 0 12 2Zm0 1.5a8.5 8.5 0 0 1 0 17a8.4 8.4 0 0 1-4.27-1.16l-.3-.18l-3.04.8l.8-2.97l-.2-.31A8.5 8.5 0 0 1 12 3.5Zm4.2 10.62c-.23-.11-1.36-.67-1.57-.75c-.21-.08-.37-.11-.52.11c-.15.23-.6.75-.73.9c-.13.15-.27.17-.5.06a6.8 6.8 0 0 1-2-1.24a7.6 7.6 0 0 1-1.4-1.75c-.15-.23-.02-.35.1-.46c.11-.11.23-.27.35-.4c.11-.13.15-.23.23-.38c.08-.15.04-.29-.02-.4c-.06-.11-.52-1.25-.71-1.72c-.19-.45-.38-.39-.52-.39l-.44-.01c-.15 0-.4.06-.61.29c-.21.23-.8.78-.8 1.9c0 1.11.82 2.19.93 2.34c.11.15 1.62 2.47 3.93 3.46c.55.24.98.38 1.32.49c.55.17 1.05.15 1.45.09c.44-.06 1.36-.56 1.55-1.1c.19-.54.19-1 .13-1.1c-.06-.1-.21-.16-.44-.27Z" />
                    </svg>
                  </a>

                  <span
                    className="hidden sm:inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-10 h-px w-full bg-white/10" />

        {/* BOTTOM (mobilde ortalı + alt alta) */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-white/55">
          <div className="text-center sm:text-left">
            © {year}{" "}
            <span className="font-semibold text-white/70">{BRAND}</span>. Tüm
            hakları saklıdır.
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-4">
            <Link to="/gizlilik" className="hover:text-white/80 transition">
              Gizlilik
            </Link>
            <span className="text-white/25">•</span>
            <Link to="/kullanim-sartlari" className="hover:text-white/80 transition">
              Kullanım
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
