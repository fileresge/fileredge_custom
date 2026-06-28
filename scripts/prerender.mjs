import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from 'cheerio'
import { routeForLegacyFile, seoPages, siteUrl } from '../src/seo.js'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const sourceDirectory = join(root, 'public', 'pages')
const outputDirectory = join(root, 'dist')
const template = await readFile(join(outputDirectory, 'index.html'), 'utf8')
const today = new Date().toISOString().slice(0, 10)
const assetVersion = '20260628-1'

function absoluteUrl(path) {
  return new URL(path, siteUrl).href
}

function normalizeContent($, page) {
  $('script').remove()
  $('.preloader').remove()

  $('[src]').each((_, element) => {
    const src = $(element).attr('src')?.replaceAll('\\', '/')
    if (src && !/^(?:https?:|data:|\/)/i.test(src)) $(element).attr('src', `/${src.replace(/^\.\//, '')}`)
  })

  $('[style]').each((_, element) => {
    const style = $(element).attr('style')
    if (style) $(element).attr('style', style.replace(/url\((['"]?)(?:\.\/)?assets\//gi, 'url($1/assets/'))
  })

  $('a[href]').each((_, element) => {
    const href = $(element).attr('href')?.trim()
    if (!href) return
    if (href === 'info.fileredge@gmail.com') return $(element).attr('href', 'mailto:info.fileredge@gmail.com')
    if (href === 'www.fileredge.com') return $(element).attr('href', siteUrl)
    if (href === 'mailto:needhelp@procounsel.com' || href === 'mailto:Support@gmail.com') {
      $(element).attr('href', 'mailto:info.fileredge@gmail.com').text('info.fileredge@gmail.com')
      return
    }
    if (/^(?:#|\/|https?:|mailto:|tel:|javascript:)/i.test(href)) return

    const match = href.match(/^(?:\.\/)?([^/#?]+\.html)(#[^?]*)?$/i)
    if (match) $(element).attr('href', `${routeForLegacyFile(match[1])}${match[2] || ''}`)
  })

  if (page.type === 'article') {
    const articleTitle = $('.blog-details__title, .blog-details h1').first()
    if (articleTitle.length) {
      articleTitle[0].tagName = 'h1'
      articleTitle.text(page.heading)
    }
  } else if (page.source === 'index.html') {
    const heroTitle = $('.main-slider-one__title').first()
    if (heroTitle.length) {
      heroTitle[0].tagName = 'h1'
      heroTitle.html('Tax Filing &amp; Business Registration<br>Services in Karachi')
    }
  } else {
    const pageTitle = $('.page-header__title').first()
    if (pageTitle.length) {
      pageTitle[0].tagName = 'h1'
      pageTitle.text(page.heading)
    }
  }

  if (page.source === 'services.html') {
    $('.card-header > span:first-child').each((_, element) => {
      element.tagName = 'h2'
      $(element).addClass('service-card-title').attr('style', 'font: inherit; margin: 0; color: inherit;')
    })
    $('.page-header').after(`
      <section class="seo-introduction py-5">
        <div class="container">
          <p>FilerEdge provides FBR income tax return filing, NTN registration, GST registration, PST registration, withholding statements and sales tax return services in Karachi. We support salaried individuals, sole proprietors, partnerships and private limited companies across Pakistan.</p>
        </div>
      </section>
    `)
  }

  if (page.type === 'article') {
    $('.blog-details__content').first().append(`
      <aside class="seo-related-links" aria-label="Related FilerEdge resources">
        <h2>Get help with tax filing in Pakistan</h2>
        <p>Explore our <a href="/services/">FBR tax filing and registration services</a>, estimate salary tax with our <a href="/tax-calculator/">Pakistan tax calculator</a>, or <a href="/contact/">contact a FilerEdge tax consultant in Karachi</a>.</p>
      </aside>
    `)
  }

  $('img[alt*="procounsel" i]').attr('alt', 'FilerEdge tax and business consultancy')
}

function structuredData(page) {
  const canonical = absoluteUrl(page.path)
  const business = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#organization`,
    name: 'FilerEdge',
    url: siteUrl,
    logo: absoluteUrl('/assets/images/logo-dark.png'),
    image: absoluteUrl('/assets/images/resources/about-1-1.png'),
    description: 'Tax filing, NTN registration, sales tax and business compliance consultancy in Karachi, Pakistan.',
    email: 'info.fileredge@gmail.com',
    telephone: '+92-336-2137034',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office 103, Sea Breeze Plaza, Shahrah-e-Faisal',
      addressLocality: 'Karachi',
      addressCountry: 'PK',
    },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    sameAs: [
      'https://www.facebook.com/fileredge/',
      'https://www.linkedin.com/in/filer-edge-110a38292/',
      'https://www.instagram.com/fileredge/',
    ],
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      ...(page.path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.heading, item: canonical }]),
    ],
  }

  const records = [business, breadcrumbs]
  if (page.type === 'article') {
    records.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: page.heading,
      description: page.description,
      mainEntityOfPage: canonical,
      image: absoluteUrl('/assets/images/blog/blog-details-1.jpg'),
      author: { '@id': `${siteUrl}/#organization` },
      publisher: { '@id': `${siteUrl}/#organization` },
    })
  }
  return records
}

function addMeta($, page) {
  const canonical = absoluteUrl(page.path)
  $('title').text(page.title)
  $('meta[name="description"]').attr('content', page.description)
  $('meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]').remove()

  $('head').append(`
    <meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:locale" content="en_PK">
    <meta property="og:type" content="${page.type || 'website'}">
    <meta property="og:site_name" content="FilerEdge">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${absoluteUrl('/assets/images/resources/about-1-1.png')}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${page.title}">
    <meta name="twitter:description" content="${page.description}">
    <meta name="twitter:image" content="${absoluteUrl('/assets/images/resources/about-1-1.png')}">
  `)

  for (const record of structuredData(page)) {
    $('head').append(`<script type="application/ld+json">${JSON.stringify(record).replaceAll('<', '\\u003c')}</script>`)
  }
}

function versionAssetReferences($) {
  $('[src^="/assets/"], link[href^="/assets/"]').each((_, element) => {
    const attribute = $(element).attr('src') ? 'src' : 'href'
    const value = $(element).attr(attribute)
    if (value && !value.includes('?')) $(element).attr(attribute, `${value}?v=${assetVersion}`)
  })

  $('[style*="/assets/"]').each((_, element) => {
    const style = $(element).attr('style')
    if (!style) return
    $(element).attr(
      'style',
      style.replace(/url\((['"]?)(\/assets\/[^)'"?]+)(['"]?)\)/g, `url($1$2?v=${assetVersion}$3)`),
    )
  })
}

for (const page of seoPages) {
  const source = await readFile(join(sourceDirectory, page.source), 'utf8')
  const sourceDocument = load(source, { decodeEntities: false })
  const inlineScripts = sourceDocument('script:not([src])')
    .map((_, element) => sourceDocument(element).html())
    .get()
    .filter(Boolean)

  normalizeContent(sourceDocument, page)
  const bodyClass = sourceDocument('body').attr('class') || ''
  const html = sourceDocument('body').html() || ''

  const output = load(template, { decodeEntities: false })
  addMeta(output, page)
  output('#app').html(html)
  output('body').attr('class', bodyClass)
  versionAssetReferences(output)

  const initialData = JSON.stringify({ page, bodyClass, inlineScripts }).replaceAll('<', '\\u003c')
  output('script[type="module"]').first().before(`<script id="initial-page-data" type="application/json">${initialData}</script>`)

  const relativePath = page.path === '/' ? 'index.html' : join(page.path.slice(1), 'index.html')
  const target = join(outputDirectory, relativePath)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, output.html())
}

const indexablePages = seoPages.filter((page) => !page.noindex)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexablePages.map((page) => `  <url><loc>${absoluteUrl(page.path)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`

await writeFile(join(outputDirectory, 'sitemap.xml'), sitemap)
await writeFile(join(outputDirectory, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`Prerendered ${seoPages.length} SEO pages with clean URLs.`)
