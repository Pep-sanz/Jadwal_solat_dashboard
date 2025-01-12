import dynamic from 'next/dynamic';

const MosqueList = dynamic(() => import('@/modules/mosque/mosque-list'), {
  ssr: false,
});

export default async function Page() {
  return <MosqueList />;
}
