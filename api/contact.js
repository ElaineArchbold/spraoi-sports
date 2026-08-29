import { Resend } from 'resend';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = value => String(value || '').replace(/[<>]/g, '').trim();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, club, email, sport = '', interest = 'General information', message = '', website = '' } = req.body || {};
  if (website) return res.status(200).json({ ok: true });

  if (!name || !club || !email || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Please complete your name, club and a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL || !process.env.FROM_EMAIL) {
    return res.status(500).json({ error: 'The contact form has not been configured on Vercel yet.' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: clean(email),
      subject: `Spraoi Sports information request — ${clean(club)}`,
      text: [
        `Name: ${clean(name)}`,
        `Club: ${clean(club)}`,
        `Email: ${clean(email)}`,
        `Sport: ${clean(sport)}`,
        `Product interest: ${clean(interest)}`,
        '',
        clean(message) || 'Walkthrough requested via the Spraoi Sports website.'
      ].join('\n')
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact form email error:', error);
    return res.status(500).json({ error: 'Your request could not be sent right now. Please try again shortly.' });
  }
}
