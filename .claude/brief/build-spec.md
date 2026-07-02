# TelcoNow — Build Specification & QA Reference

**Project:** TelcoNow Web Application
**Environment:** Australian fictional telco — public + authenticated portal
**Spec Version:** 1.1
**Status:** Draft — Updated against visual mockups (`TelcoNow Homepage.dc.html`, `TelcoNow Login.dc.html`, `TelcoNow Dashboard.dc.html`).

> ⚠️ HEADLINE CONFLICT, CARRIED OVER FROM v1.0 §7: This version's §7 previously declared sign-up/registration and password-reset flows **out of scope**. The mockups design explicit UI for both — three separate "Get started" entry points (homepage header, login footer, plan card CTAs) and a "Forgot password?" link on the login page. §7 has been rewritten below to surface this directly instead of letting it sit as a footnote. **This needs a product decision before Sprint 2 work locks in scope.**
>
> ⚠️ SECOND GAP: All three mockups are fixed desktop-only layouts (1280px canvas, no breakpoints, no hamburger menu, no mobile view of any kind). §4.1 below has been corrected to reflect that mobile QA currently has nothing to test against — this is a build risk, not just a documentation note, since CLAUDE.md mandates "mobile friendly" as a hard requirement.

---

## 1. Project Overview

TelcoNow is a Next.js 14 web application consisting of three core pages: a public marketing homepage, a login page, and an authenticated customer dashboard. It is deployed on Vercel and uses Contentful as a CMS — though note (see content.md) the mockups only confirm *what* renders, not *which* sections are actually Contentful-driven versus hardcoded.

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | **15.x (LTS)** | App Router only. Updated from 14 — new projects must use 15.x. |
| Language | TypeScript | **5.x (latest stable)** | Strict mode required. Zero `any` types. |
| Styling | Tailwind CSS | **4.x (latest stable)** | ⚠️ Breaking change from v3: no `tailwind.config.js` — brand tokens defined via CSS `@theme` directive. Mockups use raw inline styles; translating to Tailwind is an implementation task. |
| CMS | Contentful SDK | **11.x (latest stable)** | Delivery API for production, Preview API for staging. |
| Auth | Auth.js (NextAuth) | **5.x (latest stable)** | ⚠️ Breaking change from v4: file structure and config API are completely different. File is now `app/api/auth/[...nextauth]/route.ts`, not `pages/api/auth/[...nextauth].ts`. See auth.md for updated config. |
| Icons | Lucide React | **latest stable** | Tree-shakeable icon library. Do not hand-copy SVG paths from mockups — see design.md §5.7 for icon mapping. |
| Runtime | Node.js | **20.x LTS** | Minimum required version for Next.js 15. |
| Hosting | Vercel | — | — |

---

## 3. Pages & Functional Scope

### 3.1 Homepage (`/`)

**Type:** Public — no authentication required

**Purpose:** Marketing page to attract and inform prospective customers.

**Confirmed structure (replaces v1.0's generic description):**
1. Sticky header — logo, nav links, "Log in" + "Get started" CTAs (logged-out state only; authenticated header state is undesigned)
2. Hero — headline, subheadline, primary + secondary CTA, SVG illustration
3. Trust stats bar — 3 stats (uptime, customer count, rating)
4. Plans section — 3 plan cards (Starter/Plus/Pro), centre card visually featured
5. Promo/referral banner
6. Blog section — 3 post cards + "view all" link
7. Footer — 4-column layout + bottom bar

**Functional Requirements:**
- Accessible without login
- Content driven by Contentful CMS ⚠️ ASSUMPTION: which specific sections are CMS-managed vs. hardcoded is still unconfirmed — see content.md §8 Q1
- Contains at least 3 distinct CTA paths to Login or sign-up (header, hero, plan cards) — more entry points than v1.0 assumed ("at least one CTA")
- Must render correctly server-side (SSR or SSG via Next.js)

**QA Scope:**
- Unauthenticated access: page loads without redirect
- Content renders from Contentful (no blank/null fields)
- CTA links navigate to correct routes — ⚠️ plan card CTAs ("Get Starter/Plus/Pro") likely point to a sign-up flow, not directly to `/login` as v1.0's auth matrix assumed; needs confirmation once scope conflict in §7 is resolved
- No authenticated data leaks onto this page
- SEO meta tags present (`<title>`, `<meta description>`)
- Trust stats, referral banner, and blog section render correctly (NEW — not previously in scope at all)

---

### 3.2 Login Page (`/login`)

**Type:** Public — redirects authenticated users away

**Purpose:** Authentication entry point using NextAuth.

**Confirmed layout (CORRECTS v1.0):** 45/55 split-screen — dark brand panel left (logo, value props), white form panel right. Not a centred card as previously assumed.

**Functional Requirements:**
- Integrates with NextAuth ⚠️ ASSUMPTION: Credentials provider strengthened by mockup (no OAuth buttons shown), but not proven
- Successful auth redirects to `/dashboard`
- Failed auth displays error state without crashing — ⚠️ no error-state UI exists in the mockup; this requirement has no visual reference to build against
- Authenticated users visiting `/login` should be redirected to `/dashboard`
- Password field has a working show/hide visibility toggle (NEW — confirmed in mockup, not previously specified)
- **Sign-up entry point exists ("Don't have an account? Get started →") and "Forgot password?" link exists — both contradict the out-of-scope declarations in v1.0 §7. See §7 below.**

**QA Scope:**
- Valid credentials → redirect to `/dashboard`
- Invalid credentials → error message displayed, no redirect — ⚠️ untestable against design until an error state is designed
- Already-authenticated user hitting `/login` → redirect to `/dashboard`
- Session token is set correctly after login (cookie/storage check)
- CSRF protection present (NextAuth default) ⚠️ ASSUMPTION: default NextAuth CSRF handling in use
- Password field masked by default; visibility toggle works correctly; no credentials logged to console (NEW test condition added for the toggle)

---

### 3.3 Dashboard (`/dashboard`)

**Type:** Authenticated — redirect to `/login` if unauthenticated

**Purpose:** Authenticated customer portal.

**Confirmed structure (far more extensive than v1.0's generic description):** Fixed 240px dark sidebar (logo, 6 nav items, user avatar/name/plan, logout link) + main content area with 8 distinct card sections: plan summary, data usage meter, billing overview, recent activity, usage history chart, support tickets, add-ons, and an upgrade-prompt banner.

**Functional Requirements:**
- Protected route: unauthenticated requests redirect to `/login`
- Displays customer-specific data ⚠️ ASSUMPTION: confirmed NOT Contentful (no CMS-style fields visible), data source is an internal API of unconfirmed shape — see content.md
- Session must be valid to render any content
- Sidebar nav confirmed for desktop; **no mobile nav pattern exists at all** (not hamburger, not bottom nav — genuinely undesigned, correcting v1.0's assumption that one of those two had been chosen)

**QA Scope:**
- Unauthenticated access → redirect to `/login`
- Authenticated access → page loads with correct user context (name, avatar initials, plan name — confirmed via mockup, no email displayed)
- Session expiry → redirect to `/login` (no stale data shown)
- No sensitive data exposed in page source or client-side JS bundles
- Logout action confirmed present in sidebar — but redirect destination (`/` vs `/login`) remains genuinely unresolved, not just undocumented (the mockup's logout link has no real target to inspect)
- All 8 card sections render with correct data formatting (AUD currency, dates, GB usage, percentages) — NEW, scope of dashboard QA is significantly larger than v1.0 implied

---

## 4. Cross-Cutting Requirements

### 4.1 Responsiveness (Mobile-First)

All pages must be mobile-friendly per project mandate (CLAUDE.md).

> ⚠️ **This requirement currently has no design to build or test against.** All three mockups are fixed 1280px-wide layouts with no responsive behaviour designed anywhere. The checklist below is retained as the eventual QA target, but every item in it is presently unverifiable — there's no mobile/tablet design to compare implementation against. This is a project risk: either a mobile design pass needs to happen before dev builds responsive behaviour from guesswork, or dev is implicitly being asked to invent the mobile layout themselves.

**Breakpoints to test (Tailwind defaults):**
| Label | Width |
|---|---|
| Mobile | 375px (iPhone SE) |
| Tablet | 768px |
| Desktop | 1280px — confirmed, this is the mockups' actual canvas width |
| Wide | 1536px |

**QA Checks (currently unverifiable against any design artifact, see warning above):**
- No horizontal scroll on mobile
- Navigation/menus collapse or adapt correctly — undesigned for both homepage header and dashboard sidebar
- Forms (login) are usable on touch devices
- Text is legible (min 16px base on mobile) — ⚠️ note the desktop mockup itself already violates this at 14-15px in several places (see design.md §3); don't assume mobile will default to compliant sizing without explicit direction
- Tap targets meet minimum size (44×44px) — confirmed at desktop sizes (buttons/inputs are consistently 44px), untested at mobile

---

### 4.2 Performance

Performance is flagged as important in project requirements.

**Targets ⚠️ ASSUMPTION: no explicit thresholds defined — using industry standard baselines:**
| Metric | Target |
|---|---|
| LCP | < 2.5s |
| FID / INP | < 200ms |
| CLS | < 0.1 |
| TTI | < 3.5s |

**QA Checks:**
- Run Lighthouse on Homepage, Login, Dashboard
- Verify Next.js Image component used for all images — ⚠️ note the hero and decorative graphics in the mockups are inline SVG, not raster images, so this check applies to fewer elements than v1.0 implied; confirm whether any raster images exist in the final implementation at all
- No render-blocking resources on homepage
- Contentful content fetched with appropriate caching strategy (ISR or SSG preferred for homepage)
- Dashboard's usage history chart and progress bars are CSS/inline-SVG based in the mockup, not a charting library — confirm whether dev intends to keep it that lightweight or introduce a charting dependency (NEW consideration, affects bundle size/perf)

---

### 4.3 TypeScript Compliance

- Zero TypeScript build errors is a pass criterion
- No use of `any` type without explicit justification
- QA should run `tsc --noEmit` as part of build verification

---

### 4.4 Component Architecture

- Reusable components required (per project notes)
- No duplicated UI logic across pages
- QA check: visually identical elements across pages should share the same component — **now more concretely checkable:** badge component (6 variants, confirmed in dashboard) and button component (6 variants, confirmed across all 3 mockups) should each be a single shared component, not page-specific markup. Card component pattern (border-radius 12px, consistent shadow) also confirmed reused across homepage and dashboard.

---

## 5. Authentication & Session Behaviour Matrix

| Scenario | Expected Result |
|---|---|
| Unauthenticated → `/` | 200 OK, page renders |
| Unauthenticated → `/login` | 200 OK, form renders |
| Unauthenticated → `/dashboard` | 302 redirect to `/login` |
| Authenticated → `/` | 200 OK, page renders — ⚠️ authenticated header state undesigned, see §3.1 |
| Authenticated → `/login` | 302 redirect to `/dashboard` |
| Authenticated → `/dashboard` | 200 OK, portal renders |
| Expired session → `/dashboard` | 302 redirect to `/login` |
| Invalid credentials at `/login` | Error state, remain on `/login` — ⚠️ no error-state design exists |
| Logout from `/dashboard` | Session cleared, redirect to **unconfirmed destination** (`/` or `/login`) — flagged as a genuine open decision, not a documentation gap |

---

## 6. Build & Deployment Checks

**Build command:** `next build`
**Deploy target:** Vercel

| Check | Pass Criteria |
|---|---|
| `next build` exits 0 | No build errors |
| `tsc --noEmit` exits 0 | No type errors |
| No ESLint errors | Clean lint output |
| Vercel preview deploy | All 3 pages load on preview URL |
| Environment variables set | `AUTH_SECRET`, `AUTH_URL` (Auth.js v5 names — not `NEXTAUTH_*`), Contentful keys present in Vercel env |

---

## 7. Scope Declarations — REWRITTEN, was "Out of Scope" in v1.0

v1.0 declared the following out of scope. The mockups directly contradict two of these items by designing explicit UI for them. This section is rewritten to surface the conflict rather than restate the original (now-contradicted) list as if it still holds.

| Item | v1.0 status | Mockup evidence | Current status |
|---|---|---|---|
| Sign-up / registration flow | Out of scope | 3 confirmed UI entry points: homepage header "Get started," login footer "Get started," plan card CTAs "Get Starter/Plus/Pro" | **CONFLICT — needs product decision.** Cannot remain "out of scope" while the approved-looking design builds three doors into it. |
| Password reset flow | Out of scope | "Forgot password?" link confirmed on login page | **CONFLICT — needs product decision.** Same issue. |
| API/backend beyond what NextAuth and Contentful provide | Out of scope | Dashboard data (plan, usage, billing, tickets, add-ons) is confirmed customer-specific and confirmed NOT Contentful — implies a real backend API is required regardless of what's "in scope" for this spec | Still technically out of scope *for this document*, but worth flagging that the dashboard cannot function without it being in scope for *someone's* sprint |
| Specific Contentful content model definition | Out of scope | Still no content model export available | Unchanged — still out of scope, still needed eventually |
| Third-party OAuth provider configuration | Out of scope | Mockup shows no OAuth UI, consistent with staying out of scope | Unchanged, and now slightly better supported by evidence (absence of OAuth buttons) |
| Accessibility (WCAG) | Not mentioned, flagged for future spec | No mockup provides accessibility annotations (focus order, ARIA, contrast ratios beyond what's visually inferable) | Unchanged — still recommend adding to a future spec revision |

---

## 8. Open Questions for Dev/Product

1. **Resolve the §7 conflict before Sprint 2 starts:** is sign-up in scope? Is password reset in scope? The current sprint plan (sprint-user-stories.md) doesn't allocate stories for either, but the design does.
2. What NextAuth provider(s) are in use? Mockup evidence narrows this to "likely Credentials-only," still not confirmed.
3. What Contentful content types power the Homepage, and which of the newly-confirmed sections (stats bar, referral banner, blog) are actually CMS-managed vs. hardcoded?
4. What customer data is displayed on the Dashboard, and from what source? Confirmed scope is now much larger (8 sections) than v1.0's vague description.
5. Are there explicit Lighthouse/Core Web Vitals SLAs?
6. **When is the mobile/tablet design pass happening?** This is now the single largest blocker to writing real responsive QA cases — see §4.1.
7. Where does logout redirect? Confirmed as a genuine unresolved decision, not a documentation gap.
8. Is there a staging environment separate from Vercel preview?
