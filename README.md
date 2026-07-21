# Modernist — White-Label Website Suite

Sixteen white-label website templates on one shared design system (**Modernist**),
built as a single **Next.js 15 + Supabase** app. Every template is a full site with
its signature workflow wired end to end, and the whole suite shares one design
language: flat, architectural, Archivo throughout, mono-accent red (`#ec3013`) on
off-white (`#f3f2f2`), zero corner radius, 2px rules, photography in black & white.

The landing page (`/`) is a gallery linking to each template.

## The templates

| Route | Template | Signature workflow |
| --- | --- | --- |
| `/artist` | Artist | Persistent audio player, discography accordion, tour, store, forms |
| `/ecommerce` | Ecommerce Store *(canonical shop)* | Filter/sort → product → cart drawer → multi-step checkout → order |
| `/event` | Event | Live countdown, day-tabbed schedule, ticket tiers reserve → confirm |
| `/company` | Company | Sign-in modal, product modal, pricing toggle, demo request |
| `/restaurant` | Restaurant | Menu tabs, reservation picker, online order → cart → checkout |
| `/ticketing` | Ticketing | Loyalty points, membership tiers, rewards redeem, account |
| `/venue` | Venue | Event ticket qty → reserve, spaces, hire enquiry (links to shop/club) |
| `/travel` | Travel | Multi-mode booking engine → results → booking modal → My Trips |
| `/learning` | Learning | Course catalog, curriculum progress, enroll, community, pricing |
| `/social` | Social | Three-pane feed, compose, like/repost, communities + upvote, DMs |
| `/attraction` | Attraction | Timed-entry ticketing (date + slot + qty) → checkout → QR confirm |
| `/streaming` | Streaming | Type filter, paywall gate → subscribe/buy, persistent player, plans |
| `/career` | Career | Type-specific apply → tracker, post a role, ATS Kanban pipeline |
| `/news` | News | Front-page grid, section filter, article reader, video, newsletters |
| `/banking` | Banking | Wallet ledger, crypto markets + trade modal, rewards, plan tabs |
| `/fitness` | Fitness | Class timetable (day + discipline filters) booking, leagues, membership |

## Stack

- **Next.js 15** (App Router, React 19, TypeScript) — each template is a route group
  with its own layout/shell; shared state (cart, player, points, ATS) lives in
  layout-level React contexts so it persists across route changes.
- **Supabase** (Postgres) — the Artist site backs its content in dedicated tables;
  the Ecommerce store persists products + orders; every template's key workflow
  (bookings, reservations, applications, newsletter/contact) writes to a small set
  of shared, template-tagged capture tables via server actions, guarded by RLS.
- **next/font** (Archivo) — no external font requests at runtime.
- **Design system** — the authoritative Modernist tokens + component classes are
  ported into `app/globals.css`; shared React atoms live in `components/ds/`.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + publishable key
npm run dev
```

### Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable (anon) key — safe to expose; RLS governs access |

## Database

All templates share one Supabase project. Schema and seed content are applied as
migrations:

- `create_artist_site_schema` + `seed_vesper_content` — Artist content
- `ecommerce_schema_seed` — `ecom_products`, `ecom_orders`
- `shared_capture_tables` — `leads`, `messages`, `bookings` (template-tagged,
  write-only for anon; used by the other templates' workflows)

## White-labelling

Each template's brand values and content are plain config modules in `lib/` (e.g.
`lib/event.ts`, `lib/banking.ts`) — swap them, or back them with a CMS/API. The
Artist site additionally reads its config + content live from Supabase. Photography
ships as grayscale placeholders (`components/Placeholder.tsx`); replace with real
`<img>`/`next/image` inside the same `.grayscale` wrappers.

## Notes

- Players (Artist, Streaming) simulate playback progress — no media files ship with
  the templates. Point them at a real `<audio>`/`<video>` element to play files.
- Store checkout, crypto trades, and card fields are UI flows only — no real payment
  is taken (that's intentionally out of scope for a template).
