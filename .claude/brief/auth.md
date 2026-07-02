# TelcoNow — Authentication Specification

**Project:** TelcoNow
**Library:** Auth.js (NextAuth v5 — latest stable)
**Spec Version:** 1.2
**Status:** Draft — Updated against visual mockups (`TelcoNow Homepage.dc.html`, `TelcoNow Login.dc.html`, `TelcoNow Dashboard.dc.html`). No NextAuth config, API contract, or Contentful/customer-API source was provided — backend implementation details below are still ⚠️ ASSUMPTION. Only what's visible in the UI is now confirmed.

> ⚠️ SCOPE CONFLICT — READ FIRST: The mockups show UI for sign-up ("Get started" in homepage header, login footer, and plan card CTAs) and password reset ("Forgot password?" link). `build-spec.md` lists **both** of these as out of scope. This spec cannot resolve that conflict — it needs a product decision. See §9.

---

## 1. Provider

⚠️ ASSUMPTION (narrowed, not confirmed): Credentials provider (email + password) is in use.

**Confirmed by mockup:** The login page shows only an email field and a password field — no OAuth/social login buttons (no "Sign in with Google," etc.) are present anywhere in the design. This is consistent with a Credentials-only provider, but absence of OAuth buttons in a static mockup doesn't prove the backend won't support it later — flagging as strengthened assumption, not fact.

> ⚠️ VERSION UPDATE: Auth.js v5 replaces NextAuth v4. File path, imports, and config structure are completely different from v4. Use the v5 pattern below.

```ts
// auth.ts (project root — replaces v4's pages/api/auth/[...nextauth].ts)
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // validate credentials against data source
        // return user object or null
      },
    }),
  ],
})
```

```ts
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

---

## 2. Session Strategy

⚠️ ASSUMPTION: JWT session strategy (NextAuth default — no database adapter specified). Not verifiable from any mockup — nothing in the UI distinguishes JWT vs database sessions.

```ts
// auth.ts — session config inside NextAuth({...})
session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days — confirm with product before Sprint 2
}
```

**Confirmed by mockup:** No "Remember me" checkbox exists on the login form. If extended/persistent sessions are required, that's a product decision not reflected in the current design — don't assume it's implicitly handled by a 30-day default without confirming with product.

---

## 3. Route Protection

| Route | Protection | Behaviour |
|---|---|---|
| `/` | None | Always accessible |
| `/login` | Soft | Authenticated users redirect to `/dashboard` |
| `/dashboard` | Hard | Unauthenticated users redirect to `/login` |

**Decision recorded:** App Router is confirmed as the routing architecture for this project. `getServerSideProps` is Pages Router only and must not be used. Route protection is implemented via Next.js `middleware.ts` using the Auth.js v5 `auth()` helper.

**Recommended middleware implementation (Auth.js v5):**

> ⚠️ VERSION UPDATE: `next-auth/middleware` export does not exist in Auth.js v5. Use the `auth()` helper from your `auth.ts` config instead.

```ts
// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }
})

export const config = {
  matcher: ["/dashboard/:path*"],
}
```

---

## 4. Redirect Rules

| Trigger | Redirect To |
|---|---|
| Successful login | `/dashboard` |
| Failed login | `/login` (with error param) |
| Unauthenticated `/dashboard` access | `/login` |
| Authenticated `/login` access | `/dashboard` |
| Logout | ⚠️ Still unconfirmed — see note below |
| Expired session | `/login` |

**Confirmed by mockup, NOT resolved:** Dashboard sidebar has a visible "← Log out" link, so logout as a feature is confirmed in scope. But the mockup is static — the link has no real `href` target, so where it redirects to (`/` vs `/login`) is still an open question, not just an assumption. This needs a decision, not more design archaeology.

---

## 5. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `AUTH_SECRET` | Yes | JWT signing secret — renamed from `NEXTAUTH_SECRET` in Auth.js v5. Must be set in Vercel env. Generate with: `openssl rand -base64 32` |
| `AUTH_URL` | Yes | Canonical app URL (e.g. `https://telconow.com.au`) — renamed from `NEXTAUTH_URL` in Auth.js v5 |

> ⚠️ Using the old v4 names (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`) will cause auth to silently fail in production. Use `AUTH_SECRET` and `AUTH_URL` only.

No OAuth client ID/secret needed — Credentials-only provider confirmed (see §1).

---

## 6. Session Object

⚠️ ASSUMPTION: Minimal session shape based on NextAuth JWT defaults — but the dashboard mockup tells us more must be displayed than this shape currently supports.

**Confirmed by mockup:** The dashboard sidebar renders the user's display name ("Alex Chen"), initials in an avatar ("AC"), and their current plan name ("Plus plan"). No email address is shown anywhere on the dashboard UI.

Session shape is defined and augmented in `types/next-auth.d.ts`:

```ts
// types/next-auth.d.ts — already created
Session {
  user: {
    id: string    // added via JWT callback in auth.ts
    name: string  // confirmed required — rendered in sidebar
    email: string // required by NextAuth default
    // image omitted — avatar is always initials-based (confirmed by mockup)
  }
  expires: string // ISO 8601
}
```

The plan name ("Plus plan") shown in the dashboard sidebar is **not** part of the session — it is fetched from the customer API (`AccountResponse.planName`) after authentication. See `types/api.ts`.

---

## 7. UI-Confirmed Requirements (new section — not in v1.0)

These are concrete UI behaviours visible in the Login mockup that weren't previously specified:

| Requirement | Detail |
|---|---|
| Password visibility toggle | Eye icon button inside the password field toggles `type="password"` ↔ `type="text"`. Confirmed present — add as an explicit acceptance criterion, it was previously only an ⚠️ ASSUMPTION in design.md |
| Submit button label | Confirmed: **"Sign in"** — not "Log in" or "Log In" |
| Forgot password link | Confirmed present, positioned top-right of the password field label row — but destination/flow is out of scope per build-spec.md (see §9 conflict) |
| Sign-up entry point | Confirmed present: "Don't have an account? Get started →" below the form — also out of scope per build-spec.md (see §9 conflict) |
| Field order | Email above password, both full-width, labels above inputs (not placeholder-only) |
| No inline error state in mockup | The static mockup shows only the default/empty state — no error variant was designed. AUTH-02/AUTH-03 test cases (below) have no visual reference to QA against yet |

---

## 8. Test Cases

### 8.1 Login

| ID | Scenario | Input | Expected |
|---|---|---|---|
| AUTH-01 | Valid credentials | Correct email + password | Redirect to `/dashboard`, session cookie set |
| AUTH-02 | Invalid password | Correct email, wrong password | Remain on `/login`, error displayed — ⚠️ no error-state design exists to verify against |
| AUTH-03 | Unknown email | Non-existent email | Remain on `/login`, error displayed — ⚠️ same caveat as AUTH-02 |
| AUTH-04 | Empty fields | Submit with no input | Form validation, no API call |
| AUTH-05 | Already authenticated | Visit `/login` with active session | Redirect to `/dashboard` |
| AUTH-12 | Password visibility toggle | Click eye icon | Password field toggles between masked and plain text — NEW, confirmed by mockup |
| AUTH-13 | Forgot password link | Click "Forgot password?" | ⚠️ Cannot write expected result — flow is out of scope per build-spec.md but link exists in design. Needs product decision before this test case can be written |
| AUTH-14 | Sign-up entry point | Click "Get started" (homepage header, login footer, or plan card CTA) | ⚠️ Same as above — UI exists, flow is undefined/out of scope |

### 8.2 Session

| ID | Scenario | Expected |
|---|---|---|
| AUTH-06 | Active session → `/dashboard` | 200, user data rendered (name, avatar initials, plan — confirmed via mockup) |
| AUTH-07 | No session → `/dashboard` | 302 to `/login` |
| AUTH-08 | Expired JWT → `/dashboard` | 302 to `/login`, no stale data shown |
| AUTH-09 | Session cookie tampered | 302 to `/login` |

### 8.3 Logout

| ID | Scenario | Expected |
|---|---|---|
| AUTH-10 | Logout action | Confirmed UI element exists (dashboard sidebar "← Log out"). Session cleared, redirect to `/` or `/login` — ⚠️ destination still unconfirmed, not just unconfirmed-by-mockup but genuinely undecided |
| AUTH-11 | Access `/dashboard` post-logout | 302 to `/login` |

---

## 9. Open Questions

1. **Scope conflict (carried forward from intro, repeated here so it isn't missed):** Is sign-up/registration in scope? The mockups design for it explicitly (3 separate entry points); build-spec.md says it's out of scope. Same conflict for password reset ("Forgot password?" link exists; reset flow is listed out of scope).
2. Is the provider Credentials only, or will OAuth be added later? Mockup shows no OAuth UI, but that's a design-time absence, not an architectural guarantee.
3. What data source does `authorize()` validate against?
4. Where does logout redirect — `/` or `/login`? Confirmed as a real gap, not a documentation oversight — the mockup link has no target.
5. Is there a remember-me / extended session requirement? Mockup shows no "remember me" checkbox — if required, it's missing from design too, not just from this spec.
6. Are there role-based access requirements on the dashboard (e.g. admin vs standard customer)? Nothing in the mockup suggests multiple account types — single "Alex Chen / Plus plan" view only.
7. Should the dashboard sidebar's avatar fall back to initials if no `image` is set, or is image-based avatar entirely out of scope given the mockup never uses one?
