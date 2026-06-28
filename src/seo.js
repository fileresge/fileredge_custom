export const siteUrl = 'https://www.fileredge.com'

export const seoPages = [
  {
    source: 'index.html',
    path: '/',
    title: 'Tax Filing & Business Registration in Karachi | FilerEdge',
    description: 'FilerEdge provides FBR income tax filing, NTN, GST, PST and business registration services for individuals and companies in Karachi, Pakistan.',
    heading: 'Tax Filing & Business Registration Services in Karachi',
  },
  {
    source: 'about.html',
    path: '/about/',
    title: 'About FilerEdge | Tax Consultants in Karachi',
    description: 'Meet FilerEdge, a Karachi tax and business consultancy helping individuals, startups and companies manage FBR filings and regulatory compliance.',
    heading: 'About FilerEdge Tax Consultants',
  },
  {
    source: 'services.html',
    path: '/services/',
    title: 'FBR Tax Filing, NTN & GST Registration Karachi | FilerEdge',
    description: 'Get NTN registration, FBR income tax return filing, GST, PST, withholding statements and company tax services from FilerEdge in Karachi.',
    heading: 'Tax Filing and Registration Services in Karachi',
  },
  {
    source: 'tax-cal.html',
    path: '/tax-calculator/',
    title: 'Pakistan Salary Tax Calculator 2025-26 | FilerEdge',
    description: 'Estimate monthly and annual income tax on your salary with the FilerEdge Pakistan salary tax calculator for tax year 2025-26.',
    heading: 'Pakistan Salary Tax Calculator 2025-26',
  },
  {
    source: 'contact.html',
    path: '/contact/',
    title: 'Contact a Tax Consultant in Karachi | FilerEdge',
    description: 'Contact FilerEdge for income tax filing, NTN registration, GST, PST and business compliance support in Karachi. Call or request a consultation.',
    heading: 'Contact FilerEdge Tax Consultants',
  },
  {
    source: 'blog1.html',
    path: '/blog/why-tax-filing-is-important-for-business/',
    title: 'Why Tax Filing Is Important for Business in Pakistan',
    description: 'Learn why timely FBR tax filing helps businesses in Pakistan avoid penalties, build credibility, claim deductions and maintain accurate records.',
    heading: 'Why Tax Filing Is Important for Business in Pakistan',
    type: 'article',
  },
  {
    source: 'blog2.html',
    path: '/blog/common-tax-filing-mistakes/',
    title: '9 Common Tax Filing Mistakes to Avoid in Pakistan',
    description: 'Avoid common Pakistan tax return mistakes involving deadlines, income reporting, deductions, wealth statements and required FBR documents.',
    heading: 'Common Tax Filing Mistakes to Avoid in Pakistan',
    type: 'article',
  },
  {
    source: 'blog3.html',
    path: '/blog/how-to-file-taxes-in-pakistan/',
    title: 'How to File Taxes in Pakistan and Avoid FBR Penalties',
    description: 'A practical guide for salaried individuals, freelancers and businesses to file taxes accurately in Pakistan and avoid common FBR penalties.',
    heading: 'How to File Taxes in Pakistan Without Costly Mistakes',
    type: 'article',
  },
  {
    source: '404.html',
    path: '/404/',
    title: 'Page Not Found | FilerEdge',
    description: 'The requested FilerEdge page could not be found. Browse our tax filing and business registration services or contact our Karachi team.',
    heading: 'Page Not Found',
    noindex: true,
  },
]

export const pageBySource = new Map(seoPages.map((page) => [page.source, page]))

export function pageFromLocation(location) {
  const legacyHash = location.hash.match(/^#\/?([^?]*)/i)?.[1]
  if (legacyHash) {
    const source = legacyHash === 'tax-cal' ? 'tax-cal.html' : `${legacyHash}.html`
    if (pageBySource.has(source)) return pageBySource.get(source)
  }

  const pathname = location.pathname.replace(/\/+$/, '') || '/'
  const cleanMatch = seoPages.find((page) => (page.path.replace(/\/+$/, '') || '/') === pathname)
  if (cleanMatch) return cleanMatch

  const legacyFile = pathname.split('/').pop()
  if (pageBySource.has(legacyFile)) return pageBySource.get(legacyFile)

  return pageBySource.get('404.html')
}

export function routeForLegacyFile(filename) {
  const direct = pageBySource.get(filename)
  if (direct) return direct.path
  if (/^index(?:-|\.)/i.test(filename)) return '/'
  if (/^blog/i.test(filename)) return '/#blog'
  if (/^(?:team)/i.test(filename)) return '/about/#team'
  if (/^(?:faq|login)/i.test(filename)) return '/contact/'
  if (/^(?:service|product|package|project|gallery|cart|checkout)/i.test(filename)) return '/services/'
  return '/404/'
}
