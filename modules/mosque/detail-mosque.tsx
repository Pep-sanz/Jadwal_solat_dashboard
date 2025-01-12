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
import { PlusCircle } from 'lucide-react';
import { MosqueSchema } from '@/types/mosque';
import { useCreateMosque, useMosqueById } from '@/hooks/use-mosque';
import BaseTable from '@/components/elements/base-table';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mosque: any;
}

export function DetailMosque(props: Props) {
  const dataDetail = [
    {
      key: 'Name',
      value: props.mosque.name,
    },
    {
      key: 'Alamat',
      value: props.mosque.address,
    },
    {
      key: 'Lokasi',
      value: null,
    },
  ];

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Masjid</DialogTitle>
          <DialogDescription>
            Tambahkan masjid terlebih dahulu sebelum mengakses fitur lain
          </DialogDescription>
        </DialogHeader>
        <div className="border px-3 text-sm">
          {dataDetail.map((item, index) => (
            <div key={index} className="flex border-b">
              <div className="w-[50%] py-2 border-r">
                <p className={` font-semibold`}>{item.key}</p>
              </div>
              <div
                className={`${
                  item.key === 'Total' ? 'font-semibold' : ''
                } px-2 flex items-center`}
              >
                <p>{item.value}</p>
                {item.key === 'Lokasi' && (
                  <div className="mt-4 overflow-hidden rounded-md border">
                    <iframe
                      src={`https://www.google.com/maps?q=${props.mosque.latitude},${props.mosque.longitude}&hl=es;z=14&output=embed`}
                      // className="h-[300px] w-[500px]"
                      loading="lazy"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
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
