# Validation record

Verified in the available Chrome browser and local static preview on 29 October 2026.

## Checks performed

- JavaScript syntax: every module passes Node syntax checking. Node is a validation tool only; the delivered website does not require it.
- Static structure: unique HTML IDs, one h1, 17 internal links with existing targets, and 9 declared local assets checked.
- Framework removal: no package.json, JSX, build configuration, framework import, node_modules, or external runtime JavaScript in the delivered source.
- Desktop hero, orbit, dark system scene and horizontal philosophy visually inspected.
- Scroll-linked SVG verified: geometry changes as scroll progress advances; sticky scene top measured at 80px.
- Horizontal rail verified: scrolling changed the rail from 0px to approximately -451px while the page remained vertically scrollable.
- Responsive frame widths checked at actual document content widths 1440, 1280, 1024, 768, 430, 390 and 360 pixels. Each had scrollWidth equal to clientWidth. These are browser layout checks, not physical device tests.
- At 768px and below, system-pinned and horizontal-enabled classes are removed; mobile layout uses natural vertical sections.
- Android-sized hero and mobile menu visually inspected. Menu opens, keyboard focus cycles through its controls, Escape closes it, navigation closes it and focuses the project section.
- Reduced-motion initialization tested through an isolated fixture forcing the same `reduced` code path. It disables elaborate motion and uses unpinned, non-horizontal content. This was not an OS-level media emulation test.
- Script-free fixture contains zero module scripts and retains all 11 main sections, project links and readable heading content.
- Console inspection found no application runtime error; the browser extension emitted an unrelated metadata warning.
- Representative PDF visual is labeled and contains no pretend functional controls.
- Contact destinations are absent until configured; no invented email, social profile, company metrics or clients.

## Limits

No Lighthouse score, automated accessibility audit, Safari/Firefox compatibility run, public social-crawler fetch, physical Android frame-rate measurement, or real external project availability test is claimed. The private deployed site requires owner sign-in; local browser QA uses the static preview.

Temporary QA fixtures are excluded from the deliverable and deployment. The reduced-motion and no-script fixtures were for validation only; production uses the user's actual system preference and a normal ES module entry point.
