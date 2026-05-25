import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContactForm } from '@/overrides/contact-form'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#faf3e1] text-[#222]">
      <NavbarShell />
      <main>
        {/* Page header */}
        <section className="border-b border-[#222]/10 bg-gradient-to-b from-white to-[#faf3e1] px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Contact Us
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#4a3f36] sm:text-base">
              Editorial questions, corrections, distribution inquiries, and partner conversations all route through the desk
              below. We respond within one business day for most requests.
            </p>
          </div>
        </section>

        {/* Contact form section */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  )
}
