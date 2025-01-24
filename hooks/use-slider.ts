import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import * as z from 'zod';
import { fetcher, fetcherAuth } from '@/lib/fetcher';
import { AxiosError } from 'axios';
import * as Cookie from 'cookies-js';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from './use-toast';
import { DeviceSchema } from '@/types/devices.type';
type FormData = z.infer<typeof DeviceSchema>;

interface ResponseAuthDTO {
  refresh: string;
  access: string;
}

export const useCreateSlider = ({ mosque }: { mosque: string }) => {
  const querClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation<any, Error, FormData>({
    mutationFn: async (body: FormData) => {
      const finalyPayload = {
        ...body,
        mosque: mosque
      };
      const response = await fetcher.post(`/customer/sliders/`, finalyPayload);
      return response.data;
    },
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ['LIST_SLIDER'] });
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      toast({
        title: 'Success',
        description: 'Berhasil Menambahkan Slider',
        variant: 'success',
        duration: 3000
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError =
        (Object.values(error.response?.data.errors?.[0] || {}) as any) ||
        'Gagal Menambahkan Perangkat';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError || 'Gagal Menambahkan Perangkat'
      });
    }
  }, [mutation.status]);

  return mutation;
};

export const useListSlider = (params: { mosque?: string }) => {
  const query = useQuery<any>({
    queryKey: ['LIST_SLIDER'],
    queryFn: async () => {
      const result = await fetcher.get('/customer/sliders/', { params });
      return result.data;
    }
  });

  return { ...query };
};

export const useUpdateSlider = (textId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation<any, Error, FormData>({
    mutationFn: async (body: FormData) => {
      const result = await fetcher.put(`/customer/sliders/${textId}/`, body);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_SLIDER'] });

      toast({
        title: 'Sukses',
        description: 'Sukses Update Slider',
        variant: 'success'
      });
    }
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError = Object.values(
        error.response?.data.errors?.[0] || {}
      ) as any;
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError || 'Gagal Update Slider'
      });
    }
  }, [mutation.status]);

  return mutation;
};

export const useDeleteSlider = (params: { mosque: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      const result = await fetcher.delete(`/customer/sliders/${id}/`, {
        params
      });
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_SLIDER'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      toast({
        description: `Berhasil Menghapus Slider`,
        title: 'Sukses',
        variant: 'success'
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError = Object.values(
        error.response?.data.errors?.[0] || {}
      ) as any;

      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError || 'Gagal Menghapus Slider'
      });
    }
  }, [mutation.status]);

  return mutation;
};
