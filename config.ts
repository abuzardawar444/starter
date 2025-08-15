import { SubscriptionPlan } from "./types";

const config = {
  // REQUIRED
  appName: "starter",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "The NextJS boilerplate with all you need to build your SaaS, AI tool, or any other web app.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "starter.com",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
};

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "For Beginners",
    benefits: ["Basic Support", "Access to all features"],
    limitations: ["No custom domain", "Limited API calls"],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: "Pro",
    description: "For Professionals",
    benefits: ["Priority Support", "Custom Domain", "Unlimited API calls"],
    limitations: ["Limited to 1000 users"],
    prices: {
      monthly: 200,
      yearly: 600,
    },
    stripeIds: {
      monthly: process.env.STRIPE_MONTHLY_PRICE_ID!,
      yearly: process.env.STRIPE_MONTHLY_PRICE_ID!,
    },
  },
  {
    title: "Business",
    description: "For Businesses",
    benefits: ["24/7 Support", "Custom Integrations", "Unlimited Users"],
    limitations: ["No limitations"],
    prices: {
      monthly: 400,
      yearly: 5000,
    },
    stripeIds: {
      monthly: process.env.STRIPE_MONTHLY_PRICE_ID!,
      yearly: process.env.STRIPE_MONTHLY_PRICE_ID!,
    },
  },
];

export default config;
