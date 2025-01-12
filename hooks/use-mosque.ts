import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as z from 'zod';
import { fetcher } from '@/lib/fetcher';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useToast } from './use-toast';
import { MosqueSchema } from '@/types/mosque';
type FormData = z.infer<typeof MosqueSchema>;

export const useCreateMosque = () => {
  const querClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation<any, Error, FormData>({
    mutationFn: async (body: FormData) => {
      const response = await fetcher.post('/mosques/', body);
      return response.data;
    },
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ['LIST_MOSQUE'] });
    },
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      toast({
        title: 'Success',
        description: 'Berhasil membuat masjid',
        variant: 'success',
        duration: 3000,
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError =
        (Object.values(error.response?.data.errors?.[0] || {}) as any) ||
        'Gagal membuat masjid';
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: messageError || 'Gagal membuat masjid',
      });
    }
  }, [mutation.status]);

  return mutation;
};

export const useListMosque = (params: { page?: number; per_page?: number }) => {
  const query = useQuery<any>({
    queryKey: ['LIST_MOSQUE'],
    queryFn: async () => {
      const result = await fetcher.get('/mosques/', { params });
      return result.data;
    },
  });

  return { ...query };
};

export const useMosqueById = (id: string) => {
  const query = useQuery<any>({
    queryKey: ['MOSQUE_BY_ID'],
    queryFn: async () => {
      const result = await fetcher.get(`/mosques/${id}/`);
      return result.data;
    },
  });

  return { ...query };
};

export const useUpdateMosque = (mosqueId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation<any, Error, FormData>({
    mutationFn: async (body: FormData) => {
      const result = await fetcher.put(`/mosques/${mosqueId}/`, body);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_MOSQUE'] });

      toast({
        title: 'Sukses',
        description: 'Sukses update masjid',
        variant: 'success',
      });
    },
  });

  useEffect(() => {
    const status = mutation.status;

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError = Object.values(
        error.response?.data.errors?.[0] || {},
      ) as any;
    }
  }, [mutation.status]);

  return mutation;
};

export const useDeleteMosque = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      const result = await fetcher.delete(`/mosques/${id}/`);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['LIST_MOSQUE'] }); // Menggunakan invalidateQueries untuk memicu ulang query
    },
  });

  useEffect(() => {
    const status = mutation.status;
    if (status == 'success') {
      toast({
        description: `berhasil menghapus masjid`,
        title: 'Sukses',
        variant: 'success',
      });
    }

    if (status == 'error') {
      const error = mutation.error as AxiosError<any>;

      const messageError = Object.values(
        error.response?.data.errors?.[0] || {},
      ) as any;

      toast({
        description: messageError?.[0]?.[0] || 'Internal Server Error',
        title: 'Gagal',
        variant: 'destructive',
      });
    }
  }, [mutation.status]);

  return mutation;
};
