'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
// import { useSignIn } from '@/hooks/useAuth';
import * as cookies from 'cookies-js';
import FormGenerator from '@/components/elements/form-generator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useVerifyEmail } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';

export const signinSchema = z.object({
  email: z.string().email().min(1, { message: 'Field ini harus diisi' }),
  password: z.string().min(6, { message: 'Minimal 6 karakter' }),
});
type FormData = z.infer<typeof signinSchema>;

const VerifyEmailFrom = () => {
  const params = useParams();
  const email = decodeURIComponent(params.email as string);
  const [value, setValue] = React.useState('');
  const { mutate, status } = useVerifyEmail();
  const form = useForm({
    resolver: zodResolver(signinSchema),
  });

  console.log(email);

  // const handleSubmit = () => {
  //   const { email, password } = form.getValues();
  //   mutate({ email, password });
  //   console.log(cookies.get(process.env.COOKIE_NAME as string));
  // };
  return (
    <div className="space-y-4 w-full">
      <InputOTP
        className=" justify-center"
        maxLength={6}
        value={value}
        onChange={setValue}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button
        className="w-full"
        onClick={() => mutate({ email, otp: value })}
        loading={status === 'pending'}
      >
        Register
      </Button>
      <div className="w-full flex justify-center mt-6">
        <p className="text-xs text-muted-foreground">
          Resend OTP{' '}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Klik disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailFrom;
