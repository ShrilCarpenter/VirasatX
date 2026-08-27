import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SoundscapeManager from '@/components/common/SoundscapeManager';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-serif-heading',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-body',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Virasat AI — Digital Heritage Museum of India | Smart India Hackathon 2026',
  description:
    'India’s Heritage, Reimagined. Explore thousands of years of ancient sculptures, illuminated manuscripts, temple architecture, master artisans, and living cultural traditions through an intelligent digital museum.',
  keywords: [
    'Virasat AI',
    'Digital Heritage Museum',
    'Smart India Hackathon 2026',
    'Indian Heritage',
    'Indian Art',
    'Archaeology of India',
    'Chola Bronzes',
    'Ancient Manuscripts',
    'Sustainable Heritage Tourism',
    'AI Heritage Guide',
  ],
  authors: [{ name: 'Virasat AI Team — SIH 2026' }],
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
      className={`${cinzel.variable} ${cormorant.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F0] text-[#1C1A17] parchment-texture">
        <SoundscapeManager />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
