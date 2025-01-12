'use client';

import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Analytics } from '@vercel/analytics/react';
import { MobileNav } from '@/components/layouts/MobileNav';
import { AppSidebar } from '@/components/layouts/sidebar';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TbDeviceDesktop } from 'react-icons/tb';
import { User } from './user';
import { PiMosqueBold } from 'react-icons/pi';
import { useListMosque } from '@/hooks/use-mosque';

export default function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar />
      <div>
        <header className="sticky w-full top-0 right-6 flex h-16 items-center justify-between sm:justify-end gap-4 border-b bg-background px-6">
          <MobileNav />
          {/* <DashboardBreadcrumb /> */}
          {/* <SearchInput /> */}
          <div className="flex items-center space-x-6">
            <SelectDevices />
            <User />
          </div>
        </header>
        <main className="grid h-full w-full gap-2 p-4 sm:pl-20 sm:pr-8 sm:py-6 md:gap-4 bg-muted/40">
          {children}
        </main>
      </div>
      <Analytics />
    </main>
  );
}

function SelectDevices() {
  const router = useRouter();
  const [defaultValue, setDefaultValue] = useState('');
  const { mosqueId } = useParams();
  const { data, isFetching } = useListMosque({});

  useEffect(() => {
    if (mosqueId && !isFetching && data) {
      const selectedMosque = data.find(
        (item: any) => item.id === Number(mosqueId),
      );
      console.log(selectedMosque);
      if (selectedMosque) {
        setDefaultValue(selectedMosque.id);
      }
    }
  }, [mosqueId, isFetching, data]);

  return (
    <Select
      value={defaultValue}
      onValueChange={(value) => {
        setDefaultValue(value);
        router.push(`/dashboard/${value}/devices`);
      }}
    >
      <SelectTrigger
        icon={<PiMosqueBold size={20} />}
        className="w-fit bg-slate-300/40 shadow-sm rounded-full space-x-2 focus:ring-0 focus:ring-offset-0 border-none"
      >
        <SelectValue placeholder="Pilih Masjid" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.map((mosque: any) => (
            <SelectItem key={mosque.id} value={mosque.id}>
              {mosque.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function DashboardBreadcrumb() {
  const pathname = usePathname(); // Ambil jalur URL saat ini
  const segments = pathname.split('/').filter(Boolean); // Pisahkan jalur menjadi segmen

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {/* Root link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          // Buat jalur kumulatif untuk setiap segmen
          const href = '/' + segments.slice(0, index + 1).join('/');

          const isLast = index === segments.length - 1; // Cek apakah segmen terakhir
          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{decodeURIComponent(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{decodeURIComponent(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
