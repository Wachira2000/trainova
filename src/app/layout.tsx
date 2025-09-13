import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import ConditionalFooter from "./components/ConditionalFooter";
import SessionProvider from "./components/SessionProvider";

const inter = Inter({ subsets: ['latin'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trainova",
  description: "Shaping the future of artificial intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        <title>Trainova</title>
        <meta name="description" content="Shaping the future of artificial intelligence" />
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-gray-900 to-gray-800`}>
        <SessionProvider>
          <Analytics/>
          {/* Navbar */}
          <Navbar />
          
          {/* Main content with padding for navbar height */}
          <main className="min-h-screen">
            {children}
          </main>

          <ConditionalFooter />
        </SessionProvider>
      </body>
    </html>
  );
}