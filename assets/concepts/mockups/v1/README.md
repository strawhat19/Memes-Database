# Memes-Database — Landing Hero Mockups, v1

Created 6 October 2026 after the user selected **M Light Corner Overlay** from logo round v6 and asked to use it as the logo. This mockup series is independent of the preserved logo rounds. The selected source SVGs have been copied unchanged into `assets/brand/logo.svg` and `assets/brand/logo-mark.svg`.

## Interactive preview

Open `interactive-preview.html` directly to explore three header and above-the-fold hero layout concepts:

1. **Cream Split** — warm paper, a large left-aligned headline, indigo primary action, and playful angled cards to the right on a lilac field.
2. **Dark Stage** — plum-ink background, centered typography, pistachio primary action, and a prominent illuminated card row beneath the copy.
3. **Editorial** — light canvas, a two-column headline-and-introduction strip, restrained dark actions, and a wide straight card carousel below.

The preview references the adopted exact logo artwork using relative paths `../../../brand/logo.svg` and `../../../brand/logo-mark.svg`. The dark layout pairs the selected unchanged mark with a readable live ivory wordmark; the source logo files are not recolored.

## Interaction scope

- Layout buttons switch the same preview between the three directions.
- Previous/next buttons and left/right arrow keys slide the meme cards. Direct-selection dots also work.
- Optional auto-play can be started or paused. It pauses on hover, when keyboard focus is inside the carousel, while a dialog is open, or when the page is hidden.
- Reduced-motion settings remove transitions and disable auto-play.
- Discover opens a small browse panel of the fictional examples; Categories jumps to a matching card. About presents the planned product idea.
- Bookmark buttons keep temporary choices only in memory while this page is open.
- Sign In and Add a Meme display explanatory notices in the surrounding concept-preview interface. They do not perform authentication or uploads.
- The header's `sticky` setting defaults to `true`; on scroll its surface gains transparency and blur. The footer includes the current year and Piratechs link. A fading scroll-to-top control appears after scrolling down.

All buttons have descriptive IDs, visible text or accessible icon labels, and native keyboard behavior. Layouts adapt to a narrow viewport; the header provides a compact navigation toggle.

## Original sample content

The six meme examples are original fictional captions and inline SVG illustrations made for this mockup: the quick-search spiral, waiting for coffee, a night-shift cat, the laundry chair, the meeting sequel, and the later folder. They are not borrowed meme photos or licensed likenesses. No real community accounts, engagement counts, testimonials, user uploads, or operational database are implied.

This is a standalone HTML artifact, not an app implementation. It uses inline CSS because a direct-open single-file preview has no Sass build step, and inline JavaScript for local interaction. There is no framework, package installation, development server, backend, persistent account storage, or publishing step.

## Brand palette and type

- Indigo `#5040DC`
- Lavender `#B8B0F1`
- Coral `#FF785D`
- Warm Paper `#FFF5ED`
- Plum Ink `#25213D`
- Soft Pistachio `#BCE3AF`

Typography uses `Avenir Next`, `Avenir`, `Arial`, and `sans-serif` fallbacks. No font is bundled. The preview wordmark retains the exact spelling **Memes-Database**.

## Raster concept mockups

- `01-cream-split-hero.png` — ivory split hero with a violet Explore Memes action and a featured meme-card carousel to the right.
- `02-night-carousel-hero.png` — night-ink hero with a wide carousel and pistachio primary action.
- `IMAGEGEN-PROMPTS.md` — the coordinating agent's exact raster-generation prompts and provenance.

These PNGs are static visual concepts; the HTML provides the independent working carousel and layout switches. Generated raster lettering and imagery are concept material, while the exact copied brand SVGs remain the canonical editable logo sources. The preview loads only local logo assets and inline original illustrations, with no external font or dependency requests.

No tests, builds, browser/UI checks, or visual verification were run. No commit or push was made. These hero layouts are concepts for review; the logo selection is adopted, while a landing-page implementation has not been selected or published.
