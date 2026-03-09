import logoForCards from "../assets/logo-onrylmz-beyaz.png";
import özel from "../assets/1.png";
import deco from "../assets/2.png";
import taki from "../assets/3.png";

export const WORKS = [
  {
    id: "work-1",
    tag: "CNC",
    title: "Özel Mobilya Parçaları",
    slug: "cnc-ozel-parca",
    subtitle: "MDF / Kontraplak kesim",
    image: logoForCards.src,
    summary:
      "Ölçüye özel parça kesimleri, montaja hazır setler ve seri üretime uygun CNC işlemleri.",
    highlights: ["Ölçüye özel", "Montaja hazır", "Seri üretim"],
    scope: [
      "Parça kesim (kapak, raf, yan panel)",
      "Delik/kanal işlemleri (projeye göre)",
      "Setleme & paketleme (isteğe bağlı)",
    ],
    materials: ["MDF", "Kontraplak", "Masif (projeye göre)"],
    process: [
      { k: "1) Dosya/Ölçü", v: "DXF/PDF veya ölçü listesi" },
      { k: "2) Hazırlık", v: "Kesim planı & optimizasyon" },
      { k: "3) Üretim", v: "CNC kesim & kontrol" },
    ],
  },
  {
    id: "work-2",
    tag: "LAZER",
    title: "Dekoratif Panel",
    slug: "lazer-dekoratif-panel",
    subtitle: "İnce detay lazer kesim",
    image: deco.src,
    summary:
      "Dekoratif paneller, yazı/figür ve ince detay gerektiren lazer kesim işler.",
    highlights: ["İnce detay", "Dekoratif", "Hızlı prototip"],
    scope: [
      "Dekoratif panel tasarım-kesim",
      "Özel yazı & figür kesimleri",
      "Seri küçük üretimler",
    ],
    materials: ["Ahşap", "Pleksi/Akrilik (projeye göre)"],
    process: [
      { k: "1) Tasarım", v: "PDF/SVG/AI veya referans" },
      { k: "2) Deneme", v: "Gerekirse test kesimi" },
      { k: "3) Üretim", v: "Kesim & temizlik" },
    ],
  },
  {
    id: "work-3",
    tag: "GRAVÜR",
    title: "Logo & Markalama",
    slug: "gravur-logo-markalama",
    subtitle: "Ahşap üzerine gravür",
    image: özel.src,
    summary:
      "Kurumsal logo, yazı ve markalama uygulamaları. Tekil veya seri işler.",
    highlights: ["Net işaretleme", "Kurumsal", "Tekrar edilebilir kalite"],
    scope: [
      "Logo gravürü",
      "Ürün üzerine yazı/seri no",
      "Kutu/etiket markalama (projeye göre)",
    ],
    materials: ["Ahşap", "MDF", "Kontraplak"],
    process: [
      { k: "1) Logo", v: "SVG/AI/PDF" },
      { k: "2) Konum", v: "Yerleşim & boyut onayı" },
      { k: "3) Uygulama", v: "Gravür & kontrol" },
    ],
  },
  {
    id: "work-4",
    tag: "ÖZEL",
    title: "Takı Dolabı Üretimi",
    slug: "ahsap-taki-dolabi",
    subtitle: "Özel ölçü imalat",
    image: taki.src,
    summary:
      "Ölçüye özel takı dolabı üretimleri: kesim, parça hazırlığı ve proje bazlı üretim.",
    highlights: ["Özel ölçü", "Proje bazlı", "Fonksiyonel çözüm"],
    scope: ["Proje planlama", "Parça üretimi", "Montaja uygun hazırlık"],
    materials: ["MDF", "Kontraplak", "Aksesuar (projeye göre)"],
    process: [
      { k: "1) İhtiyaç", v: "Ölçü & kullanım senaryosu" },
      { k: "2) Tasarım", v: "Plan/dosya netleştirme" },
      { k: "3) Üretim", v: "Kesim & parça hazırlığı" },
    ],
  },
];
