import nodemailer from "nodemailer";
import type { ProjectLead } from "./leads";

export async function notifyProjectLead(lead: ProjectLead) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_TO_EMAIL ?? "alejandro@hookcast.studio";
  if (!host || !user || !password) return false;

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass: password },
  });

  await transporter.sendMail({
    from: `HookCast Website <${user}>`,
    to: recipient,
    replyTo: lead.email,
    subject: `New HookCast project — ${lead.brand}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Brand: ${lead.brand}`,
      `Website: ${lead.website || "Not provided"}`,
      `Budget: ${lead.budget}`,
      `Timeline: ${lead.timeline}`,
      "",
      lead.message,
    ].join("\n"),
  });
  return true;
}
