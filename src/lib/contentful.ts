import { createClient } from 'contentful'
import type { EntryFieldTypes } from 'contentful'

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

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
})

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
