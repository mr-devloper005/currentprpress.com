import type { Metadata } from 'next'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name}`,
    description: `What ${SITE_CONFIG.name} is: a focused press distribution surface for comms, IR, and public announcements.`,
  })
}

const values = [
  {
    title: 'Accuracy over noise',
    body: 'Releases are structured for readers first—clear datelines, contacts, and bodies that do not sprawl into generic blog formatting.',
  },
  {
    title: 'Paced for real teams',
    body: 'Approvals, edits, and publish are built for groups that juggle multiple stakeholders, not a single social editor.',
  },
  {
    title: 'Credible on every screen',
    body: 'The wire-style archive and article pages are tuned for desk monitors and phones, because news breaks everywhere.',
  },
] as const

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf3e1] text-[#222]">
      <NavbarShell />
      <main>
        <section className="px-4 py-14 sm:px-6 sm:py-18">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6b5c4c]">About {SITE_CONFIG.name}</p>
              <h1
                className="mt-3 text-4xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                A press newswire built for organizations that ship real announcements.
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-[#4a3f36] sm:text-base">
                {SITE_CONFIG.name} exists so corporate communications, investor relations, and agency partners can publish
                material updates in a clean, defensible format. The surface borrows the clarity of a wire, without copying the
                noise of a consumer social feed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/updates"
                  className="inline-flex items-center justify-center rounded-full bg-[#ff6d1f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e85f19]"
                >
                  Browse releases
                </Link>
              </div>
            </div>
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[#222222]/10 bg-white">
              <ContentImage
                src="https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-13391.jpg"
                alt="Team collaboration meeting"
                className="h-full w-full object-cover"
                fill
              />
            </div>
          </div>
        </section>

        <section className="border-t border-[#222222]/10 bg-[#222] px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2
              className="text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              How we work
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#ff6d1f]/50"
                >
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-18">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The domain says it all
            </h2>
            <p className="mt-3 text-sm text-[#4a3f36] sm:text-base">currentprpress.com is a home for current press—timely, sourced, and formatted for people who need to act on news.</p>
            <Link href="/contact" className="mt-6 inline-block text-sm font-semibold text-[#c2410c] underline">
              Get in touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
