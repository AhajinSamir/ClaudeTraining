# Story: Activity Feed

**Story ID:** TN-014
**Component:** `ActivityFeed.tsx`
**Design reference:** `/designs/TelcoNow Dashboard.dc.html` → "Recent Activity (D)"
**Stub data:** `/stubs/activity.json` via `GET /api/stub/activity`

---

## Story

As an authenticated TelcoNow customer
I want to see a list of my recent account activity
So that I can quickly check what has happened on my account — payments, top-ups, upgrades, and add-ons

---

## Acceptance criteria

### Happy path

```
Given the API returns a valid ActivityResponse
When ActivityFeed renders
Then a card header with label "Recent Activity" and a "View all →" link is displayed
And each activity entry is rendered as a row with: a coloured icon tile (36×36px, rounded-xl), description text, timestamp + detail in a caption, amount (or "—" if null), and a status badge
And rows have a hover background of bg-surface-tint
And the list is ordered newest-first as returned by the API
```

```
Given an entry has type "data_topup"
Then the icon tile background is #E5CCFF (purple tint) and the icon is a plus/cross in #460073
```

```
Given an entry has type "payment"
Then the icon tile background is #E6F9F4 (success tint) and the icon is a card/payment icon in #00B388
```

```
Given an entry has type "plan_change"
Then the icon tile background is #F5EEFF (surface tint) and the icon is a star/upgrade icon in #A100FF
```

```
Given an entry has type "addon"
Then the icon tile background is #FFF2EC (warning tint) and the icon reflects the add-on in #FF6B35
```

```
Given an entry has status "completed"
Then the status badge uses variant="success"
```

```
Given an entry has status "pending"
Then the status badge uses variant="warning"
```

```
Given an entry has status "failed"
Then the status badge uses variant="error"
```

```
Given an entry has amount of null
Then display "—" in place of a dollar amount
```

### Loading state

```
Given the component is fetching data from GET /api/stub/activity
Then display a skeleton loader with 4 placeholder rows matching the entry layout
And use SkeletonBlock components — do not show a spinner
```

### Error state

```
Given GET /api/stub/activity returns an error or times out
Then display an error message: "Unable to load recent activity. Please try again."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given the API returns an empty array
Then display a message: "No recent activity to show."
And do not render an empty list container
```

```
Given the API returns more than 4 entries
Then display only the first 4 entries in the dashboard view
And the "View all →" link leads to the full activity list
⚠️ "View all" destination route not confirmed — flag for PO
```

---

## Out of scope

- Pagination or infinite scroll on the dashboard card (full list is on a separate page)
- Filtering or searching activity
- Activity detail / receipt view

---

## Notes for developer

- Data source: `GET /api/stub/activity` → `ActivityResponse` (array of `ActivityEntry`) from `src/types/api.ts`
- Use `CardHeader` molecule for the header row with "View all →" as the action
- Icon tile colour mapping: derive from `ActivityType` — use a lookup object, not a switch-case chain
- Use `Badge` atom for status badges — map `ActivityStatus` to Badge variant
- Amount formatting: `amount !== null ? \`$\${amount.toFixed(2)}\` : "—"`
- Use `ErrorState` component on fetch failure — never render null
- Use `SkeletonBlock` on loading — never use a spinner
- Tailwind utilities only — no inline styles
