import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  console.log("hit by clerk: ", SIGNING_SECRET);

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);

  if (evt.type === "user.updated" || evt.type === "user.created") {
    const {
      email_addresses,
      image_url,
      first_name,
      last_name,
      last_active_at,
      last_sign_in_at,
      created_at,
      updated_at,
      banned,
      private_metadata,
      public_metadata,
      unsafe_metadata,
      id,
      external_id,
      username,
      primary_email_address_id,
    } = evt.data;

    await prisma.user.upsert({
      where: {
        id: id,
      },
      create: {
        emailAddress: email_addresses[0].email_address,
        imageUrl: image_url,
        firstName: first_name,
        lastName: last_name,
        lastActiveAt: last_active_at ? new Date(last_active_at) : null,
        lastSignInAt: last_sign_in_at ? new Date(last_sign_in_at) : null,
        createdAt: new Date(created_at),
        updatedAt: new Date(updated_at),
        banned,
        privateMetadata: JSON.parse(JSON.stringify(private_metadata)) as object,
        publicMetadata: JSON.parse(JSON.stringify(public_metadata)) as object,
        unsafeMetadata: JSON.parse(JSON.stringify(unsafe_metadata)) as object,
        id,
        externalId: external_id,
        primaryEmailAddressId: primary_email_address_id,
        username,
        additionalMetadata: {},
      },
      update: {
        emailAddress: email_addresses[0].email_address,
        imageUrl: image_url,
        firstName: first_name,
        lastName: last_name,
        lastActiveAt: last_active_at ? new Date(last_active_at) : null,
        lastSignInAt: last_sign_in_at ? new Date(last_sign_in_at) : null,
        createdAt: new Date(created_at),
        updatedAt: new Date(updated_at),
        banned,
        privateMetadata: JSON.parse(JSON.stringify(private_metadata)) as object,
        publicMetadata: JSON.parse(JSON.stringify(public_metadata)) as object,
        unsafeMetadata: JSON.parse(JSON.stringify(unsafe_metadata)) as object,
        externalId: external_id,
        primaryEmailAddressId: primary_email_address_id,
        username,
        additionalMetadata: {},
      },
    });
  }

  if (evt.type === "user.deleted") {
    const { id } = evt.data;
    console.log(JSON.stringify(evt.data, null, 2));

    const userSubscription = await prisma.usersSubscriptions.findUnique({
      where: {
        id,
      },
    });

    if (userSubscription && userSubscription.stripeSubscriptionId) {
      await stripe.subscriptions.update(userSubscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
    }

    await prisma.user.delete({ where: { id } });
  }

  return new Response("Webhook received", { status: 200 });
}
