# Story: Usage History Chart

**Story ID:** TN-016
**Component:** `UsageHistoryChart.tsx`
**Design reference:** `/designs/TelcoNow Dashboard.dc.html` → "Usage History Chart (E)"
**Stub data:** `/stubs/usage-history.json` via `GET /api/stub/usage-history`

---

## Story

As an authenticated TelcoNow customer
I want to see a bar chart of my monthly data usage over the last 6 months
So that I can understand my usage trends and anticipate future overages

---

## Acceptance criteria

### Happy path

```
Given the API returns a valid UsageHistoryResponse (array of UsageHistoryEntry)
When UsageHistoryChart renders
Then a full-width card (12 cols) is displayed
And a card header shows label "Usage History" and subheading "Monthly data consumption · [month range]"
And a legend is displayed with three items: "Data used" (brand-purple square), "At cap" (#E5CCFF square), "50GB cap" (dashed brand-deep-purple line)
And a bar chart renders one bar per month, scaled proportionally to totalGB (the plan cap)
And each bar is labelled with the usedGB value above and the month name below
And a horizontal dashed cap line spans the full chart width at the totalGB height
```

```
Given a month's usedGB equals totalGB (at cap)
Then that bar is rendered in #E5CCFF (purple tint) to distinguish it from normal bars
And the usedGB label for that bar is rendered in brand-purple-dark and bold
```

```
Given the current (incomplete) month is included
Then that month's bar is rendered in a dashed-outline style with #F5EEFF fill and reduced opacity (0.65)
And the month label is rendered in brand-purple and bold with a "▸" suffix to indicate it is in-progress
```

### Loading state

```
Given the component is fetching data from GET /api/stub/usage-history
Then display a skeleton loader showing 6 bar-shaped SkeletonBlock placeholders of varying heights within the chart area
And do not show a spinner
```

### Error state

```
Given GET /api/stub/usage-history returns an error or times out
Then display an error message: "Unable to load usage history. Please try again."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given the array contains fewer than 6 entries
Then render only the entries returned — do not add empty bar slots
```

```
Given the array contains more than 6 entries
Then render only the most recent 6 entries
⚠️ Confirm ordering (oldest-first vs. newest-first) with PO
```

```
Given all months have the same usedGB
Then all bars render at the same height — no min-height bar distortion
```

---

## Out of scope

- Interactive tooltips on hover (not confirmed in mockup — flag if desired)
- Switching between data and cost views
- Exporting or downloading usage data

---

## Notes for developer

- Data source: `GET /api/stub/usage-history` → `UsageHistoryResponse` from `src/types/api.ts`
- Chart is built with native HTML/CSS (flexbox bar chart) — do not introduce a charting library unless PO approves
- Bar heights: `(usedGB / totalGB) * 100` as a percentage of a fixed chart height (128px per mockup)
- Cap line: absolutely positioned at the top of the chart area, rendered as a repeating dashed gradient
- Use `CardHeader` molecule for the header area
- Current month detection: compare entry's `month` field against the current calendar month
- "At cap" detection: `usedGB >= totalGB`
- Use `ErrorState` component on fetch failure — never render null
- Use `SkeletonBlock` on loading — never use a spinner
- Tailwind utilities only — no inline styles
