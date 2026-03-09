import CategoryPage from '../../../src/views/CategoryPage';

export default async function Page({ params }) {
  const { kategoriSlug } = await params;
  return <CategoryPage slug={kategoriSlug} />;
}
