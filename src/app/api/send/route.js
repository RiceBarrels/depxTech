import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { to, subject, firstName, details, type } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Trade-In <trade@depxtech.com>',
      to: [to],
      bcc: ['zhuokevin541@gmail.com', 'fanmuheng@gmail.com', 'support@depxtech.com'],
      subject: subject,
      react: EmailTemplate({ firstName, details, to, type }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ message: "Email sent successfully", data });
  } catch (error) {
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}