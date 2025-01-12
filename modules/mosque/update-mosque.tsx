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
import { useUpdateMosque } from '@/hooks/use-mosque';
import { MosqueSchema } from '@/types/mosque';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mosque: any | null;
}

export function UpdateMosque(props: Props) {
  const { mutate, status } = useUpdateMosque(props?.mosque?.id as string);

  const form = useForm({
    resolver: zodResolver(MosqueSchema),
  });

  useEffect(() => {
    form.reset({
      name: props.mosque?.name || '',
      address: props.mosque?.address || '',
      latitude: props.mosque?.latitude?.toString() || '',
      longitude: props.mosque?.longitude?.toString() || '',
    });
  }, [props.mosque, form]);

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
    }
  }, [status]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Masjid</DialogTitle>
          <DialogDescription>
            Lakukan perubahan pada masjid. Klik simpan ketika sudah selesai.
          </DialogDescription>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="form"
          onSubmit={async (val: any) => {
            await mutate(val);
          }}
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
