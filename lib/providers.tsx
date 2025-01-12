'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import moment from 'moment';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    moment.locale('id');
  }, []);

  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          // useErrorBoundary: false,
          refetchOnWindowFocus: false,
          retry(failureCount, error: any) {
            if (error.status === 404) return false;
            if (error.status === 403) return false;
            if (failureCount < 2) return true;
            return false;
          },
        },
      },
    }),
  );
  return (
    <QueryClientProvider client={client}>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryClientProvider>
  );
}
