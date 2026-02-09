import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

import logo from "../assets/logo-onrylmz-beyaz.png";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BRAND = "ONRYLMZ";
const PHONE_DISPLAY = "0554 544 52 01";
const PHONE_E164 = "905545445201"; 

const navItems = [
  { to: "/hizmetler", label: "Hizmetler" },
  { to: "/portfolyo", label: "Portfolyo" },
  { to: "/trendyol", label: "Trendyol Ürünleri" },  
  { to: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const { count } = useCart(); 

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Üst bar */}
      <div className="bg-ink-950 text-white/85">
        <div className="container mx-auto py-2 text-xs flex items-center justify-between gap-3">
          <span className="hidden sm:block">
            Ankara • CNC & Lazer Kesim • Ahşap Mobilya • Özel Üretim
          </span>

          <div className="flex items-center gap-3">
            <a
              className="hover:text-white transition"
              href={`tel:${PHONE_E164}`}
              aria-label={`Telefon: ${PHONE_DISPLAY}`}
            >
              {PHONE_DISPLAY}
            </a>

            <a
              className="inline-flex items-center gap-2 hover:text-white transition"
              href={`https://wa.me/${PHONE_E164}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="w-2 h-2 rounded-full bg-accent shadow-glow" />
              WhatsApp: Teklif Al
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-white/80 backdrop-blur border-b border-steel-200/60">
        <div className="container mx-auto py-4 flex items-center justify-between gap-4">
          {/* Logo + Marka */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center border border-wood-300 overflow-hidden shadow-md">
              <img
                src={logo}
                alt={`${BRAND} Logo`}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold text-steel-900">
                {BRAND}
              </div>
              <div className="text-xs text-steel-600 group-hover:text-steel-700 transition">
                CNC & Lazer Kesim • Mobilya
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx(
                    "px-4 py-2 rounded-xl text-sm font-semibold transition",
                    isActive
                      ? "bg-wood-100 text-wood-900"
                      : "text-steel-700 hover:bg-steel-50 hover:text-steel-900"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Sepet */}
            <Link
              to="/sepet"
              className="relative btn btn-outline-dark !px-4 !py-2"
              aria-label="Sepet"
            >
              <span className="text-sm">Sepet</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 rounded-full bg-accent text-ink-950 text-xs font-extrabold flex items-center justify-center shadow-soft">
                  {count}
                </span>
              )}
            </Link>

            {/* CTA */}
            <a
              href={`https://wa.me/${PHONE_E164}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex btn btn-primary !px-4 !py-2"
            >
              Teklif Al
            </a>

            {/* Mobile menu */}
            <button
              className="lg:hidden btn btn-outline-dark !px-3 !py-2"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menü"
            >
              <span className="text-sm">{open ? "Kapat" : "Menü"}</span>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="lg:hidden border-t border-steel-200/60 bg-white">
            <div className="container mx-auto py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cx(
                      "px-4 py-3 rounded-xl text-sm font-semibold transition",
                      isActive
                        ? "bg-wood-100 text-wood-900"
                        : "text-steel-700 hover:bg-steel-50 hover:text-steel-900"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="pt-2 flex gap-2">
                <Link to="/sepet" className="btn btn-outline-dark w-full">
                  Sepeti Gör {count > 0 ? `(${count})` : ""}
                </Link>
                <a
                  href={`https://wa.me/${PHONE_E164}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full "
                >
                  Teklif Al
                </a>
              </div>

              <div className="pt-2 text-xs text-steel-500">
                Telefon: <a className="underline" href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
