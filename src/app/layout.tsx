import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jashwanth Peddisetty",
  description: "Builder. Shipping products that people actually use. Software developer working on AI, blockchain, and full-stack products.",
  openGraph: {
    title: "Jashwanth Peddisetty",
    description: "Builder. Shipping products that people actually use.",
    url: "https://jashwanth.fun",
    siteName: "jashwanth.fun",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jashwanth Peddisetty",
    description: "Builder. Shipping products that people actually use.",
    creator: "@jashwanth0712",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
