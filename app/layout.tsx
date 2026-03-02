import type { Metadata, Viewport } from "next";
import { INVITE_META } from "@/lib/constants";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: INVITE_META.title,
  description: INVITE_META.description,
  openGraph: {
    title: INVITE_META.title,
    description: INVITE_META.description,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased min-h-screen bg-[#FAF5E2] overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}
