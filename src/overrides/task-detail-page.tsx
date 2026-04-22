import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'
import { Mail } from 'lucide-react'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function getImage(post: { media?: { url: string }[]; content?: Record<string, unknown> | null; summary?: string | null }) {
  const m = post.media?.find((x) => x.url)?.url
  if (m) return m
  return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=700&fit=crop'
}

function getShareUrl(path: string) {
  return `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${path}`
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts('mediaDistribution', 10, { fresh: true })).filter((item) => item.slug !== slug).slice(0, 3)
  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', '')
  const category = typeof content.category === 'string' ? content.category : 'Press'
  const path = `/updates/${post.slug}`
  const fullUrl = getShareUrl(path)
  const img = getImage(post)
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(post.title)
  const sub = post.summary && post.summary.length < 220 ? post.summary : null

  return (
    <div className="min-h-screen bg-[#faf3e1] text-[#222]">
      <NavbarShell />
      <article>
        <header className="border-b border-[#222222]/10 bg-white/90">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b5c4c]">{category}</p>
            {sub ? <p className="mt-2 text-lg font-medium leading-relaxed text-[#3a322b] sm:text-xl">{sub}</p> : null}
            <h1
              className="mt-4 text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#4a3f36]">
              <time dateTime={post.publishedAt || undefined}>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  : ''}
              </time>
              <span className="text-[#6b5c4c]">·</span>
              <span>{post.authorName || 'CurrentPRPress Desk'}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/12 bg-white text-[#222] transition hover:border-[#ff6d1f] hover:text-[#c2410c]"
                aria-label="Share on X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/12 bg-white text-[#222] transition hover:border-[#ff6d1f] hover:text-[#c2410c]"
                aria-label="Share on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/12 bg-white text-[#222] transition hover:border-[#ff6d1f] hover:text-[#c2410c]"
                aria-label="Share on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/12 bg-white text-[#222] transition hover:border-[#ff6d1f] hover:text-[#c2410c]"
                aria-label="Email this release"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative -mt-2 overflow-hidden rounded-2xl border border-[#222222]/10 bg-white shadow-sm sm:-mt-4">
            <div className="relative aspect-[21/9] w-full min-h-[200px] sm:aspect-[2/1]">
              <ContentImage src={img} alt={post.title} className="h-full w-full object-cover" fill />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="prose prose-lg max-w-none text-[#2a2420] prose-headings:font-semibold prose-headings:text-[#222] prose-a:text-[#c2410c] article-content">
            <RichContent html={html} />
          </div>
        </div>

        {related.length > 0 ? (
          <section className="border-t border-[#222222]/10 bg-[#f5e7c6]/50 py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <h2 className="text-xl font-semibold tracking-[-0.02em]" style={{ fontFamily: 'var(--font-display)' }}>
                Related releases
              </h2>
              <ul className="mt-6 grid list-none gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/updates/${item.slug}`}
                      className="group block h-full overflow-hidden rounded-2xl border border-[#222222]/10 bg-white p-4 transition hover:border-[#ff6d1f]/40"
                    >
                      <p className="text-[11px] text-[#6b5c4c]">
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : ''}
                      </p>
                      <p className="mt-1 font-semibold leading-snug text-[#222] group-hover:text-[#c2410c]">{item.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </article>
      <Footer />
    </div>
  )
}
