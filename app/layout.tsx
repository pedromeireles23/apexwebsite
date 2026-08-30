import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import SitePreloader from "./components/SitePreloader";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./lib/site";
import "./globals.css";

const legendDisplayFont = Oswald({
  subsets: ["latin"],
  variable: "--font-legend-display",
  display: "swap",
});

const legendBodyFont = Roboto({
  subsets: ["latin"],
  variable: "--font-legend-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  applicationName: "Arquivo de Lendas",
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: [
    "Apex Legends",
    "Lendas de Apex Legends",
    "personagens de Apex Legends",
    "habilidades de Apex Legends",
    "Arquivo de Lendas",
  ],
  authors: [{ name: "Pedro Meireles" }],
  creator: "Pedro Meireles",
  category: "games",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Arquivo de Lendas",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Arquivo de Lendas de Apex Legends",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${legendDisplayFont.variable} ${legendBodyFont.variable}`}>
        <SitePreloader />
        <div className="site-reveal" inert aria-hidden="true">
          {children}
        </div>
      </body>
    </html>
  );
}
