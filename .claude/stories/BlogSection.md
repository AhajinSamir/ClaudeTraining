# Story: Blog Section

**Story ID:** TN-007
**Component:** `BlogSection.tsx`
**Design reference:** `/designs/TelcoNow_Homepage_dc.html` → "Blog Section"
**Stub data:** Contentful — `BlogPost` content type via Contentful Delivery API

---

## Story

As a visitor on the TelcoNow homepage
I want to see recent blog posts
So that I can explore helpful content and learn more about TelcoNow

---

## Acceptance criteria

### Happy path

```
Given Contentful returns a list of BlogPost entries
When the BlogSection renders
Then a section header row is displayed with a heading on the left and a "View all" link on the right
And three blog post cards are displayed in a grid below
And each card shows: post title, short excerpt or description, and a link to the full post
⚠️ Exact card fields (image, date, author, category) not fully confirmed in mockup — flag for PO
```

```
Given a visitor clicks "View all"
When the link is clicked
Then the visitor is navigated to the full blog listing page
⚠️ Blog listing route not confirmed — flag for PO
```

```
Given a visitor clicks a blog post card
When the card or its link is clicked
Then the visitor is navigated to that post's detail page
⚠️ Blog post detail route not confirmed — flag for PO
```

### Loading state

```
Given the component is fetching BlogPost entries from Contentful
Then display a skeleton loader that matches the three-card grid layout
And do not show a spinner
```

### Error state

```
Given Contentful returns an error or times out
Then display an error message: "Unable to load articles. Please try again."
And display a retry button
And do not render a blank or broken layout
```

### Edge cases

```
Given Contentful returns fewer than three blog posts
Then render only the cards returned — do not render empty card slots
```

```
Given Contentful returns more than three posts
Then display only the three most recent posts
⚠️ Sort order/field not confirmed — flag for PO
```

```
Given the viewport is narrower than 1280px
Then the three-card blog grid behaviour at tablet or mobile is undefined
⚠️ No mobile design exists for this component
```

---

## Out of scope

- Pagination or infinite scroll (not in mockup)
- Category filtering (not in mockup)
- Full blog post detail page (separate story required)

---

## Notes for developer

- Data source: Contentful Delivery API, `BlogPost` content type
- Use `SectionHeader` molecule for the heading row — `align` prop allows "View all" link on the right
- Display three cards maximum — fetch limit should be set to 3
- Use `ErrorState` component on fetch failure — never render null
- Use `SkeletonBlock` on loading — never use a spinner
- Card titles use H3 scale: Inter 600, `18px`–`22px`
- "View all" link uses the `ArrowRight` Lucide icon, size 14
- Tailwind utilities only — no inline styles
