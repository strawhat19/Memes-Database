# Mockup-Derived App Assets

Created October 6, 2026 using the built-in image-generation tool. The approved cream and night mockups in `assets/concepts/mockups/v1/` were edit references. The original mockups and original Codex generated-image outputs remain unchanged. These are production assets for the frontend, not a new logo or mockup round.

- `hero-night-background.png`: deep purple glow, organic lower waves, small lilac stars/dots and edge doodles; product UI removed.
- `hero-cream-background.png`: cream/blush tones, lilac corner waves, green/coral doodles, handwritten background messages and smile/heart motifs; product UI removed.
- `../memes/weekend-mode.png`: original orange-cat illustration derived from the night center card.
- `../memes/one-more-tab.png`: original dog-and-laptop photo derived from the night left card.
- `../memes/monday-loading.png`: original sleepy coffee-mug graphic derived from the night right card.

Card artwork contains no captions. The app renders captions as accessible HTML; the handwritten background messages are decorative. The two background images remain as source references. The live hero uses the shared `HeroBackdrop` SVG component to combine their waves, stars, doodles, and corner messages in both themes, with palette colors changing on theme switch. All files are local; no external image service is needed. Exact generation prompts are in `IMAGEGEN-PROMPTS.md`.
