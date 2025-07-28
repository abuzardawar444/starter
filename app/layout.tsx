import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./providers";
import Navbar from "@/components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <main className="container">{children}</main>
        </body>
      </ClientProvider>
    </html>
  );
}
