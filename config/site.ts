import { SiteConfig } from "@/types";

const site_url = process.env.NEXT_PUBLIC_APP_URL!;

export const siteConfig: SiteConfig = {
  name: "FWDLUX",
  description:
    "Get your project off to an explosive start with Mark Project! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui and Stripe to build your next big thing.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://www.google.com",
    github: "https://www.google.com",
  },
  mailSupport: "support@fwdlux.com",
};
