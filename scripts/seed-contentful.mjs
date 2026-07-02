/**
 * Contentful seed script — creates and publishes 3 Plan entries.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-contentful.mjs
 *
 * Requires CONTENTFUL_MANAGEMENT_TOKEN in .env.local
 * (your CFPAT-... personal access token from Contentful → Settings → API Keys → CMA tokens)
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

// ── Plan data ────────────────────────────────────────────────────────────────

const plans = [
  {
    name:             'Starter',
    tagline:          'Everything you need to stay connected.',
    priceMonthlyAud:  39,
    dataAllowanceGb:  15,
    features: [
      '15GB data',
      '5G coverage',
      'Unlimited calls & SMS',
      'WiFi calling',
      'Standard customer support',
    ],
    isPopular:  false,
    ctaLabel:   'Get Starter',
    sortOrder:  1,
  },
  {
    name:             'Plus',
    tagline:          'More data, more speed — our most popular plan.',
    priceMonthlyAud:  65,
    dataAllowanceGb:  50,
    features: [
      '50GB data',
      'Ultra 5G speeds',
      'Unlimited calls & SMS',
      'International SMS (20 countries)',
      'WiFi calling',
      'Priority customer support',
    ],
    isPopular:  true,
    ctaLabel:   'Get Plus',
    sortOrder:  2,
  },
  {
    name:             'Pro',
    tagline:          'Unlimited everything, for power users.',
    priceMonthlyAud:  99,
    dataAllowanceGb:  999,
    features: [
      'Unlimited data',
      'Ultra 5G priority access',
      'Unlimited calls & SMS',
      'International calls & SMS (40 countries)',
      'WiFi calling',
      '24/7 dedicated support',
      'Device protection included',
    ],
    isPopular:  false,
    ctaLabel:   'Get Pro',
    sortOrder:  3,
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

async function createEntry(fields) {
  const body = {
    fields: {
      name:             { 'en-US': fields.name },
      tagline:          { 'en-US': fields.tagline },
      priceMonthlyAud:  { 'en-US': fields.priceMonthlyAud },
      dataAllowanceGb:  { 'en-US': fields.dataAllowanceGb },
      features:         { 'en-US': fields.features },
      isPopular:        { 'en-US': fields.isPopular },
      ctaLabel:         { 'en-US': fields.ctaLabel },
      sortOrder:        { 'en-US': fields.sortOrder },
    },
  }

  const res = await fetch(`${BASE}/entries`, {
    method: 'POST',
    headers: { ...HEADERS, 'X-Contentful-Content-Type': 'Plan' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Failed to create "${fields.name}": ${res.status} ${err}`)
  }

  return res.json()
}

async function publishEntry(entryId, version) {
  const res = await fetch(`${BASE}/entries/${entryId}/published`, {
    method: 'PUT',
    headers: { ...HEADERS, 'X-Contentful-Version': String(version) },
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Failed to publish entry ${entryId}: ${res.status} ${err}`)
  }

  return res.json()
}

// ── Main ─────────────────────────────────────────────────────────────────────

console.log(`Seeding ${plans.length} plans into space ${SPACE_ID} / ${ENV_ID}...\n`)

for (const plan of plans) {
  try {
    const entry = await createEntry(plan)
    const version = entry.sys.version
    await publishEntry(entry.sys.id, version)
    console.log(`✓ ${plan.name} (${plan.dataAllowanceGb === 999 ? 'Unlimited' : plan.dataAllowanceGb + 'GB'}, $${plan.priceMonthlyAud}/mo) — published`)
  } catch (err) {
    console.error(`✗ ${plan.name} — ${err.message}`)
  }
}

console.log('\nDone.')
