# Story: App Shell

**Story ID:** TN-009
**Component:** `AppShell.tsx`
**Design reference:** `/designs/TelcoNow Dashboard.dc.html` → "Dashboard Layout"
**Stub data:** None — layout component; data is fetched by child components

---

## Story

As an authenticated TelcoNow customer
I want a consistent dashboard layout with navigation and main content area
So that I can navigate between dashboard sections without a full page reload

---

## Acceptance criteria

### Happy path

```
Given the user is authenticated and navigates to /dashboard
When AppShell renders
Then a full-height layout is displayed with no overflow on the viewport
And the Sidebar occupies the left 240px with bg-brand-deep-purple
And the main content area fills the remaining width with bg-surface-tint and overflow-y: auto
And the page header ("Good morning, [name].") and dashboard grid are rendered in the main area
```

```
Given the user clicks a navigation item in the Sidebar
When the route changes
Then the active nav item updates to reflect the current route
And the main content area renders the new page content without a full reload
```

### Loading state

```
Given the authenticated session is being resolved on initial load
Then display a full-layout skeleton: sidebar placeholder (240px, bg-brand-deep-purple) and a content area skeleton
And do not show a spinner
And do not flash an unauthenticated state
```

### Error state

```
Given the session cannot be determined (token expired, network failure)
Then redirect the user to /login
And do not render the dashboard layout
```

### Edge cases

```
Given the viewport is narrower than 1280px
Then the dashboard layout behaviour is undefined
⚠️ No mobile/tablet AppShell design exists — flag for PO
```

---

## Out of scope

- Mobile navigation drawer or hamburger menu (not designed)
- Notification panel or header bar (not in mockup)
- Multi-account switching

---

## Notes for developer

- AppShell is a Server Component — session is read via `auth()` from `src/auth.ts`
- Unauthenticated users must be redirected server-side before AppShell renders; do not handle auth in client components
- Sidebar and main content are composed as children — AppShell provides the flex layout only
- Use `Sidebar` component for the left panel; main content is rendered via `{children}`
- Full-height layout: `flex h-screen overflow-hidden`
