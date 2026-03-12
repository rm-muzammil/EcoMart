import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESENT_API) {
  console.error("❌ RESENT_API is required. Please set it in .env");
}

const resend = new Resend(process.env.RESENT_API);

const sendEmail = async ({ sendTO, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "EcoMart <onboarding@resend.dev>",
      to: sendTO,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Email sending failed:", error);
      return null;
    }

    console.log("✅ Email sent successfully!");
    return data;
  } catch (error) {
    // ✅ Attach the original error as cause
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error sending email",
      { cause: error }
    );
  }
};

export default sendEmail;