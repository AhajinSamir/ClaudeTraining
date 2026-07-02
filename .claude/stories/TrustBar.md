# Story: Trust Bar

**Story ID:** TN-004
**Component:** `TrustBar.tsx`
**Design reference:** `/designs/TelcoNow_Homepage_dc.html` → "Trust Stats Bar"
**Stub data:** None

---

## Story

As a visitor on the TelcoNow homepage
I want to see key trust statistics beneath the hero
So that I feel confident in TelcoNow as a provider

---

## Acceptance criteria

### Happy path

```
Given a visitor has scrolled past the hero or the hero is fully visible
When the TrustBar renders
Then three statistics are displayed inline in a horizontal row
And each stat shows a bold number/value and a short label beneath it
⚠️ Exact stat values and labels are hardcoded content — confirm final copy with PO before implementation
```

```
Given the TrustBar is visible
When the visitor views it
Then the layout is evenly spaced across the full container width
And dividers or spacing separate each stat visually
```

### Loading state

```
Given the component has no data dependency
Then no loading state or skeleton is required
And the TrustBar renders immediately
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

### Edge cases

```
Given the viewport is narrower than 1280px
Then the three-stat horizontal layout behaviour at tablet or mobile is undefined
⚠️ No mobile design exists — do not reflow to stacked layout until a mobile design is provided
```

---

## Out of scope

- Dynamic or CMS-driven stat values (content is static/hardcoded)
- Animated counters (not shown in mockup)

---

## Notes for developer

- Content is static — no fetch required
- Three stats confirmed in mockup; exact copy TBC with PO
- Sits directly beneath the hero section, above the plans section
- Tailwind utilities only — no inline styles
