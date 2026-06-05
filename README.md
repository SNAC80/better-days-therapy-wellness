# Better Days Therapy & Wellness, PLLC

**Live Site:** [betterdaystherapywellness.com](https://betterdaystherapywellness.com)

## About

This is the official website for **Better Days Therapy & Wellness, PLLC**, owned and operated by **Dr. Stephanie Booker, LPC, Ed.D** — a Licensed Professional Counselor based in Houston, Texas offering compassionate behavioral health services and telehealth therapy throughout Texas and Illinois.

## Technology

- Pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no dependencies
- Fully static — hosted on GitHub Pages
- Responsive design: mobile-first, tested across all screen sizes
- WCAG 2.1 AA accessibility compliant
- Schema.org structured data (MedicalBusiness, FAQPage, Person)
- Sitemap and robots.txt included

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, services overview, about snapshot, CTA |
| About | `about.html` | Dr. Booker's biography, credentials, philosophy |
| Services | `services.html` | All therapy services + FAQ accordion |
| Insurance | `insurance.html` | Accepted insurance, self-pay rates, Good Faith Estimate |
| Contact | `contact.html` | Contact form, scheduling info, crisis resources |
| Privacy Policy | `privacy.html` | HIPAA-compliant privacy policy |
| Terms of Service | `terms.html` | Website terms of use |
| Disclaimer | `disclaimer.html` | Professional disclaimer |

## File Structure

```
/
├── index.html
├── about.html
├── services.html
├── insurance.html
├── contact.html
├── privacy.html
├── terms.html
├── disclaimer.html
├── sitemap.xml
├── robots.txt
├── CNAME
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── logos/
│   ├── images/
│   │   ├── hero/
│   │   ├── headshots/
│   │   ├── services/
│   │   └── misc/
│   ├── icons/
│   └── fonts/
└── favicons/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    ├── android-chrome-192x192.png
    ├── android-chrome-512x512.png
    └── site.webmanifest
```

## GitHub Pages Setup

1. Repository Settings → Pages
2. Source: Deploy from branch → `main` / `(root)`
3. Custom domain: `betterdaystherapywellness.com`
4. Enforce HTTPS: ✓

## DNS Configuration (GoDaddy)

**A Records** (point root domain to GitHub Pages):
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**CNAME Record** (www subdomain):
- Name: `www`
- Value: `[github-username].github.io`

## Built By

[Kirauni Strategies LLC](https://www.kiraunistrategies.com) | Where Strategy Meets Excellence

---

*For content updates or technical support, contact Kirauni Strategies.*
