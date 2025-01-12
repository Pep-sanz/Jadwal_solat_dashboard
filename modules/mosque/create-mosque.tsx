'use client';

import FormGenerator from '@/components/elements/form-generator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PlusCircle } from 'lucide-react';
import { MosqueSchema } from '@/types/mosque';
import { useCreateMosque } from '@/hooks/use-mosque';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// const MosqueSchema = z.object({
//   name: z.string().min(1, { message: 'Field ini harus diisi' }),
//   address: z.string().min(1, { message: 'Field ini harus diisi' }),
//   latitude: z.string().min(1, { message: 'Field ini harus diisi' }),
//   longitude: z.string().min(1, { message: 'Field ini harus diisi' }),
// });

export function CreateMosque(props: Props) {
  const { mutate, status } = useCreateMosque();
  const form = useForm({
    resolver: zodResolver(MosqueSchema),
  });

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
    }
  }, [status]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Masjid</DialogTitle>
          <DialogDescription>
            Tambahkan masjid terlebih dahulu sebelum mengakses fitur lain
          </DialogDescription>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="form"
          onSubmit={(val: any) => mutate(val)}
          data={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Masukan Nama Masjid',
              label: 'Nama Masjid',
            },
            {
              name: 'address',
              type: 'text',
              placeholder: 'Masukan Alamat',
              label: 'Alamat',
            },
            {
              name: 'latitude',
              grid: 6,
              type: 'text',
              placeholder: '-6.1234567',
              label: 'Latitude',
            },
            {
              name: 'longitude',
              grid: 6,
              type: 'text',
              placeholder: '106.1234567',
              label: 'Longitude',
            },
          ]}
        />

        <DialogFooter>
          <Button type="submit" form="form" loading={status == 'pending'}>
            <PlusCircle className="h-3.5 w-3.5" />
            <p>Simpan</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
