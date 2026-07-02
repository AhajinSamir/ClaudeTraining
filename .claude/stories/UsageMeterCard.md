# Story: Usage Meter Card

**Story ID:** TN-012
**Component:** `UsageMeterCard.tsx`
**Design reference:** `/designs/TelcoNow Dashboard.dc.html` → "Data Usage Meter (B)"
**Stub data:** `/stubs/usage.json` via `GET /api/stub/usage`

---

## Story

As an authenticated TelcoNow customer
I want to see my current data usage and how close I am to my cap
So that I can decide whether I need to top up or upgrade before I run out

---

## Acceptance criteria

### Happy path

```
Given the API returns a valid UsageResponse
When UsageMeterCard renders
Then the header shows label "Data Usage"
And the headline shows "[usedGB] GB of [totalGB] GB" in a large bold font
And a usage percentage badge is displayed in the top-right (e.g. "76.8% used")
And the days remaining in the billing cycle are displayed below the badge (e.g. "7 days remaining")
And a ProgressBar fills proportionally to usedGB / totalGB
And the progress bar turns the warning colour at or above 75% usage (showThreshold prop)
And scale labels "0 GB" and "[totalGB] GB" flank the bar ends
And an "▲ 80% warning threshold" label is shown at the 80% mark on the bar scale
And three stat tiles are displayed below the bar: "Remaining" ([totalGB - usedGB] GB), "Cycle" ([cycleStartDate] – [cycleEndDate]), and "Overage rate" ($[overageRate]/[overageRateUnit])
```

```
Given usedGB / totalGB is below 75%
Then the usage badge uses variant="neutral" and the progress bar renders in its default success colour
```

```
Given usedGB / totalGB is at or above 75%
Then the usage badge uses variant="warning" and the progress bar renders in the warning colour
```

### Loading state

```
Given the component is fetching data from GET /api/stub/usage
Then display a skeleton loader matching the card layout: header row, headline, progress bar placeholder, three stat tile placeholders
And use SkeletonBlock components — do not show a spinner
```

### Error state

```
Given GET /api/stub/usage returns an error or times out
Then display an error message: "Unable to load usage data. Please try again."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given usedGB equals totalGB (100% used, at cap)
Then the ProgressBar is at full width
And the usage badge shows "100% used" with variant="warning"
```

```
Given usedGB is 0
Then the ProgressBar shows empty
And "Remaining" stat tile shows the full totalGB
```

```
Given overageRateUnit is "per_mb"
Then the overage rate is displayed as "$[overageRate]/MB"
```

```
Given overageRateUnit is "per_gb"
Then the overage rate is displayed as "$[overageRate]/GB"
```

---

## Out of scope

- Data top-up action (separate flow)
- Historical usage (in UsageHistoryChart)
- Overage charges already incurred

---

## Notes for developer

- Data source: `GET /api/stub/usage` → `UsageResponse` from `src/types/api.ts`
- Use `CardHeader` molecule for the header row
- Use `ProgressBar` atom with `showThreshold={true}` — threshold activates warning colour at ≥75%
- Use `StatTile` molecule for the three stat tiles below the bar; `background="surface-tint"` per the mockup
- Use `Badge` atom for the usage percentage badge (top-right of header area)
- Days remaining: derive from `cycleEndDate` relative to today — do not add a `daysRemaining` field to the type
- This card's data is consumed by UpgradeBanner — export `usagePercent` as a derived value or pass it up via the parent
- Use `ErrorState` component on fetch failure — never render null
- Use `SkeletonBlock` on loading — never use a spinner
- Tailwind utilities only — no inline styles
