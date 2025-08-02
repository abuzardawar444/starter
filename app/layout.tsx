import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyApp",
  description: "A Next.js application with a modern UI",
  icons: "/favicon.ico",
  keywords: ["Next.js", "React", "UI"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myapp.com",
    title: "MyApp",
    description: "A Next.js application with a modern UI",
    siteName: "MyApp",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyApp Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
    // example redirect config; adapt per project
    // afterSignOutUrl="/"
    >
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="antialiased">
          <ClientProvider>
            <main className="container">{children}</main>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
