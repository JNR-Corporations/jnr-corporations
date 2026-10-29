# Reference study and creative direction

Research date: 29 October 2026. The five official homepages below were opened through web retrieval and visually inspected in a live desktop browser. Observations refer to the current rendered first-screen composition and accessible page structure, not source-code inspection or measured animation timings. No reference assets or branding were copied.

| Reference                                               | Observed strengths                                                                                          | Layout / motion opportunity                                    | Adapt for JNR                                                   | Deliberately avoid                                            |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| [Google for Developers](https://developers.google.com/) | Compact utility navigation; large concise introduction; illustrated platform discovery; explicit categories | Clear content paths, product illustration with attached action | Product-first navigation and practical categories               | Google's ecosystem scale, logos and announcements             |
| [Google Design](https://design.google/)                 | Dark editorial spread; large left headline paired with expressive right image                               | Magazine-like asymmetry and light/dark rhythm                  | A strong visual chapter with a single narrative purpose         | Its imagery, editorial titles and exact composition           |
| [Linear](https://linear.app/)                           | Large left-aligned type; carefully bounded dark product canvas; restrained UI hierarchy                     | Product presentation with layered detail                       | Fine borders, clear hierarchy and one substantial product story | Fake activity data, dense dashboard decoration                |
| [Vercel](https://vercel.com/)                           | Bright open hero; central geometric brand symbol; compact navigation and distributed supporting text        | Geometry serves as the identity rather than background filler  | JNR orbit, grid coordinates and restrained precision            | Triangle mark, customer logo strip and copied copy            |
| [Stripe](https://stripe.com/)                           | Large multi-line message; layered colored form crossing the layout; strong grid boundaries                  | Foreground/background depth and visual continuity              | Layered product documents and a brand signal joining chapters   | Multicolor ribbons, financial claims and unrelated product UI |

The motion ideas above are design decisions inferred from the compositions. This study does not claim to have reverse-engineered or exhaustively tested the references' animations.

## JNR scene plan

1. Warm-white introduction: asymmetric typography + architectural orbit. A short non-blocking entrance establishes the identity.
2. Editorial manifesto: progressively emphasized lines, with all copy remaining legible.
3. Dark brand system: a short sticky scene assembles purpose, engineering and experience around the JNR core; SVG points interpolate into a structured arrangement.
4. Featured work: a representative document interface composes itself from separated layers. The visual is explicitly labeled, not presented as an actual screenshot.
5. Development focus: varied diagrams and editorial rows instead of another card grid.
6. Philosophy: desktop vertical scrolling advances a horizontal rail; phone/reduced-motion fallback presents every principle vertically.
7. Technology: connected typographic nodes, scoped by the actual toolkit.
8. Process: an advancing line connects five practical stages.
9. Builder: a quiet human-facing editorial section.
10. Future: a large signal folds back into the brand mark without invented release promises.
11. Contact: configured destinations only.
12. Closing: a full-width JNR signature, navigation and back-to-top.

Motion limits: no scroll hijacking, one event-driven requestAnimationFrame scheduler, cached measurements, offscreen scene pruning, hidden-tab pause, and independently configurable features. At <= 800px pinned and horizontal scenes become ordinary vertical content. Reduced motion is a first-class static layout.
