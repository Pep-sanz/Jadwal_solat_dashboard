'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {pathName === '/sign-up' ? 'Sign Up' : 'Sign In'}
          </CardTitle>
          <CardDescription>
            {pathName === '/sign-up'
              ? 'Enter your email correctly to receive the OTP code'
              : ' Please enter your email and password correctly '}
          </CardDescription>
        </CardHeader>
        <CardFooter>{children}</CardFooter>
      </Card>
    </div>
  );
}
