export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Press room',
    route: '/updates',
    description: 'Press media and public announcements in the newswire archive.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/updates',
} as const
