# Handoff: AXIOM identity → duledu/portfolio-website

**Design source of truth:** the AXIOM brand guide in `design/`
**Implementation source of truth:** the existing repository (`duledu/portfolio-website`, branch `main`, audited at commit `a718ff2`)

Where the two disagree about *structure*, the repository wins. Where they disagree about *visual identity*, the design wins. This document says which is which for every decision.

---

## 1. What this is

A rebrand of an existing, working portfolio site. The site is HTML + SCSS + vanilla JS/jQuery 3.7, compiled with Dart Sass (`scss/main.scss` → `assets/css/main.css`). It is not being rebuilt, migrated, or restructured.

**Do not:**
- introduce React, Next.js, a build tool, or any framework
- restructure the SCSS architecture (base / layout / components / pages stays)
- redesign layouts, sections, or components that already work
- design a new AXIOM wordmark, or an A/X monogram
- alter the octopus artwork's outline
- remove the custom cursor

**Do:**
- swap the identity: colour tokens, font families, logo, favicon, metadata
- add three things that don't exist yet: the logo lockups, the password gate, the symbol preloader
- replace the `Studio Craft` placeholder brand
- leave `Dusan "Drake" Stevanovic` and every testimonial mention of Drake exactly as written

### Fidelity

**High-fidelity.** Colours, type, spacing ratios and logo geometry in this document are final and exact. The one item still awaiting the owner's sign-off is flagged in §11.

---

## 2. Brand hierarchy

Consistent everywhere, no exceptions:

| Role | Value |
|---|---|
| Primary brand | **AXIOM** |
| Symbol | The octopus (supplied by the owner) |
| Person | **Dušan Stevanović** |
| Professional name | **"Drake"** |
| Title | Senior Web Designer · Front-End Developer · Technical Lead |

Written in full as `Dušan "Drake" Stevanović`, with the quotes, wherever the full professional identity is established.

**AXIOM leads in:** header, favicon, preloader, password gate, page transitions, Open Graph, social avatar.
**The person leads in:** hero, About, Experience/CV, résumé, contact, `Person` schema, page titles.

**Never:** "we" (AXIOM is one person) · `Organization` schema · "AXIOM Studio/Agency/Creative" · "Drake" standing alone as the brand.

### The "Drake" sweep — read this before running find-and-replace

There are 17 occurrences of "Drake" in the repo. **All 17 are legitimate and must stay.** They are bio copy, meta descriptions, `alternateName` in the JSON-LD, and a client testimonial video titled *"Working With Drake Stevanovic"*. Client wording is never edited.

The string that actually needs replacing is the placeholder brand:

| File | Current | Action |
|---|---|---|
| `index.html`, `about.html`, `contact.html`, `services.html`, `videos.html`, `websites.html`, `website-single.html`, `404.html` | header logo `Studio<span>.</span>` | replace with the `.ax-logo` markup in §6 |
| same files | footer logo `Studio<span>.</span>` | replace with the `.ax-logo` markup in §6 |
| `README.md` | title `# Studio Craft — Portfolio` | `# AXIOM — Dušan "Drake" Stevanović` |
| all pages | footer copy `The independent practice of…` | keep the sentence; it is accurate and on-brand |

---

## 3. Colour

Replace the palette. Seven values, no gradients.

| Token | Hex | Role | Contrast on bg |
|---|---|---|---|
| `$ax-obsidian` | `#0A0A0B` | primary background | — |
| `$ax-carbon` | `#121215` | secondary surface, cards, footer | — |
| `$ax-line` | `#242428` | borders, construction lines | — |
| `$ax-stone` | `#7E7970` | secondary text | 4.9:1 |
| `$ax-bone` | `#C4BFB4` | body copy | 11.5:1 |
| `$ax-ivory` | `#F2EEE6` | primary text, symbol | 17.6:1 |
| `$ax-champagne` | `#C8B79A` | **sole** accent | 10.3:1 |

`$ax-champagne-deep: #9A8A6E` exists for press/visited states only. It is not a second accent.

### How to apply it — do not rename variables

The repo's `$gold`, `$paper`, `$black`, `$muted`, `$slate`, `$line` are referenced across roughly 30 partials. **Keep the names, change the values.** Two files do the whole job:

1. **Add** `scss/base/_axiom-tokens.scss` (provided in this package) — defines the AXIOM values.
2. **Replace** `scss/base/_variables.scss` (provided) — maps the existing names onto those tokens.

No component, layout or page partial needs to change for the colour swap. That is the point.

### ⚠ Champagne is louder than the gold it replaces

Old `$gold` `#A48442` was ~4.4:1. New champagne is 10.3:1 — noticeably brighter and more present. Every existing `$gold` usage becomes more prominent. **Do not port them one-for-one.** The AXIOM rule is one accent moment per viewport.

Audit these specifically:
- `scss/main.scss` → `.scroll-progress` background (2px band across the top; at 10.3:1 this now reads as a bright line — consider `$ax-champagne-deep` or reducing to 1px)
- `scss/layout/_footer.scss` → `.footer__cta-headline em` (a large italic word at clamp up to 8rem — will now be very loud; keep it, but it becomes that viewport's single accent moment, so nothing else in the footer CTA may use champagne)
- `scss/components/_buttons.scss` → `.btn--circle:hover` background and `.btn--gold`
- `scss/base/_typography.scss` → `.eyebrow::before` (a 2rem rule before every eyebrow, site-wide — this is the highest-frequency accent usage in the codebase; see §5)
- `scss/base/_reset.scss` → `::selection` and `:focus-visible` outline (both fine; leave them)

---

## 4. Typography

| Role | Family | Replaces | Weights used |
|---|---|---|---|
| Display / headings | **Newsreader** | Cormorant Garamond | 200, 300 only |
| Body / UI / nav | **Archivo** | DM Sans | 400, 500, 600 |
| Technical / labels | **IBM Plex Mono** | DM Mono | 400, 500 |
| AXIOM wordmark **only** | **Bellefair** | — | 400 |

All four are Google Fonts. Replace the font `<link>` in every page `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..400&family=Archivo:wdth,wght@62..125,400..600&family=IBM+Plex+Mono:wght@400;500&family=Bellefair&display=swap" rel="stylesheet">
```

Notes for the implementer:
- **Newsreader at 200/300 only.** The repo already sets `font-weight: 300` on every `.t-*` display class — that is correct and needs no change. Do not go to 400+; it stops reading as editorial.
- **Newsreader is optically sized** (`opsz` 6–72). It sets tighter at large sizes automatically. Do not fight it with letter-spacing; the existing `-0.02em` on `.t-display` / `.t-headline` is right.
- **Archivo is variable** on width (62–125) and weight. Interface uses width 100 (the default). Width 125 is reserved for display lockups and applied with `font-variation-settings: 'wdth' 125`, not `font-stretch`.
- **Bellefair is for the wordmark and nothing else.** Never body, never UI, never a heading.
- Cormorant and DM Sans have different metrics to Newsreader and Archivo. Newsreader has a larger x-height than Cormorant, so headings will look slightly bigger at the same `font-size` — expect to check, but not necessarily change, the `clamp()` values in `scss/base/_typography.scss`.

### Type scale — keep the repo's, it is already correct

`scss/base/_typography.scss` has a working scale (`.t-display`, `.t-headline`, `.t-title`, `.t-subtitle`, `.t-lead`, `.t-body`, `.t-small`, `.t-label`, `.t-mono`, `.eyebrow`, `.section-num`). It maps cleanly onto the brand guide's spec. **Change the families via the variables, leave the sizes and line-heights alone.**

---

## 5. Structural decisions — the repo wins

The brand guide sketched some values before the codebase was available. The repo's are more accurate. Use these:

| Item | Use the repo's | Not the guide's |
|---|---|---|
| Max width | `1440px` | 1320px |
| Gutter | `2rem` / `4rem` at `lg` | 24px |
| Breakpoints | 640 / 768 / 1024 / 1280 / 1440 | — |
| Reveal easing | `$ease-out: cubic-bezier(0.16, 1, 0.3, 1)` | identical — already matches |
| Eyebrow | existing `.eyebrow` with gold `::before` rule | the guide's re-spec |
| Section spacing | `$space-*` scale + `$space-section` | — |
| Reveal system | `[data-reveal]` + `IntersectionObserver` in `js/animations.js` | — |

The guide's **column logic** still applies on top of the repo's grid: editorial content in columns 4–9, section numbers hanging in column 1, technical labels right-aligned in column 12. Asymmetry comes from which columns are left empty, never from arbitrary offsets.

### The existing `.eyebrow` is the architectural device

`scss/base/_typography.scss` already defines `.eyebrow` as an uppercase label preceded by a 2rem gold rule. That *is* the brand guide's "technical label + construction line" device, already built and already used site-wide. Keep it. Two consequences:

1. It becomes the champagne accent on most viewports. So on any screen with an eyebrow, that is the accent — nothing else there gets champagne.
2. The guide asks for eyebrows in IBM Plex Mono. The repo sets `.eyebrow` in `$font-body`. **Switch `.eyebrow` and `.t-label` to `$font-mono`** — this is the one deliberate change to the existing type classes, and it is what makes the labels read as instrumentation rather than UI text.

### The custom cursor — keep it, one exception

`scss/base/_reset.scss` sets `cursor: none` on `body` and `button`, with `js/cursor.js` drawing a ring + dot. This does not conflict with the AXIOM design and must not be removed.

**The single genuine conflict:** a password input needs a visible text caret. `_axiom-brand.scss` restores `cursor: text` on `.ax-gate__input` only. Nothing else changes, and `js/cursor.js` is untouched.

Also note `js/cursor.js` disables itself on touch devices already — no work needed.

---

## 6. Logo

### The artwork is the owner's and is not to be redesigned

`assets/brand/_source/axiom-logo-supplied.svg` is the file the owner supplied, preserved byte-for-byte. Everything else was derived from it mechanically:

| File | What it is |
|---|---|
| `axiom-symbol.svg` | The octopus. Three paths from the source, translated to a tight `265.632 × 273.116` viewBox, single fill, `currentColor`. **No contour was redrawn.** |
| `axiom-symbol-micro.svg` | The identical outline with every contour stroked at 14 units, round joins/caps. This thickens the tentacle tips and terminal curls so they survive small sizes. Same silhouette, not a new drawing. |
| `axiom-wordmark.svg` | AXIOM in Bellefair Regular, default tracking, as supplied. |
| `axiom-logo.svg` | Stacked lockup, proportions measured from the source. |
| `axiom-logo-horizontal.svg` | Horizontal lockup. |

Place all of these in `assets/images/brand/` in the repo (matching the existing `assets/images/{projects,about,videos}/` convention), or `assets/brand/` — pick one and be consistent. Keep `_source/` in the repo; do not delete the original.

### Geometry measured from the supplied file

These are not invented ratios — they were read off the owner's artwork:

- Symbol: `265.632 × 273.116` (aspect `0.97259`)
- Wordmark: Bellefair Regular at `211.611px`, cap height `143`, ink width `712.922`, **no letter-spacing**
- The wordmark ink is **optically centred on the symbol** — measured offset was `0.33` units, i.e. centred
- Gap from symbol bottom to wordmark cap-top: `46.834` units = `0.1715 ×` symbol height
- Symbol height ÷ wordmark font-size = `1.2907`
- Wordmark ink width ÷ symbol width = `2.6839`

Use the `$ax-lockup-*` tokens rather than eyeballing.

### Markup — replace the header logo with this

```html
<a href="index.html" class="ax-logo ax-logo--header" aria-label="AXIOM — Dušan Stevanović">
  <svg class="ax-logo__symbol" viewBox="0 0 265.632 273.116" aria-hidden="true" focusable="false">
    <use href="assets/images/brand/axiom-symbol.svg#symbol"></use>
  </svg>
  <span class="ax-logo__word">AXIOM</span>
</a>
```

Two implementation notes:

1. **The wordmark should be live HTML text, not SVG,** on the website. It is selectable, accessible, scales with no raster step, and the site is loading Bellefair anyway. The SVG wordmark files exist for print and third-party use.
2. **`<use href="external.svg#id">` does not work cross-browser.** Either inline the symbol paths once per page (an SVG sprite in a hidden `<svg>` block near `<body>` open, then `<use href="#axiom-symbol">`), or use `<img src="…/axiom-symbol.svg">` and lose `currentColor`. The sprite approach is recommended because the header logo needs to inherit colour on hover. `_axiom-brand.scss` assumes `fill: currentColor`.
3. **Below `lg` the header shows the symbol alone.** `.header__logo` currently holds text only; the mobile breakpoint should drop `.ax-logo__word` rather than shrink the lockup.

### Rules

- Clear space on every side = half the symbol height, measured from the artwork bounding box.
- Minimum sizes: full symbol `40px` screen / `18mm` print; micro mark `16px`; horizontal lockup `120px` wide; stacked lockup with name + title `180px` wide.
- **Below 40px the micro mark replaces the symbol** — the full symbol is never scaled smaller, and never simplified on the fly.
- Never: outline-only, rotated, mirrored, tilted, gradient, glow, bevel, shadow, or filled with imagery.
- Never near waves, anchors, ropes, bubbles, compasses or water. The symbol appears against grids and architecture.
- Never add eyes, expression or character detail.

### ⚠ SVG masters and font outlining

`axiom-wordmark.svg`, `axiom-logo.svg` and `axiom-logo-horizontal.svg` contain the wordmark as a live `<text>` element with `font-family="Bellefair"`. They render correctly in a browser (which fetches the webfont) and in the site itself, but **will fall back to a default serif in Illustrator, Figma or a print workflow without Bellefair installed.**

Before these are used as distributable masters, the text must be converted to outlines in a vector editor. This is a two-minute manual step that cannot be done in a browser environment, and it is listed in §11 as an outstanding item. It does **not** block the website implementation, which uses live text by design.

---

## 7. Favicon and micro branding

Source: `axiom-symbol-micro.svg`.

Test at 16, 24, 32 and 48px before shipping. Generate:

```
favicon.ico              16 + 32 + 48 multi-size
favicon-32.png           32×32, ivory on obsidian
apple-touch-icon.png     180×180, obsidian symbol on ivory ground
```

The touch icon inverts — obsidian symbol on an ivory field — because iOS places it on unpredictable wallpapers. Add to every page `<head>`:

```html
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="assets/images/brand/axiom-symbol-micro.svg">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="theme-color" content="#0A0A0B">
```

---

## 8. Password gate

New component. Markup, styles and behaviour below; SCSS is in `scss/components/_axiom-brand.scss`.

### Hierarchy

Symbol → AXIOM → rule → `Dušan "Drake" Stevanović` → title → field → ENTER. Corner metadata: `PRIVATE PORTFOLIO` top-left, `ACCESS REQUIRED` top-right (champagne), `BELGRADE` and `11+ YEARS · 500+ PROJECTS` bottom corners. Two vertical construction lines at 22% left and right.

This is access to a private body of work, not an admin login. No "Sign in", no "Username", no card, no logo-above-a-box layout.

### Markup

```html
<div class="ax-gate" id="ax-gate">
  <span class="ax-gate__line ax-gate__line--l"></span>
  <span class="ax-gate__line ax-gate__line--r"></span>

  <div class="ax-gate__meta">
    <span>Private portfolio</span>
    <span>Access required</span>
  </div>

  <div class="ax-gate__inner">
    <div class="ax-logo ax-logo--stacked">
      <svg class="ax-logo__symbol" viewBox="0 0 265.632 273.116" aria-hidden="true"><use href="#axiom-symbol"></use></svg>
      <span class="ax-logo__word">AXIOM</span>
    </div>

    <div class="ax-identity">
      <div class="ax-identity__rule"></div>
      <p class="ax-identity__name">Dušan &quot;Drake&quot; Stevanović</p>
      <p class="ax-identity__title">Senior Web Designer · Front-End Developer<br>Technical Lead</p>
    </div>

    <form class="ax-gate__form" id="ax-gate-form">
      <label for="ax-gate-input" class="sr-only">Portfolio password</label>
      <input class="ax-gate__input" id="ax-gate-input" type="password" placeholder="••••••••" autocomplete="current-password">
      <button class="ax-gate__submit" type="submit">Enter</button>
    </form>

    <p class="ax-gate__note" id="ax-gate-note">Access by request</p>
  </div>

  <div class="ax-gate__foot">
    <span>Belgrade</span>
    <span>11+ years · 500+ projects</span>
  </div>
</div>
```

`.sr-only` already exists in `scss/base/_helpers.scss`.

### Behaviour — `js/gate.js`, new module

Follow the existing module pattern exactly (revealing-module IIFE, `init()`, jQuery, registered in `js/main.js`):

```js
const Gate = (function () {
  const KEY = 'axiom_access';
  function init() { /* … */ }
  return { init };
})();
```

- Unlock persists in `localStorage` under one key. On a returning visit with a valid token, the gate is not rendered at all — no flash.
- **Success (640ms):** add `.is-unlocked`. The symbol mask-reveals outward, the two construction lines sweep to the viewport edges, then the gate fades. Concept: AXIOM → access → system → work.
- **Failure:** add `.is-error`. The field border goes champagne for 200ms and the note text changes. **No shake, no red, no toast.** Then remove the class.
- **Reduced motion:** `prefers-reduced-motion` collapses this to a 120ms opacity fade. Handled in the SCSS.

**Security note, state it to the owner:** a client-side gate is presentation, not protection. Anyone can read the source. If the work genuinely needs protecting, it has to be server-side (`.htaccess` basic auth, a Netlify/Cloudflare Access rule, or a serverless function). The design is identical either way — only where the check runs changes.

---

## 9. Preloader

The repo already has `Loader` in `js/utils.js` toggling `.is-hidden`, and an empty `scss/components/_loader.scss` (36 bytes). Fill that in — or take the `.loader` block from `_axiom-brand.scss` — and reuse the existing JS untouched.

The preloader is the symbol clip-revealing from the bottom, at 60% scale, no wordmark, capped at 900ms, once per session. `Loader.init()` currently has a 900ms delay plus a 2.5s fallback; leave the timing logic alone.

---

## 10. Motion

| Token | Value |
|---|---|
| State | 120ms |
| Element | 320ms |
| Section | 520ms |
| Page transition | 640ms |
| Preloader cap | 900ms |
| Stagger between siblings | 60ms, max 5 then move as a group |
| Reveal easing | `cubic-bezier(0.16, 1, 0.3, 1)` — the repo's existing `$ease-out` |
| State easing | `cubic-bezier(0.4, 0, 0.2, 1)` — the repo's existing `$ease-in-out` |

Vocabulary: clip-path wipes along a grid axis, line draws, mask reveals, opacity, translate under 24px. Interface motion runs on the grid, never diagonally. No overshoot, no elastic, no bounce.

**The one organic exception:** the symbol alone may move off-axis — a slow mask reveal from the mantle outward, arms resolving last. Never swimming, never looping, never a cartoon. Once per session.

**Reduced motion:** `prefers-reduced-motion: reduce` collapses every duration and replaces reveals with a 120ms opacity fade; the preloader is bypassed. The repo does not currently implement this — `README.md` lists it as a to-do. **Add it.** The `[data-reveal]` block in `scss/base/_helpers.scss` and the `.img-reveal` transform are the two places that need a guard.

Motion never delays access to the work. If an animation blocks reading for more than half a second, cut it.

---

## 11. Rigid × organic — the one brand device

A perfect grid, entered by one organism. The grid is never distorted to accommodate the symbol; the symbol is never geometricised to fit the grid. They occupy the same frame, and the symbol is allowed to crop off an edge.

`.ax-organic` in `_axiom-brand.scss` handles placement. Rules:

- **At most one per page section**, and not on every section.
- Never inside a project card, never over a testimonial screenshot, never behind body copy.
- Champagne, cropped, desktop only (it hides below `md`).
- If a screen already has an eyebrow rule, that screen's accent is spent — an organic interruption there needs the eyebrow removed or the interruption dropped.

Photography stays as it is: contemporary architecture, glass, concrete, steel, structural shadow, dramatic natural light. No filters, no duotone. Nothing maritime, anywhere, ever.

---

## 12. Metadata, SEO and schema

`index.html` already has `Person` schema with `"alternateName": "Drake"`. Extend rather than replace:

```json
{
  "@type": "Person",
  "name": "Dušan Stevanović",
  "alternateName": ["Dusan Stevanovic", "Drake", "Drake Stevanovic"],
  "jobTitle": "Senior Web Designer, Front-End Developer, Technical Lead",
  "brand": { "@type": "Brand", "name": "AXIOM" }
}
```

`Person` only. AXIOM is a `Brand` **on** the Person — never an `Organization`. The person stays the searchable entity.

Page titles lead with the person:

```
Dušan Stevanović (Drake) — Senior Web Designer & Front-End Developer
```

Do not optimise primarily for "AXIOM" — the professional must remain findable by name. Do not keyword stuff.

### Domain readiness

No domain or email is decided yet, and none may be invented. Canonical URL, `og:url`, `og:image`, the schema `url` and the contact address must each be a **single value set in one place** — a head partial or a documented find-and-replace list in the repo README — so an AXIOM domain can be adopted later without touching templates. The repo currently has `hello@yourdomain.com` placeholders; leave them as placeholders and list them.

Open Graph image: 1200×630, obsidian, the grid, the symbol cropped at the right edge in champagne, AXIOM lower-left with the name and title beneath. The brand guide (§ Applications) shows the composition.

---

## 13. Files

### In this package

```
design_handoff_axiom/
├── README.md                                  ← this file
├── design/
│   ├── AXIOM Brand Guide.dc.html              ← visual source of truth, open in a browser
│   ├── asset-proof.html                       ← every asset at every size, for sign-off
│   └── support.js                             ← runtime for the guide (not for the site)
├── assets/brand/
│   ├── axiom-symbol.svg
│   ├── axiom-symbol-micro.svg
│   ├── axiom-wordmark.svg
│   ├── axiom-logo.svg
│   ├── axiom-logo-horizontal.svg
│   └── _source/axiom-logo-supplied.svg        ← owner's original, preserve
└── scss/
    ├── base/_axiom-tokens.scss                ← NEW file
    ├── base/_variables.scss                   ← REPLACES the existing one
    └── components/_axiom-brand.scss           ← NEW file
```

`design/AXIOM Brand Guide.dc.html` is a **design reference**, not production code. Open it in a browser to see intent. Do not copy its markup into the site — it is a single-file document with inline styles, deliberately unlike the repo's architecture.

### To create in the repo

```
scss/base/_axiom-tokens.scss
scss/components/_axiom-brand.scss
js/gate.js
assets/images/brand/*.svg
favicon.ico, favicon-32.png, apple-touch-icon.png
```

### To modify in the repo

| File | Change |
|---|---|
| `scss/base/_variables.scss` | replace with the provided version |
| `scss/main.scss` | add `@import 'components/axiom-brand';` under Components |
| `scss/base/_typography.scss` | `.eyebrow` and `.t-label` → `$font-mono` |
| `scss/components/_loader.scss` | fill in (currently a 36-byte stub) |
| `scss/base/_helpers.scss` | add the `prefers-reduced-motion` guard |
| `js/main.js` | register `Gate.init()` |
| all 8 HTML pages | font `<link>`, favicon block, header logo, footer logo, `<title>`, meta description, OG tags |
| `index.html` | JSON-LD schema, hero eyebrow |
| `about.html` | opening line (§14) |
| `README.md` | retitle from "Studio Craft" |

Then recompile: `sass scss/main.scss assets/css/main.css`

---

## 14. Copy changes

Only two. Everything else in the site's copy stays.

**`about.html` line ~101** currently opens `I'm Dusan "Drake" Stevanovic — a senior web designer and front-end developer…`. Prepend one sentence, then keep the existing first-person copy verbatim:

> AXIOM is the personal portfolio and professional identity of Dušan "Drake" Stevanović — Senior Web Designer, Front-End Developer and Technical Lead.

Then straight into the existing text. Never "we". No second paragraph explaining the nickname or the octopus — the etymology lives in the brand guide, not on the site.

**`index.html` line ~146** already has `<span class="eyebrow">Dusan "Drake" Stevanovic</span>` above the hero headline. That is exactly right — it establishes the person in the first line a recruiter reads while AXIOM holds the header. **Leave the hero headline alone.** Consider adding the diacritics (`Dušan Stevanović`) with the ASCII form retained in `alternateName` for search.

---

## 15. Outstanding — needs the owner, not the developer

1. **Micro mark sign-off.** The thickened variant is a derivation of the owner's artwork, but it is the one file that is not byte-identical to what was supplied. Open `design/asset-proof.html` — it shows both versions side by side at 16–96px — and get approval before it becomes the favicon.

   Stroke weight was chosen by test, not by guess: 9u was still too thin at 24px, 20u merged the tentacle gaps into a blob. **14u** holds the arm separation down to 24px. Be straight with the owner about the limit: at 16px the mark is a dense, balanced silhouette — recognisably the same object, but no longer readable as an octopus. That is normal for a favicon at that size and is why the minimum-size rule exists; if he wants literal octopus legibility at 16px, the only route is a genuinely redrawn 6-arm mark, which he has explicitly ruled out.
2. **Wordmark outlining.** The three lockup SVGs need their `<text>` converted to paths in a vector editor for print/third-party use. Not a blocker for the website.
3. **Domain and email.** Not decided. Do not invent either.
4. **Server-side gate.** Decide whether the password gate is presentational or real (§8).
5. **Open Graph image.** Needs rendering to a 1200×630 PNG once the logo is in the repo.
6. **Testimonial screenshots.** The brief references `assets/images/testimonials/` and a dedicated testimonials page; neither exists in the repo yet. The screenshots need to be supplied before that page can be built.

---

## 16. QA before it ships

- [ ] Contrast: champagne on obsidian, stone on carbon, bone on carbon — all pass AA
- [ ] Symbol legible at 16, 24, 32, 48px; micro mark used below 40px everywhere
- [ ] Header lockup at 320px, 768px, 1024px, 1440px, 1920px — word drops below `lg`
- [ ] Favicon renders in a real browser tab, light and dark OS themes
- [ ] Touch icon on an iOS home screen
- [ ] `prefers-reduced-motion` genuinely suppresses the preloader and reveals
- [ ] Password gate: caret visible, unlock persists, failure state has no shake or red
- [ ] Custom cursor still works on every page; not broken by the gate
- [ ] Every "Drake" mention still present and unedited, testimonial video title intact
- [ ] No `Organization` schema anywhere; no "we" in any copy
- [ ] No gradient anywhere in the compiled CSS (`grep -i gradient assets/css/main.css` → empty)
- [ ] One champagne accent moment per viewport, page by page
