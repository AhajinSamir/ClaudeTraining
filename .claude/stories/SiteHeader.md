# Story: Site Header

**Story ID:** TN-001
**Component:** `SiteHeader.tsx`
**Design reference:** `/designs/TelcoNow_Homepage_dc.html` → "Header / Navigation"
**Stub data:** None

---

## Story

As a visitor to the TelcoNow homepage
I want to see a clear navigation header
So that I can orient myself on the site and access login or sign-up

---

## Acceptance criteria

### Happy path

```
Given a visitor lands on the homepage
When the page loads
Then the header displays the TelcoNow wordmark on the left
And a horizontal nav row of links is centred (⚠️ exact nav items not confirmed in mockup — flag for PO)
And a "Log in" ghost button and "Get started" primary button are right-aligned
```

```
Given the visitor scrolls down the page
When the page scrolls past the top
Then the header remains visible and does not scroll away
And the header background remains brand-deep-purple (#460073)
```

```
Given a visitor clicks "Log in"
When the button is clicked
Then the visitor is navigated to /login
```

```
Given a visitor clicks "Get started"
When the button is clicked
Then the visitor is navigated to the sign-up or plan selection destination
⚠️ Destination route not confirmed in mockup — flag for PO to confirm
```

### Loading state

```
Given the component has no data dependency
Then no loading state or skeleton is required
And the header renders immediately on page load
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

### Edge cases

```
Given the visitor is already authenticated
When they visit the homepage
Then the authenticated header state is shown
⚠️ Authenticated header state is NOT designed in the mockup — do not implement until design is provided
```

```
Given the viewport is narrower than 1280px
Then the header behaviour at tablet or mobile breakpoints is undefined
⚠️ No mobile or tablet header design exists — do not implement a hamburger menu or drawer until a mobile design is provided
```

---

## Out of scope

- Hamburger menu or mobile drawer (no mobile design exists)
- Authenticated header state (not designed)
- Any dropdown or mega-menu behaviour (not shown in mockup)

---

## Notes for developer

- "Log in" uses Ghost (white, on dark bg) variant — transparent bg, white text, `1.5px rgba(255,255,255,0.7)` border, `44px` height
- "Get started" uses Primary variant — `bg-brand-purple` (`#A100FF`), white text, `44px` height
- Header is `position: sticky; top: 0` — confirmed in mockup
- Background: `bg-brand-deep-purple` (`#460073`)
- Tailwind utilities only — no inline styles
- Logo is the text wordmark ("TelcoNow") — no SVG logo file confirmed yet
