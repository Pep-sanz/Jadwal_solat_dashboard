'use client';

import { VercelLogo } from '@/components/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Home,
  LineChart,
  List,
  Package,
  Settings,
  ShoppingCart,
  Text,
  Users2
} from 'lucide-react';
import Link from 'next/link';
import { NavItem } from './nav-item';
import { PiMosqueBold } from 'react-icons/pi';
import { TbDeviceDesktop } from 'react-icons/tb';
import { useParams } from 'next/navigation';

export function AppSidebar() {
  const { mosqueId } = useParams();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col space-y-3 items-center gap-4 px-2 sm:py-5">
        <Link
          href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        <NavItem href={`/dashboard/${mosqueId}/devices`} label="Perangkat">
          <TbDeviceDesktop className="h-5 w-5" />
        </NavItem>

        <NavItem href={`/dashboard/${mosqueId}/slider`} label="Slider">
          <List className="h-5 w-5" />
        </NavItem>

        <NavItem
          href={`/dashboard/${mosqueId}/text-marquee`}
          label="Text Marquee"
        >
          <Text className="h-5 w-5" />
        </NavItem>

        {/* <NavItem href="/customers" label="Customers">
          <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="#" label="Analytics">
          <LineChart className="h-5 w-5" />
        </NavItem> */}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
