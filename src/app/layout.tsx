import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CivicData Space — Explore Open Data',
  description: 'Discover thousands of civic datasets from government agencies, research institutions, and community organizations.',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
