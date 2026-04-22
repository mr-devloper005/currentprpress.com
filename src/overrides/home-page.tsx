import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Check,
  FileText,
  LineChart,
  Megaphone,
  Newspaper,
  Radio,
  ShieldCheck,
  Video,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { getHomeEditorialMockPosts, mergeEditorialPostsForHome } from '@/lib/home-editorial-mock'
import type { SitePost } from '@/lib/site-connector'
import { siteContent } from '@/config/site.content'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: unknown }).images)
      ? (post.content as { images: string[] }).images.find((url: unknown) => typeof url === 'string' && url)
      : null
  return mediaUrl || contentImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=750&fit=crop'
}

function getCategory(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as { category?: string }).category : null
  if (typeof c === 'string' && c.trim()) return c.trim()
  return 'Press'
}

const features = [
  {
    title: 'Reach the Right Readers',
    body: 'Target industries, geographies, and trade audiences so releases surface where stakeholders already read.',
    icon: Radio,
  },
  {
    title: 'Show & Tell Your News',
    body: 'Pair crisp copy with images, video links, and structured quotes that feel editorial—without a cluttered page.',
    icon: Video,
  },
  {
    title: 'Deliver Accurate & Reliable Financial News',
    body: 'Datelines, contacts, and material facts stay organized for IR-grade announcements and public-company teams.',
    icon: ShieldCheck,
  },
  {
    title: 'Optimize with Analytics & Reporting',
    body: 'Track opens, referral paths, and what readers engage with to sharpen the next headline and distribution mix.',
    icon: LineChart,
  },
] as const

const testimonials = [
  {
    quote:
      'We cut review rounds in half. Approvers see the same preview readers get, and the contact block never goes missing.',
    name: 'Jordan Ellis',
    role: 'VP Communications, Harborline Manufacturing',
  },
  {
    quote:
      'The clean article layout made our Q4 earnings easier to scan on mobile. Social snippets looked intentional, not tacked on.',
    name: 'Maya Iyer',
    role: 'Director of IR, Bluecrest Analytics',
  },
  {
    quote:
      'We publish more often now because the workflow is predictable. Embargo timing is obvious and support answers fast.',
    name: 'Chris Ortega',
    role: 'PR Lead, Northline Health Cooperative',
  },
] as const

const brandRow = [
  'Northline Media',
  'Copperline Bank',
  'Lumen Rail',
  'Apex North Labs',
  'Crescent Foods Co-op',
] as const

const solutions = [
  { label: 'PR & Corporate Communications', icon: Megaphone },
  { label: 'IR Professionals', icon: BarChart3 },
  { label: 'Agencies', icon: FileText },
  { label: 'Public Companies', icon: Newspaper },
  { label: 'Industry-Specific Solutions', icon: ShieldCheck },
] as const

const UPDATES = '/updates'
const SUBMIT = '/create/mediaDistribution'

export async function HomePageOverride() {
  const real = await fetchTaskPosts('mediaDistribution', 20, { allowMockFallback: false, fresh: false, revalidate: 120 })
  const posts = mergeEditorialPostsForHome(real, getHomeEditorialMockPosts(), 16)
  const carousel = posts.slice(0, 5)
  const primaryTask = SITE_CONFIG.tasks[0]
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [] as string[],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[#222]">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#0c1118] via-[#1a1f2e] to-[#222] px-4 pb-20 pt-16 text-white sm:px-6 sm:pt-20 lg:px-8 lg:pb-24">
        <div
          className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-[#ff6d1f]/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/55">Newswire for modern teams</p>
          <h1
            className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The News Starts Here
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {siteContent.hero.description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={SUBMIT}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#ff6d1f] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#ff6d1f]/20 transition hover:bg-[#ff5500]"
            >
              Send a Press Release
            </Link>
            <Link
              href="/about"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-[1] -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-end justify-between gap-3">
            <h2
              className="text-2xl font-semibold tracking-[-0.03em] text-[#222] sm:text-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Featured in the newsroom
            </h2>
            <Link href={UPDATES} className="group hidden text-sm font-semibold text-[#c2410c] sm:inline-flex sm:items-center sm:gap-1">
              View all
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] sm:gap-5">
            {carousel.map((post) => (
              <Link
                key={post.id}
                href={`${UPDATES}/${post.slug}`}
                className="cpp-card-lift group relative w-[min(100%,320px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#222222]/10 bg-white shadow-sm sm:w-[300px] md:w-[280px]"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <ContentImage
                    src={getPostImage(post)}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    fill
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#222]">
                    {getCategory(post)}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[11px] text-[#6b5c4c]">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : ''}
                  </p>
                  <h3
                    className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-[#222] sm:text-lg"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-2 text-center sm:hidden">
            <Link href={UPDATES} className="text-sm font-semibold text-[#c2410c]">
              View all releases
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 bg-[#222] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">Build narrative velocity</p>
            <h2
              className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Turn Your News into Headlines
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              A structured, enterprise-friendly flow: draft, review, and publish in one motion—without the noise of a generic
              content feed.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#ff6d1f]/50 hover:bg-white/[0.07]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-white/20 to-white/5">
                    <Icon className="h-5 w-5 text-[#ff6d1f]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{f.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#faf3e1] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2
            className="text-center text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What teams are saying
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[#4a3f36] sm:text-base">
            Built for in-house comms, IR, and partners who need dependable releases and calm UX.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="cpp-card-lift flex h-full flex-col rounded-2xl border border-[#222222]/8 bg-white p-6 shadow-sm"
              >
                <p className="text-sm italic leading-relaxed text-[#3a322b] sm:text-base">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 text-sm">
                  <p className="font-semibold text-[#222]">{t.name}</p>
                  <p className="text-xs text-[#6b5c4c]">{t.role}</p>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#222222]/10 bg-[#f5e7c6]/60 px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#5c5246]">Trusted by teams in finance, health, and industrials</p>
        <div className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-center gap-8 sm:gap-10 md:justify-between">
          {brandRow.map((name) => (
            <span
              key={name}
              className="text-sm font-bold uppercase tracking-[0.2em] text-[#222]/45 grayscale transition hover:grayscale-0"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-[#faf3e1] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-2 inline-block h-1 w-12 rounded-full bg-[#ff6d1f]" />
          <h2
            className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Get results with the solutions you need
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {solutions.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="flex flex-col items-center rounded-2xl border border-[#222222]/10 bg-white/80 p-5 text-center shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6d1f]/30 bg-[#ff6d1f]/10">
                  <Icon className="h-5 w-5 text-[#c2410c]" />
                </div>
                <p className="mt-4 text-sm font-semibold leading-snug text-[#222]">{s.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-[#f0e6d2] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b5c4c]">Journalists &amp; media</p>
            <h2
              className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Discover your next story
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#4a3f36] sm:text-base">
              Skim by beat, file into briefings, and follow organizations you cover. The reader experience stays fast so you can
              work from a phone in the field or a desk in the office.
            </p>
            <Link
              href={UPDATES}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#c2410c] underline decoration-[#ff6d1f] decoration-2 underline-offset-4"
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[#222222]/10 shadow-md">
            <ContentImage
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&h=700&fit=crop"
              alt="Team collaborating on a news project"
              className="h-full w-full object-cover"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/30 to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0f131a] to-[#222] px-4 py-20 text-center text-white sm:px-6 lg:px-8">
        <h2
          className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Ready to Share Your News?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 sm:text-base">Ship your next release with a layout readers trust and teams can review quickly.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href={SUBMIT}
            className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#222] transition hover:bg-[#f5e7c6]"
          >
            Get Started
          </Link>
          {primaryTask ? (
            <Link
              href={primaryTask.route}
              className="text-sm font-semibold text-white/80 underline decoration-white/30 decoration-1 underline-offset-4 hover:text-white"
            >
              {primaryTask.label} archive
            </Link>
          ) : null}
        </div>
      </section>

      <Footer />
    </div>
  )
}
