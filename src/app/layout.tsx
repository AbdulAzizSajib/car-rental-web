import type { Metadata } from 'next';
import { Epilogue, Hind_Siliguri, Bebas_Neue } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { LayoutShell } from '@/src/components/layout-shell';
import './globals.css';

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
});

const bangla = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-bangla',
  display: 'swap',
});


const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

  


export const metadata: Metadata = {
  title: 'Auto Ultimate - Premium Car Rental',
  description:
    'Rent premium cars in San Francisco. Choose the best vehicle for your needs.',
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
    <html lang="en" className="scroll-smooth">
      <body className={`${epilogue.variable} ${bangla.variable} ${bebasNeue.variable} font-sans antialiased bg-gray-50`}>
        <LayoutShell>{children}</LayoutShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
