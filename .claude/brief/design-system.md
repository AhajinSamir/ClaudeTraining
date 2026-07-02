# TelcoNow — Design Specification

**Project:** TelcoNow
**Stack:** Tailwind CSS 4.x, Next.js 15.x (LTS)
**Spec Version:** 1.1
**Status:** Draft — Updated against visual mockups (`TelcoNow Homepage.dc.html`, `TelcoNow Login.dc.html`, `TelcoNow Dashboard.dc.html`).

> ⚠️ CRITICAL GAP — READ FIRST: All three mockups are **fixed-width desktop layouts only** (1280px max-width, hardcoded px/% values in inline styles, no media queries, `$preview` dimensions set to 1280×800/900 in the file metadata). None show a mobile or tablet view. There is no hamburger menu, no breakpoint behaviour, no evidence of layout at 375px or 768px anywhere. **Every "mobile renders correctly" QA item below is currently unverifiable against design** — not because it's unconfirmed, but because no mobile design exists yet to confirm it against. This needs a real mobile design pass before Sprint 4 visual QA, not just more inspection of these files.
>
> Also note: the mockups use raw inline styles and hardcoded pixel/percentage values, not Tailwind utility classes. Translating this into Tailwind's breakpoint system (`sm`/`md`/`lg`/`xl`) is an implementation decision the dev team will have to make from scratch — the mockups don't hint at how it should collapse.

---

## 1. Breakpoints

Tailwind CSS defaults — **still ⚠️ ASSUMPTION**. Mockups give no evidence of breakpoint behaviour (see gap above).

| Label | Min Width | Primary Test Device |
|---|---|---|
| `sm` | 640px | Large mobile / small tablet |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop — confirmed as the mockup's actual canvas width |
| `2xl` | 1536px | Wide desktop |

**Mobile baseline:** 375px (iPhone SE) — smallest supported viewport. ⚠️ Still unconfirmed by any design artifact.

---

## 2. Colour Palette

**CONFIRMED — replaces v1.0 placeholder palette entirely.** The mockups use a real, consistent brand palette (deep purple + violet accent), not the placeholder blue tokens previously documented. Whoever wrote v1.0 was guessing; this is now extracted directly from the mockup CSS.

> ⚠️ TAILWIND V4 NOTE: Tokens below are NOT configured in `tailwind.config.js` — Tailwind v4 uses CSS-first configuration. Define all brand tokens in your global CSS file using `@theme`:
>
> ```css
> /* app/globals.css */
> @import "tailwindcss";
>
> @theme {
>   --color-brand-deep-purple: #460073;
>   --color-brand-purple: #A100FF;
>   --color-brand-purple-dark: #7500C0;
>   --color-brand-purple-tint: #E5CCFF;
>   --color-surface-tint: #F5EEFF;
>   --color-neutral-900: #0F0F1A;
>   --color-neutral-500: #4A4A5A;
>   --color-border-neutral: #E8E8F0;
> }
> ```
>
> These tokens are then usable as Tailwind classes: `bg-brand-deep-purple`, `text-brand-purple`, etc.

| Token | Hex | Usage | Source |
|---|---|---|---|
| `brand-deep-purple` | `#460073` | Header, hero background, sidebar background, login left panel | Confirmed — used identically across all 3 mockups |
| `brand-purple` (primary) | `#A100FF` | Primary CTAs, links, active states, focus rings | Confirmed |
| `brand-purple-dark` | `#7500C0` | Hover state on primary buttons | Confirmed |
| `brand-purple-tint` | `#E5CCFF` | Badges, accents, light highlights on dark backgrounds | Confirmed |
| `surface-tint` | `#F5EEFF` | Page background (homepage, dashboard), hover backgrounds | Confirmed |
| `neutral-900` (text) | `#0F0F1A` | Body text, headings, footer background | Confirmed — darker/more saturated than v1.0's `#111827` |
| `neutral-500` (secondary text) | `#4A4A5A` | Secondary text, labels, captions | Confirmed — different from v1.0's `#6B7280` |
| `border-neutral` | `#E8E8F0` | Card borders, dividers, input borders | NEW — not in v1.0 at all |
| `white` | `#FFFFFF` | Card/surface backgrounds | Confirmed |
| `success` | `#00B388` (also `#00875F` text / `#E6F9F4` bg) | Success badges, paid status | Confirmed — v1.0 only had a single success hex, mockup uses a 3-tone system (icon/text/bg) |
| `warning` | `#FF6B35` (also `#C94F10` text / `#FFF2EC` bg) | Usage warnings, threshold alerts | NEW — not in v1.0 at all |
| `error` | `#B5001F` text / `#FFEDF0` bg | Form errors, alerts | Confirmed concept, different hex from v1.0's `#DC2626` |
| `info` | `#2A5CC7` text / `#EEF4FF` bg | Informational badges | NEW — not in v1.0 |
| `neutral-badge` | `#4A4A5A` text / `#F0F0F6` bg | Neutral/default badges | NEW — not in v1.0 |

**Implication:** if any dev work has already started against the v1.0 placeholder palette, it needs to be redone. This isn't a refinement, it's a different palette.

---

## 3. Typography

**CONFIRMED:** Font is **Inter**, loaded from Google Fonts with weights 400/500/600/700 — not "system-safe default," it's an explicit, deliberate choice confirmed identically across all 3 mockups.

| Role | Font | Weight | Confirmed size | Notes |
|---|---|---|---|---|
| Hero H1 (homepage) | Inter | 700 | `52px`, letter-spacing `-0.025em`, line-height `1.08` | Largest heading in the system — not previously distinguished from page H1 |
| Page H1 (dashboard) | Inter | 700 | `28px` | Smaller than hero H1 — confirms two distinct H1 scales exist depending on context |
| Auth H1 (login "Welcome back.") | Inter | 700 | `32px` | A third H1 scale — ⚠️ flag for design system consolidation, three different H1 sizes across three pages is a lot |
| H2 | Inter | 700 (not 600 as v1.0 assumed) | `32px` | Confirmed on homepage section headers ("Simple, honest pricing.") |
| H3 | Inter | 600 | `18px`–`22px` | Confirmed on blog card titles, login left-panel heading |
| Body | Inter | 400 | `14px`–`15px` | ⚠️ This is BELOW the 16px minimum design.md itself mandates below in this same document (§3 "Minimum body font size: 16px — no exceptions"). The mockups violate the spec's own rule in multiple places (e.g. card descriptions, nav links at 14px). Flagging as a direct contradiction, not a gap. |
| Small / Caption | Inter | 400–500 | `11px`–`13px` | Confirmed on badges, captions, footer links |
| Button | Inter | 600 | `14px`–`16px` | Confirmed — varies by button size variant (see §5.1) |

**Minimum body font size rule (16px, no exceptions) is NOT honored in the mockups.** This needs a decision: either relax the rule, or treat the mockups' 14–15px body text as a defect to fix during implementation. Don't quietly let this slide.

---

## 4. Spacing

Tailwind 4-point scale — partially confirmed, partially still assumed.

| Token | Value | Usage | Status |
|---|---|---|---|
| Card padding | `24px`–`32px` | Confirmed across plan cards, dashboard cards — wider range than v1.0's flat `1.5rem` (24px) |
| Section padding (desktop) | `80px` vertical | Confirmed on homepage sections | NEW — v1.0 didn't specify vertical section padding at all |
| Component gap | `20px`–`24px` | Confirmed grid/flex gaps throughout dashboard and homepage | Roughly matches v1.0's `2rem`/`1rem` tokens but mockup isn't strictly on a 4-point scale (e.g. `14px`, `28px` gaps also appear) |
| Page horizontal padding (desktop) | `48px` | Confirmed (`max-width: 1280px; padding: 0 48px`) | NEW |

⚠️ Mockup spacing is **not strictly on the Tailwind 4-point scale** as v1.0 assumed — several one-off values (14px, 28px, 36px) appear. Dev team should decide whether to normalize to the nearest scale step or preserve exact mockup values.

---

## 5. Components

### 5.1 Button

**Significantly more variants confirmed than v1.0 documented.** v1.0 had 4 variants (Primary/Secondary/Destructive/Disabled). Mockups show at least 6, with size variants layered on top:

| Variant | Background | Text | Border | Height | Notes |
|---|---|---|---|---|---|
| Primary | `#A100FF` | white | none | `44px` | Hover → `#7500C0` + purple glow shadow |
| Primary (large) | `#A100FF` | white | none | `52px` | NEW — used in hero only, larger padding/font (16px) |
| Ghost (white, on dark bg) | transparent | white | `1.5px rgba(255,255,255,0.7)` | `44px` | NEW — header "Log in" button, only works on dark backgrounds |
| Ghost (purple, on light bg) | transparent | `#A100FF` | `1.5px solid #A100FF` | `44px`–`52px` | Confirmed, hover fills `#F5EEFF` |
| Ghost hero (white, large) | transparent | white | `1.5px rgba(255,255,255,0.6)` | `52px` | NEW — distinct from the standard ghost-white variant, only in hero |
| Destructive | — | — | — | — | ⚠️ NOT present in any mockup. No delete/cancel/destructive action is shown anywhere. Still purely an ⚠️ ASSUMPTION carried from v1.0 — no evidence either way |
| Disabled | — | — | — | — | ⚠️ Also not shown in any mockup — no disabled state rendered |

- Min height: `44px` — **confirmed**, consistent across every button in every mockup.
- Border radius: `8px` (`rounded-lg`) — **confirmed**, not just assumed.
- Full-width on mobile: ⚠️ still unconfirmed (no mobile mockup exists).

### 5.2 Input Field

- Height: `44px` — **confirmed**.
- Border: `1px solid #E8E8F0` — **confirmed**, hex corrected from v1.0's `neutral-300` placeholder.
- Focus ring: `3px rgba(161,0,255,0.15)` — **confirmed**, but v1.0 said `2px solid primary`; actual mockup uses a soft 3px translucent ring, not a solid 2px ring. Different visual treatment.
- Error state: ⚠️ NOT shown in any mockup (see auth.md — no error-state UI was designed). v1.0's documented error treatment (`1px solid error`, message below field) remains unverified.
- Label above input: **confirmed**, never placeholder-only.
- Password field: **confirmed** masked with a working show/hide eye-icon toggle (previously only an ⚠️ ASSUMPTION in v1.0 — now confirmed real, see auth.md §7).

### 5.3 Navigation / Header

⚠️ ASSUMPTION corrected: v1.0 assumed a generic responsive header with hamburger-on-mobile. **Confirmed instead:** a single fixed desktop header — `position: sticky`, dark purple (`#460073`) background, centered nav links, right-aligned auth actions. No hamburger menu or mobile drawer is designed anywhere.

- Desktop: horizontal nav bar — **confirmed**.
- Sticky on scroll — **confirmed** (`position: sticky; top: 0`), no longer an assumption.
- Mobile: hamburger menu, full-width drawer — ⚠️ **still entirely unconfirmed, not just assumed.** No mobile header design exists.
- Authenticated state: ⚠️ Not shown — the homepage mockup only shows the logged-out header state ("Log in" / "Get started"). What the header looks like for an authenticated user browsing the homepage is undesigned.

### 5.4 Card

- Background: white — **confirmed**.
- Border radius: `12px` — **confirmed**, matches v1.0's assumed `0.75rem` exactly.
- Border: `1px solid #E8E8F0` — NEW, v1.0 didn't specify a border, only a shadow.
- Shadow: `0 1px 4px rgba(70,0,115,0.06)` default, escalating to `0 8px 32px rgba(70,0,115,0.13)` on hover for plan cards — **confirmed and far more specific** than v1.0's generic `shadow-md`.
- Padding: `24px`–`32px` depending on context — confirmed range, not a single fixed value.
- Hover lift: `translateY(-3px)` with shadow escalation — NEW, not documented at all in v1.0.

### 5.5 Alert / Error Banner

⚠️ Still NOT shown anywhere in any mockup. No alert/error banner component exists in any of the three designs (homepage, login, dashboard). v1.0's documented treatment remains entirely unconfirmed — carried forward verbatim with no new evidence.

### 5.7 Icons — Decision recorded

**Library: Lucide React** (`lucide-react` — added to `package.json`). Tree-shakeable, actively maintained, covers all icons required by the mockups. Do not hand-copy SVG paths from the mockup files.

Usage:
```tsx
import { Eye, EyeOff, LogOut, LayoutDashboard } from "lucide-react"
<Eye size={18} />
```

**Mockup SVG → Lucide icon mapping:**

| Used in mockup | Lucide component | Size |
|---|---|---|
| Eye / show-hide password toggle | `Eye` / `EyeOff` | 18 |
| Dashboard sidebar — Dashboard | `LayoutDashboard` | 16 |
| Dashboard sidebar — Usage | `Clock` | 16 |
| Dashboard sidebar — Billing | `CreditCard` | 16 |
| Dashboard sidebar — Add-ons | `PlusCircle` | 16 |
| Dashboard sidebar — Support | `List` | 16 |
| Dashboard sidebar — Settings | `User` | 16 |
| Log out link | `LogOut` | 16 |
| Plan card checkmark | `Check` | 14 |
| Activity — data top-up | `Plus` | 16 |
| Activity — payment | `CreditCard` | 16 |
| Activity — plan change | `ArrowUpCircle` | 16 |
| Activity — add-on | `Package` | 16 |
| Gift icon (referral banner) | `Gift` | 24 |
| Chevron / arrow links ("→") | `ArrowRight` | 14 |

### 5.6 Badge — NEW COMPONENT (not in v1.0 at all)

Confirmed extensively in the dashboard mockup — a full badge system with 6 variants:

| Variant | Text colour | Background | Usage |
|---|---|---|---|
| Success | `#00875F` | `#E6F9F4` | "Active", "Paid", "Completed" |
| Warning | `#C94F10` | `#FFF2EC` | "76.8% used", "Open" ticket status |
| Error | `#B5001F` | `#FFEDF0` | (defined in CSS, not visibly used in current mockup content) |
| Neutral | `#4A4A5A` | `#F0F0F6` | "Medium priority" |
| Purple | `#460073` | `#E5CCFF` | "50GB", "Upgrade", "Most popular" plan badge |
| Info | `#2A5CC7` | `#EEF4FF` | (defined in CSS, not visibly used in current mockup content) |

All badges: fully rounded (`border-radius: 20px`), `12px` font, `600` weight, `3px–5px` vertical / `10px–16px` horizontal padding.

---

## 6. Page-Level Layout

### 6.1 Homepage (`/`)

**Confirmed structure** (replaces v1.0's generic guess):
1. Sticky header (logo, centered nav, login/get-started CTAs)
2. Hero — two-column: headline/subhead/dual-CTA left (55% width), SVG network illustration right (45% width)
3. Trust stats bar (3 stats, inline beneath hero)
4. Plans section — 3-card grid, centre card visually featured/elevated
5. Promo/referral banner — full-width, icon + copy + CTA
6. Blog section — 3-card grid with header row + "view all" link
7. Footer — 4-column (brand, plans, support, legal) + bottom bar

v1.0 only listed "hero, plans, features, footer" — features section doesn't actually exist (see content.md), and stats bar / referral banner / blog section were entirely missing from the spec.

### 6.2 Login Page (`/login`)

**CORRECTED — this was wrong in v1.0.** v1.0 described "centred card layout on desktop, full-width on mobile." The actual confirmed layout is a **45/55 split screen**: left panel is a full-height dark purple brand panel (logo, heading, 3 value-prop bullets, decorative SVG), right panel is a white form area, NOT a centered card floating on a background. This is a materially different layout pattern — anyone building from the v1.0 description would build the wrong thing.

- TelcoNow logo: confirmed, top-left of the dark panel, not above the form.
- Email + password fields: confirmed, full-width within the 400px max-width form container.
- Primary submit button: confirmed full-width, labelled "Sign in."
- Error state inline below fields: ⚠️ NOT shown — see §5.2.
- Link to homepage: **Decision recorded.** The mockup uses `href="#"` placeholders and no explicit back link is designed. Implementation default: the TelcoNow wordmark on the left panel links to `/` (homepage). This is a standard UX convention and requires no new design work — the logo is the back link.

### 6.3 Dashboard (`/dashboard`)

**CORRECTED — partially wrong in v1.0.** v1.0 said "sidebar nav on desktop, bottom nav or hamburger on mobile." The sidebar (fixed `240px` width, dark purple, with logo/nav items/user info/logout) is confirmed for desktop. But there is **no mobile dashboard pattern designed at all** — not bottom nav, not hamburger, nothing. v1.0 presented two options as if one had been chosen; in fact neither has been confirmed.

- Welcome message with user name: confirmed ("Good morning, Alex.").
- Account summary cards: confirmed, but far more extensive than v1.0 implied — plan summary, data usage meter, billing overview, recent activity, usage history chart, support tickets, add-ons, and an upgrade-prompt banner. Eight distinct card-level sections, not a generic "account summary."
- **Implementation correction — do not copy the mockup's `height: 100vh; overflow: hidden` on the outer container.** The mockup uses this for the design preview frame only. In production, use `min-height: 100vh` on the outer wrapper so the layout never clips content on short viewports (e.g. 768px-height laptops). The sidebar should use `sticky top-0 h-screen overflow-y-auto` and the main content area `flex-1 overflow-y-auto`.

---

## 7. Design QA Checklist

### Visual

- [ ] Colours match brand tokens exactly — **tokens now corrected in §2, re-run any prior eyedropper QA against the OLD palette, it was checking the wrong colours**
- [ ] Font sizes match spec at each breakpoint — ⚠️ desktop sizes now confirmed (§3), mobile sizes still have nothing to check against
- [ ] Spacing consistent — confirmed mockup uses some off-scale values (§4), decide normalization approach before testing this
- [ ] No horizontal scroll at 375px — ⚠️ UNTESTABLE against design, no 375px design exists
- [ ] All interactive states present: default, hover, focus, active, disabled, error — **hover/focus confirmed for buttons and inputs; disabled and error states are NOT designed anywhere, don't write test cases implying a baseline that doesn't exist**

### Responsive

- [ ] 375px — mobile baseline renders correctly — ⚠️ **cannot be QA'd against design at all currently**
- [ ] 768px — tablet layout renders correctly — ⚠️ same
- [ ] 1280px — desktop layout renders correctly — **this one is now actually checkable**, mockups are built at exactly this width
- [ ] Images do not overflow containers — n/a in current mockups (hero/illustrations are inline SVG, not raster images)
- [ ] Touch targets ≥ 44×44px on all interactive elements — confirmed at desktop sizes; touch-target QA on an unbuilt mobile layout is meaningless until one exists

### Components

- [ ] Buttons render all variants correctly — **6 variants now confirmed, 2 (destructive/disabled) still undesigned — see §5.1**
- [ ] Form inputs show focus ring and error state — focus ring confirmed, error state NOT designed
- [ ] Navigation collapses correctly on mobile — ⚠️ **cannot be tested, no mobile nav exists in any form**
- [ ] Cards consistent across pages — confirmed consistent shadow/radius/border treatment across homepage and dashboard cards

---

## 8. Open Questions for Designer

1. **Highest priority:** When is a mobile/tablet design pass happening? Nothing in this update can substitute for it — every responsive QA item is currently unwritable.
2. The spec's own 16px minimum body font rule is violated throughout the mockups (14–15px body text in multiple places). Relax the rule, or treat as a defect to fix in implementation?
3. Three different H1 sizes exist across hero/dashboard/login (52px/28px/32px) — intentional per-context scale, or inconsistency to consolidate?
4. Is there a logo file (SVG preferred), or is the text wordmark ("Telco**Now**" with two-tone colour) the actual final logo treatment? Mockups only ever show the text version.
5. Border radius is consistently `8px` (buttons) / `12px` (cards) across all three mockups — confirmed sharp-ish rounded style, no longer an open question, but worth a final sign-off since it's now a hard pattern, not a placeholder guess.
6. What does the authenticated header state look like on the homepage? Mockup only designs the logged-out state.
7. What's the destination of the logo/back-to-homepage link from the login page? Mockup uses `href="#"` placeholders throughout — can't infer intended behaviour from a non-functional link.
8. Disabled and error states for buttons and inputs are undesigned across all three files — needed before Sprint 4 visual QA can mark related test cases as passable.
