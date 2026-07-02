import { createClient } from 'contentful'
import type { EntryFieldTypes } from 'contentful'

type PlanSkeleton = {
  contentTypeId: 'plan'
  fields: {
    name: EntryFieldTypes.Symbol
    price: EntryFieldTypes.Number
    tagline: EntryFieldTypes.Symbol
    features: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
    featured: EntryFieldTypes.Boolean
    ctaLabel: EntryFieldTypes.Symbol
  }
}

export type Plan = {
  id: string
  name: string
  price: number
  tagline: string
  features: string[]
  featured: boolean
  ctaLabel: string
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
})

export async function getPlans(): Promise<Plan[]> {
  const entries = await client.getEntries<PlanSkeleton>({
    content_type: 'plan',
    limit: 3,
  })
  return entries.items.map((entry) => ({
    id: entry.sys.id,
    name: entry.fields.name,
    price: entry.fields.price,
    tagline: entry.fields.tagline,
    features: entry.fields.features,
    featured: entry.fields.featured ?? false,
    ctaLabel: entry.fields.ctaLabel,
  }))
}
