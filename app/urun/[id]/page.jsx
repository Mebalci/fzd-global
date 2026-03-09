import ProductDetail from '../../../src/views/ProductDetail';

export default async function Page({ params }) {
  const { id } = await params;
  return <ProductDetail id={id} legacy />;
}
