import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created") {
      // Handle user created event
      console.log("User created:", evt.data);
    }
    if (eventType === "user.updated") {
      // Handle user created event
      console.log("User updated:", evt.data);
    }
    if (eventType === "user.deleted") {
      // Handle user created event
      console.log("User deleted:", evt.data);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
