import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import * as z from 'zod';
import { fetcher } from '@/lib/fetcher';
import { AxiosError } from 'axios';
import * as Cookie from 'cookies-js';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signinSchema } from '@/modules/auth/signin-form';
import { useToast } from './use-toast';
type FormData = z.infer<typeof signinSchema>;

interface ResponseSigninDto {
  result: {
    token: string;
  };
}

export const useSignIn = () => {
  const navigate = useRouter();
  const { toast } = useToast();
  const mutation = useMutation<ResponseSigninDto, Error, FormData>({
    mutationFn: async (body: FormData) => {
      const response = await fetcher.post('/login', body);
      return response.data;
    },
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      const { data } = mutation;

      toast({
        description: 'Success',
        variant: 'default',
      });

      Cookie.set(process.env.COOKIE_NAME || '', data.result.token);
      navigate.push('/dashboard');
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
