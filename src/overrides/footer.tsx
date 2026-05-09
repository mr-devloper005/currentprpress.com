import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const col = [
  {
    title: 'Distribution',
    links: [
      { label: 'Press media', href: '/updates' },
      { label: 'Send a release', href: '/create/mediaDistribution' },

    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
] as const

export function FooterOverride() {
  return (
    <footer className="border-t border-[#222222]/10 bg-[#222] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              {SITE_CONFIG.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{SITE_CONFIG.description}</p>

          </div>
          {col.map((c) => (
            <div key={c.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">{c.title}</h3>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/80 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. currentprpress.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
