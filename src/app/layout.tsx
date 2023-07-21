import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Threader",
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
      </body>
    </html>
  );
}
