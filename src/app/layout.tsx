import '@/styles/globals.css';

import { Inter } from 'next/font/google';

import MainFooter from '@/components/Footer';
import { QueryProvider } from '@/providers/query';
import type { ChildrenProps } from '@/types';

export const metadata = {
  description:
    'AI Calda is a food image calorie calculator that uses machine learning to estimate the calorie content of food images.',
  keywords:
    'AI, food image calorie calculator, food image calorie estimator, food image calorie counter, food image calorie tracker, food image calorie detector',
  title: 'AI Calda Project',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export default async function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-full flex flex-col justify-between`}
      >
        <section className="flex-1">
          <QueryProvider>{children}</QueryProvider>
        </section>
        <MainFooter />
      </body>
    </html>
  );
}
