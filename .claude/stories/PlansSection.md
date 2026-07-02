# Story: Plans Section

**Story ID:** TN-005
**Component:** `PlansSection.tsx`
**Design reference:** `/designs/TelcoNow_Homepage_dc.html` → "Plans Section"
**Stub data:** Contentful — `Plan` content type via Contentful Delivery API

---

## Story

As a visitor on the TelcoNow homepage
I want to see and compare available plans
So that I can choose the plan that suits me and sign up

---

## Acceptance criteria

### Happy path

```
Given Contentful returns a list of Plan entries
When the PlansSection renders
Then a section header with eyebrow and heading is displayed above the plan cards
And three plan cards are displayed in a grid
And the centre card is visually elevated/featured (e.g. "Most popular" badge)
And each card displays: plan name, price, feature list with checkmarks, and a CTA button
```

```
Given a visitor clicks the CTA on a plan card
When the button is clicked
Then the visitor is navigated to the sign-up or checkout flow for that plan
⚠️ CTA destination route not confirmed — flag for PO
```

### Loading state

```
Given the component is fetching Plan entries from Contentful
Then display a skeleton loader that matches the three-card grid layout
And do not show a spinner
```

### Error state

```
Given Contentful returns an error or times out
Then display an error message: "Unable to load plans. Please try again."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given Contentful returns fewer than three plans
Then render only the cards returned — do not render empty card slots
⚠️ Behaviour for 1 or 2 plans not confirmed — flag for PO if this state is possible
```

```
Given Contentful returns more than three plans
Then display only the first three
⚠️ Ordering/prioritisation logic not confirmed — flag for PO
```

```
Given the viewport is narrower than 1280px
Then the three-card grid behaviour at tablet or mobile is undefined
⚠️ No mobile plan grid design exists
```

---

## Out of scope

- Plan comparison table (not in mockup)
- Filtering or sorting plans (not in mockup)
- Authenticated "current plan" highlight state (not designed for homepage)

---

## Notes for developer

- Data source: Contentful Delivery API, `Plan` content type
- Use `SectionHeader` molecule for the eyebrow + heading row
- Centre card featured state uses the purple Badge variant (`bg-brand-purple-tint`, `#460073` text) with label "Most popular"
- Plan card checkmarks use `Check` icon from Lucide React, size 14
- Card hover: `translateY(-3px)` + escalated shadow (`0 8px 32px rgba(70,0,115,0.13)`) — confirmed in mockup
- Use `ErrorState` component on fetch failure — never render null
- Use `SkeletonBlock` on loading — never use a spinner
- Tailwind utilities only — no inline styles
