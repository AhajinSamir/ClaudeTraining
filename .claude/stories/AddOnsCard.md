# Story: Add-Ons Card

**Story ID:** TN-017
**Component:** `AddOnsCard.tsx`
**Design reference:** `/designs/TelcoNow Dashboard.dc.html` → "Add-ons & Extras (G)"
**Stub data:** `/stubs/addons.json` via `GET /api/stub/addons`

---

## Story

As an authenticated TelcoNow customer
I want to see and manage my active and available add-ons at a glance
So that I can toggle add-ons on or off and explore extras without leaving the dashboard

---

## Acceptance criteria

### Happy path

```
Given the API returns a valid AddonsResponse
When AddOnsCard renders
Then a card header with label "Add-ons & Extras" and an "Explore more →" link is displayed
And each add-on is rendered as a bordered row with: a category icon tile (40×40px, rounded-xl), name, price/description, a Toggle, and a "Manage"/"Add" link
And active add-ons (active: true) have a purple icon tile background (#E5CCFF) and the Toggle is on
And inactive add-ons (active: false) have a neutral icon tile background (#F0F0F6), reduced opacity (0.7), and the Toggle is off
And active add-ons show a "Manage" link; inactive add-ons show an "Add" link
```

```
Given the user clicks the Toggle on an active add-on
Then the toggle visually moves to the off state
⚠️ Toggle action is display-only in this story — write/mutation API is out of scope; confirm with PO
```

```
Given the user clicks the Toggle on an inactive add-on
Then the toggle visually moves to the on state
⚠️ Same note as above — display-only in this story
```

### Loading state

```
Given the component is fetching data from GET /api/stub/addons
Then display a skeleton loader with 3 placeholder add-on rows matching the row layout
And use SkeletonBlock components — do not show a spinner
```

### Error state

```
Given GET /api/stub/addons returns an error or times out
Then display an error message: "Unable to load add-ons. Please try again."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given the API returns an empty array
Then display a message: "No add-ons available."
And the "Explore more →" link is still displayed
```

```
Given the API returns more than 3 add-ons
Then display only the first 3 add-ons in the dashboard card
⚠️ Ordering (active-first vs. API order) not confirmed — flag for PO
```

---

## Out of scope

- Add-on purchase / activation flow (separate page)
- Add-on cancellation confirmation
- Filtering add-ons by category

---

## Notes for developer

- Data source: `GET /api/stub/addons` → `AddonsResponse` (array of `Addon`) from `src/types/api.ts`
- Use `CardHeader` molecule for the header; "Explore more →" as the `action` prop
- Use `Toggle` atom — `checked` = `addon.active`; in this story the toggle is controlled/display-only (no mutation)
- Category icon tiles: use Lucide icons mapped from `AddonCategory` — travel → `Globe`, data → `BarChart2`, entertainment → `Tv`, insurance → `Shield`
- Active tile background: `bg-brand-purple-tint` (`#E5CCFF`), inactive: `bg-neutral-100` (`#F0F0F6`)
- Inactive row opacity: `opacity-70`
- "Explore more →" destination route not confirmed
⚠️ "Explore more" route not confirmed — flag for PO
- Use `ErrorState` component on fetch failure — never render null
- Use `SkeletonBlock` on loading — never use a spinner
- Tailwind utilities only — no inline styles
