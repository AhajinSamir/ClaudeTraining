# TelcoNow Project

This project is a web application for TelcoNow, a fictional Australian telco.
We are building a public homepage, a login page, and an authenticated customer dashboard.

## Tech stack

| Technology | Version | Notes |
|---|---|---|
| Next.js | 15.x (LTS) | App Router only — no Pages Router |
| TypeScript | 5.x (latest stable) | Strict mode enabled |
| Tailwind CSS | 4.x (latest stable) | CSS-first config via `@theme` — no `tailwind.config.js` |
| Contentful SDK | 11.x (latest stable) | Delivery API + Preview API |
| Auth.js (NextAuth) | 5.x (latest stable) | Env vars: `AUTH_SECRET` and `AUTH_URL` (not NEXTAUTH_*) |
| Lucide React | latest stable | Icon library — do not hand-copy SVG from mockups |
| Node.js | 20.x LTS | Minimum runtime version |
| Vercel | — | Deployment target |

## Architecture decisions

| Decision | Choice | Rationale |
|---|---|---|
| Next.js router | **App Router** | Default for Next.js 15. No Pages Router — do not create `pages/` directory |
| Icon library | **Lucide React** | Tree-shakeable, maintained, covers all icons required by the mockups |
| Auth strategy | **JWT session** | No database adapter — NextAuth default, confirmed for this project |
| Styling approach | **Tailwind v4 utilities only** | No inline styles, no CSS modules, no styled-components |
| Font loading | **`next/font/google`** | Not raw Google Fonts `<link>` tags — see designs/README.md |

## How to work

- Write clean code, no `any` types, strict TypeScript throughout
- Mobile-first — minimum supported viewport is 375px
- Match the design files — see `.claude/designs/` and `designs/README.md` before reading mockup source
- Ask if you're not sure

## Pages

- Homepage — public marketing page
- Login — authentication
- Dashboard — authenticated customer portal

## Notes

- Use components where possible
- Should match the design files
- Performance is important
