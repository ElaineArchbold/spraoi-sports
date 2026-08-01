import { Resend } from 'resend';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, club, email, sport = '', interest = '', message = '', website = '' } = req.body || {};

  // Hidden field used to quietly reject simple spam bots.
  if (website) return res.status(200).json({ ok: true });

  if (!name || !club || !email || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Please complete your name, club and a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL || !process.env.FROM_EMAIL) {
    return res.status(500).json({ error: 'The contact form has not been configured yet.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const safe = value => String(value).replace(/[<>]/g, '');

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Spraoi Sports early access — ${safe(club)}`,
      text: [
        `Name: ${safe(name)}`,
        `Club: ${safe(club)}`,
        `Email: ${safe(email)}`,
        `Sport: ${safe(sport)}`,
        `Main interest: ${safe(interest)}`,
        '',
        safe(message)
      ].join('\n')
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Your message could not be sent right now.' });
  }
}
