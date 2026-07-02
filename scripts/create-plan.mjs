/**
 * Interactive Contentful Plan creator.
 *
 * Usage:
 *   node --env-file=.env.local scripts/create-plan.mjs
 */

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const SPACE_ID   = process.env.CONTENTFUL_SPACE_ID
const ENV_ID     = process.env.CONTENTFUL_ENVIRONMENT ?? 'master'
const MGMT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN

if (!SPACE_ID || !MGMT_TOKEN) {
  console.error('\nMissing env vars. Add these to .env.local:')
  console.error('  CONTENTFUL_SPACE_ID')
  console.error('  CONTENTFUL_MANAGEMENT_TOKEN  (your CFPAT-... token)\n')
  process.exit(1)
}

const BASE    = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENV_ID}`
const HEADERS = {
  Authorization:   `Bearer ${MGMT_TOKEN}`,
  'Content-Type':  'application/vnd.contentful.management.v1+json',
}

const rl = readline.createInterface({ input, output })

function ask(question) {
  return rl.question(`  ${question}: `)
}

function askList(question) {
  return rl.question(`  ${question}\n  (comma-separated, e.g. 50GB data, Unlimited calls): `)
    .then(v => v.split(',').map(s => s.trim()).filter(Boolean))
}

function askBool(question) {
  return rl.question(`  ${question} (y/n): `)
    .then(v => v.trim().toLowerCase() === 'y')
}

function askInt(question) {
  return rl.question(`  ${question}: `)
    .then(v => parseInt(v.trim(), 10))
}

// ── Contentful API calls ──────────────────────────────────────────────────────

async function createEntry(fields) {
  const res = await fetch(`${BASE}/entries`, {
    method:  'POST',
    headers: { ...HEADERS, 'X-Contentful-Content-Type': 'Plan' },
    body: JSON.stringify({
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
    }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

async function publishEntry(id, version) {
  const res = await fetch(`${BASE}/entries/${id}/published`, {
    method:  'PUT',
    headers: { ...HEADERS, 'X-Contentful-Version': String(version) },
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

// ── Main loop ─────────────────────────────────────────────────────────────────

console.log('\n── Contentful Plan Creator ─────────────────────────────')
console.log(`Space: ${SPACE_ID}  |  Environment: ${ENV_ID}\n`)

let addAnother = true
let count = 0

while (addAnother) {
  count++
  console.log(`\n── Plan ${count} ────────────────────────────────────────────`)

  const name            = await ask('Name (e.g. Plus)')
  const tagline         = await ask('Tagline (one sentence)')
  const priceMonthlyAud = await askInt('Price per month in AUD (number only, e.g. 65)')
  const dataAllowanceGb = await askInt('Data allowance in GB (use 999 for Unlimited)')
  const features        = await askList('Features (list each feature)')
  const isPopular       = await askBool('Mark as most popular?')
  const ctaLabel        = await ask('CTA button label (e.g. Get Plus)')
  const sortOrder       = await askInt('Sort order (1 = first, 2 = second, 3 = third)')

  const plan = { name, tagline, priceMonthlyAud, dataAllowanceGb, features, isPopular, ctaLabel, sortOrder }

  console.log('\n  Creating entry...')
  try {
    const entry   = await createEntry(plan)
    await publishEntry(entry.sys.id, entry.sys.version)
    console.log(`  ✓ "${name}" created and published (ID: ${entry.sys.id})`)
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`)
  }

  const again = await rl.question('\nAdd another plan? (y/n): ')
  addAnother = again.trim().toLowerCase() === 'y'
}

rl.close()
console.log('\nDone.\n')
