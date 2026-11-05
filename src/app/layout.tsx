import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { profile } from "@/content/profile";
import "./globals.css";

const title = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description: profile.intro,
  keywords: ["Somil Arora", "software developer", "distributed systems", "cloud", "Kubernetes", "IBM", "Toronto"],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  alternates: { canonical: "/" },
  openGraph: { title, description: profile.intro, url: "/", siteName: profile.name, type: "website" },
  twitter: { card: "summary_large_image", title, description: profile.intro },
};

export const viewport: Viewport = { themeColor: "#0a0b0c" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
