# Javee Portfolio — setup guide

This is a responsive static portfolio made with HTML, CSS and JavaScript. It can be deployed to Vercel as a static site.

## 1. Update your personal links
Open `index.html` and replace the sample links with your real links:
- GitHub: `https://github.com/javee73`
- LinkedIn: replace `https://www.linkedin.com/` with your profile URL.
- Email: replace `jawithj@gmail.com` if you want to use another email.
- Project GitHub/demo links: each card currently has placeholder links. Replace each with the exact repository/demo for that project.

## 2. Add your certificates
The certificate section shows only text rows; it does not display certificate thumbnails on the page. Clicking a row opens a modal preview.

Put your certificate image files in `assets/certificates/` and use these exact filenames, or update the matching `data-certificate` value in `index.html`:
- `python-certificate.jpg`
- `web-development-certificate.jpg`
- `data-science-certificate.jpg`
- `machine-learning-certificate.jpg`
- `python-certificate1.jpg`

JPG, PNG and WebP images work. PDF also works if you change a row's `data-certificate` to a `.pdf` filename. Then edit each visible certificate title and issuer text to match your actual certificate. Do not claim a certificate you have not earned.

## 3. Set up contact email delivery (required)
The contact form is not able to send email until a form endpoint is connected.

1. Go to https://formspree.io/ and sign up or log in.
2. Create a new form and set the destination/notification email to the email address where you want to receive messages.
3. Formspree will provide an endpoint similar to `https://formspree.io/f/abcdwxyz`.
4. In `index.html`, find:
   `<form class="contact-form" id="contactForm">`
5. Change it to:
   `<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_REAL_ID">`
   Replace `YOUR_REAL_ID` with the exact ID Formspree gives you. Do not paste your email password or any secret key into this website.
6. Verify your email address with Formspree if requested.
7. Deploy, then submit a test message from your live portfolio. Confirm the email arrives. Check spam if needed.

## 4. Add your resume
Put your latest PDF resume at `assets/resume.pdf`. The download buttons already point to that path. If you do not have a resume ready, remove or temporarily hide the buttons until you add it.

## 5. Deploy on Vercel
1. Download and extract the project ZIP.
2. Upload these files and folders to your existing GitHub repository (keep `index.html` at the repository root).
3. Commit the changes to the branch connected to Vercel.
4. Vercel should automatically redeploy. If not, open your Vercel project and choose Deployments → Redeploy.
5. Open `https://javee.vercel.app` and test every navigation link, project link, certificate preview, resume button, and contact form.

No build command or framework is required for this static version.

## Important
- Update certificate details from your real certificates.
- Replace project links with the correct URLs.
- Email notifications work only after configuring and testing Formspree.
- This starter template uses a code-editor visual in the hero, not a personal photo. You can add a real professional photo later if you want.
