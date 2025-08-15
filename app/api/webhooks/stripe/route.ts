import { UserSubscriptionPlan } from "@/types";
import { pricingData } from "@/config";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

import { getUserPlan } from "@/lib/utils";

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  if (!userId) throw new Error("Missing parameters");

  //I want to get the last subscription of the user
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
  const user = userSubscription || {
    updatedAt: createdAtUser?.createdAt,
    stripeCurrentPeriodEnd: new Date(
      createdAtUser?.createdAt?.getTime() + 1000 * 60 * 60 * 24 * 14
    ),
    title: "Starter",
  };

  console.log(user);

  // Check if user is on a paid plan.
  const isPaid =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
      ? true
      : false;

  // Find the pricing data corresponding to the user's plan
  const { userPlan } = getUserPlan(user);
  const plan = isPaid && userPlan ? userPlan : pricingData[0];

  const interval = isPaid
    ? userPlan?.stripeIds.monthly === user?.stripePriceId
      ? "month"
      : userPlan?.stripeIds.yearly === user?.stripePriceId
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
}

export async function resetWeeklyUploadCounts(userId: string) {
  const subscription = await getUserSubscriptionPlan(userId);
  if (subscription.title === "Pro") {
    const result = await prisma.usersSubscriptions.update({
      where: {
        id: subscription.id,
      },
      data: {
        weeklyUploadCount: 0,
        resetDate: new Date(),
      },
    });
  }
}

export async function incrementWeeklyUploadCount(userId: string) {
  await prisma.usersSubscriptions.update({
    where: {
      id: userId,
    },
    data: {
      weeklyUploadCount: {
        increment: 1,
      },
    },
  });
}
