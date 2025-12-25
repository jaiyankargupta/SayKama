import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SayKama - Natural Skincare & Haircare",
  description:
    "Ethically-sourced natural skincare and haircare products for everyday wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollToTop />
        <Header />
        <main
          style={{
            minHeight: "calc(100vh - 72px)",
            background: "var(--background)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
