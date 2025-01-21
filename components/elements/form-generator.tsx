'use client';
import React, { useCallback, useEffect, useState, ReactNode } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { TimePickerInput } from '@/components/ui/time-picker-input';
import moment from 'moment';

// import { useDropzone } from 'react-dropzone';
import { Check, ChevronsUpDown, FileIcon, Paperclip, X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
// import { useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

export interface DataFormType {
  // name:''
  label?: string | ReactNode;
  type:
    | 'text'
    | 'select'
    | 'file'
    | 'date'
    | 'password'
    | 'textarea'
    | 'email'
    | 'comobox'
    | 'subtitle'
    | 'title'
    | 'timepicker'
    | 'upload'
    | 'fieldArray'
    | 'datepicker'
    | 'switch';
  name: string;
  placeholder?: string;
  helperText?: string;
  loading?: boolean; /// REQUIRED IF TYPE COMOBOX
  queryKey?: string; /// THIS IS FOR TRIGER REFETCH IN SEARCH ONCAHGE // REQUIRED IF TYPE COMOBOX
  grid?: keyof typeof listColSpan;
  defaultValue?: any;
  disabled?: boolean;
  options?: { id: string; label: string }[];
  // fieldArrayOptions?: {
  //   form: UseFieldArrayReturn;
  //   data: DataFormType[];
  // };
}

interface Props {
  form: UseFormReturn<any>;
  data: DataFormType[];
  onSubmit: (params: any) => void;
  id: string;
  grid?: number;
  className?: string;
}
const listColSpan = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12'
};

const FormGenerator = ({ form, data, onSubmit, id, className }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id={id}
        key={id}
        className={`${className} grid  grid-cols-12 gap-4`}
      >
        {data.map((val) => {
          if (val.type == 'title') {
            return (
              <div className={`col-span-${val.grid}`} key={val.name}>
                <h3 className="text-2xl font-semibold">{val.label}</h3>
                <Separator className="w-full" />
              </div>
            );
          }
          if (val.type === 'text' || val.type === 'email') {
            return (
              <div
                key={val.name}
                className={clsx(
                  `${listColSpan[(val.grid as keyof typeof listColSpan) || 12]}`
                )}
              >
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={val.disabled}
                          type={val.type} // Gunakan `val.type` untuk menyesuaikan type input
                          placeholder={val.placeholder}
                          defaultValue={val.defaultValue}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }

          if (val.type == 'comobox') {
            // const [text, setText] = useState('');
            // const [value] = useDebounce(text, 1000);
            const [open, setOpen] = React.useState(false);
            // const queryClient = useQueryClient();

            // useEffect(() => {
            //   const queryKey = ['LIST_EMPLOYEE', { search: text }];
            //   queryClient.getQueryData(queryKey);
            //   // queryClient.prefetchQuery({
            //   // queryKey: ['LIST_EMPLOYEE']
            //   // }); // Menggunakan invalidateQueries untuk memicu ulang query
            // }, [value]);
            return (
              <div
                className={`${
                  listColSpan[(val.grid as keyof typeof listColSpan) || 12]
                }  space-y-2`}
                key={val.name}
              >
                {val.loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className=" h-9 w-full" />
                  </div>
                ) : (
                  <>
                    <p className="text-[14px]">{val.label}</p>

                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {form.watch(val.name)
                            ? val?.options?.find(
                                (framework) =>
                                  framework.id === form.watch(val.name)
                              )?.label
                            : val.placeholder || 'Pilih'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      {/* <PopoverContent className="w-[350px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            // o
                            // onChangeCapture={(e) =>
                            //   setText(e.target.value as string)
                            // }
                          />
                          <CommandList>
                            <Spinner />
                            <CommandEmpty>No framework found.</CommandEmpty>

                            {val?.options?.map((framework) => (
                              <CommandItem
                                key={framework.id}
                                value={framework.id}
                                onSelect={(currentValue: any) => {
                                  form.setValue(
                                    val.name,
                                    currentValue === form.watch(val.name)
                                      ? ''
                                      : currentValue,
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    form.watch(val.name) === framework.id
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {framework.label}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent> */}
                    </Popover>
                  </>
                )}
              </div>
            );
          }

          if (val.type == 'date') {
            return (
              <div
                key={val.name}
                className={clsx(
                  `${listColSpan[(val.grid as keyof typeof listColSpan) || 12]}`
                )}
              >
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <Input
                          // disabled={val}
                          type="date"
                          placeholder={val.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }

          if (val.type == 'switch') {
            return (
              <div
                key={val.name}
                className={clsx(
                  `${listColSpan[(val.grid as keyof typeof listColSpan) || 12]}`
                )}
              >
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem className="space-x-4 flex gap-2 items-center">
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <Switch
                          className="!m-0"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }

          // if (val.type == 'upload') {
          //   const { mutate, status, data } = useUploadFile();
          //   const onDrop = useCallback((acceptedFiles: File[]) => {
          //     mutate(acceptedFiles[0]);
          //   }, []);

          //   useEffect(() => {
          //     if (status == 'success') {
          //       form.setValue(val.name, data.data?.url);
          //     }
          //   }, [status]);
          //   const { getRootProps, getInputProps, isDragActive } = useDropzone({
          //     onDrop,
          //   });
          //   return (
          //     <div
          //       key={val.name}
          //       className={`${
          //         listColSpan[(val.grid as keyof typeof listColSpan) || 12]
          //       } space-y-2`}
          //     >
          //       <p className="text-[14px]">{val.label}</p>
          //       {!form.watch(val.name) ? (
          //         <div
          //           {...getRootProps()}
          //           className="flex w-full cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed border-gray-200 p-6"
          //         >
          //           {status == 'pending' ? (
          //             <Spinner />
          //           ) : (
          //             <>
          //               {' '}
          //               <Input
          //                 type="file"
          //                 className="hidden"
          //                 {...getInputProps()}
          //               />
          //               <FileIcon className="h-12 w-12" />
          //               <span className="text-sm font-medium text-gray-500">
          //                 Drag and drop a file or click to browse
          //               </span>
          //               <span className="text-xs text-gray-500">
          //                 PDF, image, video, or audio
          //               </span>
          //             </>
          //           )}
          //         </div>
          //       ) : (
          //         <div className="flex w-full items-center justify-between rounded-md border px-4 py-2">
          //           <a
          //             target="_blank"
          //             href={form.watch(val.name)}
          //             className="flex items-center space-x-1 text-blue-500"
          //           >
          //             <Paperclip className="h-4 w-4" /> <span>Lihat file</span>
          //           </a>
          //           <X
          //             className="h-4 w-4 cursor-pointer text-red-500"
          //             onClick={() => {
          //               form.setValue(val.name, '');
          //             }}
          //           />
          //         </div>
          //       )}

          //       {/* <FormField
          //         control={form.control}
          //         name={val.name}
          //         render={({ field }) => (
          //           <FormItem>
          //             <FormLabel>{val.label}</FormLabel>
          //             <FormControl>
          //               <Input
          //                 // disabled={val}
          //                 placeholder={val.placeholder}
          //                 {...field}
          //               />
          //             </FormControl>
          //             <FormMessage />
          //           </FormItem>
          //         )}
          //       /> */}
          //     </div>
          //   );
          // }

          if (val.type == 'timepicker') {
            const [date, setDate] = useState<any>(
              moment()
                .set({
                  hours: Number(form.getValues(val.name)?.split(':')[0] | 0),
                  minutes: Number(form.getValues(val.name)?.split(':')[1] | 0)
                })
                .toDate()
            );

            const minuteRef = React.useRef<HTMLInputElement>(null);
            const hourRef = React.useRef<HTMLInputElement>(null);

            useEffect(() => {
              form.setValue(
                val.name,
                !date ? '00:00' : moment(date).format('HH:mm')
              );
            }, [date]);

            return (
              <div
                key={val.name}
                className={clsx(
                  `${listColSpan[(val.grid as keyof typeof listColSpan) || 12]}`
                )}
              >
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <TimePickerInput
                            picker="hours"
                            date={date}
                            ref={hourRef}
                            onRightFocus={() => minuteRef.current?.focus()}
                            setDate={setDate}
                          />
                          <span>:</span>{' '}
                          <TimePickerInput
                            picker="minutes"
                            date={date}
                            ref={minuteRef}
                            onLeftFocus={() => hourRef.current?.focus()}
                            setDate={setDate}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }

          if (val.type == 'textarea') {
            return (
              <div
                key={val.name}
                className={clsx(
                  `${listColSpan[(val.grid as keyof typeof listColSpan) || 12]}`
                )}
              >
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <FormControl>
                        <Textarea
                          // disabled={val}
                          placeholder={val.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }
          if (val.type == 'select') {
            return (
              <div
                key={val.name}
                className={clsx(
                  `${listColSpan[(val.grid as keyof typeof listColSpan) || 12]}`
                )}
              >
                <FormField
                  control={form.control}
                  name={val.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{val.label}</FormLabel>
                      <Select
                        disabled={val.disabled}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder={val.placeholder}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* @ts-ignore  */}
                          {val.options.map((valOpt) => (
                            <SelectItem key={valOpt.id} value={valOpt.id}>
                              {valOpt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }
        })}
      </form>
    </Form>
  );
};

export default FormGenerator;
