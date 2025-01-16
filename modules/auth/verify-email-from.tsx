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
import OTPCounter from './OTPCounter';

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

  const otpDate = Date.now();

  const handleDate = async () => {
    // try {
    // const response: any = await postSendOtp({
    //   email: email,
    // });
    //   if (response) {
    //     const seccond = 6; // one minute
    //     handleOtpDate(Date.now() + seccond * 10000); //seccond
    //     notification.success({
    //       message: 'The verification email has been sent',
    //     });
    //   }
    // } catch (error: any) {
    //   Modal.error({
    //     title: 'Error',
    //     content: ` ${Object.values(error?.response?.data)}`,
    //     okType: 'danger',
    //   });
    // console.log(error);
    // }
  };

  // const handleSubmit = () => {
  //   const { email, password } = form.getValues();
  //   mutate({ email, password });
  //   console.log(cookies.get(process.env.COOKIE_NAME as string));
  // };
  return (
    <div className="space-y-6 w-full">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
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
        Verifikasi
      </Button>
      <div className="w-full flex justify-center mt-6">
        <div className="text-xs flex items-center space-x-2 text-muted-foreground">
          <p>Belum Mendapatkan OTP?</p>
          <OTPCounter
            date={otpDate}
            handleDate={handleDate}
            // key={DateSendOtp}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailFrom;
