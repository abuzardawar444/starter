import { type Metadata } from "next";
import { siteConfig } from "@/config/site";

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  url = siteConfig.url,
  icons = "/favicon.ico",
  noIndex = false,
  keywords = siteConfig.keywords,
  author = siteConfig.author,
  twitterHandle = siteConfig.twitterHandle,
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  icons?: string;
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
  twitterHandle?: string;
} = {}): Metadata {
  return {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || siteConfig.ogImage],
      creator: twitterHandle,
    },
    icons,
    metadataBase: new URL(url),
    manifest: `${url}/site.webmanifest`,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
