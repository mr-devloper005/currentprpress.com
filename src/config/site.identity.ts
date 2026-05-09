export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'p1ek5iqqxj',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'CurrentPRPress',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Press distribution that reads like the news',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'CurrentPRPress is a newswire-style channel for press media, IR updates, and public announcements on currentprpress.com.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'currentprpress.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://currentprpress.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
