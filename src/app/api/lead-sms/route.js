import nodemailer from 'nodemailer';

const SMS_GATEWAY = '9852374667@vtext.com';

export async function POST(request) {
  try {
    const body = await request.json();
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!message || message.length > 160) {
      return Response.json({ error: 'Invalid message' }, { status: 400 });
    }

    const user = process.env.LEAD_ALERT_GMAIL_USER;
    const pass = process.env.LEAD_ALERT_GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.warn('Lead SMS not configured: set LEAD_ALERT_GMAIL_USER and LEAD_ALERT_GMAIL_APP_PASSWORD');
      return Response.json({ error: 'SMS alerts not configured' }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: user,
      to: SMS_GATEWAY,
      subject: 'SCS Lead Alert',
      text: message,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Lead SMS error:', err);
    return Response.json({ error: 'Failed to send SMS alert' }, { status: 500 });
  }
}
