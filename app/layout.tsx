import type { Metadata, Viewport } from "next";
import { Great_Vibes, Cinzel } from "next/font/google";
import { WEDDING_META } from "@/lib/wedding";
import "./globals.css";

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const sansFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF5E2",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: WEDDING_META.title,
  description: WEDDING_META.description,
  icons: { icon: "/logo.png" },
  openGraph: {
    title: WEDDING_META.title,
    description: WEDDING_META.description,
    locale: "pt_BR",
    type: "website",
    images: ["/casal.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${scriptFont.variable} ${sansFont.variable} font-sans antialiased min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
