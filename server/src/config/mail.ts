import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST!,
  secure: process.env.ENV === "production" ? true : false,
  port: Number(process.env.MAILTRAP_SMTP_PORT),
  auth: {
    user: process.env.MAILTRAP_SMTP_USERNAME,
    pass: process.env.MAILTRAP_SMTP_PASSWORD,
  },
} as SMTPTransport.Options);

export default transporter;
