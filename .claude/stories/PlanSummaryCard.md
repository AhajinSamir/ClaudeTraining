# Story: Plan Summary Card

**Story ID:** TN-011
**Component:** `PlanSummaryCard.tsx`
**Design reference:** `/designs/TelcoNow Dashboard.dc.html` → "Plan Summary Card (A)"
**Stub data:** `/stubs/account.json` via `GET /api/stub/account`

---

## Story

As an authenticated TelcoNow customer
I want to see my current plan details at a glance
So that I know what plan I'm on, what it costs, and when it renews

---

## Acceptance criteria

### Happy path

```
Given the API returns a valid AccountResponse
When PlanSummaryCard renders
Then a card header with label "Current Plan" and an account status badge is displayed
And the plan name (e.g. "Plus") is shown in a large heading (brand-deep-purple, 26px)
And a purple badge showing the data allowance (e.g. "50GB") is displayed next to the plan name
And the monthly cost is displayed as "$[monthlyCost]/mo" in a 28px bold heading
And a divider separates the plan headline from the key-value rows
And a "Renews" row shows the formatted renewalDate
And a "Contract" row shows "No lock-in"
And a "Manage plan →" link (brand-purple) is displayed at the bottom of the card
```

```
Given the account status is "active"
Then the status badge uses variant="success" with label "Active"
```

```
Given the account status is "suspended"
Then the status badge uses variant="warning" with label "Suspended"
```

```
Given the account status is "cancelled"
Then the status badge uses variant="error" with label "Cancelled"
```

### Loading state

```
Given the component is fetching data from GET /api/stub/account
Then display a skeleton loader matching the card layout: header row, plan name block, cost block, divider, two key-value rows, link
And use SkeletonBlock components — do not show a spinner
```

### Error state

```
Given GET /api/stub/account returns an error or times out
Then display an error message: "Unable to load plan details. Please try again."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given the planTier is "starter"
Then the data allowance badge reflects the starter plan data cap
⚠️ Starter and Pro data cap values not confirmed in mockup — flag for PO
```

```
Given the renewalDate is today or in the past
Then the date is still rendered as-is
⚠️ No overdue/lapsed state is designed — flag for PO
```

---

## Out of scope

- Plan upgrade flow (initiated from UpgradeBanner, not this card)
- Billing history (in BillingCard)
- Plan comparison

---

## Notes for developer

- Data source: `GET /api/stub/account` → `AccountResponse` from `src/types/api.ts`
- Use `CardHeader` molecule for the header row (label + status badge as action)
- Use `KeyValueRow` molecule for "Renews" and "Contract" rows
- Use `Badge` atom: `variant="success"` for active, `variant="warning"` for suspended, `variant="error"` for cancelled
- Use `Badge` atom `variant="purple"` for the data allowance label next to the plan name
- "Contract" value is hardcoded "No lock-in" — this field is not in the API type
⚠️ Contract type not in AccountResponse — confirm with PO whether it should be added or remain hardcoded
- Use `ErrorState` component on fetch failure — never render null
- Use `SkeletonBlock` on loading — never use a spinner
- Tailwind utilities only — no inline styles
