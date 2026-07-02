# Story: Upgrade Banner

**Story ID:** TN-018
**Component:** `UpgradeBanner.tsx`
**Design reference:** `/designs/TelcoNow Dashboard.dc.html` → "Upgrade Prompt Banner (H)"
**Stub data:** None — derives from UsageMeterCard (usagePercent) and PlanSummaryCard (planTier); no additional API call

---

## Story

As an authenticated TelcoNow customer approaching my data cap on a non-Pro plan
I want to see a contextual upgrade prompt on my dashboard
So that I can upgrade to Pro before I incur overage charges

---

## Acceptance criteria

### Visibility rule

```
Given the dashboard page has resolved both usage and account data
When usagePercent is at or above 75% AND planTier is not "pro"
Then UpgradeBanner is rendered
```

```
Given usagePercent is below 75%
Then UpgradeBanner is not rendered — do not show an empty card or placeholder
```

```
Given planTier is "pro"
Then UpgradeBanner is not rendered regardless of usagePercent
```

### Happy path

```
Given UpgradeBanner is visible (usagePercent ≥ 75%, planTier !== "pro")
When the component renders
Then a left purple accent bar (5px, bg-brand-purple) is shown
And a warning badge displays the current usagePercent (e.g. "77% used") with variant="warning"
And a caption reads "You're approaching your data limit"
And a heading reads "You've used [usagePercent]% of your data. Upgrade to Pro for unlimited."
And a body paragraph reads "Pro gives you unlimited data, Ultra 5G speeds, and 24/7 support — from $99/mo with no lock-in."
And an "Upgrade now" primary button is displayed
And a "Compare plans →" text link is displayed next to the button
And a decorative concentric-circle SVG is displayed on the right edge of the banner
```

```
Given the user clicks "Upgrade now"
Then the user is navigated to the plan upgrade flow
⚠️ Upgrade flow destination not confirmed — flag for PO
```

```
Given the user clicks "Compare plans →"
Then the user is navigated to the plans comparison page
⚠️ Compare plans destination not confirmed — flag for PO
```

### Loading state

```
Given the parent dashboard page is still fetching usage or account data
Then UpgradeBanner is not rendered — it renders only after both data sources have resolved
And no skeleton or placeholder is shown in the UpgradeBanner slot
```

### Error state

```
Given either the usage fetch or the account fetch failed
Then UpgradeBanner is not rendered — suppress the banner rather than show a broken state
And do not display an error message within the banner slot
```

### Edge cases

```
Given usagePercent is exactly 75%
Then UpgradeBanner is rendered (boundary is inclusive at 75%)
```

---

## Out of scope

- Dismissing or snoozing the banner (no dismiss affordance in the mockup)
- Showing the banner to Pro plan customers
- Banner for suspended or cancelled accounts
⚠️ Banner behaviour for suspended/cancelled accounts not confirmed — flag for PO

---

## Notes for developer

- UpgradeBanner receives props, not fetched data: `usagePercent: number` and `planTier: "starter" | "plus" | "pro"`
- These values are derived in the DashboardPage server component from the resolved UsageMeterCard and PlanSummaryCard fetches — UpgradeBanner makes no API calls of its own
- Do NOT add a stub for this component — it has no data source of its own
- Banner background: `bg-surface-tint` (`#F5EEFF`), border: `border-brand-purple-tint` (`#E5CCFF`), border-radius: `rounded-xl`
- Left accent bar: `w-[5px] bg-brand-purple` (flex-shrink-0, full height)
- "Upgrade now": `Button` atom with `variant="primary"`
- "Compare plans →": plain `<a>` or `Link` atom with `variant="default"`, `text-neutral-500`
- Tailwind utilities only — no inline styles
