# Story: Support Tickets

**Story ID:** TN-015
**Component:** `SupportTickets.tsx`
**Design reference:** `/designs/TelcoNow Dashboard.dc.html` → "Support Tickets (F)"
**Stub data:** `/stubs/tickets.json` via `GET /api/stub/tickets`

---

## Story

As an authenticated TelcoNow customer
I want to see a summary of my open and recent support tickets
So that I can check the status of my issues and raise new ones without leaving the dashboard

---

## Acceptance criteria

### Happy path

```
Given the API returns a valid TicketsResponse
When SupportTickets renders
Then a card header with label "Support Tickets" and an open-count badge is displayed
And each ticket is rendered as a bordered card row with: subject (bold), status badge (right-aligned), priority badge (neutral variant), and created date
And a "Raise a ticket" ghost button is displayed at the bottom of the card
```

```
Given one or more tickets have status "open"
Then the open-count badge in the header shows "[n] open" with variant="warning"
```

```
Given no tickets have status "open"
Then the header badge is not shown (or shows "0 open" — confirm with PO)
⚠️ Zero-open state badge behaviour not confirmed — flag for PO
```

```
Given a ticket has status "open"
Then the status badge uses variant="warning" with label "Open"
```

```
Given a ticket has status "resolved"
Then the status badge uses variant="success" with label "Resolved"
```

```
Given a ticket has status "pending"
Then the status badge uses variant="neutral" with label "Pending"
```

```
Given a ticket has priority "high"
Then the priority badge uses variant="neutral" with label "High priority"
```

```
Given a ticket has priority "medium"
Then the priority badge uses variant="neutral" with label "Medium priority"
```

```
Given a ticket has priority "low"
Then the priority badge uses variant="neutral" with label "Low priority"
```

### Loading state

```
Given the component is fetching data from GET /api/stub/tickets
Then display a skeleton loader with 2 placeholder ticket rows matching the ticket card layout
And use SkeletonBlock components — do not show a spinner
```

### Error state

```
Given GET /api/stub/tickets returns an error or times out
Then display an error message: "Unable to load support tickets. Please try again."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given the API returns an empty array
Then display a message: "You have no support tickets."
And the "Raise a ticket" button is still displayed
```

```
Given the API returns more than 2 tickets
Then display only the first 2 tickets in the dashboard card
⚠️ Ordering (open-first vs. most-recent-first) not confirmed — flag for PO
```

---

## Out of scope

- Ticket detail / thread view
- Ticket creation form (the "+ Raise a ticket" button opens a separate flow — destination not confirmed)
- Ticket filtering or search

---

## Notes for developer

- Data source: `GET /api/stub/tickets` → `TicketsResponse` (array of `Ticket`) from `src/types/api.ts`
- Use `CardHeader` molecule for the header row; pass the open-count `Badge` as the `action` prop
- Use `Badge` atom for ticket status and priority — all priority badges use `variant="neutral"`
- "Raise a ticket" button: `Button` atom with `variant="ghost-light"` and `fullWidth`
⚠️ "Raise a ticket" destination / action not confirmed — flag for PO
- Use `ErrorState` component on fetch failure — never render null
- Use `SkeletonBlock` on loading — never use a spinner
- Tailwind utilities only — no inline styles
