# Skill: create-story

## Trigger

`/create-story [ComponentName]`

## Purpose

Generate a story file for a TelcoNow component. The story captures intent and acceptance criteria — not implementation detail.

---

## Rules

- Follow `C:\CLAUDE AI\TELCONOW\telconow-portal\.claude\stories\_TEMPLATE.md` exactly
- Reference the correct design file:
  - Homepage components → `TelcoNow_Homepage_dc.html`
  - Dashboard components → `TelcoNow_Dashboard_dc.html`
  - Login components → `TelcoNow_Login_dc.html`
- Reference the correct stub from `component-registry.md` if the component has a data source
- Write AC that describes behaviour, not implementation
- Always include: happy path, loading state AC, error state AC
- Keep it thin — intent and constraints, not implementation detail
- Flag anything uncertain rather than inventing it

---

## Context files to read before generating any story

| File | Purpose |
|------|---------|
| `C:\CLAUDE AI\TELCONOW\telconow-portal\.claude\stories\_TEMPLATE.md` | Story format |
| `C:\CLAUDE AI\TELCONOW\telconow-portal\.claude\ui\component-registry.md` | Component list, paths, and data sources |
| `C:\CLAUDE AI\TELCONOW\telconow-portal\.claude\brief\design-system.md` | Token names for design references in AC |

---

## Output

Save the generated story to:

`C:\CLAUDE AI\TELCONOW\telconow-portal\.claude\stories\[ComponentName].md`

---

## Notes

- Confirm all three context files are read before generating any story
- Do not invent design details not present in the mockups — flag gaps explicitly
- Story IDs follow the format `TN-[number]` — confirm the next available ID before writing
