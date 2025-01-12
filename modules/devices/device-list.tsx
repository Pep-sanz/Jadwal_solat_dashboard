'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Edit,
  Eye,
  File,
  MoreHorizontal,
  PlusCircle,
  Trash,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BaseTable from '@/components/elements/base-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FaEye, FaTrash } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { useListMosque } from '@/hooks/use-mosque';
import moment from 'moment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams, useRouter } from 'next/navigation';
import { CreateDevice } from './create-device';
import { useDeleteDevice, useListDevices } from '@/hooks/use-devices';
import { UpdateDevice } from './update-device';
import { Badge } from '@/components/ui/badge';
import BaseConfirm from '@/components/elements/base-confirm';

export default function DeviceList() {
  const router = useRouter();
  const params = useParams();
  const [dialog, setDialog] = useState({
    create: false,
    detail: false,
    update: false,
    delete: false,
  });
  const { data, isFetching } = useListDevices({
    mosque: params.mosqueId as string,
  });
  const { mutate, status } = useDeleteDevice({
    mosque: params.mosqueId as string,
  });
  const [device, setDevice] = useState<any>({});

  useEffect(() => {
    if (!isFetching && data?.length === 0) {
      setDialog((prev) => ({ ...prev, create: true }));
    }
  }, [data, isFetching]);

  const collumnDevices = [
    {
      accessorKey: 'id',
      header: 'No.',
      cell: ({ row }: any) => row.index + 1,
    },
    {
      accessorKey: 'name',
      header: 'Nama',
    },
    {
      accessorKey: 'device_token',
      header: 'Token',
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.is_active ? 'success' : 'destructive'}>
          {row.original.is_active ? 'Aktif' : 'Tidak Aktif'}
        </Badge>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Tanggal Pembuatan',
      cell: ({ row }: any) => (
        <p>
          {moment(row.original.created_at).locale('id').format('DD/MM/YYYY')}
        </p>
      ),
    },
    {
      accessorKey: 'id',
      header: 'Aksi',
      cell: ({ row }: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 !m-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setDevice(row.original);
                setDialog((prev) => ({ ...prev, detail: true }));
              }}
            >
              <Eye className="mr-2 h-4 w-4" /> Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDevice(row.original);
                setDialog((prev) => ({ ...prev, update: true }));
              }}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDevice(row.original);
                setDialog((prev) => ({ ...prev, delete: true }));
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="space-y-2">
          <CardTitle>Daftar Perangkat</CardTitle>
          <CardDescription>Daftar Perangkat Masjid</CardDescription>
        </div>
        <Button
          onClick={() => setDialog((prev) => ({ ...prev, create: true }))}
        >
          <PlusCircle className=" h-4 w-4" />
          <p>Tambah Perangkat</p>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="whitespace-nowrap">
          <BaseTable
            columns={collumnDevices}
            data={data || []}
            loading={isFetching}
          />
        </ScrollArea>
      </CardContent>
      <BaseConfirm
        isOpen={dialog.delete}
        onOpenChange={() => {
          setDialog((prev) => ({ ...prev, delete: false }));
        }}
        onConfirm={() => mutate(device.id as string)}
        status={status}
        textBtnConfirm="Hapus"
        title="Hapus Perangkat"
        variant="destructive"
        description={`Apakah anda yakin ingin menghapus perangkat ini?`}
      />
      <UpdateDevice
        isOpen={dialog.update}
        onClose={() => {
          setDialog((p) => ({ ...p, update: false }));
        }}
        device={device}
      />
      {dialog.create && (
        <CreateDevice
          isOpen={dialog.create}
          onClose={() => {
            setDialog((p) => ({ ...p, create: false }));
          }}
        />
      )}
    </Card>
  );
}
