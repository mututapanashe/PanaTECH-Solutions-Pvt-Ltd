const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    console.log("Incoming data:", data); // for debugging

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "panatech.mututa@gmail.com", // temporarily use this to test
      subject: `[${data.formType}] New Submission`,
      html: `
        <h2>New Submission</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({ error: "Email failed" });
  }
};
