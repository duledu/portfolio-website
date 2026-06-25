# Studio Craft — Portfolio

Premium web designer & frontend developer portfolio.

---

## Folder Structure

```
portfolio/
├── index.html            ← Home page
├── websites.html         ← Portfolio / masonry grid (20 projects)
├── website-single.html   ← Case study template (duplicate per project)
├── about.html            ← About page
├── services.html         ← Services page
├── contact.html          ← Contact + inquiry form
├── 404.html              ← 404 error page
│
├── assets/
│   ├── css/
│   │   └── main.css      ← Compiled from scss/main.scss
│   ├── images/
│   │   ├── projects/     ← Project screenshots (900×1200 to 900×2000)
│   │   ├── about/        ← Portrait photo
│   │   ├── logos/        ← Client logos (if used)
│   │   └── ui/           ← UI icons or decorative assets
│   └── fonts/            ← Local fonts (if self-hosted)
│
├── scss/
│   ├── main.scss         ← Entry point (imports everything)
│   ├── base/
│   │   ├── _variables.scss   ← Colors, spacing, fonts, breakpoints
│   │   ├── _reset.scss       ← CSS reset
│   │   ├── _typography.scss  ← Type scale utilities
│   │   ├── _mixins.scss      ← SCSS mixins
│   │   └── _helpers.scss     ← Utility classes
│   ├── layout/
│   │   ├── _header.scss      ← Sticky header + mobile nav overlay
│   │   ├── _footer.scss      ← Footer layout
│   │   └── _grid.scss        ← Grid helpers
│   ├── components/
│   │   ├── _buttons.scss     ← All button variants
│   │   ├── _cursor.scss      ← Custom cursor
│   │   ├── _project-card.scss← Project cards (grid + featured)
│   │   ├── _masonry.scss     ← Masonry layout + filter bar
│   │   └── _forms.scss       ← Form fields, tags, marquee, loader
│   └── pages/
│       ├── _home.scss         ← Home-specific sections
│       ├── _websites.scss     ← Websites page
│       ├── _website-single.scss ← Case study page
│       └── _about.scss        ← About, Services, Contact pages
│
└── js/
    ├── main.js           ← Entry point — initialises all modules
    ├── utils.js          ← Loader, scroll progress, magnetic buttons, lazy images
    ├── cursor.js         ← Custom cursor (ring + dot)
    ├── navigation.js     ← Sticky header + mobile menu
    ├── animations.js     ← IntersectionObserver scroll reveals
    ├── counters.js       ← Animated number counters
    ├── masonry.js        ← Card tilt on hover
    └── filters.js        ← Portfolio filter buttons
```

---

## Compiling SCSS

Compile `scss/main.scss` → `assets/css/main.css`.

```bash
# Dart Sass (recommended)
sass scss/main.scss assets/css/main.css --watch

# Or with npm script (if you add one):
# "sass": "sass scss/main.scss assets/css/main.css"
```

---

## Editing Projects

### Adding a new project to `websites.html`

1. Copy any `.masonry__item` block in `websites.html`
2. Update `data-categories` with filter keys: `real-estate`, `wordpress`, `agentfire`, `next-js`, `landing-pages`, `branding`
3. Update the image `src`, `alt`, `aria-label`
4. Update the title, client, year, tags
5. Update `href` to link to the correct case study page

### Filter categories (data-categories attribute)

| Filter button | data-categories value |
|---------------|----------------------|
| Real Estate   | `real-estate`         |
| WordPress     | `wordpress`           |
| AgentFire     | `agentfire`           |
| Next.js       | `next-js`             |
| Landing Pages | `landing-pages`       |
| Branding      | `branding`            |

Multiple categories: `data-categories="real-estate,next-js"`

### Creating a new case study

1. Duplicate `website-single.html`
2. Rename it (e.g. `coastal-homes.html`)
3. Update `<title>`, `<meta description>`, and OG tags
4. Replace all project data: client, industry, year, services, description
5. Update image `src` paths
6. Update the "Next Project" section at the bottom

---

## Images

Project screenshots should be placed in `assets/images/projects/`.

**Recommended sizes:**
- `900 × 1200` — standard card
- `900 × 1400` — tall card
- `900 × 1700` — extra tall card
- `900 × 2000` — full-page card
- `1440 × 900` — featured hero / gallery full-width

Portrait photo: `assets/images/about/portrait.jpg` (600×800 recommended)

---

## Personalizing

### Colors — `scss/base/_variables.scss`
```scss
$black:  #050509;
$dark:   #0B0B0F;
$paper:  #F9F4ED;
$muted:  #AEB4C0;
$slate:  #737E87;
$gold:   #A48442;
$line:   rgba(249,244,237,.12);
```

### Your name / brand
- Header logo: search `Studio<span>.</span>` → replace with your name
- Footer logo: same
- Contact email: search `hello@yourdomain.com` → replace everywhere
- JSON-LD schema in `index.html`: update `"name"`, `"url"`, `"sameAs"`

### Social links
Search `href="#" target="_blank"` in each file and add your real URLs.

### Form
By default the form `action="#"` does nothing. Connect it to:
- **Netlify**: add `netlify` attribute to `<form>`
- **Formspree**: `action="https://formspree.io/f/yourformid"`
- **Custom backend**: update `action` and add server-side handler

---

## SEO Checklist

- [ ] Update `<title>` on every page
- [ ] Update `<meta name="description">` on every page
- [ ] Update Open Graph `og:url`, `og:image` tags
- [ ] Add `og:image` (1200×630 recommended) to `assets/images/`
- [ ] Update JSON-LD schema in `index.html`
- [ ] Add `rel="canonical"` links if needed
- [ ] Submit sitemap to Google Search Console

---

## Accessibility

- All images have `alt` text
- Navigation has `aria-label`
- Form fields have `<label>` elements linked by `for`/`id`
- Buttons have `aria-label` where text isn't sufficient
- Focus styles are visible (`outline: 1px solid $gold`)
- Scroll animations respect `prefers-reduced-motion` (add to SCSS if needed)

---

## Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Custom cursor disabled automatically on touch devices

---

*Built with HTML5, SCSS, Vanilla JS + jQuery 3.7*
