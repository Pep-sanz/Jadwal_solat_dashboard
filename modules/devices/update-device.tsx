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
import { useUpdateDevice } from '@/hooks/use-devices';
import { useMosqueById } from '@/hooks/use-mosque';
import { DeviceSchema } from '@/types/devices.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  device: any | null;
}

export function UpdateDevice(props: Props) {
  const { mosqueId } = useParams();
  const { mutate, status } = useUpdateDevice(props?.device?.id as string);
  const { data: dataMosque } = useMosqueById(mosqueId as string);

  const form = useForm({
    resolver: zodResolver(DeviceSchema),
  });

  useEffect(() => {
    form.reset({
      name: props.device?.name || '',
      device_token: props.device?.device_token || '',
      mosque: dataMosque?.name || '',
      is_active: props.device?.is_active || '',
    });
  }, [props.device, form, dataMosque]);

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
    }
  }, [status]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Perangkat</DialogTitle>
          <DialogDescription>
            Lakukan perubahan pada Device. Klik simpan ketika sudah selesai.
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
              placeholder: 'Masukan Nama Perangkat',
              label: 'Nama Perangkat',
            },
            {
              name: 'device_token',
              type: 'text',
              placeholder: 'Masukan token perangkat',
              label: 'Token Perangkat',
            },
            {
              name: 'mosque',
              type: 'text',
              disabled: true,
              placeholder: 'Pilih Masjid',
              label: 'Masjid',
            },
            {
              name: 'is_active',
              type: 'switch',
              label: 'Status Perangkat',
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
