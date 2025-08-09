export async function urunleriGetir() {
  const res = await fetch("/urunler.json", { cache: "no-store" });
  const data = await res.json();
  return data.products || [];
}
