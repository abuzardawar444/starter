import { pricingData } from "@/config";
import { UsersSubscriptions } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const getUserPlan = (subscription: UsersSubscriptions) => {
  const userPlan =
    pricingData.find(
      (plan) => plan.stripeIds.monthly === subscription.stripePriceId
    ) ||
    pricingData.find(
      (plan) => plan.stripeIds.yearly === subscription.stripePriceId
    );
  if (!subscription?.stripeCurrentPeriodEnd) return null;
  const isPaid =
    subscription.stripePriceId &&
    subscription?.stripeCurrentPeriodEnd?.getTime() + 86_400_000 < Date.now()
      ? true
      : false;
  const interval = isPaid
    ? userPlan?.stripeIds.monthly === subscription.stripePriceId
      ? "month"
      : userPlan?.stripeIds.yearly === subscription.stripePriceId
        ? "year"
        : null
    : null;
  return { userPlan, isPaid, interval };
};

export function getUserFullName(
  user:
    | {
        firstName?: string | null;
        lastName?: string | null;
      }
    | undefined
    | null
) {
  return `${user?.firstName} ${user?.lastName}`;
}
