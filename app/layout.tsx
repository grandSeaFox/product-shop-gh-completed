import { Inter, IBM_Plex_Serif } from 'next/font/google';
import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import { ProductsProvider } from '@/lib/providers/ProductsProvider';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/providers/CartProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable} flex flex-col min-h-screen`}>
          <CartProvider>
            <Header />
            <ProductsProvider>
              <main className="flex-grow pt-14">
                {children}
              </main>
            </ProductsProvider>
          </CartProvider>
          <Footer />
          <Toaster />
      </body>
    </html>
  );
}

export async function generateMetadata() {
  return {
    title: 'Product Page GH task',
    description:
      'This is the GH task made by GR',
    icons: {
      icon: ['/icons/fox-light.png'],
    },
  };
}
