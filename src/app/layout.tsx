'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Trainova",
//   description: "Shaping the future of artificial intelligence",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        <title>Trainova</title>
        <meta name="description" content="Shaping the future of artificial intelligence" />
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-gray-900 to-gray-800`}>
        
      <Analytics/>
        {/* Navbar */}
        <Navbar/>
        
        {/* Main content with padding for navbar height */}
        <main className="min-h-screen">
          {children}
        </main>

        {showFooter && <Footer/>}
      </body>
    </html>
  );
}