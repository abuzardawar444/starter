import { PlanPurchaseEmail } from "@/emails/plan-purchase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPlanPurchaseEmail = async (
  identifier: string,
  planType: "Pro" | "Business",
  customerName?: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@yourcompany.com",
      to:
        process.env.NODE_ENV === "development"
          ? "nexgenv0@gmail.com"
          : identifier,
      subject: `Thank You for Purchasing Our ${planType} Plan`,
      react: PlanPurchaseEmail({
        planType,
        customerName,
      }),
      // Set this to prevent Gmail from threading emails
      // More info: https://resend.com/changelog/custom-email-headers
      headers: {
        "X-Entity-Ref-ID": new Date().getTime() + "",
      },
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (catchError) {
    console.error("Unexpected error sending email:", catchError);
    return {
      success: false,
      error:
        catchError instanceof Error ? catchError : new Error("Unknown error"),
    };
  }
};

export default sendPlanPurchaseEmail;
