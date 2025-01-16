import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import * as z from 'zod';
import { fetcherAuth } from '@/lib/fetcher';
import { AxiosError } from 'axios';
import * as Cookie from 'cookies-js';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signinSchema } from '@/modules/auth/signin-form';
import { useToast } from './use-toast';
type FormData = z.infer<typeof signinSchema>;

interface ResponseAuthDTO {
  refresh: string;
  access: string;
}

export const useSignIn = () => {
  const navigate = useRouter();
  const { toast } = useToast();
  const mutation = useMutation<ResponseAuthDTO, Error, FormData>({
    mutationFn: async (body: FormData) => {
      const response = await fetcherAuth.post('/login/', body);
      return response.data;
    },
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      const { data } = mutation;

      toast({
        title: 'Berhasil',
        description: 'Login Berhasil',
        variant: 'success',
        duration: 3000,
      });

      Cookie.set(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || '', data.access);
      Cookie.set(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || '',
        data.refresh,
      );

      setTimeout(() => {
        location.reload();
        setTimeout(() => {
          navigate.push('/mosque');
        }, 100);
      }, 300);
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError =
        (Object.values(error.response?.data.errors?.[0] || {}) as any) ||
        'Gagal masuk';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError || 'Gagal masuk',
        duration: 3000,
      });
    }
  }, [mutation.status]);

  return mutation;
};

export const useSignUp = () => {
  const navigate = useRouter();
  const { toast } = useToast();
  const mutation = useMutation<ResponseAuthDTO, Error, FormData>({
    mutationFn: async (body: FormData) => {
      const response = await fetcherAuth.post('/register/', body);
      return response.data;
    },
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      const { data } = mutation;

      toast({
        title: 'Berhasil',
        description: 'Register Berhasil',
        variant: 'success',
      });

      sessionStorage.setItem('accessToken', data.access);
      Cookie.set(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || '',
        data.refresh,
      );

      const formData = mutation.variables;

      if (formData.email) {
        navigate.push(`/verify-email/${encodeURIComponent(formData.email)}`);
      }
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError =
        (Object.values(error.response?.data.errors?.[0] || {}) as any) ||
        'Gagal membuat pengumuman';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError || 'Gagal masuk',
      });
    }
  }, [mutation.status]);

  return mutation;
};

const formDataVerifySchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email harus diisi' })
    .email({ message: 'Email tidak valid' }),
  otp: z.string().min(1, { message: 'OTP harus diisi' }),
});

type FormDataVerify = z.infer<typeof formDataVerifySchema>;

export const useVerifyEmail = () => {
  const navigate = useRouter();
  const { toast } = useToast();
  const mutation = useMutation<any, Error, FormDataVerify>({
    mutationFn: async (body: FormDataVerify) => {
      const response = await fetcherAuth.post('/verify-email/', body);
      return response.data;
    },
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      const { data } = mutation;

      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        Cookie.set(
          process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'accessToken',
          accessToken,
        );

        toast({
          description: 'Email berhasil diverifikasi',
          variant: 'default',
        });

        navigate.push('/mosque');
      } else {
        throw new Error('Token tidak ditemukan. Silakan coba lagi.');
      }
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError =
        (Object.values(error.response?.data.errors?.[0] || {}) as any) ||
        'Gagal membuat pengumuman';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError || 'Gagal masuk',
      });
    }
  }, [mutation.status]);

  return mutation;
};

export const useResendOtp = () => {
  const { toast } = useToast();
  const mutation = useMutation<any, Error, any>({
    mutationFn: async (body: any) => {
      const response = await fetcherAuth.post('/resend-email-otp/', body);
      return response.data;
    },
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      const { data } = mutation;

      toast({
        title: 'Berhasil',
        description: 'OTP berhasil dikirimkan!',
        variant: 'success',
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError =
        (Object.values(error.response?.data.errors?.[0] || {}) as any) ||
        'Gagal Mengirimkan Ulang OTP';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError || 'Gagal Mengirimkan Ulang OTP ',
      });
    }
  }, [mutation.status]);

  return mutation;
};
