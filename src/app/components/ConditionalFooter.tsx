'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const noFooterPaths = [
    '/login',
    '/workpage',
    '/profile',
    '/payments',
    '/admin/create-user',
    '/admin/withdrawals'
  ];

  const showFooter = !noFooterPaths.some(path => pathname.startsWith(path));

  return showFooter ? <Footer /> : null;
}
