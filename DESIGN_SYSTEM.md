# Modernist Suite — Design System & Template Ownership

A white-label suite of **27 templates** sharing one design system and one set of
backend primitives. All templates are **B2C**: the visitor is a consumer / fan /
guest / member. Each template owns **one primary job-to-be-done** and hands off
everything else via a cross-link (`components/shell/CrossLinkCard.tsx`).

## Design tokens (authoritative — `app/globals.css`)

- **Type:** Archivo (`--font-heading` / `--font-body`), weights 600/800.
- **Color:** mono-accent red `--color-accent` `#ec3013` on off-white `--color-bg`
  `#f3f2f2`; `--color-up` (green, `oklch(0.6 0.16 150)`) for positive deltas only.
- **Shape:** radius 0, 2px rules/borders, flat surfaces, grayscale image placeholders.
- **Motion:** single `fadein` keyframe; respects `prefers-reduced-motion`.
- **Chrome:** `components/shell/SiteHeader`, `SiteFooter`; `components/ds/*`
  (Modal, ConfirmModal, QtyStepper, FAQ, PhotoGallery, SaveHeart, A11yChrome).
- **Persistence:** `lib/persist.ts` (`usePersistentState`, SSR-safe), namespaced
  keys `modernist:<template>.<key>`. **Never rename an existing store key.**
- **Favorites:** one recipe — `useFavorites(namespace, noun)` + `SaveHeart`,
  surfaced as a "Favorites · N" filter. American English throughout.

## Guiding principle

**One primary verb per template.** If two templates share a primary verb, one is
wrong — the non-owner demotes its duplicated surface to a cross-link.

## Feature ownership matrix (single-owner rule)

| Feature | Sole owner | Route | Everyone else |
| --- | --- | --- | --- |
| Scheduled travel booking (air/rail/car/stay-search) | **Travel** | `/travel` | link |
| Private/charter request + empty legs + jet-card | **Charter** | `/charter` | link |
| Cross-event discovery, loyalty/VIP, experiences | **Ticketing** | `/ticketing` | link |
| Single-hotel / single-room booking | **Hospitality** | `/hospitality/rooms` | Travel Stays links in |
| Local-provider scheduling engine (calendar/slot/pay) | **Booking Platform** | `/booking` | Service/Wellness link |
| Gym membership + recurring classes + leagues | **Fitness** | `/fitness` | — |
| Spa treatments + retreat programs | **Wellness** | `/wellness` | — |
| Retail cart (line items) | **Ecommerce** | `/ecommerce` | per-site shops link |
| Payment/tender + multi-vendor settlement + register | **POS Checkout** | `/pos` | flows tender here |
| Paywalled media catalog + subscriptions | **Streaming** | `/streaming` | Artist links |
| UGC feed / DM / communities / follow graph | **Social** | `/social` | Artist links |
| Apply / tiers / gate / governance / admin | **Membership OS** | `/membership` | Clubhouse links |
| Members' feed / house-event RSVP / directory | **Clubhouse** | `/clubhouse` | — |
| Lifestyle request desk | **Concierge** | `/concierge` | reached from Clubhouse |

Standalone-owner templates (no overlap): Artist, Event (single festival, sells its
own passes), Real Estate, Nonprofit, Company, Attraction, Learning, News, Career,
Banking, Service (single provider — books through Booking Platform).

## Cross-link hand-off map (implemented)

| From (non-owner) | Surface demoted | → To (owner) |
| --- | --- | --- |
| Travel | "Stays" result → in-Travel room booking | `/hospitality/rooms` (+ property card, footer) |
| Travel | home (after search) + flights results + footer | `/charter` (private charter card) |
| Venue | per-event tickets: select → **hold**, payment settles on network | `/ticketing/events` ("Hold & pay on FRONTROW") |
| Event | tickets page / (self-checkout kept) | `/ticketing` ("Ticketing powered by FRONTROW") |
| Service | scheduling (already deep-linked) | `/booking/business/the-fade-room/book` |
| Fitness | "Wellness" label/route collision | renamed → `/fitness/recovery` ("Recovery") |
| Artist | Listen / Follow · discography streaming · footer socials | `/streaming` (Listen), `/social` (Follow) |
| Artist | store fake "Add to cart" | `/ecommerce/shop` ("View in shop") + catalog card |
| Restaurant | order checkout | inline confirm + "Payments powered by POS ↗" `/pos` |
| Clubhouse | membership tiers shown; "Apply for X" hands off | `/membership`; Concierge reachable via hero + footer |
| Membership OS | (no members' feed to drop) | adds "Enter the Clubhouse ↗" `/clubhouse` |
| Concierge | membership tiers shown; "Choose X" hands off | `/membership`; reached from Clubhouse |

**Method:** demote to a cross-link card (never delete the concept — the consumer
still expects the pathway); keep the owner's implementation; preserve every
persistence key; routing and scope only, no visual redesign.

## Notes / deliberate judgment calls

Aligned to the v4 export (`Music artist website template (4).zip`), whose remediation
**keeps each surface's richness and redirects only the terminal action** to the owner
(rather than stripping the surface). The live repo takes that highest-level synthesis:

- **Venue** keeps interactive ticket selection (tiers + quantities + total). Confirming
  places a **hold** (`captureBooking kind: "ticket-hold"`); payment/fulfilment settle on
  the FRONTROW ticketing network (`/ticketing`). Venue is a seller on the network, not a
  second network.
- **Clubhouse** and **Concierge** keep their membership/retainer **tier displays** (so a
  consumer sees what's on offer), but every "Apply / Choose" hands off to Membership OS
  (`/membership`) — the single owner of apply/tiers/gate/billing. Neither runs its own
  application form.
- **Event** keeps its self-contained checkout (a festival sells its own passes); it only
  adds a "Powered by FRONTROW" attribution.
- **Ecommerce** and **POS** both legitimately hold a cart: Ecommerce owns the retail
  line-item cart UX; POS owns tender + multi-vendor settlement + the operator register.
- The live repo exceeds the static prototypes throughout: real Supabase capture actions,
  persisted state, favorites, cancel/manage flows, promo codes, wishlists, certificates,
  continue-watching, reorder, lifetime-giving, and shared cross-link cards.
</content>
