import dynamic from 'next/dynamic';

const DeviceList = dynamic(() => import('@/modules/devices/device-list'), {
  ssr: false,
});

export default function Page() {
  return <DeviceList />;
}
