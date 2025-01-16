'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <div className="min-h-screen w-full grid justify-items-center items-center p-8">
      <Card className="max-w-sm h-fit sm:w-[400px]">
        <CardHeader>
          {pathName !== '/sign-in' && (
            <Button
              variant={'ghost'}
              onClick={() => history.back()}
              className="w-fit pl-0"
            >
              <ArrowLeft />
              <p>Kembali</p>
            </Button>
          )}
          <CardTitle className="text-2xl">
            {pathName === '/sign-up'
              ? 'Sign Up'
              : pathName === '/sign-in'
                ? 'Sign In'
                : 'Verify Email'}
          </CardTitle>
          <CardDescription>
            {pathName === '/sign-up'
              ? 'Masukkan email Anda dengan benar untuk menerima kode OTP'
              : pathName === '/sign-in'
                ? 'Masukkan email dan kata sandi Anda'
                : 'Masukkan kode OTP yang telah dikirimkan ke email Anda'}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </div>
  );
}
