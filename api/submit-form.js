import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { formType, name, email, service, subject, message, phone, company } = req.body;

    const htmlContent = `
      <h2>New Website Submission</h2>
      <p><strong>Form:</strong> ${formType}</p>
      <hr/>
      <p><strong>Name:</strong> ${name || "N/A"}</p>
      <p><strong>Email:</strong> ${email || "N/A"}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Service:</strong> ${service || "N/A"}</p>
      <p><strong>Subject:</strong> ${subject || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${message || "N/A"}</p>
    `;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "info@panatech.co.zw",   // 🔥 YOUR BUSINESS EMAIL HERE
      subject: `[${formType}] New Submission`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Email failed" });
  }
}
