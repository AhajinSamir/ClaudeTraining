# TelcoNow — Content Specification

**Project:** TelcoNow
**CMS:** Contentful
**Spec Version:** 1.1
**Status:** Draft — Updated against visual mockups (`TelcoNow Homepage.dc.html`, `TelcoNow Login.dc.html`, `TelcoNow Dashboard.dc.html`). No Contentful space access or content model export provided — field names/types below are still ⚠️ ASSUMPTION, but copy, sections, and structure are now confirmed against the mockups rather than guessed from generic telco patterns.

> ⚠️ IMPORTANT CAVEAT: The `.dc.html` files are static design mockups with hardcoded copy — they are not a live Contentful integration. They confirm *what content needs to exist and how it's structured on the page*, but not *whether it's actually CMS-driven* vs. hardcoded in code. Sections below inherit this caveat individually.

---

## 1. CMS Overview

Contentful is used as the content source for the TelcoNow web application. Next.js 14 fetches content via the Contentful Delivery API (read-only, public) or Preview API (draft content).

⚠️ ASSUMPTION: Content Delivery API is used for production. Preview API is used for staging/preview deploys on Vercel.

---

## 2. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `CONTENTFUL_SPACE_ID` | Yes | Contentful space identifier |
| `CONTENTFUL_ACCESS_TOKEN` | Yes | Delivery API token (production) |
| `CONTENTFUL_PREVIEW_TOKEN` | Yes | Preview API token (staging) ⚠️ ASSUMPTION |
| `CONTENTFUL_ENVIRONMENT` | No | Defaults to `master` ⚠️ ASSUMPTION |

---

## 3. Content Types

⚠️ ASSUMPTION: All content types below are inferred from the mockups. Copy and structure are confirmed visually; field names/types/Contentful-vs-hardcoded status are not confirmed.

---

### 3.1 Hero Banner

**Used on:** Homepage
**Confirmed copy:** Headline "Australia's fastest 5G network." / Subheadline "Flexible plans. No lock-in contracts. Cancel any time." / Eyebrow badge "5G Now Live Nationwide"

**CHANGE FROM v1.0:** Hero has **two CTAs**, not one (primary + secondary/ghost). Schema below updated accordingly.

| Field | Type | Required | Notes |
|---|---|---|---|
| `eyebrowText` | Short text | No | Small badge label above headline, e.g. "5G Now Live Nationwide" — NEW field, not in v1.0 |
| `headline` | Short text | Yes | H1 — max 80 chars |
| `subheadline` | Short text | No | Max 160 chars |
| `primaryCtaLabel` | Short text | Yes | e.g. "View plans" — renamed from `ctaLabel` |
| `primaryCtaUrl` | Short text | Yes | Internal route or external URL — renamed from `ctaUrl` |
| `secondaryCtaLabel` | Short text | No | e.g. "Check coverage" — NEW field |
| `secondaryCtaUrl` | Short text | No | NEW field |
| `backgroundImage` | Asset (image) | No | Mockup uses an inline SVG illustration, not a raster image — ⚠️ ASSUMPTION this stays an editable asset rather than hardcoded artwork |

---

### 3.2 Trust Stats Bar — NEW SECTION (not in v1.0)

**Used on:** Homepage, directly beneath hero
**Confirmed content:** 3 stats — "99.8% / Network uptime", "4.2M+ / Customers", "★ 4.8 / Award-winning support"

| Field | Type | Required | Notes |
|---|---|---|---|
| `statValue` | Short text | Yes | e.g. "99.8%", "4.2M+", "★ 4.8" — kept as text, not number, to allow symbols (%, ★, +) |
| `statLabel` | Short text | Yes | e.g. "Network uptime" |

**Parent type:** `Page — Homepage` references an array of these (min 1, mockup shows exactly 3 — ⚠️ ASSUMPTION on min/max)

---

### 3.3 Plan / Offer Card

**Used on:** Homepage plans section
**Confirmed data:** 3 plans — Starter $39/mo, Plus $65/mo (featured/"Most popular"), Pro $99/mo. Each has 5 feature bullets and one CTA.

| Field | Type | Required | Notes |
|---|---|---|---|
| `planName` | Short text | Yes | Max 50 chars — confirmed: "Starter", "Plus", "Pro" |
| `tagline` | Short text | No | NEW field — confirmed per-card subtext, e.g. "Great for light users." |
| `price` | Number | Yes | AUD, per month — confirmed values: 39 / 65 / 99 |
| `priceSuffix` | Short text | No | Confirmed: "/month" |
| `features` | List (short text) | Yes | Confirmed: exactly 5 items per plan in mockup — tightening from "min 1, max 6" to **min 1, max 6, mockup standard is 5** |
| `ctaLabel` | Short text | Yes | Confirmed: "Get Starter" / "Get Plus" / "Get Pro" — pattern is "Get {planName}" |
| `ctaUrl` | Short text | Yes | |
| `highlighted` | Boolean | No | Confirmed: drives "Most popular" badge + visual emphasis on Plus |
| `badgeText` | Short text | No | NEW field — confirmed badge copy "Most popular" is editable text, not just a boolean-triggered hardcoded label |

---

### 3.4 Feature Block

**Used on:** Homepage features section
**STATUS CHANGE:** ⚠️ Not present anywhere in the homepage mockup. No "features section" exists as a distinct block — feature-like content only appears nested inside Plan Cards (3.3) and the value-prop bullets on the Login page (3.8, new). Recommend removing this content type from the model or confirming with design whether it was cut.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | Yes | Max 60 chars |
| `description` | Long text | Yes | Max 200 chars |
| `icon` | Asset (image/SVG) | No | ⚠️ ASSUMPTION |

---

### 3.5 Promo / Referral Banner — NEW SECTION (not in v1.0)

**Used on:** Homepage, between plans and blog sections
**Confirmed copy:** "Refer a friend, get one month free." / "Share your code. When they sign up, you both win." / CTA "Refer now"

| Field | Type | Required | Notes |
|---|---|---|---|
| `headline` | Short text | Yes | Max 60 chars |
| `description` | Short text | No | Max 160 chars |
| `ctaLabel` | Short text | Yes | |
| `ctaUrl` | Short text | Yes | |
| `icon` | Asset (image/SVG) | No | Mockup uses inline SVG gift icon — ⚠️ ASSUMPTION whether this is editable per-banner or hardcoded |

---

### 3.6 Blog Post (summary card) — NEW SECTION (not in v1.0)

**Used on:** Homepage "From the TelcoNow blog" section
**Confirmed structure:** 3 cards shown, each with category tag, title, excerpt (2-line clamp), author name, publish date, "Read more" link

| Field | Type | Required | Notes |
|---|---|---|---|
| `category` | Short text | Yes | Confirmed values in mockup: "Technology", "Tips", "Company" — ⚠️ ASSUMPTION whether this is a fixed enum or free text |
| `title` | Short text | Yes | Max ~70 chars based on mockup line-wrap |
| `excerpt` | Long text | Yes | Truncates at 2 lines in UI — confirm max char count with design |
| `author` | Short text | Yes | Confirmed display as plain text name, not a Reference to an Author content type — ⚠️ ASSUMPTION this should arguably be a Reference for reuse, but mockup treats it as flat text |
| `publishDate` | Date | Yes | |
| `slug` / `url` | Short text | Yes | "Read more" target — ⚠️ ASSUMPTION on field name |
| `accentColor` | Short text | No | Each card has a different top accent bar colour — ⚠️ ASSUMPTION whether editor-controlled or hardcoded by category |

**Section also needs:** a "View all articles" link at section level (homepage-level field, not per-card).

---

### 3.7 Page — Homepage

**Used on:** `/`

| Field | Type | Required | Notes |
|---|---|---|---|
| `metaTitle` | Short text | Yes | Max 60 chars |
| `metaDescription` | Short text | Yes | Max 160 chars |
| `heroBanner` | Reference → Hero Banner | Yes | |
| `trustStats` | References (array) → Trust Stat | No | NEW — see 3.2 |
| `plans` | References (array) → Plan Card | Yes | Min 1 |
| `referralBanner` | Reference → Promo Banner | No | NEW — see 3.5 |
| `blogPosts` | References (array) → Blog Post | No | NEW — see 3.6 |
| `features` | References (array) → Feature Block | No | ⚠️ Likely remove — see 3.4 |

---

### 3.8 Login Page — Static Copy (confirmed, not Contentful)

**Used on:** `/login`
**Confirmed:** Page is fully static per original assumption — no CMS-driven fields. Mockup confirms specific hardcoded copy:
- Left panel: eyebrow "Your account", heading "Your account. Your data. Always in control.", 3 value bullets ("View real-time usage", "Manage your plan", "Pay your bill")
- Right panel: "Welcome back.", "Sign in to your TelcoNow account", email + password fields, "Forgot password?" link, "Sign in" button, "Don't have an account? Get started →"

No content type needed — confirms v1.0's "Static (no CMS content)" classification was correct. Listing copy here only so it's tracked somewhere if marketing later wants it CMS-editable.

---

### 3.9 Global Settings

⚠️ ASSUMPTION: Single entry for site-wide config. Not visibly exercised in any mockup (no footer phone/email shown in Homepage mockup — footer only shows nav links and legal links, no `supportPhone`/`supportEmail` rendered anywhere).

| Field | Type | Required | Notes |
|---|---|---|---|
| `siteName` | Short text | Yes | "TelcoNow" |
| `supportPhone` | Short text | No | ⚠️ Not present in any mockup — may be unused |
| `supportEmail` | Short text | No | ⚠️ Not present in any mockup — may be unused |
| `footerLinks` | List (short text) | No | Confirmed footer has 3 columns (Plans, Support, Legal) plus brand blurb — structure is more complex than a flat list; recommend modelling as grouped link columns |

---

## 4. Content Rendering by Page

| Page | Content Source | Fetch Strategy |
|---|---|---|
| Homepage (`/`) | Contentful | SSG with ISR ⚠️ ASSUMPTION |
| Login (`/login`) | Static (confirmed — no CMS content, hardcoded copy per mockup) | Static |
| Dashboard (`/dashboard`) | Confirmed NOT Contentful — customer/account data (plan, usage, billing, tickets, add-ons) from an internal API; source system unconfirmed | SSR |

---

## 5. Fetch & Caching Strategy

⚠️ ASSUMPTION: ISR (Incremental Static Regeneration) used for homepage.

```ts
// ⚠️ ASSUMPTION — revalidation interval TBD
export const revalidate = 3600 // 1 hour
```

---

## 6. Content QA Test Cases

### 6.1 Contentful Delivery

| ID | Scenario | Expected |
|---|---|---|
| CNT-01 | Homepage loads with valid Contentful data | All content fields render, no nulls visible |
| CNT-02 | Contentful API unreachable | Fallback or error state shown — no crash ⚠️ ASSUMPTION: fallback behaviour TBD |
| CNT-03 | Required field missing in Contentful entry | Graceful degradation — no broken layout |
| CNT-04 | Image asset missing or broken URL | Fallback image or no broken `<img>` tag |
| CNT-05 | Long text exceeds display limits | Text truncates or wraps — no overflow |

### 6.2 Homepage Content

| ID | Scenario | Expected |
|---|---|---|
| CNT-06 | Hero headline renders | Visible, correct text, correct heading level (H1) |
| CNT-07 | Hero primary + secondary CTA render | Both buttons present, correct labels, correct link targets |
| CNT-08 | Plans section renders | Min 1 plan card displayed; Plus/featured card shows "Most popular" badge |
| CNT-09 | Plan price displays AUD format | e.g. "$49/month" — no raw number |
| CNT-10 | Meta title and description present | Verified via `<head>` — not blank |
| CNT-11 | Trust stats bar renders | All 3 stat values + labels visible, no truncation |
| CNT-12 | Referral banner renders | Headline, description, and CTA all present |
| CNT-13 | Blog section renders | 3 cards minimum, each with category, title, excerpt, author, date, "Read more" link |
| CNT-14 | Blog excerpt overflow | 2-line clamp behaves correctly, no text spilling out of card |

### 6.3 SEO & Meta

| ID | Scenario | Expected |
|---|---|---|
| CNT-15 | Homepage `<title>` set from Contentful | Matches `metaTitle` field value |
| CNT-16 | Homepage `<meta name="description">` set | Matches `metaDescription` field value |
| CNT-17 | No duplicate H1 on any page | Exactly one H1 per page |

### 6.4 Preview Mode

⚠️ ASSUMPTION: Contentful preview mode supported on Vercel preview deploys.

| ID | Scenario | Expected |
|---|---|---|
| CNT-18 | Draft content visible in preview | Unpublished Contentful entries render on preview URL |
| CNT-19 | Draft content NOT visible in production | Production only shows published entries |

---

## 7. Content Validation Rules

| Field | Rule |
|---|---|
| All required fields | Must not be null, empty string, or whitespace |
| `metaTitle` | 10–60 characters |
| `metaDescription` | 50–160 characters |
| `price` | Positive number, greater than 0 |
| `ctaUrl` / `primaryCtaUrl` / `secondaryCtaUrl` | Valid URL or valid internal route (starts with `/`) |
| `backgroundImage` | Valid asset URL, resolves with 200 |
| `headline` | Must not exceed 80 characters |
| `publishDate` (Blog Post) | Must be a valid past or present date — NEW |

---

## 8. Open Questions

1. Are the new sections confirmed in this revision (Trust Stats, Referral Banner, Blog Posts) actually intended to be Contentful-managed, or are they hardcoded marketing copy that happened to be included in the design mockup? **This is the single biggest open question from this update** — the mockup proves the sections exist, not that they're CMS-driven.
2. Is the "Feature Block" content type (3.4) still needed, given no standalone features section appears in the homepage mockup?
3. Is `author` on Blog Post meant to be a Reference to a reusable Author entity, or flat text as shown?
4. What is the actual content model defined in the Contentful space (still unconfirmed — mockups tell us page structure, not CMS schema)?
5. Is ISR or SSG the intended fetch strategy for the homepage?
6. Does the dashboard consume any Contentful content, or is it entirely customer data from a separate API? Mockup strongly suggests the latter — no CMS-style copy fields visible, all data is account-specific.
7. Are there localisation requirements? (Australian English assumed — en-AU) ⚠️ ASSUMPTION
8. `supportPhone`/`supportEmail` in Global Settings — confirmed unused in any mockup. Keep, remove, or are they used elsewhere (e.g. a support page not yet designed)?
