'use client'

import { useState } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const ORGANIZATION_TYPES = [
  'Agency / PR Firm',
  'Corporation / Enterprise',
  'Small Business',
  'Non-Profit',
  'Government / Public Sector',
  'Media / Publishing',
  'Individual / Freelancer',
  'Other',
]

const SUBJECTS = [
  'Editorial question or correction',
  'Distribution & billing inquiry',
  'Partnership or integration',
  'Technical support',
  'Press media submission',
  'General inquiry',
  'Other',
]

export function ContactPageOverride() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    orgType: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = 'Contact name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.orgType) e.orgType = 'Please select an organization type'
    if (!form.subject) e.subject = 'Please select a subject'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof form]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    setSubmitted(true)
  }

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
          {submitted ? (
            <div className="rounded-2xl border border-[#ff6d1f]/30 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff6d1f]/10">
                <svg className="h-7 w-7 text-[#ff6d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                Message sent
              </h2>
              <p className="mt-2 text-sm text-[#4a3f36]">
                Thanks for reaching out. We'll get back to you within one business day.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', orgType: '', subject: '', message: '' }) }}
                className="mt-6 inline-flex items-center rounded-full border border-[#222]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#222] transition hover:bg-[#f5e7c6]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#222]/10 bg-white p-6 shadow-sm sm:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Row 1: Name + Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5c4c]">
                      Contact Name <span className="text-[#ff6d1f]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={`h-11 w-full rounded-xl border px-4 text-sm text-[#222] placeholder-[#b0a090] outline-none transition focus:border-[#ff6d1f] focus:ring-2 focus:ring-[#ff6d1f]/20 ${errors.name ? 'border-red-400 bg-red-50' : 'border-[#222]/12 bg-[#faf3e1]/40'}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5c4c]">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="h-11 w-full rounded-xl border border-[#222]/12 bg-[#faf3e1]/40 px-4 text-sm text-[#222] placeholder-[#b0a090] outline-none transition focus:border-[#ff6d1f] focus:ring-2 focus:ring-[#ff6d1f]/20"
                    />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5c4c]">
                    Email <span className="text-[#ff6d1f]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={`h-11 w-full rounded-xl border px-4 text-sm text-[#222] placeholder-[#b0a090] outline-none transition focus:border-[#ff6d1f] focus:ring-2 focus:ring-[#ff6d1f]/20 ${errors.email ? 'border-red-400 bg-red-50' : 'border-[#222]/12 bg-[#faf3e1]/40'}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Divider label */}
                <p className="pt-1 text-sm font-medium text-[#4a3f36]">Help us understand your needs a little more.</p>

                {/* Row 3: Org type + Subject */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="orgType" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5c4c]">
                      What type of organization are you? <span className="text-[#ff6d1f]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="orgType"
                        name="orgType"
                        value={form.orgType}
                        onChange={handleChange}
                        className={`h-11 w-full appearance-none rounded-xl border px-4 pr-9 text-sm outline-none transition focus:border-[#ff6d1f] focus:ring-2 focus:ring-[#ff6d1f]/20 ${errors.orgType ? 'border-red-400 bg-red-50 text-[#222]' : 'border-[#222]/12 bg-[#faf3e1]/40 text-[#222]'} ${!form.orgType ? 'text-[#b0a090]' : ''}`}
                      >
                        <option value="" disabled>Please Select</option>
                        {ORGANIZATION_TYPES.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b5c4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.orgType && <p className="mt-1 text-xs text-red-500">{errors.orgType}</p>}
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5c4c]">
                      Subject: How may we help you? <span className="text-[#ff6d1f]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={`h-11 w-full appearance-none rounded-xl border px-4 pr-9 text-sm outline-none transition focus:border-[#ff6d1f] focus:ring-2 focus:ring-[#ff6d1f]/20 ${errors.subject ? 'border-red-400 bg-red-50 text-[#222]' : 'border-[#222]/12 bg-[#faf3e1]/40 text-[#222]'} ${!form.subject ? 'text-[#b0a090]' : ''}`}
                      >
                        <option value="" disabled>Please Select</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b5c4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5c4c]">
                    Message / Comment <span className="text-[#ff6d1f]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Share the full context so we can respond with the right next step."
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-[#222] placeholder-[#b0a090] outline-none transition focus:border-[#ff6d1f] focus:ring-2 focus:ring-[#ff6d1f]/20 ${errors.message ? 'border-red-400 bg-red-50' : 'border-[#222]/12 bg-[#faf3e1]/40'}`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                {/* Submit */}
                <div className="pt-1 text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-[#ff6d1f] px-10 py-3 text-sm font-semibold text-white transition hover:bg-[#e85f19] focus:outline-none focus:ring-2 focus:ring-[#ff6d1f]/50"
                  >
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
