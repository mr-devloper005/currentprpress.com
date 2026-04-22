import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faq = [
  {
    q: 'How does distribution work on CurrentPRPress?',
    a: 'You draft and publish from the same flow your team already uses. Releases appear in the public archive, support structured fields for IR-style announcements, and stay easy to read on every device.',
  },
  {
    q: 'Can we change plans later?',
    a: 'Yes. You can move between Basic, Pro, and Premium as your volume and reporting needs change. We will align cutover dates with your publishing calendar.',
  },
  {
    q: 'What add-ons are most common?',
    a: 'Extra media slots, priority review windows, and extended analytics exports are the most requested. Add-ons can be combined with any plan.',
  },
] as const

const plans = [
  {
    name: 'Basic',
    price: '$199',
    period: '/ release',
    desc: 'Essential reach for product news and program updates.',
    features: ['National feed placement', 'Standard review window', 'Link and quote formatting', 'Email support'],
    cta: 'Get started',
    href: '/create/mediaDistribution',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$399',
    period: '/ release',
    desc: 'The plan teams choose for frequent announcements.',
    features: [
      'Everything in Basic',
      'Richer media treatment',
      'Comparative analytics',
      'Expedited review option',
    ],
    cta: 'Choose Pro',
    href: '/create/mediaDistribution',
    highlight: true,
  },
  {
    name: 'Premium',
    price: 'Custom',
    period: '',
    desc: 'For organizations with multiple brands and complex approvals.',
    features: ['Multi-brand routing', 'Named account contact', 'Custom review SLAs', 'Add-on bundling'],
    cta: 'Contact sales',
    href: '/contact',
    highlight: false,
  },
] as const

const addOns = [
  { title: 'Extra media bundle', body: 'Additional images, embeds, and file slots for visual stories.' },
  { title: 'Analyst & IR pack', body: 'Tables, footnotes, and contact lines tuned for earnings material.' },
  { title: 'Geographic add-on', body: 'Supplemental region targeting for launches and field programs.' },
] as const

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Pricing | CurrentPRPress',
    description: 'Plans and add-ons for press release distribution on CurrentPRPress.',
  })
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#faf3e1] text-[#222]">
      <NavbarShell />
      <main>
        <section className="bg-gradient-to-b from-[#111620] to-[#222] px-4 py-16 text-center text-white sm:px-6 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">Transparent plans</p>
          <h1
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Simple pricing for serious news
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/75 sm:text-base">
            Pick a lane that matches your cadence. Every plan includes a clean reader experience and structured fields for
            comms and IR teams.
          </p>
        </section>

        <section className="mx-auto -mt-8 max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-6 shadow-sm ${
                  plan.highlight
                    ? 'border-[#ff6d1f] bg-white ring-2 ring-[#ff6d1f]/30'
                    : 'border-[#222222]/10 bg-white'
                }`}
              >
                {plan.highlight ? (
                  <p className="mb-2 w-fit rounded-full bg-[#ff6d1f] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most popular
                  </p>
                ) : null}
                <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  {plan.name}
                </h2>
                <p className="mt-1 text-sm text-[#4a3f36]">{plan.desc}</p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                  {plan.period ? <span className="text-sm text-[#6b5c4c]">{plan.period}</span> : null}
                </p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-[#3a322b]">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6d1f]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full py-2.5 text-sm font-semibold ${
                    plan.highlight ? 'bg-[#ff6d1f] text-white hover:bg-[#e85f19]' : 'border border-[#222222]/15 bg-white hover:bg-[#f5e7c6]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2
            className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Plan comparison
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#4a3f36] sm:text-base">Depth of analytics, review windows, and media support across tiers.</p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#222222]/10 bg-white">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#222222]/10 bg-[#f5e7c6]/40">
                  <th className="p-4 font-semibold">Capability</th>
                  <th className="p-4 font-semibold">Basic</th>
                  <th className="p-4 font-semibold">Pro</th>
                  <th className="p-4 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Distribution level', 'Core', 'Expanded', 'Custom'],
                  ['Analytics & reporting', 'Standard', 'Comparative', 'Dedicated'],
                  ['Media & embeds', '1 featured visual', 'Gallery-ready', 'Advanced bundle'],
                ].map(([a, b, c, d]) => (
                  <tr key={a} className="border-b border-[#222222]/5">
                    <td className="p-4 text-[#4a3f36]">{a}</td>
                    <td className="p-4">{b}</td>
                    <td className="p-4 font-medium text-[#c2410c]">{c}</td>
                    <td className="p-4">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-t border-[#222222]/10 bg-[#f5e7c6]/30 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <h2
              className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Add-ons
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {addOns.map((a) => (
                <div key={a.title} className="rounded-2xl border border-[#222222]/10 bg-white p-5">
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm text-[#4a3f36]">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
          <h2
            className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Questions
          </h2>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-[#222222]/15">
                <AccordionTrigger className="text-left text-[#222] hover:text-[#c2410c]">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#4a3f36]">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="bg-[#222] px-4 py-12 text-center text-white sm:py-16">
          <p className="text-sm text-white/80">Need a custom bundle for {SITE_CONFIG.name}?</p>
          <Link
            href="/contact"
            className="mt-3 inline-block text-sm font-semibold text-[#ff6d1f] underline decoration-[#ff6d1f] underline-offset-4"
          >
            Talk to us
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
