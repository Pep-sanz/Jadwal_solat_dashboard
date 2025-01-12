'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePathname } from 'next/navigation';
import path from 'path';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {pathName === '/sign-up'
              ? 'Sign Up'
              : pathName === '/sign-in'
                ? 'Sign In'
                : 'Verify Email'}
          </CardTitle>
          <CardDescription>
            {pathName === '/sign-up'
              ? 'Enter your email correctly to receive the OTP code'
              : pathName === '/sign-in'
                ? 'Enter your email and password to sign in'
                : 'Enter the OTP code to verify your email'}
          </CardDescription>
        </CardHeader>
        <CardFooter>{children}</CardFooter>
      </Card>
    </div>
  );
}
