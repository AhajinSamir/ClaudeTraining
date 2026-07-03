import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { ErrorState } from '@/components/ui/ErrorState'
import { getBlogPosts, type BlogPost } from '@/lib/contentful'

// ── Skeleton ─────────────────────────────────────────────────────────────────

export function BlogSectionSkeleton() {
  return (
    <section className="bg-surface-tint py-20">
      <Container>
        <div className="mb-10 flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <SkeletonBlock width="60px" height="12px" />
            <SkeletonBlock width="220px" height="32px" />
          </div>
          <SkeletonBlock width="100px" height="16px" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl bg-white overflow-hidden flex flex-col">
              <div className="h-1" />
              <div className="p-6 flex flex-col gap-3 flex-1">
                <SkeletonBlock width="70px" height="20px" rounded />
                <SkeletonBlock height="24px" />
                <SkeletonBlock height="24px" width="80%" />
                <SkeletonBlock height="16px" />
                <SkeletonBlock height="16px" width="90%" />
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <SkeletonBlock width="100px" height="14px" />
                  <SkeletonBlock width="80px" height="14px" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ── Blog card ────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-xl bg-white overflow-hidden flex flex-col shadow-card hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(70,0,115,0.13)] transition-all">
      <div className="h-1" style={{ backgroundColor: post.accentColor }} />
      <div className="p-6 flex flex-col flex-1">
        <span className="inline-block self-start rounded-full bg-surface-tint px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-brand-purple mb-4">
          {post.category}
        </span>
        <h3 className="text-[18px] font-semibold leading-snug text-brand-deep-purple mb-3 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-border-neutral pt-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-medium text-neutral-700">{post.authorName}</span>
            <span className="text-[12px] text-neutral-400">{formatDate(post.publishDate)}</span>
          </div>
          <Link
            href="/blog"
            className="text-[13px] font-semibold text-brand-purple flex items-center gap-1 hover:underline"
          >
            Read more
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────

export async function BlogSection() {
  let posts: BlogPost[]

  try {
    posts = await getBlogPosts()
  } catch {
    return (
      <section className="bg-surface-tint py-20">
        <Container>
          <ErrorState message="Unable to load articles. Please try again." />
        </Container>
      </section>
    )
  }

  if (posts.length === 0) return null

  return (
    <section className="bg-surface-tint py-20">
      <Container>
        <div className="mb-10 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-purple">
              Blog
            </span>
            <h2 className="text-[32px] font-bold text-brand-deep-purple leading-tight">
              From the TelcoNow blog.
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-[14px] font-semibold text-brand-purple hover:underline"
          >
            View all articles
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </section>
  )
}
