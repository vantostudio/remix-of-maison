# Kairos

A mechanical watch shop on Nkrumah Road, Mombasa Town, Kenya.

Kairos is a boutique storefront for mechanical watches — automatic, chronograph and
dive references, presented with the restraint the objects deserve. Obsidian dial,
champagne gold, brushed steel.

## Design system

**Lume.** One idea runs the theme: a dial's lume is invisible in daylight and
glows at night, so the accent is not a fixed colour but a material that behaves
differently depending on the light in the room. Light is coral limestone — the
warm sand tone of Mombasa Old Town. Dark is a night dive.

There is **no theme toggle.** `prefers-color-scheme` decides and `color-scheme`
tells the browser to match its own controls. Tokens are declared once per mode
in `src/styles/globals.css` and exposed through `@theme inline`, so utilities
resolve at use time rather than being frozen at build time.

| Token | Light | Dark |
|---|---|---|
| `--background` | `#f4f1ea` limestone | `#0b1013` ocean |
| `--surface` | `#fbf9f5` | `#121a1e` |
| `--foreground` | `#191612` | `#eef2f0` |
| `--accent` | `#0d7a56` patina | `#6ee7a8` lume |
| `--brass` | `#83642b` | `#d9b877` |

Every colour pairing is checked against WCAG AA in **both** schemes.

### Collection tints

Each collection carries its own colour, used at word level only — never as a
fill or a border. It lets you scan the product grid by category. Tints are
declared per scheme in `globals.css` and mapped in `src/lib/accents.ts`.

| Collection | Meaning |
|---|---|
| Automatic | lume green — the rotor is alive |
| Chronograph | ember — elapsed time |
| Dive | ocean teal |
| Field & Pilot | sky blue |
| Skeleton | violet — the mechanism revealed |
| Limited Editions | brass |

### Type

Bodoni Moda for headings, Inter for interface, JetBrains Mono for reference
numbers and prices. The scale is standard on a 16px base and **fluid**: every
step above body uses `clamp()` to grow with the viewport, so headings never
need a breakpoint override in the markup.

> `cn()` in `src/lib/utils.ts` extends `tailwind-merge` with these custom size
> and colour groups. Without it, `text-body` (a size) and `text-on-accent` (a
> colour) collapse into one conflict group and silently erase each other.

## Development

Requires Node.js 20+ and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev
```

| Script | Purpose |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm test` | Run the test suite |

## Stack

Next.js 16 (App Router, React 19, Turbopack) · TypeScript · Tailwind CSS 4 ·
Radix/shadcn primitives · Framer Motion · Zustand · Zod · pnpm.

## Architecture

```
src/
├── app/                   Routes — server components own data + metadata
│   ├── api/               Route handlers (products, collections, orders)
│   ├── products/[slug]/   Statically generated detail pages
│   ├── layout.tsx         Fonts, metadata, providers, site shell
│   ├── robots.ts          Generated robots.txt
│   └── sitemap.ts         Generated sitemap.xml
├── components/
│   ├── commerce/          Product/collection cards, cart icon, quick view
│   ├── layout/            Header, Footer, SiteShell
│   ├── media/             Media / MediaFrame — the next/image wrapper
│   ├── providers/         Tooltip + toast providers
│   ├── ui/                shadcn primitives (only the ones in use)
│   └── views/             Client page bodies, fed by their server route
├── data/                  Static catalog (collections, products)
├── hooks/                 Cart + wishlist stores, toast
├── lib/                   utils, formatting, accents, site details, Zod schemas
├── server/                Server-only data access (catalog, orders)
├── styles/globals.css     Design tokens and base layer
└── types/                 Shared domain types
```

The rule the tree encodes: **`src/server/` is the only place that reads the
catalog.** Route segments call it, shape the result, and hand plain props to a
client view. Swapping the in-memory arrays for a real datastore touches
`src/server/` and nothing above it.

Listing filters and sorting run on the server from the URL's search params —
`ProductsView` owns the controls and pushes to the router; the route re-queries.

Order requests post to `/api/orders`, which validates with the shared Zod schema
and **recomputes the subtotal from the catalog** rather than trusting the client.

Every photograph goes through `<Media>` (`src/components/media/Media.tsx`), a thin
`next/image` wrapper fixed to `fill` + `object-cover`, because that is the only
shape this storefront uses. It expects a positioned parent — `<MediaFrame>`
supplies one so the `relative` that `fill` depends on cannot be forgotten.

## Storefront

- Curated collections with editorial imagery
- Product listing with server-side filtering and sorting
- Product detail with gallery and specifications
- Shopping bag, persisted per browser
- Order-request checkout (online payment not yet live)

Shop details — address, phone, opening hours and social accounts — live in
`src/lib/site.ts` so they are written once and read everywhere.

## Environment

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_SITE_URL` sets the absolute
origin used for metadata, Open Graph, sitemap and robots.
