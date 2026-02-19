import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Compliance Platform - EU AI Act & Multi-Jurisdictional Regulation",
  description:
    "Automated AI regulation compliance platform. Risk classification, Annex IV documentation generation, conformity assessments, and multi-jurisdictional regulation tracking for EU AI Act, Colorado AI Act, and emerging US state laws.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
