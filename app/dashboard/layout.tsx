'use client';

import React from 'react';
import Layouts from '@/components/layouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Layouts>{children}</Layouts>;
}
