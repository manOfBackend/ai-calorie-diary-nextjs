import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import '@/styles/globals.css';
import { auth } from '@/auth';
import { MainNav } from '@/components/Navigation/MainNav';
import MainFooter from '@/components/Footer';
import { QueryProvider } from '@/providers/query';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: 'AI Calda',
    template: '%s | AI Calda',
  },
  description: 'Track your calories with AI assistance',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="relative min-h-screen flex flex-col">
            {session && <MainNav />}
            <main className="flex-1">
              <QueryProvider>{children}</QueryProvider>
            </main>
            <MainFooter />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
