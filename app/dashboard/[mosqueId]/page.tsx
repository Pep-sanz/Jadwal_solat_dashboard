'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DeviceList from '@/modules/devices/device-list';

export default function Page() {
  const tabItems = [
    {
      value: 'devices',
      title: 'Perangkat',
      description: 'List Perangkat',
      element: <DeviceList />,
    },
    {
      value: 'background',
      title: 'Background',
      description: 'Background',
      element: <>password</>,
    },
  ];
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue={tabItems[0].value} className="">
          <TabsList className="w-fit">
            {tabItems.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator className="my-4" />
          {tabItems.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.element}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
