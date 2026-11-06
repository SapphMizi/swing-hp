---
version: 1
slug: "src-routes-index-tsx"
primary_target: "src/routes/index.tsx"
related_targets: []
---

# Surface: home (/)

Mode: Persuade. Visitor: a first-year student arriving from the club's SNS on a phone during spring recruiting; secondarily live-goers, OB/OG, booking requests.
Action: find how to visit a rehearsal and whom to contact (`/contact`), then the next live (`/schedule`).
Constraints: brief-pinned world (club icon, peach paper, colored pencil, no dark mode). docs/requirements.md is the source of truth. Code-led (no image generation on this machine).

## Direction contract

THESIS: The page is the club icon's sheet of peach drawing paper, enlarged. The icon's hand-drawn lettering, speech bubble, character and keyboard are the furniture; it refuses the dark jazz-club template (black, amber, glow, photo hero with gradient scrim) and the cream-plus-one-accent landing page.

OWN-WORLD: Ground #fbdcc0 paper; ink #2b1d1f for all text. Crayon fields own whole regions: green (D軍), orange (SAO), teal (TNWJO), yellow (notes, bubble). pink-deep #b0304f for links and buttons. Zen Maru Gothic heavy for English headings and body, Klee One for handwritten notes. Masking-tape photos, sticky-note dates, piano-key strips as dividers.

STORY: A student sees the drawing, understands this is a friendly big-band jazz club in Toyonaka, sees three bands as three colored sheets, sees there are real lives, and taps "見学・入部" without scrolling far.

FIRST VIEWPORT: Left/top: the icon lettering at up to 480px wide, the tagline line, and two buttons (見学・入部の案内 primary pink-deep, スケジュール secondary). Right/below: one live photo taped to the paper, rotated ~-2deg, character peeking from its corner. No photo: the lettering centers alone. Keyboard strip closes the viewport.

FORM: Brief-pinned world, no roll. Signature interaction: keyboard strip in the nav, keys press down under hover/focus; loading walks the character across the keys. seed: none (unavailable)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
