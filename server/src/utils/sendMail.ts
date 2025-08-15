import SMTPTransport from "nodemailer/lib/smtp-transport";
import transporter from "../config/mail";

const sendMail = async (
  from: string,
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<SMTPTransport.SentMessageInfo> => {
  try {
    const info = await transporter.sendMail({ from, to, subject, text, html });
    return info;
  } catch (error) {
    throw error;
  }
};

export default sendMail;
