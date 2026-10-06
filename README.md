# Memes Database

A frontend meme collection using Expo Router, React Native, TypeScript, and Sass. The centered hero and sliding meme cards follow the selected purple night concept. Light mode uses the ivory, violet, coral, and pistachio palette; dark mode uses the purple night palette. The Light Corner Overlay logo is the adopted identity. Local backgrounds and photo/illustration card assets are derived from the approved mockups, retaining their glows, organic waves, doodles, and handwritten watermark motifs.

## Use the app

Use Node 24.21.0 (pinned for Volta), or another Node release matching the package engine requirement. The older global Node 22.6.0 does not meet the Expo/React Native toolchain's minimum.

```sh
npm install
npm run web
```

Browse the collection, search or filter by category, save favorites, and add your own memes with captions and an image. Local memes can be edited and deleted. The homepage carousel includes previous/next, pagination, and motion controls. Theme preferences, saved IDs, and added memes remain on the current browser or device.

The app includes Home, Discover, Categories, Saved, Add Meme, meme details, About, Contact, Terms, and Privacy pages. Common informational aliases redirect to the canonical pages. The header becomes translucent while scrolling, and the scroll-to-top control appears after the hero.

## Local persistence

- `src/shared/config.ts` contains the single `useLocalStorage` switch, enabled by default. No backend, account system, telemetry, or external API is connected.
- The shared adapter uses `localStorage` on web and AsyncStorage on native. The internal asynchronous API is a replaceable service boundary, not an HTTP server.
- Local records, bookmark IDs, and the monotonic record counter share a versioned storage document. Corrupt saved data and quota failures surface as errors instead of being silently replaced.
- `showSampleMemes` controls the separate, immutable sample collection. Samples use original local graphics and are never inserted into or used to repopulate the saved local collection. Their IDs stay stable when presentation assets change, preserving existing bookmarks.
- App-owned IDs follow `Type_Number_Name_Date_UUID`; record numbers and IDs remain stable while editing.
- Clearing browser/site data or uninstalling the app can remove the local collection. No cloud backup or synchronization is provided. Images added by URL remain dependent on the image host; uploaded images are stored locally within the available storage quota.

## Web and PWA

```sh
npm run export:web
```

Serve the resulting `dist/` on an HTTPS custom domain. Static hosting should resolve extensionless routes to their exported HTML pages and preserve query strings. Meme details use `/meme?id=...`, so locally created records do not require new static routes. The manifest provides installation metadata and the production-only service worker caches the app shell, local assets, and visited pages. The service worker is disabled during development. Installability and offline behavior are intended for production HTTPS hosting.

The project also includes native route fallbacks and device storage; the complete visual design is web-first. Use `npm run ios` or `npm run android` for the native entry points after setting up the corresponding Expo environment.

## Structure

```text
app/                  Thin Expo Router pages and aliases
src/api/              Asynchronous local service boundary
src/components/       Rendering, component hooks, and styles
src/shared/           Models, storage, data, routes, and contexts
src/styles/           Global Sass and typed theme palette
public/               Local illustrations, brand, and PWA files
assets/brand/         Adopted editable SVG logo
assets/concepts/      Preserved logo and landing mockup rounds
```

## Review status

Mockup-derived assets and their built-in image-generation prompts are documented in `public/visuals/README.md` and `public/visuals/IMAGEGEN-PROMPTS.md`. Original mockups remain unchanged in `assets/concepts/mockups/v1/`.

Implementation and dependency setup only. Tests, type checks, builds, browser/UI checks, commits, and deployment have not been run; these are left for your review as requested in `AGENTS.md`.
