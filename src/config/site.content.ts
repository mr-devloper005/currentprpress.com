import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press wire for teams who ship real news',
  },
  footer: {
    tagline: 'Structured releases, calmer review, better reading.',
  },
  hero: {
    badge: 'Press newswire',
    title: ['The News Starts Here'],
    description:
      'Publish and read announcement-grade updates with wire discipline—clean layout, clear contacts, and archives built for comms, IR, and public audiences.',
    primaryCta: {
      label: 'Send a Press Media',
      href: '/create/mediaDistribution',
    },
    secondaryCta: {
      label: 'Learn more',
      href: '/about',
    },
    searchPlaceholder: 'Search the archive',
    focusLabel: 'Latest',
    featureCardBadge: 'desk note',
    featureCardTitle: 'Fresh items appear in the newsroom feed.',
    featureCardDescription: 'Releases are formatted for quick scanning, with room for the details readers expect on official news.',
  },
  home: {
    metadata: {
      title: 'currentprpress.com — press media & announcements',
      description:
        'CurrentPRPress: a press distribution channel for comms, IR, and public updates with a wire-style archive on currentprpress.com.',
      openGraphTitle: 'currentprpress.com',
      openGraphDescription:
        'The news starts here. Publish and follow press media, filings, and announcement-grade updates in one place.',
      keywords: [
        'press media',
        'newswire',
        'currentprpress.com',
        'IR announcements',
        'corporate communications',
        'media distribution',
      ],
    },
    introBadge: 'About the channel',
    introTitle: 'A focused surface for public announcements.',
    introParagraphs: [
      'The homepage is built like a business-wire landing experience: a bold hero, featured cards, and proof sections that explain why the channel is trustworthy.',
      'The live archive stays under Latest news so you can read everything that shipped, with filters and search to narrow in.',
      'Article pages emphasize readability and sharing so releases travel beyond the first visit.',
    ],
    sideBadge: 'What to expect',
    sidePoints: [
      'Hero and sections tuned for a press-distribution product.',
      'Releases in the /updates newsroom, not buried in a social-style feed.',
      'Detail pages with structured bodies and social sharing for distribution teams.',
    ],
    primaryLink: {
      label: 'Open the newsroom',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Contact the desk',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Start publishing',
    title: 'Ready when your next announcement is.',
    description:
      'From product launches to regulated filings, the template keeps the story on the text while the layout stays calm.',
    primaryCta: {
      label: 'Contact the desk',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Browse releases',
      href: '/updates',
    },
  },
  taskSectionHeading: 'Press media',
  taskSectionDescriptionSuffix: 'The newest items from the newswire archive.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Latest news',
    description: 'The CurrentPRPress archive of press media and public announcements.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Latest news',
    paragraphs: [
      'The CurrentPRPress newsroom lists wire-style updates and announcements. Scan by category or time window, or jump into search to find a headline fast.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
