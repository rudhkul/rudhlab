# RudhLab

Research website for Anirudh Kulkarni, PhD. Static HTML, CSS, and JavaScript, built for GitHub Pages. No build tooling, server, paid hosting, or API key is needed. Google Fonts (Inter) is optional; the system sans-serif fallback works without it.

## Preview

Run `python3 -m http.server 8000` from this directory, then open http://localhost:8000.

## Content

- `index.html`: research areas, funded projects, simulations and code, selected publications, people, contact.
- `publications.html`: full bibliography grouped by year, with search and type filters.
- `profile.html`: concise academic profile with a print-to-PDF layout. This is not a full CV.
- `careers.html`: upcoming JRF / PhD positions and how to get in touch.
- `content.js`: simulation and code entries, public email, optional CV PDF path.
- `styles.css`: the single design system (tokens, layout, dark mode, print).
- `app.js`: theme, mobile menu, click-to-play video, simulation dialog, publication filters.
- `404.html`: not-found page; uses root-relative links because GitHub Pages serves it at any missing path.
- `sitemap.xml`, `robots.txt`: search-engine discovery for https://rudhlab.com. Update `lastmod` when a page changes substantially.
- `assets/`: portrait, logo mark, `og-image.jpg` (1200 × 630 link-preview image), and `media/` simulation clips with poster frames.

Each page has a canonical URL, Open Graph / Twitter tags for link previews, and the homepage and profile carry schema.org JSON-LD (ResearchOrganization and Person) so search engines can identify the lab and its lead.

The pages share one header and footer. When changing navigation, update all four HTML files.

### Add a simulation or repository

Add an object to `LAB.studies` in `content.js`. Entries with `type: 'simulation'` appear in the Simulations grid (the clip featured at the top of the homepage is excluded from the grid automatically). Entries with `type: 'code'` appear as rows under Code. Include assumptions, hardware/precision for benchmarks, and a public source/publication link. Upload files using GitHub's **Add file → Upload files** in `assets/media/`, then add an entry:

```js
{
  id: 'dental-sample-01', type: 'simulation',
  category: 'DENTAL SIMULATION', label: 'Simulation · 0:15',
  title: 'Your sample title', description: 'One or two sentences shown on the card.',
  media: {type: 'video', src: 'assets/media/dental-sample-01.mp4',
    poster: 'assets/media/dental-sample-01.jpg', alt: 'Describe the visible simulation.'},
  detail: 'Methods, assumptions, limitations, and your contribution (shown in the dialog).',
  method: 'Software · model · conditions', url: null
}
```

A poster image is required for the grid thumbnail; use a 16:10 or 16:9 frame. For a code entry, set `type: 'code'`, `title`, `description`, `language` (shown on the right of the row), and `url`. Commit the changes to trigger automatic deployment. Use short compressed clips; large datasets and raw solver output belong in a research repository or archive, not Git history.

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
- Simulation dialog, keyboard navigation, dialog dismissal and focus return; publication search and filters.
- Native video playback and pause controls; no automatic motion.
- Real repository links, print-friendly profile, no invented CV details.

## Appearance and contact

Use the header’s light/dark toggle on every page. The preference is remembered across navigation and reloads; the first visit follows the operating system. Printing the academic profile uses a light print layout. The connected-cell logo is an original SVG in `assets/mark.svg`. Contact links are email and LinkedIn; research repositories remain linked from the gallery.

## Academic content

`publications.html` contains 21 unique publications (18 journal articles and three chapters). Citations are server-rendered for accessibility and indexing, with browser-local search and filtering. `publications.json` is a structured bibliography snapshot for reuse; the public page is maintained in HTML. Publication links lead to verified DOIs where available, otherwise the exact Scholar record.

The list omits the thesis, the truncated duplicate OpenFOAM entry, and the unrelated Cureus tendon-transfer case report. The OpenFOAM chapter is listed once with its 2025 publisher publication year (the underlying FMFP conference was in 2023). Full author lists were reconciled with the supplied CV and available publisher/Crossref metadata. No live citation metrics are claimed.

The three project records include titles, funding bodies, roles, collaborators, and 2026–2029 periods. Funding amounts are intentionally absent. The raw CV is not included in this public repository. Tannu Parmar is listed as JRF, not an enrolled doctoral scholar. Bhau Kolhe is listed as a part-time PhD researcher in VAWT analysis and performance improvement. `assets/anirudh-kulkarni.png` is the owner-provided portrait (the pages use the optimized `.jpg` copy).

## Simulation-video gallery

Seven local H.264 MP4 clips (about 4.4 MB total) replace the original schematic gallery entries: 3D CUDA two-phase flow, a falling droplet, Julia/CUDA square-cylinder flow, a PDEU virtual wind tunnel, porous-body rotation, a sphere wake, and circular-cylinder VIV. `assets/media/sources.json` records the original public post URLs. No expiring LinkedIn CDN URLs, browser-session details, or account analytics are published. MP4 streams were copied without re-encoding and remuxed for progressive playback; thumbnails were extracted around the middle of each clip.

The original educational/unvalidated status of the 3D VOF and square-cylinder solvers is retained. The sphere-wake example is labelled as an initial GPU-oriented demonstration. No independent validation or new benchmark claim is made. Clips load on demand and open in a study dialog with method notes; starting one pauses any other. LinkedIn sign-in is not required to play the locally hosted gallery videos.

## Design

The site uses one minimal template across all pages: Inter (loaded from Google Fonts, with a system sans-serif fallback), a neutral black-and-white palette with matching dark mode, a single 1200 px column, and a left-label / right-content grid for every section. Uppercase eyebrow labels, card borders, tag chips, and decorative arrows on internal links have been removed. Videos show their poster frame with a play button and start only when clicked; only one clip plays at a time. The Careers notice on the homepage is a single line; only its dot pulses, and reduced-motion preferences disable that. `assets/anirudh-kulkarni.jpg` is a 720 px web copy (about 47 KB) of the owner-provided `anirudh-kulkarni.png`, which is kept as the source.
