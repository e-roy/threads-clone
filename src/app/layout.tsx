import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// set debug to true to enable debug mode
const debug = process.env.NODE_ENV === "development" ? false : false;

export const metadata: Metadata = {
  title: "Threads Clone",
  description: "Threads Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
        <Toaster />
        <Analytics debug={debug} />
      </body>
    </html>
  );
}
