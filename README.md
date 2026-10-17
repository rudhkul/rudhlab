# RudhLab

Research website for Anirudh Kulkarni, PhD. Static HTML, CSS, and JavaScript, built for GitHub Pages. No build tooling, server, paid hosting, or API key is needed. Google Fonts is optional; system sans-serif fallbacks work without it.

## Preview

Run `python3 -m http.server 8000` from this directory, then open http://localhost:8000.

## Content

- `index.html`: research themes, project-role summary, people, contact.
- `profile.html`: concise academic profile with a print-to-PDF layout. This is not a full CV.
- `content.js`: gallery entries and optional public email/CV PDF path.
- `styles.css`: responsive design and print styles.
- `app.js`: illustrative flow visual, accessible gallery filters and detail dialogs.
- `assets/`: add cleared simulation images, PDFs, and short videos here.

The two visual studies are explicitly labelled original illustrations, not patient data or research results. Replace them with reviewed samples when ready. The three code links point to the owner's existing public repositories. We have not added publications, grant titles, funding amounts, student names, degree dates, speed-up figures, or clinical claims that were not provided.

### Add a gallery entry

Add an object to `LAB.studies` in `content.js`. Current artwork renderers: `flow`, `dental`, `cuda`, `julia`, `fsi`. For real samples, add a `media` object as shown below. Include assumptions, hardware/precision for benchmarks, and a public source/publication link. Do not claim illustrative art is simulation output. The gallery count updates automatically. Upload files using GitHub's **Add file → Upload files** in `assets/`, then edit `content.js` and add an entry:

```js
{
  id: 'dental-sample-01', type: 'simulation',
  category: 'DENTAL SIMULATION', label: 'Research sample',
  title: 'Your sample title', description: 'What the sample demonstrates.',
  media: {type: 'video', src: 'assets/dental-sample-01.mp4',
    poster: 'assets/dental-sample-01.jpg', alt: 'Describe the visible simulation.'},
  detail: 'Methods, assumptions, limitations, and your contribution.',
  method: 'Software · model · conditions', url: null
}
```

Use `type: 'image'` in `media` for a PNG/JPEG/WebP image; omit `poster`. Commit the changes to trigger automatic deployment. Use short compressed clips; large datasets and raw solver output belong in a research repository or archive, not Git history.

### Add contact and a full CV

Set `email` in `content.js` to your chosen public address. Put a reviewed PDF in `assets/` and set `cv` to its relative path. The profile displays the download link automatically. The existing public `academic_cv` repository contains a template and was intentionally not used as the actual CV.

## GitHub Pages

The included workflow publishes only the website files, not this README or local files. In repository Settings → Pages choose **GitHub Actions** as the source. Push to `main` to deploy. The standard URL is https://rudhkul.github.io/rudhlab/.

## Connect rudhlab.com (Cloudflare)

First verify domain ownership using GitHub Settings → Pages → Add a domain. GitHub supplies a `_github-pages-challenge-rudhkul` TXT value; add the exact supplied value in Cloudflare. Ownership verification helps prevent domain takeover.

Then set the repository's custom domain to `rudhlab.com` under Settings → Pages. In Cloudflare DNS, add these apex A records (`@`), using **DNS only** while GitHub provisions HTTPS:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Add `www` CNAME → `rudhkul.github.io` (without `/rudhlab`), also DNS only. Remove only conflicting records for the same host if any; preserve email and unrelated DNS records. Cloudflare remains your nameserver provider. Enable **Enforce HTTPS** in GitHub Pages after certificate issuance. Optionally add a `CNAME` file containing `rudhlab.com` to this repository for clarity.

Official reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Verification before publication

- Desktop and mobile layout, no horizontal overflow.
- Gallery filters, keyboard navigation, dialog dismissal and focus return.
- Flow pause/play and reduced-motion preference.
- Real repository links, print-friendly profile, no invented CV details.
