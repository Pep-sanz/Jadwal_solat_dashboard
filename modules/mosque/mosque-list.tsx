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
import { CreateMosque } from './create-mosque';
import moment from 'moment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { useDeleteMosque, useListMosque } from '@/hooks/use-mosque';
import BaseConfirm from '@/components/elements/base-confirm';
import { UpdateMosque } from './update-mosque';
import { DetailMosque } from './detail-mosque';

export default function MosqueList() {
  const router = useRouter();
  const [dialog, setDialog] = useState({
    create: false,
    detail: false,
    update: false,
    delete: false,
  });
  const [mosque, setMosque] = useState<any>({});
  const { data, isFetching } = useListMosque({});
  const { mutate, status } = useDeleteMosque();
  console.log(data);

  useEffect(() => {
    if (!isFetching && data?.length === 0) {
      setDialog((prev) => ({ ...prev, create: true }));
    }
  }, [data, isFetching]);

  console.log(mosque);

  return (
    <div className="space-y-6 py-6 w-full min-h-screen px-12 flex flex-col">
      <div className="w-full space-y-2 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold">List Masjid</h1>
        <p>Klik masjid untuk melanjutkan ke halaman pengaturan</p>
      </div>
      <ScrollArea className="h-[550px] p-6 w-full rounded-md border">
        <div className="grid grid-cols-3 gap-4">
          {data?.map((mosque: any, index: number) => (
            <Card
              onClick={() => {
                router.push(`/dashboard/${mosque.id}/devices`);
              }}
              key={index}
              className="min-w-[250px] cursor-pointer relative hover:bg-slate-500/40"
            >
              <CardHeader>
                <p className="text-center font-bold text-xl">{mosque.name}</p>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="/placeholder-mosque.png" />
                  <AvatarFallback>{mosque.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </CardContent>
              <CardFooter className="justify-center font-semibold text-lg">
                {mosque.address}
              </CardFooter>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="absolute right-6 bottom-3"
                >
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0 rounded-full flex items-center"
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4 !m-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setDialog((prev) => ({ ...prev, detail: true }));
                      setMosque(mosque);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Detail
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setDialog((prev) => ({ ...prev, update: true }));
                      setMosque(mosque);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Update
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setDialog((prev) => ({ ...prev, delete: true }));
                      setMosque(mosque);
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Card>
          ))}
          <Card
            onClick={() => setDialog({ ...dialog, create: true })}
            className="min-h-[300px] border-dashed border-2 border-black flex flex-col items-center justify-center cursor-pointer"
          >
            <CardHeader>
              <p className="text-center font-bold text-xl">Add</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <PlusCircle className="h-32 w-32 text-gray-400" />
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
      <BaseConfirm
        isOpen={dialog.delete}
        onOpenChange={() => {
          setDialog((prev) => ({ ...prev, delete: false }));
        }}
        onConfirm={() => mutate(mosque.id as string)}
        status={status}
        textBtnConfirm="Hapus"
        title="Hapus Masjid"
        variant="destructive"
        description={`Apakah anda yakin ingin menghapus masjid ini?`}
      />
      <UpdateMosque
        isOpen={dialog.update}
        onClose={() => setDialog((prev) => ({ ...prev, update: false }))}
        mosque={mosque}
      />
      {dialog.create && (
        <CreateMosque
          isOpen={dialog.create}
          onClose={() => {
            setDialog((p) => ({ ...p, create: false }));
          }}
        />
      )}
      {dialog.detail && (
        <DetailMosque
          isOpen={dialog.detail}
          onClose={() => {
            setDialog((p) => ({ ...p, detail: false }));
          }}
          mosque={mosque}
        />
      )}
    </div>
  );
}
