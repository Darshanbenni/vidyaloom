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
  title: "Vidyaloom — Smarter Schools, Brighter Futures",
  description:
    "End-to-end technology, training, and transformation solutions for schools and colleges. Modern School ERP, Admissions CRM, and STEM / AI Curriculum.",
  keywords: [
    "Vidyaloom",
    "vidyaloom.com",
    "Vidyaloom school solutions",
    "School ERP",
    "Admissions CRM",
    "School management software",
    "AI and robotics school curriculum",
    "Smart school dashboard",
    "Education technology India",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vidyaloom.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Vidyaloom — Smarter Schools, Brighter Futures",
    description:
      "End-to-end technology, training, and transformation solutions for schools and colleges. Modern School ERP, Admissions CRM, and STEM / AI Curriculum.",
    url: "/",
    siteName: "Vidyaloom",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/brand/logo.webp",
        width: 1200,
        height: 630,
        alt: "Vidyaloom Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidyaloom — Smarter Schools, Brighter Futures",
    description:
      "End-to-end technology, training, and transformation solutions for schools and colleges.",
    images: ["/brand/logo.webp"],
  },
  icons: {
    icon: "/brand/icon.webp",
    apple: "/brand/icon.webp",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://vidyaloom.com/#website",
      url: "https://vidyaloom.com",
      name: "Vidyaloom",
      description: "End-to-end technology, training, and transformation solutions for schools and colleges.",
      publisher: {
        "@id": "https://vidyaloom.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://vidyaloom.com/#organization",
      name: "Vidyaloom",
      url: "https://vidyaloom.com",
      logo: "https://vidyaloom.com/brand/logo.webp",
      email: "contact@vidyaloom.com",
      description: "End-to-end technology, training, and transformation solutions for schools and colleges.",
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
