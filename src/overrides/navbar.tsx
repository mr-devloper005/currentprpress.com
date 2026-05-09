'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const staticNav = [
  { label: 'Latest news', href: '/updates' },

  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const primary = SITE_CONFIG.tasks.find((t) => t.enabled) || SITE_CONFIG.tasks[0]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#222] text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff6d1f] text-sm font-bold text-white">
            CP
          </span>
          <span className="truncate text-sm font-semibold tracking-tight sm:text-base">
            <span className="block leading-tight">{SITE_CONFIG.name}</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 sm:block">
              currentprpress.com
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {staticNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-full px-3 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white',
                pathname === item.href && 'bg-white/10 text-white',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/30 hover:bg-white/5"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          {primary ? (
            <Link
              href={primary.route}
              className="hidden rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white/90 transition hover:border-white/50 hover:bg-white/5 md:inline-flex"
            >
              {primary.label}
            </Link>
          ) : null}
          <Link
            href="/create/mediaDistribution"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/60 hover:bg-white/5"
          >
            Send release
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#1a1a1a] px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {staticNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/90"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/80"
              onClick={() => setOpen(false)}
            >
              <Search className="h-4 w-4" /> Search
            </Link>
            <Link
              href="/create/mediaDistribution"
              className="mt-2 flex items-center justify-center rounded-full bg-[#ff6d1f] py-2.5 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Send a press media
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
