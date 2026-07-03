/**
 * Seeds homepage content: HeroBanner, TrustStats, and PromoBanner.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-homepage.mjs
 *
 * All three content types must be created in Contentful UI first.
 */

const SPACE_ID   = process.env.CONTENTFUL_SPACE_ID
const ENV_ID     = process.env.CONTENTFUL_ENVIRONMENT ?? 'master'
const MGMT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN

if (!SPACE_ID || !MGMT_TOKEN) {
  console.error('Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local')
  process.exit(1)
}

const BASE = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENV_ID}`
const HEADERS = {
  'Authorization': `Bearer ${MGMT_TOKEN}`,
  'Content-Type': 'application/vnd.contentful.management.v1+json',
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function createEntry(contentTypeId, fields) {
  const body = { fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, { 'en-US': v }])) }
  const res = await fetch(`${BASE}/entries`, {
    method: 'POST',
    headers: { ...HEADERS, 'X-Contentful-Content-Type': contentTypeId },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  return res.json()
}

async function publishEntry(entryId, version) {
  const res = await fetch(`${BASE}/entries/${entryId}/published`, {
    method: 'PUT',
    headers: { ...HEADERS, 'X-Contentful-Version': String(version) },
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  return res.json()
}

async function seed(label, contentTypeId, fields) {
  try {
    const entry = await createEntry(contentTypeId, fields)
    await publishEntry(entry.sys.id, entry.sys.version)
    console.log(`  ✓ ${label}`)
  } catch (err) {
    console.error(`  ✗ ${label} — ${err.message}`)
  }
}

// ── HeroBanner ────────────────────────────────────────────────────────────────

console.log('\n── Hero Banner ─────────────────────────────')
await seed('Hero Banner', 'heroBanner', {
  eyebrowText:        '5G Now Live Nationwide',
  headline:           "Australia's fastest 5G network.",
  subheadline:        'Flexible plans. No lock-in contracts. Cancel any time.',
  primaryCtaLabel:    'View plans',
  primaryCtaurl:      '/plans',
  secondaryCtaLabel:  'Check coverage',
  secondaryCtaurl:    '/coverage',
})

// ── TrustStats ────────────────────────────────────────────────────────────────

console.log('\n── Trust Stats ─────────────────────────────')
await seed('Network uptime stat', 'trustStat', { statValue: '99.8%', statLabel: 'Network uptime', sortOrder: 1 })
await seed('Customers stat',      'trustStat', { statValue: '4.2M+', statLabel: 'Customers',      sortOrder: 2 })
await seed('Support rating stat', 'trustStat', { statValue: '★ 4.8', statLabel: 'Award-winning support', sortOrder: 3 })

// ── PromoBanner ───────────────────────────────────────────────────────────────

console.log('\n── Promo Banner ────────────────────────────')
await seed('Referral promo banner', 'promoBanner', {
  headline:    'Refer a friend, get one month free.',
  description: 'Share your code. When they sign up, you both win.',
  ctaLabel:    'Refer now',
  ctaUrl:      '#',
})

console.log('\nDone.')
