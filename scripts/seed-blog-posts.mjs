/**
 * Contentful seed script — creates and publishes 3 BlogPost entries.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-blog-posts.mjs
 *
 * Requires CONTENTFUL_MANAGEMENT_TOKEN in .env.local
 * Content type ID must be "blogPost" (created via Contentful UI first)
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

// ── Blog post data ────────────────────────────────────────────────────────────

const posts = [
  {
    title:       "5G is here: what it means for your everyday life",
    excerpt:     "Australia's 5G rollout is accelerating. We break down what faster speeds and lower latency actually mean for streaming, gaming, and working from home.",
    category:    "Technology",
    authorName:  "Priya Nair",
    publishDate: "2026-06-18",
    accentColor: "#A100FF",
  },
  {
    title:       "5 tips to make your phone battery last all day",
    excerpt:     "Small changes, big difference. Our network engineers share the battery-saving habits that actually work — no airplane mode required.",
    category:    "Tips",
    authorName:  "Jordan Walsh",
    publishDate: "2026-06-05",
    accentColor: "#0EA5E9",
  },
  {
    title:       "TelcoNow named Australia's most trusted telco for the third year running",
    excerpt:     "We are proud to share that TelcoNow has been awarded Australia's Most Trusted Telco for 2026. Here is what this means to us — and to you.",
    category:    "Company",
    authorName:  "Saanvi Mehta",
    publishDate: "2026-05-22",
    accentColor: "#10B981",
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

async function createEntry(fields) {
  const body = {
    fields: {
      title:       { 'en-US': fields.title },
      excerpt:     { 'en-US': fields.excerpt },
      category:    { 'en-US': fields.category },
      authorName:  { 'en-US': fields.authorName },
      publishDate: { 'en-US': fields.publishDate },
      accentColor: { 'en-US': fields.accentColor },
    },
  }

  const res = await fetch(`${BASE}/entries`, {
    method: 'POST',
    headers: { ...HEADERS, 'X-Contentful-Content-Type': 'blogPost' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Failed to create "${fields.title}": ${res.status} ${err}`)
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

console.log(`Seeding ${posts.length} blog posts into space ${SPACE_ID} / ${ENV_ID}...\n`)

for (const post of posts) {
  try {
    const entry = await createEntry(post)
    await publishEntry(entry.sys.id, entry.sys.version)
    console.log(`✓ "${post.title}" (${post.category}) — published`)
  } catch (err) {
    console.error(`✗ "${post.title}" — ${err.message}`)
  }
}

console.log('\nDone.')
