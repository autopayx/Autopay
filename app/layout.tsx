import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/query-provider";
import { WalletProvider } from "@/components/providers/wallet-provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AutoPayX — Recurring USDC Subscriptions on Stellar",
    template: "%s · AutoPayX",
  },
  description:
    "AutoPayX lets merchants collect recurring USDC subscription payments on Stellar and lets customers approve once, with limits they control, pause or cancel anytime.",
  keywords: [
    "AutoPayX",
    "Stellar",
    "USDC",
    "recurring payments",
    "subscription billing",
    "Soroban",
    "crypto subscriptions",
  ],
  applicationName: "AutoPayX",
  authors: [{ name: "AutoPayX" }],
  icons: {
    icon: "/images/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "AutoPayX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoPayX — Recurring USDC Subscriptions on Stellar",
    description:
      "Collect recurring USDC subscription payments on Stellar. Customers approve once, with limits they control.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <WalletProvider>{children}</WalletProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
