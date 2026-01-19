import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Udebrock Family Finishes | Premium Wood Staining & Protection",
  description:
    "Northern Michigan's trusted experts in wood staining, deck restoration, and exterior protection. Family-owned, using premium Sherwin-Williams products.",
  keywords: [
    "wood staining",
    "deck restoration",
    "exterior painting",
    "Houghton Lake Michigan",
    "Higgins Lake Michigan",
    "Roscommon Michigan",
    "Sherwin-Williams",
    "fence staining",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body bg-cream text-walnut-800 antialiased" suppressHydrationWarning>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
