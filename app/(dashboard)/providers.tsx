'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
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
