import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { LayoutShell } from '@/components/layout-shell';
import './globals.css';

const bangla = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-bangla',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'অটো আলটিমেট - প্রিমিয়াম কার রেন্টাল',
  description:
    'সান ফ্রান্সিসকোতে প্রিমিয়াম গাড়ি ভাড়া করুন। আপনার প্রয়োজন অনুযায়ী সেরা গাড়ি বেছে নিন।',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className={`${bangla.variable} font-sans antialiased bg-gray-50`}>
        <LayoutShell>{children}</LayoutShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
