import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resolution Bundler - Temptation Bundling for New Year Goals",
  description: "Build lasting habits by pairing what you need to do with what you want to do. Based on Atomic Habits by James Clear.",
  keywords: ["new year resolutions", "atomic habits", "temptation bundling", "habit tracking", "goal setting"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Resolution Bundler - Temptation Bundling for New Year Goals",
    description: "Build lasting habits by pairing what you need to do with what you want to do.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
