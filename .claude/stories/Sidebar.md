# Story: Sidebar

**Story ID:** TN-010
**Component:** `Sidebar.tsx`
**Design reference:** `/designs/TelcoNow Dashboard.dc.html` → "Sidebar"
**Stub data:** None — navigation and session data only; user details come from the auth session

---

## Story

As an authenticated TelcoNow customer
I want a persistent sidebar with navigation and my account summary
So that I can switch between dashboard sections and see who I'm logged in as

---

## Acceptance criteria

### Happy path

```
Given the user is authenticated and the Sidebar renders
When the Sidebar is displayed
Then the TelcoNow wordmark is shown at the top (white "Telco", #E5CCFF "Now"), with "My Account" caption below
And six navigation items are displayed in order: Dashboard, Usage, Billing, Add-ons, Support, Settings
And each nav item has a matching Lucide icon to the left of the label
And the currently active route is visually elevated (bg-white/12, text-white)
And inactive items are text-white/75, hovering to text-white with bg-white/8
```

```
Given the user is authenticated
When the Sidebar renders the bottom section
Then a UserChip is displayed showing the user's name, plan name, and initials avatar
And a "← Log out" link is displayed below the UserChip
```

```
Given the user clicks "← Log out"
When the signOut action completes
Then the user is redirected to /login
```

### Loading state

```
Given the auth session is resolving
Then show a SkeletonBlock placeholder in place of the UserChip at the bottom of the sidebar
And do not show a spinner
And render the navigation items statically (they do not depend on session data)
```

### Error state

```
Given the session data cannot be loaded for the UserChip
Then display a fallback UserChip with initials "?" and label "Unknown"
And do not collapse or hide the sidebar
And do not render a blank or broken layout
```

### Edge cases

```
Given a navigation item's route is the current page
Then that item renders with the active style regardless of how the user arrived at the route
```

---

## Out of scope

- Collapsible or icon-only sidebar mode (not in mockup)
- Notification badges on nav items (not in mockup)
- Secondary navigation levels

---

## Notes for developer

- Use `SidebarNavItem` molecule for each nav item — it handles active state, icon, and hover styles
- Use `UserChip` molecule for the bottom user display
- Nav item icons (from Lucide React): Dashboard → `LayoutDashboard`, Usage → `Clock`, Billing → `CreditCard`, Add-ons → `PlusCircle`, Support → `AlignLeft`, Settings → `User`
- Active route detection: compare `usePathname()` against each item's `href`
- Logout: call `signOut()` from Auth.js — `'use client'` required for the logout trigger
- Sidebar is `flex-shrink: 0; width: 240px; overflow-y: auto`
- Bottom section has `border-top: 1px solid rgba(255,255,255,0.08)`
