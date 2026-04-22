import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'
import { Search } from 'lucide-react'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full announcement on the story page.'
  return value.length > 180 ? value.slice(0, 177).trimEnd() + '…' : value
}

function getImage(post: SitePost) {
  const media = post.media?.find((m) => m.url)?.url
  if (media) return media
  return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1000&h=600&fit=crop'
}

function postCategory(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as { category?: string }).category : null
  return typeof c === 'string' && c.trim() ? c.trim() : 'Press'
}

function filterByParams(posts: SitePost[], category?: string, rangeDays?: number) {
  let out = posts
  if (category && category !== 'all') {
    const want = category.toLowerCase()
    out = out.filter((p) => postCategory(p).toLowerCase() === want)
  }
  if (rangeDays && rangeDays > 0) {
    const min = Date.now() - rangeDays * 86400000
    out = out.filter((p) => {
      const t = p.publishedAt ? new Date(p.publishedAt).getTime() : 0
      return t >= min
    })
  }
  return out
}

export async function TaskListPageOverride({ task, category, range }: { task: TaskKey; category?: string; range?: string }) {
  const posts = await fetchTaskPosts('mediaDistribution', 48, { fresh: true })
  const rangeDays = range === '30' ? 30 : range === '90' ? 90 : undefined
  const filtered = filterByParams(posts, category, rangeDays)
  const distinctCategories = Array.from(new Set(posts.map(postCategory))).sort().slice(0, 12)

  return (
    <div className="min-h-screen bg-[#faf3e1] text-[#222]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6b5c4c]">Press room</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            Latest news
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#4a3f36] sm:text-base">
            Read announcements, filings, and program updates from the CurrentPRPress newswire archive.
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#222222]/10 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <form action="/search" method="get" className="flex w-full max-w-md gap-0">
            <div className="flex flex-1 items-stretch">
              <label htmlFor="news-search" className="sr-only">
                Search
              </label>
              <input
                id="news-search"
                name="q"
                placeholder="Search headlines, topics…"
                className="h-12 flex-1 rounded-l-xl border border-[#222222]/15 bg-[#faf3e1]/50 px-4 text-sm text-[#222] outline-none ring-[#ff6d1f] focus:ring-2"
              />
              <button
                type="submit"
                className="inline-flex h-12 w-12 items-center justify-center rounded-r-xl bg-[#ff6d1f] text-white"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#6b5c4c]">Date</span>
            <Link
              href={
                category && category !== 'all' ? `/updates?category=${encodeURIComponent(category)}` : '/updates'
              }
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${!range || range === 'all' ? 'bg-[#222] text-white' : 'bg-[#f5e7c6] text-[#222] hover:bg-[#edd9a5]'}`}
            >
              All
            </Link>
            <Link
              href={
                category && category !== 'all'
                  ? `/updates?category=${encodeURIComponent(category)}&range=30`
                  : '/updates?range=30'
              }
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${range === '30' ? 'bg-[#222] text-white' : 'bg-[#f5e7c6] text-[#222] hover:bg-[#edd9a5]'}`}
            >
              30 days
            </Link>
            <Link
              href={
                category && category !== 'all'
                  ? `/updates?category=${encodeURIComponent(category)}&range=90`
                  : '/updates?range=90'
              }
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${range === '90' ? 'bg-[#222] text-white' : 'bg-[#f5e7c6] text-[#222] hover:bg-[#edd9a5]'}`}
            >
              90 days
            </Link>
          </div>
        </div>

        {distinctCategories.length > 0 ? (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#6b5c4c]">Category</span>
            <Link
              href={
                (() => {
                  if (range && range !== 'all' && (range === '30' || range === '90')) {
                    return `/updates?range=${encodeURIComponent(range)}`
                  }
                  return '/updates'
                })()
              }
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${!category || category === 'all' ? 'bg-[#222] text-white' : 'bg-white text-[#222] ring-1 ring-[#222222]/10'}`}
            >
              All
            </Link>
            {distinctCategories.map((cat) => {
              const active = (category || '').toLowerCase() === cat.toLowerCase()
              const sp = new URLSearchParams()
              sp.set('category', cat)
              if (range && (range === '30' || range === '90')) sp.set('range', range)
              return (
                <Link
                  key={cat}
                  href={`/updates?${sp.toString()}`}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${active ? 'bg-[#ff6d1f] text-white' : 'bg-white text-[#222] ring-1 ring-[#222222]/10 hover:ring-[#ff6d1f]/50'}`}
                >
                  {cat}
                </Link>
              )
            })}
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-[#222222]/20 bg-white/60 p-8 text-center text-sm text-[#4a3f36]">
            No releases match these filters.{' '}
            <Link className="font-semibold text-[#c2410c] underline" href="/updates">
              Clear filters
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-10 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/updates/${post.slug}`}
                  className="cpp-card-lift group block overflow-hidden rounded-2xl border border-[#222222]/10 bg-white"
                >
                  <div className="relative h-40">
                    <ContentImage
                      src={getImage(post)}
                      alt={post.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                      fill
                    />
                    <div className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#222]">
                      {postCategory(post)}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-[#6b5c4c]">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : ''}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-[#4a3f36]">{excerpt(post.summary)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  )
}
