import type { Metadata, Viewport } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  display: "swap",
});

import { ClientProviders } from "@/components/providers/ClientProviders";

export const metadata: Metadata = {
  title: "Vidyaloom — Smarter Schools, Brighter Futures.",
  description:
    "End-to-end technology, training, and transformation solutions for schools and colleges.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vidyaloom.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vidyaloom — Smarter Schools, Brighter Futures.",
    description:
      "End-to-end technology, training, and transformation solutions for schools and colleges.",
    url: "/",
    siteName: "Vidyaloom",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidyaloom — Smarter Schools, Brighter Futures.",
    description:
      "End-to-end technology, training, and transformation solutions for schools and colleges.",
  },
  icons: {
    icon: "/brand/icon.webp",
    apple: "/brand/icon.webp",
  },
};

export const viewport: Viewport = {
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
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} h-full antialiased overflow-x-clip max-w-full`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-[#50627E] selection:bg-[#0098FF]/20 selection:text-[#081F44] overflow-x-clip max-w-full">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#081F44] focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
