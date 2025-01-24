// import { useToast } from '@/components/ui/use-toast';
import { fetcher } from '@/lib/fetcher';
import { BaseResponseListDto } from '@/types';

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as z from 'zod';
import { useToast } from './use-toast';

export const useUploadFile = () => {
  const { toast } = useToast();

  const mutation = useMutation<any, Error, any>({
    mutationFn: async (acceptedFile: File) => {
      const fileBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(acceptedFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      const payload = {
        name: acceptedFile.name,
        file_base64: fileBase64,
        description: 'File upload via Base64'
      };

      const result = await fetcher.post('/common/file', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return result.data;
    }
  });

  useEffect(() => {
    const status = mutation.status;
    if (status === 'success') {
      toast({
        title: 'Sukses',
        variant: 'success',
        description: 'Sukses upload'
      });
    }

    if (status === 'error') {
      const error = mutation.error as AxiosError<any>;
      const messageError = Object.values(
        error.response?.data.errors?.[0] || {}
      ) as any;
      toast({
        title: 'Upload Error',
        variant: 'destructive',
        description: messageError || 'Internal Server Error'
      });
    }
  }, [mutation.status]);

  return mutation;
};
