# mpak-web

Marketing site and documentation for [mpak.dev](https://mpak.dev). Astro static output.

The registry application — package pages, browse, and the authenticated console — lives in
[NimbleBrainInc/mpak](https://github.com/NimbleBrainInc/mpak) under `apps/web`. Both are served
from `mpak.dev` behind path-based routing, so links between them are root-relative.

| Path | Served by |
| --- | --- |
| `/`, `/about`, `/contact`, `/privacy`, `/terms`, `/security*`, `/publish*` | this repo |
| `/docs/*` | this repo (Starlight) |
| `/packages/*`, `/bundles`, `/login`, `/my-packages` | `mpak/code` → `apps/web` |

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # must succeed with zero errors
npm run preview
```

Links to app-owned routes (`/bundles/`, `/login/`) 404 in local dev. That is expected — they
resolve only where the edge routing is in place.

## Structure

```
src/
  config/site.ts        operator identity, GitHub links (PUBLIC_ env overridable)
  components/           shared marketing components
  content/docs/docs/    Starlight content, nested so routes land under /docs/
  layouts/BaseLayout    header, footer, and per-page SEO metadata
  lib/schema.ts         JSON-LD builders
  pages/                marketing routes
  styles/
    global.css          Tailwind v4 theme, shared verbatim with the registry app
    starlight-custom.css  docs theme
```

`src/content/docs/docs/` is nested deliberately: Starlight serves a content collection from the
site root, so one extra directory level is what puts the docs at `/docs/*` and leaves `/` to the
marketing pages.

## Design system

`src/styles/global.css` is the same Tailwind v4 `@theme` block the registry app uses. Keeping the
two identical is what makes shared chrome render the same across the routing boundary — if you
change a token here, change it there.

## Icons

Every raster icon is generated from `public/favicon.svg` — an orange `#f59e0b` disc with a black
`#0c0a0f` `m`. The tab icons (`favicon-16x16`, `favicon-32x32`, `favicon.ico`) are full-bleed and
transparent. `apple-touch-icon` and the two `android-chrome` sizes sit on a solid `#0c0a0f`, and
the Android pair is scaled to two thirds so the disc stays inside the safe zone the manifest's
`"purpose": "any maskable"` requires — full-bleed artwork gets clipped by Android's mask.

Verify a change with `npm run build`, not by eye: a long-running `astro dev` can serve a stale
Tailwind scan after pages are added, which looks like broken styling that the build does not have.
