# Story: Login Panel

**Story ID:** TN-008
**Component:** `LoginPanel.tsx`
**Design reference:** `/designs/TelcoNow Login.dc.html` → "Login Form"
**Stub data:** None — form-based auth via NextAuth credentials provider, no data fetch on load

---

## Story

As a TelcoNow customer
I want to log in to my account with my email and password
So that I can access my dashboard and manage my account

---

## Acceptance criteria

### Happy path

```
Given the user navigates to /login
When the LoginPanel renders
Then a two-column layout is displayed
And the left panel (45% width, bg-brand-deep-purple) shows the TelcoNow wordmark, heading "Your account. Your data. Always in control.", and three check bullets: "View real-time usage", "Manage your plan", "Pay your bill"
And the right panel shows an email field, a password field with show/hide toggle, a full-width "Log in" primary button, a "Forgot password?" link, and a "Don't have an account? Get started" link
```

```
Given the user enters valid credentials and clicks "Log in"
When NextAuth authenticates the credentials
Then the user is redirected to /dashboard
```

### Loading state

```
Given the user has submitted the login form and the auth request is in-flight
Then the "Log in" button is disabled and shows a loading indicator
And the email and password fields are disabled
And no error message is displayed
```

### Error state

```
Given the user enters invalid credentials and clicks "Log in"
When NextAuth returns an authentication failure
Then an inline error message is displayed: "Invalid email or password. Please try again."
And the form fields remain populated (do not clear on error)
And the "Log in" button is re-enabled
```

```
Given a network error occurs during the auth request
Then display an error message: "Something went wrong. Please try again."
And the "Log in" button is re-enabled
```

### Edge cases

```
Given the user submits the form with an empty email or password
Then display a field-level validation error before the request is sent
And do not submit the form
```

```
Given the user is already authenticated
When they navigate to /login
Then redirect them to /dashboard
⚠️ Redirect behaviour for already-authenticated users not confirmed — flag for PO
```

---

## Out of scope

- "Forgot password" flow (not yet designed)
- Social / OAuth login providers
- Account creation ("Get started" link destination not confirmed)
- Mobile layout (375px breakpoint behaviour not designed for the two-column split)

---

## Notes for developer

- Use `FormField` molecule for email and password fields — it manages password visibility state internally
- Use `Button` atom with `variant="primary"` and `fullWidth` for the submit button
- Left panel background: `bg-brand-deep-purple` (`#460073`)
- Check bullets use a circular icon (`bg-[rgba(161,0,255,0.35)] border border-[rgba(161,0,255,0.6)]`) with an SVG checkmark in `#E5CCFF`
- Auth is via NextAuth `signIn("credentials", ...)` — handle the returned error object for inline error display
- Use `ErrorState` component only for network-level failures, not credential validation errors
