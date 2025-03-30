/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

interface EmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    
    // Create a transport with your credentials
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER || "55da78237a0038",
        pass: process.env.MAILTRAP_PASS || "aad7edc18cb3c6",
      },
    });

    const mailOptions = {
      from: "noreply@yourdomain.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN || "http://localhost:3000"
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };

    // Log before sending to help with debugging
    console.log("Attempting to send email to:", email);
    
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Mail sent successfully:", mailResponse.messageId);
    return mailResponse;
  } catch (error) {
    console.error(
      "An error occurred while sending the email:",
      error instanceof Error ? error.message : String(error)
    );
    throw new Error(
      `Failed to send email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
