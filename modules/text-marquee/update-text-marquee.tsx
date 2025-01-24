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
import { useUpdateDevice } from '@/hooks/use-devices';
import { useMosqueById } from '@/hooks/use-mosque';
import { useUpdateTextMarquees } from '@/hooks/use-text-marquees';
import { DeviceSchema } from '@/types/devices.type';
import { TextMarqueesSchema } from '@/types/text-marquees.type';
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

export function UpdateMarquee(props: Props) {
  const { mosqueId } = useParams();
  const { mutate, status } = useUpdateTextMarquees(props?.device?.id as string);
  const { data: dataMosque } = useMosqueById(mosqueId as string);

  const form = useForm({
    resolver: zodResolver(TextMarqueesSchema)
  });

  useEffect(() => {
    form.reset({
      text: props.device?.text || ''
      // device_token: props.device?.device_token || '',
      // mosque: dataMosque?.name || '',
      // is_active: props.device?.is_active || ''
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
          <DialogTitle>Tambah Text</DialogTitle>
          <DialogDescription>
            Tambahkan semua text mu dan atur sesuka hati
          </DialogDescription>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="form"
          onSubmit={async (val: any) => {
            mutate({ ...val, mosque: dataMosque?.id });
          }}
          data={[
            {
              name: 'text',
              type: 'textarea',
              placeholder: 'Masukan Text',
              label: 'Text'
            }

            // {
            //   name: 'mosque',
            //   type: 'text',
            //   disabled: true,
            //   placeholder: 'Pilih Masjid',
            //   label: 'Masjid'
            // }
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
