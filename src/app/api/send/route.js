import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { to, subject, firstName, gpuDetails } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Trade-In <trade@depxtech.com>',
      to: [to],
      subject: subject,
      react: EmailTemplate({ firstName, gpuDetails, to }), // Pass 'to' to EmailTemplate
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ message: "Email sent successfully", data });
  } catch (error) {
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}