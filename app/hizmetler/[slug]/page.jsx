import Hizmetler from '../../../src/views/Hizmetler';

export default async function Page({ params }) {
  const { slug } = await params;
  return <Hizmetler slug={slug} />;
}
