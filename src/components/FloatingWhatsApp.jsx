import { useEffect, useMemo, useRef, useState } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

export default function FloatingWhatsApp({ phoneE164 }) {
  const btnRef = useRef(null);

  // Tailwind w-16 h-16 => 64px
  const SIZE = 64;
  const MARGIN = 20;

  // ✅ Her zaman sağ-alt başlangıç (right/bottom)
  const defaultPos = useMemo(() => {
    return { r: MARGIN, b: MARGIN }; // right, bottom
  }, []);

  const [pos, setPos] = useState(null);

  useEffect(() => {
    setPos(defaultPos);
  }, [defaultPos]);

  // ✅ Mobilde viewport (adres çubuğu vs.) değişince de sığdır
  useEffect(() => {
    const fitToViewport = () => {
      setPos((p) => {
        if (!p) return p;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // right/bottom için max değer: ekran - buton - min boşluk
        const maxR = vw - SIZE - 8;
        const maxB = vh - SIZE - 8;

        return {
          r: clamp(p.r, 8, Math.max(8, maxR)),
          b: clamp(p.b, 8, Math.max(8, maxB)),
        };
      });
    };

    window.addEventListener("resize", fitToViewport);
    window.addEventListener("orientationchange", fitToViewport);

    // iOS Safari vb. için (varsa) daha stabil
    const vv = window.visualViewport;
    if (vv) vv.addEventListener("resize", fitToViewport);

    return () => {
      window.removeEventListener("resize", fitToViewport);
      window.removeEventListener("orientationchange", fitToViewport);
      if (vv) vv.removeEventListener("resize", fitToViewport);
    };
  }, []);

  const drag = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    originR: 0,
    originB: 0,
    moved: false,
  });

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneE164}?text=${encodeURIComponent(
      "Merhaba, CNC / Lazer kesim için teklif almak istiyorum. Dosya/ölçü paylaşacağım."
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!pos) return null;

  return (
    <button
      ref={btnRef}
      type="button"
      aria-label="WhatsApp ile teklif al"
      // ✅ sağ-alt konumlandırma
      style={{ right: pos.r, bottom: pos.b }}
      className="
        fixed z-[9999]
        w-16 h-16 rounded-full
        bg-[#25D366] text-white
        shadow-2xl
        flex items-center justify-center
        select-none
        touch-none
        cursor-grab active:cursor-grabbing
        transition-transform hover:scale-105
      "
      onPointerDown={(e) => {
        drag.current.active = true;
        drag.current.pointerId = e.pointerId;
        drag.current.startX = e.clientX;
        drag.current.startY = e.clientY;
        drag.current.originR = pos.r;
        drag.current.originB = pos.b;
        drag.current.moved = false;

        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current.active || drag.current.pointerId !== e.pointerId) return;

        const dx = e.clientX - drag.current.startX;
        const dy = e.clientY - drag.current.startY;

        if (!drag.current.moved && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
          drag.current.moved = true;
        }

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // right/bottom mantığı:
        // sağa sürüklemek => right azalır (dx +)
        // sola sürüklemek => right artar
        // aşağı sürüklemek => bottom azalır (dy +)
        // yukarı sürüklemek => bottom artar
        const nextR = drag.current.originR - dx;
        const nextB = drag.current.originB - dy;

        const maxR = vw - SIZE - 8;
        const maxB = vh - SIZE - 8;

        setPos({
          r: clamp(nextR, 8, Math.max(8, maxR)),
          b: clamp(nextB, 8, Math.max(8, maxB)),
        });
      }}
      onPointerUp={(e) => {
        if (drag.current.pointerId !== e.pointerId) return;

        const wasMoved = drag.current.moved;

        drag.current.active = false;
        drag.current.pointerId = null;

        // sürüklendiyse click açma
        if (wasMoved) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        openWhatsApp();
      }}
      onPointerCancel={() => {
        drag.current.active = false;
        drag.current.pointerId = null;
      }}
    >
      <i className="fab fa-whatsapp text-3xl" />
    </button>
  );
}
