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
import { useCreateTextMarquees } from '@/hooks/use-text-marquees';
import { TextMarqueesSchema } from '@/types/text-marquees.type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTextMarquee(props: Props) {
  const params = useParams();
  const { mutate, status } = useCreateTextMarquees({
    mosque: params.mosqueId as string
  });
  const { data: dataMosque } = useMosqueById(params.mosqueId as string);
  const form = useForm({
    resolver: zodResolver(TextMarqueesSchema)
  });

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
    }
  }, [status]);

  // useEffect(() => {
  //   form.reset({
  //     mosque: dataMosque?.id || ''
  //   });
  // }, [params.mosqueId, form, dataMosque]);

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
          id="formCreateTextMarquees"
          onSubmit={(val: any) => {
            console.log({ val });
            mutate({ ...val, mosque: dataMosque?.id });
          }}
          data={[
            {
              name: 'text',
              type: 'text',
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
          <Button
            type="submit"
            form="formCreateTextMarquees"
            loading={status == 'pending'}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <p>Simpan</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
