# Story: Promo Banner

**Story ID:** TN-006
**Component:** `PromoBanner.tsx`
**Design reference:** `/designs/TelcoNow_Homepage_dc.html` → "Promo / Referral Banner"
**Stub data:** None

---

## Story

As a visitor on the TelcoNow homepage
I want to see a promotional offer or referral incentive
So that I am encouraged to sign up or refer a friend

---

## Acceptance criteria

### Happy path

```
Given a visitor is browsing the homepage
When the PromoBanner renders
Then it displays full-width across the content area
And shows a gift icon on the left, promotional copy in the centre, and a CTA button on the right
And the background uses the brand-purple-tint or surface-tint colour
⚠️ Exact background colour, copy, and CTA label to be confirmed with PO
```

```
Given a visitor clicks the CTA button
When the button is clicked
Then the visitor is navigated to the referral or sign-up destination
⚠️ CTA destination not confirmed in mockup — flag for PO
```

### Loading state

```
Given the component has no data dependency
Then no loading state or skeleton is required
And the banner renders immediately
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

### Edge cases

```
Given the viewport is narrower than 1280px
Then the banner layout behaviour at tablet or mobile is undefined
⚠️ No mobile design exists for this component
```

---

## Out of scope

- Dismissible/closeable banner behaviour (not shown in mockup)
- Personalised promo content for authenticated users (not designed)
- Dynamic CMS-driven promo copy (content appears static in mockup)

---

## Notes for developer

- Gift icon: use `Gift` from Lucide React, size 24
- CTA uses Ghost (purple, on light bg) or Primary variant — confirm with design
- Full-width within the page container (`max-width: 1280px; padding: 0 48px`)
- Sits between PlansSection and BlogSection in the homepage layout
- Tailwind utilities only — no inline styles
