# Story: Billing Card

**Story ID:** TN-013
**Component:** `BillingCard.tsx`
**Design reference:** `/designs/TelcoNow Dashboard.dc.html` → "Billing Overview (C)"
**Stub data:** `/stubs/billing.json` via `GET /api/stub/billing`

---

## Story

As an authenticated TelcoNow customer
I want to see my upcoming and most recent payment at a glance
So that I know when and how much my next bill is, and whether my last payment went through

---

## Acceptance criteria

### Happy path

```
Given the API returns a valid BillingResponse
When BillingCard renders
Then a card header with label "Billing" is displayed
And the next payment section shows "$[nextPayment.amount]" in a large bold heading (brand-deep-purple, 36px) and "due [nextPayment.date]" in a caption
And a divider separates the next payment from the key-value rows
And a "Last payment" row shows the formatted lastPayment.date and a status badge
And a "Payment method" row shows the card brand icon (Visa/Mastercard/Amex) and "•••• [last4]"
And a "Billing history →" link (brand-purple) is displayed at the bottom of the card
```

```
Given lastPayment.status is "paid"
Then the last payment badge uses variant="success" with label "Paid"
```

```
Given lastPayment.status is "failed"
Then the last payment badge uses variant="error" with label "Failed"
```

```
Given lastPayment.status is "pending"
Then the last payment badge uses variant="warning" with label "Pending"
```

### Loading state

```
Given the component is fetching data from GET /api/stub/billing
Then display a skeleton loader matching the card layout: header, next payment block, divider, two key-value rows, link
And use SkeletonBlock components — do not show a spinner
```

### Error state

```
Given GET /api/stub/billing returns an error or times out
Then display an error message: "Unable to load billing details. Please try again."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given lastPayment.status is "failed"
Then the failed badge draws attention — consider whether additional messaging is needed
⚠️ No failed payment recovery flow is designed — flag for PO
```

---

## Out of scope

- Full billing history page
- Changing payment method
- Invoice download

---

## Notes for developer

- Data source: `GET /api/stub/billing` → `BillingResponse` from `src/types/api.ts`
- Use `CardHeader` molecule for the header row
- Use `KeyValueRow` molecule for "Last payment" and "Payment method" rows
- Use `Badge` atom for lastPayment.status — map "paid" → success, "failed" → error, "pending" → warning
- Card brand icons: render a small inline SVG for Visa/Mastercard/Amex matching the mockup — use Lucide `CreditCard` as fallback if brand is unknown
- "Billing history →" destination route not confirmed
⚠️ Billing history route not confirmed — flag for PO
- Use `ErrorState` component on fetch failure — never render null
- Use `SkeletonBlock` on loading — never use a spinner
- Tailwind utilities only — no inline styles
