export function slugifyTR(str = "") {
  return str
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function pickCategorySlug(urun) {
  const t = (urun?.title || "").toLowerCase();
  if (t.includes("takı") || t.includes("taki")) return "taki-dolabi";
  if (t.includes("ayna")) return "ayna";
  if (t.includes("dolap")) return "dolap";
  return "urun";
}

export function buildProductSlug(urun) {
  const id = (urun?.id || "").toString();
  const idPart = id ? id.slice(0, 12) : "id";
  return `${slugifyTR(urun?.title || "urun")}-${idPart}`;
}

export function extractIdFromUrunSlug(urunSlug = "") {
  const parts = urunSlug.split("-");
  return parts[parts.length - 1];
}
