# Spraoi Sports landing page

A static, responsive landing page prepared for deployment on Vercel.

## What is included

- Spraoi Sports blue and green branding
- Responsive single-page website
- All unreleased feature cards marked **Coming soon** and disabled
- Early access contact form
- Vercel serverless email function using Resend
- Basic SEO, sitemap, robots file and security headers

## Open the project in Visual Studio Code

1. Unzip the folder.
2. Open Visual Studio Code.
3. Select **File → Open Folder**.
4. Choose the `spraoi-sports` folder.

You can preview the static page using the VS Code **Live Server** extension. The email form only works after it is deployed and the environment variables below are added to Vercel.

## Set up email without exposing your Gmail address

The browser sends the form to `/api/contact`. Your destination address is stored privately in Vercel, not in the HTML.

1. Create an account at Resend.
2. Add and verify `spraoisports.com` in Resend.
3. Create a Resend API key.
4. In Vercel, open the project and go to **Settings → Environment Variables**.
5. Add:

```text
RESEND_API_KEY = your Resend API key
CONTACT_EMAIL = e.t.archbold@gmail.com
FROM_EMAIL = Spraoi Sports <hello@spraoisports.com>
```

6. Redeploy the project after adding the variables.

Until these variables are configured, the form displays a clear configuration error rather than revealing the email address.

## Push the project to GitHub

Create an empty GitHub repository first. Then open the VS Code terminal in this folder and run:

```bash
git init
git add .
git commit -m "Create Spraoi Sports landing page"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the final URL with the URL shown by GitHub for your repository.

## Deploy to Vercel

1. Sign in to Vercel.
2. Select **Add New → Project**.
3. Import the GitHub repository you just pushed.
4. Leave the framework preset as **Other**.
5. Leave the build command and output directory empty.
6. Select **Deploy**.
7. Add the three email environment variables listed above.
8. Redeploy.

## Connect spraoisports.com

1. In Vercel, open **Project → Settings → Domains**.
2. Add `spraoisports.com`.
3. Add `www.spraoisports.com` as well.
4. Follow the DNS records Vercel displays for your domain provider.
5. Set your preferred version as the primary domain and redirect the other version to it.

## Updating the live page

After editing files in VS Code:

```bash
git add .
git commit -m "Update landing page"
git push
```

Vercel automatically redeploys after each push to the main branch.

## Product screenshots

The landing page now includes all supplied Fitness Challenge and Blitz/Tournament screenshots in responsive CSS phone frames. The optimised WebP files are stored in `assets/screens/`.

The Fitness Challenge previews appear in the hero and the dedicated Fitness Challenge section. The Blitz/Tournament previews appear in the dedicated Blitz Manager section, alongside messaging explaining that branding, sponsors, schedules, rules and visible sections are customisable for each club.
