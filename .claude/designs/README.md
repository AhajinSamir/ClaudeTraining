# Design Files — Developer Reading Guide

These `.dc.html` files are produced by a design tool and contain non-standard
elements that must be ignored when translating to Next.js components.

---

## Elements to ignore — do not copy into real code

| Element | Found in | What it is | What to do |
|---|---|---|---|
| `<script src="./support.js">` | All 3 files, line 7 | Design tool runtime — file does not exist in the project | Ignore entirely |
| `<x-dc>` | All 3 files | Design tool root wrapper | Ignore — treat inner content as the real markup |
| `<helmet>` | All 3 files | Design tool CSS/font injection tag | Ignore — move fonts and styles to Next.js properly (see below) |
| `<script type="text/x-dc" data-dc-script ...>` | Login file, last line | Design tool preview metadata | Ignore entirely |
| `href="#"` on all links | All 3 files | Placeholder — design tool cannot encode real routes | Replace with the actual route during implementation |

---

## Inter font — do NOT copy the Google Fonts link tag

The mockups load Inter via:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Do not use this in Next.js.** Use `next/font/google` instead — it self-hosts
the font, eliminates layout shift, and avoids GDPR issues with third-party
Google requests:

```tsx
// app/layout.tsx — already configured correctly
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
```

---

## Inline styles — translate to Tailwind v4 utilities

All mockup CSS uses raw inline styles and hardcoded px/hex values. When
building components, translate these to Tailwind utility classes using the
brand tokens defined in `app/globals.css`:

| Mockup inline style | Tailwind equivalent |
|---|---|
| `background: #460073` | `bg-brand-deep-purple` |
| `background: #A100FF` | `bg-brand-purple` |
| `color: #0F0F1A` | `text-neutral-900` |
| `color: #4A4A5A` | `text-neutral-500` |
| `border-color: #E8E8F0` | `border-border-neutral` |
| `background: #F5EEFF` | `bg-surface-tint` |
| `border-radius: 12px` | `rounded-card` (custom token) or `rounded-xl` |
| `border-radius: 8px` | `rounded-btn` (custom token) or `rounded-lg` |

---

## Blog card `-webkit-line-clamp` — use Tailwind utility

The mockup uses non-standard CSS for 2-line text clamping:

```css
/* Mockup — do not copy */
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
```

Use the Tailwind v4 utility instead:

```tsx
<p className="line-clamp-2">...</p>
```

---

## All `href="#"` links — replace with real routes

| Mockup link text | Intended route | Status |
|---|---|---|
| Logo (all pages) | `/` | Confirmed |
| "Log in" (header) | `/login` | Confirmed |
| "Get started" (header, login footer) | `/signup` or `/login` | **Unresolved — see build-spec.md §7** |
| Plan CTAs "Get Starter/Plus/Pro" | `/signup` or `/login` | **Unresolved — see build-spec.md §7** |
| "Forgot password?" | `/forgot-password` | **Out of scope — see build-spec.md §7** |
| "← Log out" | `signOut()` from Auth.js | Confirmed action, redirect destination unresolved |
| Blog "Read more" | `/blog/[slug]` | **Unresolved — no blog page designed** |
| "View all articles" | `/blog` | **Unresolved — no blog index designed** |
| "Refer now" | TBD | **Unresolved — no referral flow designed** |
