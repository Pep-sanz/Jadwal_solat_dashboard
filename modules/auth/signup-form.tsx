'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import * as cookies from 'cookies-js';
import FormGenerator from '@/components/elements/form-generator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSignUp } from '@/hooks/useAuth';

export const signupSchema = z.object({
  email: z.string().email().min(1, { message: 'Field ini harus diisi' }),
  password: z.string().min(6, { message: 'Minimal 6 karakter' }),
});
type FormData = z.infer<typeof signupSchema>;

const SignUpForm = () => {
  const { mutate, status } = useSignUp();
  const form = useForm({
    resolver: zodResolver(signupSchema),
  });

  // const handleSubmit = () => {
  //   const { email, password } = form.getValues();
  //   mutate({ email, password });
  //   console.log(cookies.get(process.env.COOKIE_NAME as string));
  // };
  return (
    <div className="space-y-4 w-full">
      <FormGenerator
        form={form}
        id="form"
        onSubmit={(val) => mutate(val)}
        data={[
          {
            label: 'Email',
            name: 'email',
            type: 'text',
            placeholder: 'example@gmail.com',
            grid: 12,
          },
          {
            label: 'Password',
            name: 'password',
            placeholder: '******',
            type: 'text',
            grid: 12,
          },
        ]}
      />
      <Button
        className="w-full"
        form="form"
        type="submit"
        loading={status === 'pending'}
      >
        Register
      </Button>
      <div className="w-full flex justify-center mt-6">
        <p className="text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
