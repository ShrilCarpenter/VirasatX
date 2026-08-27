import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SoundscapeManager from '@/components/common/SoundscapeManager';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-serif-heading',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-body',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Virasat AI — Digital Heritage Museum of India',
  description:
    'Explore India’s art, architecture, manuscripts, and living traditions through an intelligent digital heritage museum. Smart India Hackathon 2026 Innovation Prototype.',
  keywords: [
    'Virasat AI',
    'Digital Heritage Museum',
    'Indian Heritage',
    'Indian Art',
    'Archaeological Survey of India',
    'Chola Bronzes',
    'Ancient Manuscripts',
    'Responsible Tourism',
    'AI Heritage Guide',
    'Smart India Hackathon 2026',
  ],
  authors: [{ name: 'Virasat AI — SIH 2026' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF9F4] text-[#1C1917] parchment-texture">
        <SoundscapeManager />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
