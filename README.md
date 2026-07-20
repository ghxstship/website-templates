# Modernist Artist Site — Next.js + Supabase

A white-label music-artist website. One design serves any artist (solo, band, DJ,
rapper) by swapping a few brand values and content rows. Nine pages — Home, Music,
Tour, Videos, News, About, Gallery, Store, Contact — with a persistent audio
player, a media lightbox, tour filtering, an expandable discography, and working
forms wired to a database.

Built in the **Modernist** design system: flat, architectural, Archivo throughout,
near-mono red (`#ec3013`) on off-white (`#f3f2f2`), zero corner radius, strong 2px
rules, flush-left, photography in black & white.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Supabase** (Postgres) for all content + form submissions, guarded by RLS
- **next/font** (Archivo) — no external font requests at runtime
- Deployed on **Vercel**, source on **GitHub**

## How it works

- All content lives in Supabase and is fetched in parallel by `lib/data.ts`
  (`getSiteData`, request-cached). If the database is briefly unreachable the site
  falls back to a bundled snapshot (`lib/fallback.ts`) so pages always render.
- The **audio player** and **lightbox** are React contexts mounted in the root
  layout (`components/SiteChrome.tsx`), so their state persists across client-side
  route changes.
- The **newsletter** and **contact/booking** forms post through server actions
  (`app/actions.ts`) that validate input and insert into Supabase. Anon writes are
  allowed only on those two tables via row-level security; every content table is
  read-only to the public.
- Section pages (`videos`, `news`, `gallery`, `store`) can be switched off from the
  `site_config` row — the nav entry disappears and the route returns 404.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + publishable key
npm run dev
```

Then open the printed local URL.

### Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable (anon) key — safe to expose; RLS governs access |

## Database

Schema and seed content are applied as Supabase migrations:

- `create_artist_site_schema` — all tables + RLS policies
- `seed_vesper_content` — the VESPER demo content

Tables: `site_config`, `bio`, `albums`, `tracks`, `shows`, `videos`, `posts`,
`gallery`, `merch`, `stats`, `press`, `facts`, `contacts`, `socials`,
`newsletter_signups`, `contact_messages`.

## White-labelling

1. **Brand & sections** — edit the single `site_config` row: `artist_name`,
   `tagline`, `genre`, `location`, `accent_color`, and the `show_videos /
   show_news / show_gallery / show_store` toggles. `accent_color` overrides the
   design accent (validated — a single color string only).
2. **Content** — replace the rows in the content tables (albums/tracks, shows,
   videos, posts, gallery, merch, etc.).
3. **Photography** — the design ships with grayscale placeholders. Swap
   `components/Placeholder.tsx` usages for real `<img>`/`next/image` inside the
   same `.grayscale` wrappers, keeping the fixed aspect ratios (hero 4/5,
   album 1/1, video 16/9, news 3/2, gallery 1/1 & 3/4, merch 1/1).

## Notes

- The player simulates playback progress (no audio files ship with the template).
  Point it at a real `<audio>` element to play actual tracks.
- Store "Add to cart" is a UI stub — checkout/payment is intentionally out of scope.
