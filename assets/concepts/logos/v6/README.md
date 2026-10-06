# Memes-Database — Lighter Corner Overlay, v6

Created 6 October 2026. The user liked **M Corner Overlay** from v5, then requested less of its green circle over the M. This round shifts that selected circle slightly up and right while keeping a visible overlap with the upper-right corner. There is no gap. The circle's radius and color, and the selected stack, grin, wordmark, and original palette, remain unchanged. v1 through v5 are preserved.

## Two close placement refinements

The selected v5 circle centered at `(118, 33.5)`. Both v6 options move it toward the upper-right corner, reducing the part covering the ivory upright. The circle remains drawn after the M path, so the overlapping area remains green.

| Option | Lockup | Standalone mark | Placement from the selected v5 artwork |
| --- | --- | --- | --- |
| 01 — M Light Corner Overlay | `01-m-light-corner-overlay.svg` | `01-m-light-corner-overlay-mark.svg` | Center `(121, 30)`, radius `6.5`: move right `3` and up `3.5` units. The lighter contact exposes more of the ivory M. |
| 02 — M Balanced Corner Overlay | `02-m-balanced-corner-overlay.svg` | `02-m-balanced-corner-overlay-mark.svg` | Center `(120, 31)`, radius `6.5`: move right `2` and up `2.5` units. Slightly more contact than option 01, still less overlap than v5. |

These are placement choices for the same requested accent, not new identities. Every lockup uses the exact **Memes-Database** wordmark. Likely use remains an app icon, collection avatar, or header.

`00-concept-sheet.svg` is an editable 1600 × 1000 two-column flat comparison sheet. `00-concept-sheet.png` is its companion raster export for convenient viewing; the SVG remains the editable master. It is a design comparison, not a product mockup.

## Unchanged exact palette

- Green circle — Soft Pistachio: `#BCE3AF`
- Filing tab and backing — Indigo: `#5040DC`
- Secondary backing — Lavender: `#B8B0F1`
- Smiling card — Coral: `#FF785D`
- M and teeth — Warm Paper: `#FFF5ED`
- Expression and wordmark — Plum Ink: `#25213D`

The sheet uses Warm Paper, secondary text `#6D6370`, and rules `#DDD4D5`. Individual lockups and marks retain transparent surrounding canvases.

## Editable artwork and status

The only art edit is the circle's `cx` and `cy`. The circle retains radius `6.5`, fill `#BCE3AF`, and its layer over the M. Every SVG has an accessible title and description, plus a useful 192 × 192 viewBox for marks or 800 × 220 for lockups.

Wordmarks remain live editable text using `Avenir Next`, then `Avenir`, then `Arial`, then `sans-serif`. No font is bundled; fallbacks can change width and weight. A licensed production typeface can be chosen and outlined after adoption.

These are refinement concepts for review, with no adoption or implementation changes. No tests, builds, browser checks, or visual verification were run. No commit or push was made.
