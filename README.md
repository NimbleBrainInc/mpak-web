# mpak-web

Marketing site and documentation for [mpak.dev](https://mpak.dev). Astro static output.

The registry application — package pages, browse, and the authenticated console — lives in
[NimbleBrainInc/mpak](https://github.com/NimbleBrainInc/mpak) under `apps/web`.

**Target state, not yet live.** `mpak.dev` today serves the registry application from a single
nginx origin, and this site is not attached to it. The split below happens at cutover:

| Host | Serves | From |
| --- | --- | --- |
| `mpak.dev` | `/`, `/about`, `/contact`, `/privacy`, `/terms`, `/security*`, `/publish*`, `/docs/*` | this repo, via GitHub Pages |
| `registry.mpak.dev` | `/`, `/bundles`, `/packages/*`, `/login`, `/my-packages` — and the API at `/app`, `/v1`, `/v0.1` | `mpak/code` → `apps/web` |
| `docs.mpak.dev` | 301 to `mpak.dev/docs` ([mpak#163](https://github.com/NimbleBrainInc/mpak/issues/163)) | — |

Links from here into the registry are absolute, via `siteConfig.registryUrl` — the mirror of
`siteConfig.marketingUrl` on the app side. A root-relative `/bundles/` would resolve against
this site, which has no such route, and 404 the moment the apex is Pages.

`npm run check:links` asserts that every internal link in `dist/` — root-relative or written
against `mpak.dev` — resolves to a file the build actually produced. It is a resolution rule
rather than a list of known-bad paths, because a list only refuses what someone thought to
enumerate: the first version of this check passed a build containing three broken links,
having been taught about `href=` but not `action=` or JSON-LD.

> [!WARNING]
> Before `mpak.dev` points at Pages, **the registry must answer on its own host** — this
> returns the app, not a 404:
>
> ```
> curl -sI https://registry.mpak.dev/packages/@nimblebraininc/echo
> ```
>
> Then attach the custom domain *and* repoint DNS. Attaching alone does not move traffic;
> the DNS record is what does, and either step is reversible on a 60-second TTL.
>
> Pages cannot proxy, so doing this while `mpak.dev` still serves the registry makes this
> repo's build answer `/packages/*` and `/login` with its own 404. The gate is the deploy,
> not a merge — the code that moves the registry merges well before pods are running it.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # must succeed with zero errors
npm run check    # astro check — types and template diagnostics
npm run test     # vitest — JSON-LD builders

# typescript is held at 6.x on purpose. astro check needs the programmatic
# compiler API, which TypeScript 7's native compiler does not expose yet:
# https://github.com/withastro/roadmap/discussions/1321
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

`src/styles/global.css` carries the registry app's Tailwind v4 `@theme` block plus the handful of
component classes the marketing pages actually use — `workshop-card`, `workshop-card-gold`,
`workshop-input`, `skip-to-content`. The app's badge, select, category, prose, and skeleton systems
are deliberately absent: Tailwind prunes unused `@theme` tokens but not hand-written rules, so
carrying them would ship several KB of unreachable CSS on every page.

What has to stay in step with `apps/web` is the `@theme` block and the header/footer chrome, since
those straddle the routing boundary and a visitor crosses it without a reload. The component
classes below it are free to diverge.

## Icons

Every raster icon is generated from `public/favicon.svg` — an orange `#f59e0b` disc with a black
`#0c0a0f` `m`. The tab icons (`favicon-16x16`, `favicon-32x32`, `favicon.ico`) are full-bleed and
transparent. `apple-touch-icon` and the two `android-chrome` sizes sit on a solid `#0c0a0f`, and
the Android pair is scaled to two thirds so the disc stays inside the safe zone the manifest's
`"purpose": "any maskable"` requires — full-bleed artwork gets clipped by Android's mask.

Verify a change with `npm run build`, not by eye: a long-running `astro dev` can serve a stale
Tailwind scan after pages are added, which looks like broken styling that the build does not have.
