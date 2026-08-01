# Spraoi Sports landing page

Static HTML/CSS/JavaScript landing page with a Vercel serverless contact form.

## Preview locally

Open `index.html` with the VS Code Live Server extension.

## Contact form setup on Vercel

In **Vercel → Project → Settings → Environment Variables**, add:

- `RESEND_API_KEY` — your Resend API key
- `CONTACT_EMAIL` — the private email address that should receive enquiries
- `FROM_EMAIL` — a verified sender, for example `Spraoi Sports <hello@spraoisports.com>`

The private contact email is never written into the webpage source.

After adding or changing environment variables, redeploy the project.

## Push an update

```bash
git add .
git commit -m "Improve hero sections and information request form"
git push origin main
```
