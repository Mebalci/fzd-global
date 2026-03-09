import Portfolyo from '../../../src/views/Portfolyo';

export default async function Page({ params }) {
  const { slug } = await params;
  return <Portfolyo slug={slug} />;
}
