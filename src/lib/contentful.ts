import { createClient } from 'contentful'
import type { EntryFieldTypes } from 'contentful'

// ── Contentful client ────────────────────────────────────────────────────────

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
})

// ── Plan ─────────────────────────────────────────────────────────────────────

type PlanSkeleton = {
  contentTypeId: 'Plan'
  fields: {
    name: EntryFieldTypes.Symbol
    tagline: EntryFieldTypes.Symbol
    priceMonthlyAud: EntryFieldTypes.Integer
    dataAllowanceGb: EntryFieldTypes.Integer
    features: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
    isPopular: EntryFieldTypes.Boolean
    ctaLabel: EntryFieldTypes.Symbol
    sortOrder: EntryFieldTypes.Integer
  }
}

export type Plan = {
  id: string
  name: string
  tagline: string
  price: number
  dataAllowanceGb: number
  features: string[]
  featured: boolean
  ctaLabel: string
  sortOrder: number
}

export async function getPlans(): Promise<Plan[]> {
  const entries = await client.getEntries<PlanSkeleton>({
    content_type: 'Plan',
    order: ['fields.sortOrder'],
    limit: 3,
  })
  return entries.items.map((entry) => ({
    id: entry.sys.id,
    name: entry.fields.name,
    tagline: entry.fields.tagline,
    price: entry.fields.priceMonthlyAud,
    dataAllowanceGb: entry.fields.dataAllowanceGb,
    features: entry.fields.features,
    featured: entry.fields.isPopular ?? false,
    ctaLabel: entry.fields.ctaLabel,
    sortOrder: entry.fields.sortOrder,
  }))
}

// ── HeroBanner ───────────────────────────────────────────────────────────────

type HeroBannerSkeleton = {
  contentTypeId: 'heroBanner'
  fields: {
    eyebrowText: EntryFieldTypes.Symbol
    headline: EntryFieldTypes.Symbol
    subheadline: EntryFieldTypes.Symbol
    primaryCtaLabel: EntryFieldTypes.Symbol
    primaryCtaurl: EntryFieldTypes.Symbol
    secondaryCtaLabel: EntryFieldTypes.Symbol
    secondaryCtaurl: EntryFieldTypes.Symbol
  }
}

export type HeroBanner = {
  eyebrowText: string
  headline: string
  subheadline: string
  primaryCtaLabel: string
  primaryCtaUrl: string
  secondaryCtaLabel: string
  secondaryCtaUrl: string
}

export async function getHeroBanner(): Promise<HeroBanner | null> {
  const entries = await client.getEntries<HeroBannerSkeleton>({
    content_type: 'heroBanner',
    limit: 1,
  })
  const entry = entries.items[0]
  if (!entry) return null
  return {
    eyebrowText: entry.fields.eyebrowText,
    headline: entry.fields.headline,
    subheadline: entry.fields.subheadline,
    primaryCtaLabel: entry.fields.primaryCtaLabel,
    primaryCtaUrl: entry.fields.primaryCtaurl,
    secondaryCtaLabel: entry.fields.secondaryCtaLabel ?? '',
    secondaryCtaUrl: entry.fields.secondaryCtaurl ?? '',
  }
}

// ── TrustStat ─────────────────────────────────────────────────────────────────

type TrustStatSkeleton = {
  contentTypeId: 'trustStat'
  fields: {
    statValue: EntryFieldTypes.Symbol
    statLabel: EntryFieldTypes.Symbol
    sortOrder: EntryFieldTypes.Integer
  }
}

export type TrustStat = {
  id: string
  statValue: string
  statLabel: string
  sortOrder: number
}

export async function getTrustStats(): Promise<TrustStat[]> {
  const entries = await client.getEntries<TrustStatSkeleton>({
    content_type: 'trustStat',
    order: ['fields.sortOrder'],
    limit: 6,
  })
  return entries.items.map((entry) => ({
    id: entry.sys.id,
    statValue: entry.fields.statValue,
    statLabel: entry.fields.statLabel,
    sortOrder: entry.fields.sortOrder,
  }))
}

// ── PromoBanner ───────────────────────────────────────────────────────────────

type PromoBannerSkeleton = {
  contentTypeId: 'promoBanner'
  fields: {
    headline: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
    ctaLabel: EntryFieldTypes.Symbol
    ctaUrl: EntryFieldTypes.Symbol
  }
}

export type PromoBanner = {
  headline: string
  description: string
  ctaLabel: string
  ctaUrl: string
}

export async function getPromoBanner(): Promise<PromoBanner | null> {
  const entries = await client.getEntries<PromoBannerSkeleton>({
    content_type: 'promoBanner',
    limit: 1,
  })
  const entry = entries.items[0]
  if (!entry) return null
  return {
    headline: entry.fields.headline,
    description: entry.fields.description,
    ctaLabel: entry.fields.ctaLabel,
    ctaUrl: entry.fields.ctaUrl,
  }
}

// ── BlogPost ──────────────────────────────────────────────────────────────────

type BlogPostSkeleton = {
  contentTypeId: 'blogPost'
  fields: {
    title: EntryFieldTypes.Symbol
    excerpt: EntryFieldTypes.Symbol
    category: EntryFieldTypes.Symbol
    authorName: EntryFieldTypes.Symbol
    publishDate: EntryFieldTypes.Date
    accentColor: EntryFieldTypes.Symbol
  }
}

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  category: string
  authorName: string
  publishDate: string
  accentColor: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
    limit: 3,
  })
  return entries.items.map((entry) => ({
    id: entry.sys.id,
    title: entry.fields.title,
    excerpt: entry.fields.excerpt,
    category: entry.fields.category,
    authorName: entry.fields.authorName,
    publishDate: entry.fields.publishDate,
    accentColor: entry.fields.accentColor ?? '#A100FF',
  }))
}
