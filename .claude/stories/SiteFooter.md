# Story: Site Footer

**Story ID:** TN-002
**Component:** `SiteFooter.tsx`
**Design reference:** `/designs/TelcoNow_Homepage_dc.html` → "Footer"
**Stub data:** None

---

## Story

As a visitor to the TelcoNow homepage
I want to see a footer with navigation and legal information
So that I can find supporting links and understand the brand

---

## Acceptance criteria

### Happy path

```
Given a visitor reaches the bottom of the homepage
When the footer renders
Then it displays four columns: brand, plans, support, and legal
And each column contains the relevant links
And a bottom bar displays copyright text
```

```
Given a visitor clicks any footer link
When the link is clicked
Then the visitor is navigated to the correct destination
⚠️ Exact link destinations not confirmed in mockup (href="#" placeholders used) — flag for PO
```

### Loading state

```
Given the component has no data dependency
Then no loading state or skeleton is required
And the footer renders immediately
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

### Edge cases

```
Given the viewport is narrower than 1280px
Then the footer column layout at tablet or mobile breakpoints is undefined
⚠️ No mobile footer design exists — do not stack or reflow columns until a mobile design is provided
```

---

## Out of scope

- Any dynamic or personalised footer content
- Newsletter signup or form within the footer (not shown in mockup)

---

## Notes for developer

- Footer background: `bg-neutral-900` (`#0F0F1A`)
- Four-column layout confirmed in mockup: brand, plans, support, legal
- Bottom bar sits below the column grid with copyright text
- Tailwind utilities only — no inline styles
- Link destinations are all `href="#"` in the mockup — real routes needed before implementation
