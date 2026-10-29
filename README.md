# JNR Corporations — Native Web Edition

An original, fully static technology-brand homepage using **HTML, CSS and Vanilla JavaScript ES modules**. No framework, bundler, npm dependency, animation library, backend, or build step.

## Run locally

From the folder containing index.html:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080. A simple HTTP server is required for JavaScript ES modules; opening index.html directly through file:// can block module loading. The full static content is still in HTML.

## Deploy

Upload `index.html`, `css/`, `js/`, and `assets/` together to any static host. Keep their relative paths intact. No build command is needed.

**Vercel:** choose framework preset `Other`, select the folder containing index.html as the root, leave Build Command empty and use `.` as Output Directory. No environment variables required. The included `vercel.json` has no build configuration.

The hosted Sites edition serves a byte-for-byte copy of those four source items from `dist/`. That directory is deployment packaging, not compiled output; it is not required for conventional hosting.

## Structure

- `index.html`: complete semantic content and no-JavaScript fallback; static SEO metadata.
- `css/tokens.css`: colors, spacing, typography, radii, shadows, durations.
- `css/base.css`: reset, semantics, shared controls and accessibility.
- `css/layout.css`: navigation, common layouts and signature footer.
- `css/components.css`: orbit, product mockup and small visual systems.
- `css/sections.css`: scene-specific art direction.
- `css/motion.css`: reveals, opening motion and reduced-motion styles.
- `css/responsive.css`: desktop, tablet and Android adaptations.
- `js/config.js`: central content, projects, navigation, contacts and motion flags.
- `js/content.js`: safe text/data rendering and metadata hydration.
- `js/project-renderer.js`: data-driven project showcase and asset fallback.
- `js/scroll-engine.js`: event-driven scene registration, measurement and update lifecycle.
- `js/navigation.js`: responsive navigation, focus handling and active states.
- `js/launch.js`, `typewriter.js`, `reveals.js`, `interactions.js`, `footer.js`: focused behavior modules.
- `js/main.js`: initialization, motion preference changes and lifecycle cleanup.
- `docs/RESEARCH.md`: five-reference research matrix, scope of observations and creative plan.
- `docs/QA.md`: actual verification and limitations.

## Edit text

Edit `JNR_CONFIG` in `js/config.js`. Hero lines, typewriter phrases, navigation labels, section copy, projects, technologies, process and contacts read from that object. Preserve `\n` where a deliberate line break is desired. The manifesto uses a specially composed three-line default; changing its configured title renders the replacement as ordinary text with natural wrapping.

Important: `index.html` contains the initial, no-JavaScript edition. Keep its fallback content aligned when making permanent copy changes. This deliberate duplication ensures content exists before JavaScript runs, without introducing a build tool. Browser-side updates cannot rewrite a file on your server.

## Add a project

Add another object to `JNR_CONFIG.projects`:

```js
{
  id: 'unique-project-id',
  name: 'Your project name',
  description: 'An accurate description of the project.',
  category: 'WEB APPLICATION',
  technologies: ['JavaScript', 'Browser APIs'],
  image: 'assets/images/your-screenshot.webp',
  url: '',
  featured: false
}
```

Set url only when a real destination exists. Featured entries sort first. New projects render automatically; no layout or engine edits needed. Missing URLs hide the exploration link. Broken or absent images fall back to a typographic identity panel. JNR PDF Studio has its own representative HTML/CSS interface; it is labeled as a mockup, not a genuine product screenshot. Its interface tiles illustrate existing document workflows and are not pretend functional controls.

To update the no-JavaScript project list, add matching semantic HTML to `#project-list` in index.html.

## Change colors

Edit `--accent`, `--accent-light`, `--accent-bright` and the other named variables in `css/tokens.css`. All important colors use tokens. Some neutral alpha borders use fixed black transparency; these are structural contrast rather than brand colors. Also update the static favicon, share image and theme-color metadata when changing the identity.

## Change motion

Independent flags in `JNR_CONFIG.motion`:

- `enabled`: master switch.
- `launchEnabled`: short non-blocking session-based launch signature.
- `typewriterEnabled`: supporting phrase loop.
- `revealsEnabled`: IntersectionObserver entrances.
- `scrollEffectsEnabled`: progress-driven scene effects.
- `parallaxEnabled`: selected desktop layer movement.
- `stickyScenesEnabled`: pinned system and horizontal philosophy scenes.
- `pointerEffectsEnabled`: bounded desktop pointer response.

Timing controls include launchDuration, typeSpeed, eraseSpeed, phrasePause and revealDuration. More elaborate motion is disabled when prefers-reduced-motion is set. At <=800px, sticky and horizontal scenes become normal vertical content. System reduced-motion changes are handled without reloading.

The scroll engine exposes `register({element, pinned, measure, update, cleanup})`. Measurements are cached until resize/content size changes. Scroll events schedule at most one animation frame, with no continuously running loop. Offscreen scenes are skipped. Timers and animations pause on hidden tabs. `main.js` exports `destroy()` for full teardown; pagehide cleans up motion and pageshow restores it for back/forward cache use.

## Replace visuals and logo

- Wordmark: `brand.logo` in config plus static `[data-brand-logo]` fallbacks in HTML.
- Hero/core SVG mark and footer signature: edit the explicit SVG/text compositions in index.html. These are art-directed variations and are not automatically replaced by the small wordmark setting.
- Project image: add a real screenshot to `assets/images` and set its config image path.
- Favicon: `assets/icons/favicon.svg`.
- Share preview: `assets/images/share.png` (1200 × 630).

## Configure contact and external links

`links.email`, `links.github`, `links.website` and `links.social` start empty because no verified contact destinations were provided. Email is an address without mailto. Social entries use `{label:'Profile name', url:'https://your-real-profile'}`. Only valid configured destinations render; there is no nonfunctional form. The known project URL is https://jnr-pdfs.vercel.app/.

## SEO and domain

Set `brand.domain` and the seo fields in config. Also update the static canonical, og:url, og:image, title, description and theme-color in index.html so non-JavaScript crawlers receive the correct data. The supplied domain is the generated owner-private preview origin, not an invented official company domain. Move to a public host/domain before expecting public WhatsApp or Instagram crawlers to retrieve a share image.

## Accessibility and practical limits

Semantic sections, one h1, keyboard focus indicators, a skip link, menu focus loop, Escape support, reduced motion and complete static HTML are included. The mobile menu closes after navigation and focuses its destination. The site does not use tracking, third-party scripts, external fonts, or a service worker.

No claims are made about unmeasured Lighthouse scores, physical Android frame rates, or the availability of external destinations. Research observations and validation boundaries are documented in docs/.
