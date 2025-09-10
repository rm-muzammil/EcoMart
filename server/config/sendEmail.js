// import { Resend } from "resend";
// import dotenv from "dotenv";
// dotenv.config();

// if (!process.env.RESENT_API) {
//   console.log("RESENT_API is required");
// }

// const resend = new Resend(process.env.RESENT_API);

// const sendEmail = async ({ sendTO, subject, html }) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "EcoMart <onboarding@resend.dev>",
//       to: sendTO,
//       subject: subject,
//       html: html,
//     });
//     if (error) {
//       return console.error({ error });
//     }
//     return data;
//   } catch (error) {
//     console.error("Email sending failed:", error.message);
//   }
// };

// (async function () {
//   if (error) {
//     return console.error({ error });
//   }

//   console.log({ data });
// })();

// export default sendEmail;
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
    console.error("❌ Unexpected error while sending email:", error.message);
    return null;
  }
};

export default sendEmail;
