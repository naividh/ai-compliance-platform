import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AI Compliance Platform | Enterprise AI Governance',
  description: 'Enterprise-grade AI regulation compliance automation. EU AI Act, Colorado AI Act, and multi-jurisdictional AI governance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-slate-950`}>{children}</body>
    </html>
  );
}
