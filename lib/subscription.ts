import { UserSubscriptionPlan } from "@/types";
import { pricingData } from "@/config";
import { stripe } from "@/lib/stripe";
import { getUserPlan } from "./utils";
import { prisma } from "./db";

export const getUserSubscriptionPlan = async (
  userId: string
): Promise<UserSubscriptionPlan> => {
  if (!userId) throw new Error("User ID is required");
  const createdAtUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      createdAt: true,
    },
  });
  const userSubscription = await prisma.usersSubscriptions.findFirst({
    where: {
      id: userId,
      isCanceled: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const createdAt = createdAtUser?.createdAt ?? new Date();
  const user = userSubscription || {
    updatedAt: createdAtUser?.createdAt,
    stripeCurrentPeriodEnd: new Date(
      createdAtUser?.createdAt?.getTime() + 1000 * 60 * 60 * 24 * 14
    ),
    title: "Starter",
  };
  const isPaid =
    user?.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
      ? true
      : false;
  const { userPlan } = getUserPlan(user);
  const plan = isPaid && userPlan ? userPlan : pricingData[0];
  const interval = isPaid
    ? userPlan?.stripeIds.monthly === user.stripePriceId
      ? "month"
      : userPlan?.stripeIds.yearly === user.stripePriceId
        ? "year"
        : null
    : null;
  let isCanceled = false;
  if (isPaid && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }
  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPaid,
    interval,
    isCanceled,
    weeklyUploadCount: user.weeklyUploadCount,
  };
};
