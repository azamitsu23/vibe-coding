import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/ui/StructuredData";
import {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
} from "@/lib/utils/structuredData";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "葬儀専門のお花屋さん",
    template: "%s | 葬儀専門のお花屋さん",
  },
  description: "葬儀・法要向けのお花を真心込めてお届けします。迅速な対応と高品質なサービスでご遺族をサポートいたします。",
  keywords: ["葬儀", "供花", "祭壇花", "枕花", "法要", "お花"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "葬儀専門のお花屋さん",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <head>
        <StructuredData data={generateLocalBusinessSchema()} />
        <StructuredData data={generateOrganizationSchema()} />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
