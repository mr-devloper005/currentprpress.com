import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#faf3e1] text-[#222]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#222222]/10 bg-gradient-to-b from-white to-[#faf3e1] px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <h1
              className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Contact us
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4a3f36] sm:text-base">
              Editorial questions, corrections, distribution inquiries, and partner conversations all route through the desk
              below. We respond in one business day for most requests.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="order-2 space-y-6 rounded-2xl border border-[#222222]/10 bg-white p-6 shadow-sm lg:order-1">
            <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Write the desk
            </h2>
            <p className="text-sm text-[#4a3f36]">
              Use your work email and include the announcement headline or URL so we can respond without extra back-and-forth.
            </p>
            <a
              href="mailto:desk@currentprpress.com?subject=CurrentPRPress%20inquiry"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#ff6d1f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e85f19] sm:w-auto"
            >
              desk@currentprpress.com
            </a>
            <p className="text-xs text-[#6b5c4c]">
              Prefer a form? For now, email is the supported path.{' '}
              <Link href="/search" className="font-semibold text-[#c2410c] underline">
                Search the archive
              </Link>{' '}
              while you wait.
            </p>
          </div>
          <div className="order-1 space-y-6 lg:order-2">
            <div className="space-y-4 text-sm text-[#4a3f36]">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b5c4c]">Editorial</h3>
                <p className="mt-1">Clarifications, bylines, and factual updates on live releases.</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b5c4c]">Distribution &amp; billing</h3>
                <p className="mt-1">Plans, add-ons, and scheduling around filings or product launches.</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b5c4c]">Partners</h3>
                <p className="mt-1">Agencies, platforms, and publisher integrations. Mention your use case in the subject line.</p>
              </div>
            </div>
            <div className="relative h-56 overflow-hidden rounded-2xl border border-[#222222]/10">
              <ContentImage
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&h=600&fit=crop"
                alt="Open office workspace with communication tools"
                className="h-full w-full object-cover"
                fill
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
