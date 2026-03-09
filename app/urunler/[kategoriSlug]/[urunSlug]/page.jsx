import ProductDetail from '../../../../src/views/ProductDetail';

export default async function Page({ params }) {
  const { kategoriSlug, urunSlug } = await params;
  return <ProductDetail kategoriSlug={kategoriSlug} urunSlug={urunSlug} />;
}
