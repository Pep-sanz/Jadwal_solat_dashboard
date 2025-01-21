'use client';

import FormGenerator from '@/components/elements/form-generator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle } from 'lucide-react';
import { useCreateDevice } from '@/hooks/use-devices';
import { DeviceSchema } from '@/types/devices.type';
import { useParams } from 'next/navigation';
import { useMosqueById } from '@/hooks/use-mosque';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSlider(props: Props) {
  const params = useParams();
  const { mutate, status } = useCreateDevice({
    mosque: params.mosqueId as string
  });
  const { data: dataMosque } = useMosqueById(params.mosqueId as string);
  const form = useForm({
    resolver: zodResolver(DeviceSchema)
  });

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
    }
  }, [status]);

  useEffect(() => {
    form.reset({
      mosque: dataMosque?.name || '',
      is_active: false
    });
  }, [params.mosqueId, form, dataMosque]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Perangkat</DialogTitle>
          <DialogDescription>
            Tambahkan semua perangkat mu dan atur sesuka hati
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
              placeholder: 'Masukan Nama Perangkat',
              label: 'Nama Perangkat'
            },
            {
              name: 'device_token',
              type: 'text',
              placeholder: 'Masukan token perangkat',
              label: 'Token Perangkat'
            },
            {
              name: 'mosque',
              type: 'text',
              disabled: true,
              placeholder: 'Pilih Masjid',
              label: 'Masjid'
            },
            {
              name: 'is_active',
              type: 'switch',
              label: 'Status Perangkat'
            }
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
