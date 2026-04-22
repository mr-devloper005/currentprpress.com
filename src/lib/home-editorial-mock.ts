import type { SitePost } from '@/lib/site-connector'

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=750&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad4ab?w=1200&h=750&fit=crop',
] as const

const MOCK_ENTRIES: Array<{ title: string; category: string; summary: string; image: string }> = [
  {
    title: 'Strategic Media Partnerships Expand for the Quarter Ahead',
    category: 'Corporate',
    summary:
      'CurrentPRPress is widening co-distribution with regional desks so announcements reach finance, technology, and policy readers through a single, auditable publish path.',
    image: MOCK_IMAGES[0],
  },
  {
    title: 'Newsroom Tools Update Emphasizes Review Speed and Clarity',
    category: 'Product',
    summary:
      'Editorial approvers now see a consolidated diff for headlines, subheads, and contact blocks. Embargo timers stay visible in the status bar to reduce last-minute errors.',
    image: MOCK_IMAGES[1],
  },
  {
    title: 'Coverage Calendar: Upcoming Industry Briefings and Demo Days',
    category: 'Events',
    summary:
      'We will host a plain-language walkthrough of wire formatting, social snippets, and logo usage. Sessions are short, practical, and built for in-house comms teams.',
    image: MOCK_IMAGES[2],
  },
  {
    title: 'Statement on Measured Growth and Channel Quality',
    category: 'Leadership',
    summary:
      'We are prioritizing accurate distribution over raw volume. That means stricter link validation, clearer datelines, and support for organizations that file frequent material updates.',
    image: MOCK_IMAGES[3],
  },
  {
    title: 'Service Desk Hours for Public Companies and IR Teams',
    category: 'IR',
    summary:
      'Dedicated windows for earnings-adjacent releases, with staff ready to help verify tables, footnotes, and contact lines before items clear the wire.',
    image: MOCK_IMAGES[4],
  },
  {
    title: 'Editorial Standards Refresh: Headlines, Attribution, and Corrections',
    category: 'Editorial',
    summary:
      'Headlines should read cleanly in search and social cards. We clarified when to run a correction notice versus an inline update, and how to label third-party data.',
    image: MOCK_IMAGES[5],
  },
  {
    title: 'Data Handling Review Wraps; Updated Playbook Published',
    category: 'Trust',
    summary:
      'Retention rules, export steps, and regional options are documented in one place. Support can answer common data questions without bouncing teams between tools.',
    image: MOCK_IMAGES[6],
  },
  {
    title: 'Reader Feedback Shapes Navigation and Topic Pages',
    category: 'Product',
    summary:
      'We grouped beats that readers open together, tightened empty states, and made related items easier to find at the end of every release.',
    image: MOCK_IMAGES[7],
  },
  {
    title: 'Resilience Drills Show Strong Performance Under Peak Load',
    category: 'Operations',
    summary:
      'Synthetic tests covered three times our busiest hour last season. Optional enrichments are isolated so core pages stay fast if an upstream service stalls.',
    image: MOCK_IMAGES[8],
  },
  {
    title: 'Year in Review: What Audiences Opened Most Often',
    category: 'Insights',
    summary:
      'Explainers won on time-on-page; tight briefs won on return visits. The takeaway is to label intent in the first line so readers know what they are opening.',
    image: MOCK_IMAGES[9],
  },
  {
    title: 'Sustainability Note: Lighter Previews, Leaner Page Weight',
    category: 'Impact',
    summary:
      'Batching previews and trimming auto-embeds reduced energy per story load. We will keep monitoring third-party modules that can wait until after first paint.',
    image: MOCK_IMAGES[10],
  },
  {
    title: 'Accessibility Improvements on Core Reading Templates',
    category: 'Accessibility',
    summary:
      'Landmarks and skip links stay stable as promos load. Contrast issues on callouts were fixed; remaining work tracks embedded widgets with vendor timelines.',
    image: MOCK_IMAGES[11],
  },
  {
    title: 'Headlines Digest: Frequency Caps and Topic Affinity',
    category: 'Audience',
    summary:
      'We respect reader cadence. Digests can favor beats you follow, with cap-aware scheduling to avoid overloading the same inboxes on busy days.',
    image: MOCK_IMAGES[12],
  },
  {
    title: 'Security: Scheduled Credential Rotation Complete',
    category: 'Security',
    summary:
      'Integration keys rotated in the standard maintenance window. Anomaly checks on sign-in traffic help on-call staff spot issues early without user disruption.',
    image: MOCK_IMAGES[13],
  },
  {
    title: 'Field Desk: Filing on Deadline With Clean Context',
    category: 'Field',
    summary:
      'Reporters and comms teams can add a “why it matters” line to orient casual readers, without crowding the lede on fast-moving items.',
    image: MOCK_IMAGES[14],
  },
  {
    title: 'Benchmarks: Comparing Our Latency to Sector Averages',
    category: 'Research',
    summary:
      'We remain ahead on median time-to-publish for breaking material while keeping multimedia optional so pages stay lightweight and reliable.',
    image: MOCK_IMAGES[15],
  },
]

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getHomeEditorialMockPosts(): SitePost[] {
  return MOCK_ENTRIES.map((entry, index) => {
    const slug = `${slugify(entry.title)}-mock-${index + 1}`
    return {
      id: `home-editorial-mock-${index + 1}`,
      title: entry.title,
      slug,
      summary: entry.summary,
      content: {
        type: 'mediaDistribution',
        category: entry.category,
        description: entry.summary,
      },
      media: [{ url: entry.image, type: 'image' }],
      tags: ['mediaDistribution', entry.category],
      authorName: 'CurrentPRPress Desk',
      publishedAt: new Date(Date.now() - index * 86400000 * 2).toISOString(),
    }
  })
}

export function mergeEditorialPostsForHome(real: SitePost[], mocks: SitePost[], maxTotal = 16): SitePost[] {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const p of real) {
    if (out.length >= maxTotal) break
    if (!seen.has(p.slug)) {
      seen.add(p.slug)
      out.push(p)
    }
  }
  for (const m of mocks) {
    if (out.length >= maxTotal) break
    if (!seen.has(m.slug)) {
      seen.add(m.slug)
      out.push(m)
    }
  }
  return out
}
