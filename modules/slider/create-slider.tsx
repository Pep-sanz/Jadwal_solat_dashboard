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
import { useCreateSlider } from '@/hooks/use-slider';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSlider(props: Props) {
  const params = useParams();
  const { mutate, status } = useCreateSlider({
    mosque: params.mosqueId as string
  });
  const { data: dataMosque } = useMosqueById(params.mosqueId as string);
  const form = useForm({
    // resolver: zodResolver(DeviceSchema)
  });

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
    }
  }, [status]);

  // useEffect(() => {
  //   form.reset({
  //     mosque: dataMosque?.name || '',
  //     // is_active: false
  //   });
  // }, [params.mosqueId, form, dataMosque]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Slider</DialogTitle>
          <DialogDescription>
            Tambahkan semua slider mu dan atur sesuka hati
          </DialogDescription>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="form"
          onSubmit={(val: any) => mutate({ ...val, mosque: params.mosqueId })}
          data={[
            {
              name: 'text',
              type: 'textarea',
              placeholder: 'Masukan Text Slider',
              label: 'Text Slider'
            },
            {
              name: 'image',
              type: 'upload',
              placeholder: 'Masukan Gambar',
              label: 'Gambar Slider'
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
