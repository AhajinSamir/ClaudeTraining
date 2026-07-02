# TelcoNow — Sprint User Stories

**Project:** TelcoNow
**Sprints:** 4 × 2 weeks
**Total Duration:** 8 weeks
**Spec Version:** 1.1
**Status:** Draft — Updated against visual mockups (`TelcoNow Homepage.dc.html`, `TelcoNow Login.dc.html`, `TelcoNow Dashboard.dc.html`).

> ⚠️ HEADLINE GAP: This backlog has **no stories for sign-up/registration or password reset**, anywhere in any sprint. The mockups design three confirmed entry points into a sign-up flow (homepage header, login footer, plan card CTAs) and one into password reset ("Forgot password?"). If build-spec.md's scope conflict (§7) gets resolved in favour of building these flows, this plan is short at least 4-6 stories and possibly a sprint's worth of work. I have not added speculative stories for them — that would be inventing scope without a decision. Flagging it here so it doesn't get missed during sprint planning.
>
> ⚠️ SECOND GAP: No story in any sprint covers mobile/responsive implementation specifically, beyond acceptance criteria bolted onto existing stories (e.g. "renders at 375px"). Given there's no mobile design to build against (see design.md), this is currently unplannable work, not just untested work.
>
> Story points still not assigned — unchanged from v1.0, no team velocity data available.

---

## Sprint 1 — Foundation & Homepage (Weeks 1–2)

**Goal:** Project scaffolding complete, homepage live with Contentful content.

---

**US-S1-01**
> As a **developer**, I want the Next.js 14 project scaffolded with TypeScript and Tailwind CSS, so that the team has a consistent base to build on.

**Acceptance Criteria:**
- [ ] Next.js **15.x (LTS)** project initialised with TypeScript and strict mode enabled
- [ ] Tailwind CSS **v4.x** installed — configured via `@theme` in `app/globals.css` (no `tailwind.config.js`)
- [ ] Brand colour tokens defined in `app/globals.css` using `@theme` — `#460073`, `#A100FF`, `#7500C0`, etc. (see design.md §2 for full token list and CSS block)
- [ ] Auth.js **v5.x** installed — `auth.ts` config file at project root, route handler at `app/api/auth/[...nextauth]/route.ts`
- [ ] Contentful SDK **v11.x** installed
- [ ] Node.js **20.x LTS** confirmed as runtime (document in `.nvmrc` or `package.json` `engines` field)
- [ ] ESLint and Prettier configured
- [ ] Project deploys to Vercel (empty shell)
- [ ] Environment variable structure documented

---

**US-S1-02**
> As a **developer**, I want Contentful connected to the Next.js project, so that CMS-driven content can be fetched on the homepage.

**Acceptance Criteria:**
- [ ] Contentful SDK installed and configured
- [ ] `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` set in Vercel env
- [ ] A test fetch returns data without error
- [ ] Preview API configured for staging ⚠️ ASSUMPTION
- [ ] ⚠️ Before building content models, confirm with product which homepage sections are actually CMS-managed (hero, plans) vs. hardcoded (stats bar, referral banner, blog) — see content.md §8 Q1. Building Contentful models for hardcoded sections wastes this story's time.

---

**US-S1-03**
> As a **Visitor**, I want to see TelcoNow's homepage, so that I can learn about the company and its plans.

**Acceptance Criteria:**
- [ ] Homepage renders at `/`
- [ ] Page accessible without authentication
- [ ] Content sourced from Contentful (for confirmed CMS sections) or hardcoded (for confirmed static sections — see above)
- [ ] No authentication required to view

---

**US-S1-04**
> As a **Visitor**, I want to see a hero section on the homepage, so that I immediately understand what TelcoNow offers.

**Acceptance Criteria:**
- [ ] Hero headline renders — confirmed copy: "Australia's fastest 5G network."
- [ ] Subheadline renders — confirmed copy: "Flexible plans. No lock-in contracts. Cancel any time."
- [ ] Eyebrow badge renders above headline — confirmed: "5G Now Live Nationwide" (NEW field, not in v1.0 acceptance criteria)
- [ ] **Two** CTA buttons render — primary "View plans" + secondary "Check coverage" (CORRECTED from v1.0's single-CTA assumption)
- [ ] Both CTAs visible above the fold on all breakpoints — ⚠️ untestable below desktop, no mobile design exists
- [ ] Hero illustration renders — confirmed as inline SVG network graphic, not a raster image (CORRECTED — v1.0 assumed Next.js Image component would be used here; it won't be, unless this gets reimplemented as a raster asset)

---

**US-S1-05**
> As a **Visitor**, I want to see TelcoNow's plans on the homepage, so that I can compare options before signing up.

**Acceptance Criteria:**
- [ ] Exactly 3 plan cards rendered — confirmed: Starter ($39/mo), Plus ($65/mo, featured), Pro ($99/mo) — CORRECTED from v1.0's vague "at least one"
- [ ] Each card shows plan name, tagline, price (AUD), 5 features, and a "Get {PlanName}" CTA — tagline and exact feature count are NEW, confirmed by mockup
- [ ] Featured card (Plus) displays a "Most popular" badge and elevated shadow/border treatment — NEW acceptance criterion, not in v1.0
- [ ] Cards display in a single column on mobile, grid on desktop — ⚠️ mobile behaviour untestable, no mobile design exists
- [ ] **CTA destination is unconfirmed** — v1.0 assumed `/login`, but "Get Starter/Plus/Pro" phrasing strongly implies a sign-up flow instead. Do not build this link target until the §7 scope conflict (build-spec.md) is resolved.

---

**US-S1-06**
> As a **Visitor**, I want the homepage to load fast on mobile, so that I don't abandon the page.

**Acceptance Criteria:**
- [ ] LCP < 2.5s on mobile
- [ ] CLS < 0.1
- [ ] No render-blocking resources
- [ ] Hero/illustration assets are lightweight inline SVG, not large raster images — confirmed by mockup, should make this easier to hit than v1.0 assumed
- [ ] Lighthouse performance score ≥ 80 ⚠️ ASSUMPTION

---

**US-S1-07**
> As a **Visitor**, I want the homepage to be SEO-optimised, so that TelcoNow appears in search results.

**Acceptance Criteria:**
- [ ] `<title>` set from Contentful `metaTitle` field
- [ ] `<meta name="description">` set from Contentful `metaDescription` field
- [ ] Exactly one H1 on the page
- [ ] No missing or duplicate meta tags

---

**US-S1-08**
> As a **Visitor**, I want the homepage to work on my mobile device, so that I can browse without a desktop.

**Acceptance Criteria:**
- [ ] No horizontal scroll at 375px — ⚠️ **cannot currently be implemented against any design spec; flagging this story as blocked on a mobile design pass, not just "to be tested later"**
- [ ] All text legible at base font size (min 16px) — ⚠️ note the desktop mockup itself uses 14-15px body text in places, contradicting design.md's own rule; needs a decision before this can be a clean pass/fail
- [ ] All tap targets ≥ 44×44px — confirmed achievable, desktop buttons/inputs are already built to this spec
- [ ] Layout renders correctly at 375px, 768px, 1280px — only 1280px currently has a design reference

---

**US-S1-09 — NEW STORY**
> As a **Visitor**, I want to see TelcoNow's trust signals on the homepage, so that I feel confident the network is reliable before signing up.

**Acceptance Criteria:**
- [ ] Stats bar renders directly beneath hero with 3 stats: "99.8% / Network uptime," "4.2M+ / Customers," "★ 4.8 / Award-winning support"
- [ ] Values and labels are not truncated at any tested breakpoint

*Not in v1.0 — this section exists in the confirmed homepage mockup and had no corresponding story.*

---

**US-S1-10 — NEW STORY**
> As a **Visitor**, I want to see a referral offer on the homepage, so that I'm incentivised to bring a friend.

**Acceptance Criteria:**
- [ ] Banner renders with headline "Refer a friend, get one month free.", description, and a "Refer now" CTA
- [ ] CTA destination/flow confirmed with product before linking (no referral flow is specified anywhere in the project docs)

*Not in v1.0 — no referral feature existed in the prior backlog at all, despite being a confirmed homepage section.*

---

**US-S1-11 — NEW STORY**
> As a **Visitor**, I want to read TelcoNow's blog from the homepage, so that I can learn more before deciding to sign up.

**Acceptance Criteria:**
- [ ] 3 blog post cards render with category tag, title, 2-line-clamped excerpt, author name, publish date, and "Read more" link
- [ ] "View all articles" link present at section level
- [ ] Confirm with product/content whether this requires a full blog system (post pages, pagination) or is homepage-preview-only with external/CMS-only full posts

*Not in v1.0 — blog section has no prior story, despite being a confirmed, fully-designed homepage section with its own content type (see content.md §3.6).*

---

## Sprint 2 — Authentication (Weeks 3–4)

**Goal:** Login page complete, NextAuth integrated, session management working.

---

**US-S2-01**
> As a **developer**, I want NextAuth configured, so that authentication is handled securely across the application.

**Acceptance Criteria:**
- [ ] Auth.js **v5.x** installed (`next-auth@5`)
- [ ] `auth.ts` config file at project root with Credentials provider
- [ ] Route handler live at `app/api/auth/[...nextauth]/route.ts` (v5 App Router pattern)
- [ ] `AUTH_SECRET` and `AUTH_URL` set in Vercel env (v5 renames `NEXTAUTH_SECRET` → `AUTH_SECRET`, `NEXTAUTH_URL` → `AUTH_URL`)
- [ ] JWT session strategy active ⚠️ ASSUMPTION
- [ ] CSRF protection active (Auth.js v5 default)
- [ ] Credentials-only provider configured — mockup shows no OAuth buttons, strengthening (not proving) this as the correct scope
- [ ] Middleware uses `auth()` helper from `auth.ts` — not `next-auth/middleware` (v4 pattern, removed in v5)

---

**US-S2-02**
> As a **Visitor**, I want to see the TelcoNow login page, so that I can access my account.

**Acceptance Criteria:**
- [ ] Login page renders at `/login` as a **45/55 split-screen layout** — left dark brand panel, right white form panel. CORRECTED from v1.0, which only said "logo visible" with no layout detail; this is a materially different build than a centred-card layout
- [ ] Left panel renders: logo, heading ("Your account. Your data. Always in control."), 3 value-prop bullets
- [ ] Page accessible without authentication
- [ ] Email and password fields present, full-width within a 400px max-width form container
- [ ] "Sign in" submit button present (confirmed label — not "Log in")

---

**US-S2-03**
> As a **Visitor**, I want to log in with my credentials, so that I can access my customer dashboard.

**Acceptance Criteria:**
- [ ] Valid credentials redirect to `/dashboard`
- [ ] Session cookie set on successful login
- [ ] Password field is masked by default
- [ ] Password field has a working show/hide visibility toggle (eye icon) — NEW, confirmed in mockup, not previously specified anywhere
- [ ] Form is submittable via keyboard (Enter key)

---

**US-S2-04**
> As a **Visitor**, I want to see a clear error when my login fails, so that I know my credentials were incorrect.

**Acceptance Criteria:**
- [ ] Error message displayed on invalid credentials
- [ ] Error does not reveal whether email or password was wrong
- [ ] User remains on `/login` after failure
- [ ] Email field retains value; password field clears ⚠️ ASSUMPTION
- [ ] ⚠️ **No error-state UI exists in the mockup at all.** This story currently has no visual design to build against — needs a design pass before dev can implement with confidence on placement/styling, not just on copy.

---

**US-S2-05**
> As a **Customer**, I want to be redirected from the login page if I'm already signed in, so that I land directly on my dashboard.

**Acceptance Criteria:**
- [ ] Authenticated user visiting `/login` redirected to `/dashboard`
- [ ] Login form not briefly rendered before redirect

---

**US-S2-06**
> As a **Customer**, I want my session to expire after a period of inactivity, so that my account is protected on shared devices.

**Acceptance Criteria:**
- [ ] Session expires after 30 days (NextAuth default) ⚠️ ASSUMPTION
- [ ] Expired session redirects to `/login` on next request
- [ ] No stale customer data shown after session expiry
- [ ] ⚠️ No "remember me" option exists in the mockup — if extended sessions are a requirement, confirm explicitly with product rather than relying on the NextAuth default by omission

---

**US-S2-07**
> As a **Visitor**, I want the login page to work on my mobile device, so that I can log in without a desktop.

**Acceptance Criteria:**
- [ ] Form renders correctly at 375px — ⚠️ no mobile design exists for the split-screen layout; how the left brand panel behaves on mobile (hidden? stacked above form? removed entirely?) is completely undecided, not just untested
- [ ] Input fields are full-width on mobile
- [ ] Submit button meets 44×44px touch target
- [ ] No horizontal scroll at 375px
- [ ] Keyboard does not obscure input fields on mobile ⚠️ ASSUMPTION

---

**US-S2-08**
> As a **developer**, I want unauthenticated access to protected routes blocked, so that customer data is never exposed without a valid session.

**Acceptance Criteria:**
- [ ] Unauthenticated request to `/dashboard` returns 302 to `/login`
- [ ] Middleware protects all `/dashboard` routes
- [ ] No dashboard content rendered in response body for unauthenticated requests

---

**⚠️ MISSING FROM THIS SPRINT — flagged, not added:** No story exists for the "Forgot password?" link confirmed on the login page, and no story exists for the "Get started" sign-up entry point also confirmed on this page. Both are visible, designed UI elements with no corresponding backlog item. Resolve the scope conflict in build-spec.md §7 before this sprint is considered complete as currently planned — shipping the login page with dead-end links is a worse outcome than either building the flows or removing the links.

---

## Sprint 3 — Customer Dashboard (Weeks 5–6)

**Goal:** Authenticated dashboard complete, customer data displayed, session lifecycle fully handled.

> ⚠️ **This sprint is significantly under-scoped relative to the confirmed mockup.** v1.0 had 3 content-related stories (US-S3-01 through 03) covering a vague "account summary." The actual confirmed dashboard has **8 distinct card sections** with real data requirements (plan, usage meter with progress bar, billing/payment method, recent activity feed, a 6-month usage chart, support tickets, add-ons with toggles, and an upgrade-prompt banner). I've expanded the stories below to match. This is not scope creep — it's correcting an under-estimate against the actual design.

---

**US-S3-01**
> As a **Customer**, I want to access my dashboard after logging in, so that I can manage my TelcoNow account.

**Acceptance Criteria:**
- [ ] Dashboard renders at `/dashboard` for authenticated users with a fixed 240px sidebar (logo, 6 nav items: Dashboard/Usage/Billing/Add-ons/Support/Settings, user info, logout) + scrollable main content area — CORRECTED with confirmed layout, v1.0 had no layout detail
- [ ] Unauthenticated access redirects to `/login`
- [ ] Page displays customer first name in a greeting (confirmed: "Good morning, Alex.") and current date + days-until-next-bill (confirmed: "Monday, 23 June 2026 · Your next bill is in 22 days") — NEW specificity, v1.0 only said "displays customer name"
- [ ] Session is validated server-side before rendering

---

**US-S3-02**
> As a **Customer**, I want to see my current plan on the dashboard, so that I know what I'm subscribed to.

**Acceptance Criteria:**
- [ ] Plan name, data allowance badge (e.g. "50GB"), and price displayed in AUD (confirmed: "Plus" / "$65/mo")
- [ ] Active status badge displayed
- [ ] Renewal date and contract type ("No lock-in") displayed
- [ ] "Manage plan" link present
- [ ] Data is customer-specific — not generic

---

**US-S3-03 — EXPANDED**
> As a **Customer**, I want to see my current data usage on the dashboard, so that I know how close I am to my limit.

**Acceptance Criteria:**
- [ ] Usage displayed as "X GB of Y GB" with a percentage-used badge
- [ ] Progress bar renders, visually distinguishing used vs. remaining, with a marked warning threshold (confirmed: 80% threshold marker)
- [ ] Remaining data, billing cycle dates, and overage rate displayed in 3 sub-cards
- [ ] Days remaining in cycle displayed

*Not in v1.0 — usage meter had no dedicated story; it was implicitly bundled into a vague "account summary" story.*

---

**US-S3-04 — EXPANDED**
> As a **Customer**, I want to see my billing information on the dashboard, so that I know what I owe and how I'm paying.

**Acceptance Criteria:**
- [ ] Next payment amount and due date displayed
- [ ] Last payment date and status badge ("Paid") displayed
- [ ] Payment method displayed (confirmed: card type icon + last 4 digits)
- [ ] "Billing history" link present

*Not in v1.0 — billing overview had no dedicated story.*

---

**US-S3-05 — NEW STORY**
> As a **Customer**, I want to see my recent account activity, so that I have a record of charges and changes.

**Acceptance Criteria:**
- [ ] Activity list renders with icon, title, date/description, amount, and status badge per item
- [ ] Confirmed activity types include: data top-up, bill payment, plan upgrade, add-on purchase
- [ ] "View all" link present
- [ ] List shows no other customer's data

*Not in v1.0 at all — this section didn't exist in the prior backlog.*

---

**US-S3-06 — NEW STORY**
> As a **Customer**, I want to see my historical data usage over time, so that I can understand my usage patterns.

**Acceptance Criteria:**
- [ ] Bar chart renders showing 6 months of usage data with a visible cap line
- [ ] Current/in-progress month is visually distinguished from completed months (confirmed: dashed outline styling)
- [ ] Months exceeding the cap are visually distinguished (confirmed: different bar colour)
- [ ] Confirm with dev whether this is implemented as lightweight CSS/SVG (as in the mockup) or a charting library — affects bundle size, see build-spec.md §4.2

*Not in v1.0 at all.*

---

**US-S3-07 — NEW STORY**
> As a **Customer**, I want to see and raise support tickets from my dashboard, so that I can get help without leaving my account.

**Acceptance Criteria:**
- [ ] Ticket list renders with subject, status badge (Open/Resolved), priority badge, and date
- [ ] Open ticket count displayed at section level
- [ ] "Raise a ticket" action present
- [ ] ⚠️ No ticket-raising flow/form is designed — this story covers display only; raising a new ticket needs its own design and story once scoped

*Not in v1.0 at all.*

---

**US-S3-08 — NEW STORY**
> As a **Customer**, I want to manage my add-ons from my dashboard, so that I can turn extra services on or off.

**Acceptance Criteria:**
- [ ] Add-on list renders with icon, name, price, and an on/off toggle per add-on
- [ ] Inactive add-ons are visually de-emphasised (confirmed: reduced opacity)
- [ ] "Manage" / "Add" action present per item depending on active state
- [ ] Toggling an add-on triggers the correct billing change — ⚠️ backend behaviour for this is entirely unspecified, flagging as needing a real API contract before this can be built, not just a UI task

*Not in v1.0 at all.*

---

**US-S3-09 — NEW STORY**
> As a **Customer**, I want to be prompted to upgrade when I'm near my data limit, so that I can avoid overage charges.

**Acceptance Criteria:**
- [ ] Upgrade banner renders when usage crosses a threshold (confirmed example: 77% used)
- [ ] Banner includes current usage badge, headline, supporting copy, "Upgrade now" CTA, and "Compare plans" link
- [ ] Threshold value and banner dismissal behaviour (if any) confirmed with product — mockup shows no dismiss control, but confirm this is intentional rather than an oversight

*Not in v1.0 at all.*

---

**US-S3-10** *(renumbered from US-S3-04 in v1.0)*
> As a **Customer**, I want to log out of my account, so that my session is ended securely.

**Acceptance Criteria:**
- [ ] Logout link visible in sidebar (confirmed: "← Log out", bottom of sidebar near user info)
- [ ] Logout clears session cookie
- [ ] Post-logout redirect destination — ⚠️ genuinely unresolved, not an assumption gap; the mockup's link has no real target and no decision has been made
- [ ] Accessing `/dashboard` after logout redirects to `/login`

---

**US-S3-11** *(renumbered from US-S3-05)*
> As a **Customer**, I want my dashboard to be protected from unauthorised access, so that my account information is secure.

**Acceptance Criteria:**
- [ ] Tampered session cookie redirects to `/login`
- [ ] No sensitive data in page source for unauthenticated requests
- [ ] No customer data in client-side JS bundles
- [ ] `NEXTAUTH_SECRET` not exposed in browser

---

**US-S3-12** *(renumbered from US-S3-06)*
> As a **Customer**, I want the dashboard to work on my mobile device, so that I can manage my account on the go.

**Acceptance Criteria:**
- [ ] Dashboard renders correctly at 375px — ⚠️ **no mobile dashboard design exists.** With 8 card sections and a fixed sidebar, this is a substantial layout problem to solve from scratch, not a CSS tweak. Flagging this as likely needing its own design spike before estimation.
- [ ] Navigation usable on mobile — confirmed undesigned, not just "pattern TBD" as v1.0 stated
- [ ] All tap targets ≥ 44×44px
- [ ] No horizontal scroll at 375px

---

**US-S3-13** *(renumbered from US-S3-07)*
> As a **Customer**, I want the dashboard to load quickly, so that I'm not waiting to see my account information.

**Acceptance Criteria:**
- [ ] Dashboard renders in under 3s on a standard connection ⚠️ ASSUMPTION
- [ ] No layout shift after data loads (CLS < 0.1)
- [ ] Each of the 8 dashboard card sections displays a skeleton loading state while its data is fetching. Skeleton requirements per section:
  - **Plan summary** — grey rectangle placeholder for plan name, price, and renewal date
  - **Data usage meter** — grey bar for the progress track, grey blocks for the 3 sub-cards
  - **Billing overview** — grey rectangle for next payment amount and last payment row
  - **Recent activity** — 3 grey rows (icon + two lines of text + amount) at reduced opacity
  - **Usage history chart** — 6 grey bars at varying heights (mimic chart shape)
  - **Support tickets** — 2 grey rows matching ticket list item height
  - **Add-ons** — 4 grey rows matching add-on list item height
  - **Upgrade banner** — single grey rectangle matching banner height
- [ ] Skeleton uses the existing `#F0F0F6` neutral-badge-bg token as the fill colour — matches the design system without needing new tokens
- [ ] Skeleton blocks use `animate-pulse` (Tailwind built-in) for the loading animation
- [ ] No skeleton shown after data loads — replaced immediately by real content with no flash

---

## Sprint 4 — QA, Polish & Launch Readiness (Weeks 7–8)

**Goal:** Full regression complete, performance validated, production deployment ready.

---

**US-S4-01**
> As a **QA Engineer**, I want to run a full regression across all pages, so that no defects reach production.

**Acceptance Criteria:**
- [ ] All user stories from Sprints 1–3 re-verified — **note this is now a materially larger regression surface given Sprint 1's 3 new stories and Sprint 3's 6 new stories**
- [ ] No open P1 or P2 defects
- [ ] All ⚠️ ASSUMPTION items resolved or formally deferred
- [ ] The sign-up/password-reset scope conflict (build-spec.md §7) is resolved one way or the other before this story can be considered complete — an unresolved scope conflict at regression time is too late

---

**US-S4-02**
> As a **developer**, I want a clean production build, so that the application is deployable without errors.

**Acceptance Criteria:**
- [ ] `next build` exits 0 with no errors
- [ ] `tsc --noEmit` exits 0 with no type errors
- [ ] No ESLint errors
- [ ] No console errors on any page in production build

---

**US-S4-03**
> As a **Visitor**, I want the homepage to match the approved design, so that TelcoNow's brand is represented correctly.

**Acceptance Criteria:**
- [ ] Visual design matches approved mockups — design files now exist (`TelcoNow Homepage.dc.html` et al.), so this story's original blocking condition ("design files must exist before this story can be accepted") is **resolved for desktop**; still blocked for mobile/tablet, where no design exists
- [ ] No unintended layout differences across breakpoints — only checkable at 1280px currently
- [ ] Colours, fonts, and spacing match confirmed design tokens (see design.md §2-4)

---

**US-S4-04**
> As a **Visitor**, I want all pages to perform well, so that the site is fast on any device.

**Acceptance Criteria:**
- [ ] Lighthouse run on homepage, login, dashboard
- [ ] LCP < 2.5s on all pages
- [ ] CLS < 0.1 on all pages
- [ ] Performance score ≥ 80 on all pages ⚠️ ASSUMPTION

---

**US-S4-05**
> As a **developer**, I want all environment variables configured in Vercel production, so that the app runs correctly after deployment.

**Acceptance Criteria:**
- [ ] `NEXTAUTH_SECRET` set in Vercel production env
- [ ] `NEXTAUTH_URL` set to production domain
- [ ] `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` set
- [ ] No env variables hardcoded in source code

---

**US-S4-06**
> As a **QA Engineer**, I want cross-browser testing completed, so that all users can access the site regardless of their browser.

**Acceptance Criteria:**
- [ ] Tested on Chrome (latest) ⚠️ ASSUMPTION: browser matrix TBD
- [ ] Tested on Safari (latest)
- [ ] Tested on Firefox (latest)
- [ ] Tested on Safari iOS (mobile)
- [ ] Tested on Chrome Android (mobile)
- [ ] No critical defects on any supported browser

---

**US-S4-07**
> As a **QA Engineer**, I want security checks completed before launch, so that customer data is protected in production.

**Acceptance Criteria:**
- [ ] `NEXTAUTH_SECRET` not exposed client-side
- [ ] No credentials logged in server or browser console
- [ ] CSRF token present on login form
- [ ] Auth error messages non-enumerable
- [ ] Session cookie is `HttpOnly` and `Secure` in production

---

## Summary

| Sprint | Focus | Stories (v1.0) | Stories (v1.1) |
|---|---|---|---|
| Sprint 1 | Foundation & Homepage | 8 | 11 (+3 new: stats bar, referral banner, blog) |
| Sprint 2 | Authentication | 8 | 8 (unchanged count, but missing sign-up/reset flagged) |
| Sprint 3 | Customer Dashboard | 7 | 13 (+6 new: usage meter detail, billing detail, activity feed, usage chart, support tickets, add-ons, upgrade banner) |
| Sprint 4 | QA, Polish & Launch | 7 | 7 |
| **Total** | | **30** | **39** |

**This is a 30% increase in story count, entirely driven by what the mockups actually show versus what v1.0 guessed.** Sprint 3 in particular was significantly under-scoped — recommend revisiting whether 2 weeks is still realistic for the dashboard given it now covers 8 distinct, data-rich UI sections instead of the original vague 3.

---

## Open Questions

1. **Resolve before Sprint 2:** is sign-up in scope? Is password reset in scope? (See build-spec.md §7.) This backlog has no stories for either.
2. **Resolve before Sprint 3 is estimated:** is 2 weeks still realistic for the expanded dashboard scope (13 stories vs. the original 7)?
3. What customer data is displayed on the dashboard — confirmed now far more specific (plan, usage, billing, activity, tickets, add-ons) than v1.0's open question implied.
4. What is the NextAuth provider — credentials, OAuth, or both? Mockup narrows toward credentials-only but doesn't prove it.
5. What is the approved browser support matrix?
6. **When is the mobile/tablet design pass happening?** This now blocks Sprint 1's mobile story, Sprint 2's mobile story, and Sprint 3's mobile story simultaneously — it's not a Sprint 4 polish item, it's a cross-sprint blocker.
7. Is there a sign-up or registration flow in scope for any sprint? (Restated from Q1 — deliberately repeated because it's the single highest-impact unresolved question in this document.)
