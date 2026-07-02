# Story: Hero Section

**Story ID:** TN-003
**Component:** `HeroSection.tsx`
**Design reference:** `/designs/TelcoNow_Homepage_dc.html` → "Hero"
**Stub data:** None

---

## Story

As a visitor landing on the TelcoNow homepage
I want to see a compelling hero section
So that I understand what TelcoNow offers and can take immediate action

---

## Acceptance criteria

### Happy path

```
Given a visitor lands on the homepage
When the hero section renders
Then a headline, subheading, and two CTAs are displayed on the left (approx 55% width)
And an SVG network illustration is displayed on the right (approx 45% width)
And the section background is brand-deep-purple (#460073)
```

```
Given the hero section is visible
When the visitor views the CTAs
Then a primary "Get started" button is shown
And a ghost "Learn more" button is shown beside it
⚠️ Exact CTA labels and destinations not fully confirmed — flag for PO
```

```
Given a visitor clicks "Get started"
When the button is clicked
Then the visitor is navigated to the sign-up or plan selection destination
⚠️ Route not confirmed in mockup
```

```
Given the AnnouncementPill is present above the headline
When the hero renders
Then the pill displays a short promotional label
⚠️ Pill copy not confirmed — flag for PO
```

### Loading state

```
Given the component has no data dependency
Then no loading state or skeleton is required
And the hero renders immediately on page load
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

### Edge cases

```
Given the viewport is narrower than 1280px
Then the two-column hero layout behaviour at tablet or mobile is undefined
⚠️ No mobile hero design exists — do not collapse to single column until a mobile design is provided
```

---

## Out of scope

- Video or animated background (not in mockup)
- Personalised hero content for authenticated users (not designed)

---

## Notes for developer

- Background: `bg-brand-deep-purple` (`#460073`)
- "Get started" uses Primary (large) variant — `#A100FF`, `52px` height, `16px` font — hero-only size
- "Learn more" uses Ghost hero (white, large) variant — transparent, white text, `1.5px rgba(255,255,255,0.6)` border, `52px` height
- Headline: Inter 700, `52px`, letter-spacing `-0.025em`, line-height `1.08`
- SVG illustration is inline — do not load as an `<img>` tag
- AnnouncementPill sits above the headline — use `components/ui/molecules/AnnouncementPill.tsx`
- Tailwind utilities only — no inline styles
