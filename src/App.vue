<script setup>
import { nextTick, onMounted, ref } from 'vue'
import axios from 'axios'
import { pageFromLocation, routeForLegacyFile, siteUrl } from './seo.js'

window.axios = axios

function readInitialPage() {
  const element = document.getElementById('initial-page-data')
  if (!element) return null

  try {
    return JSON.parse(element.textContent)
  } catch {
    return null
  }
}

const initialPage = readInitialPage()
const pageHtml = ref(initialPage ? document.getElementById('app')?.innerHTML || '' : '')
const loading = ref(!initialPage)
const error = ref('')

const vendorScripts = [
  '/assets/vendors/jquery/jquery-3.7.1.min.js',
  '/assets/vendors/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/vendors/bootstrap-select/bootstrap-select.min.js',
  '/assets/vendors/jarallax/jarallax.min.js',
  '/assets/vendors/jquery-ui/jquery-ui.js',
  '/assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js',
  '/assets/vendors/jquery-appear/jquery.appear.min.js',
  '/assets/vendors/jquery-circle-progress/jquery.circle-progress.min.js',
  '/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js',
  '/assets/vendors/jquery-validate/jquery.validate.min.js',
  '/assets/vendors/nouislider/nouislider.min.js',
  '/assets/vendors/tiny-slider/tiny-slider.js',
  '/assets/vendors/wnumb/wNumb.min.js',
  '/assets/vendors/owl-carousel/js/owl.carousel.min.js',
  '/assets/vendors/wow/wow.js',
  '/assets/vendors/imagesloaded/imagesloaded.min.js',
  '/assets/vendors/isotope/isotope.js',
  '/assets/vendors/slick/slick.min.js',
  '/assets/vendors/tilt/tilt.jquery.js',
  '/assets/vendors/countdown/countdown.min.js',
  '/assets/vendors/jquery-circleType/jquery.circleType.js',
  '/assets/vendors/jquery-lettering/jquery.lettering.min.js',
  '/assets/vendors/gsap/gsap.js',
  '/assets/vendors/gsap/scrolltrigger.min.js',
  '/assets/vendors/gsap/splittext.min.js',
  '/assets/vendors/gsap/procounsel-split.js',
  '/assets/js/procounsel.js',
]

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
}

function applyMetadata(page) {
  const canonicalUrl = new URL(page.path, siteUrl).href
  document.title = page.title
  setMeta('meta[name="description"]', { name: 'description', content: page.description })
  setMeta('meta[name="robots"]', {
    name: 'robots',
    content: page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
  })
  setMeta('meta[property="og:title"]', { property: 'og:title', content: page.title })
  setMeta('meta[property="og:description"]', { property: 'og:description', content: page.description })
  setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
  setMeta('meta[property="og:type"]', { property: 'og:type', content: page.type || 'website' })

  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = canonicalUrl
}

function prepareLegacyMarkup(documentNode) {
  documentNode.querySelectorAll('[src]').forEach((element) => {
    const src = element.getAttribute('src')
    if (src && !/^(?:https?:|data:|\/)/i.test(src)) element.setAttribute('src', `/${src.replace(/^\.\//, '')}`)
  })

  documentNode.querySelectorAll('[style]').forEach((element) => {
    const style = element.getAttribute('style')
    element.setAttribute('style', style.replace(/url\((['"]?)(?:\.\/)?assets\//gi, 'url($1/assets/'))
  })

  documentNode.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href')
    if (!href || /^(?:#|\/|https?:|mailto:|tel:|javascript:)/i.test(href)) return

    const match = href.match(/^(?:\.\/)?([^/#?]+\.html)(#[^?]*)?$/i)
    if (match) link.setAttribute('href', `${routeForLegacyFile(match[1])}${match[2] || ''}`)
  })
}

function appendScript({ src, code }) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.dataset.vueLegacy = 'true'
    if (src) {
      script.src = src
      script.onload = resolve
      script.onerror = () => reject(new Error(`Could not load ${src}`))
    } else {
      script.textContent = code
    }
    document.body.appendChild(script)
    if (!src) resolve()
  })
}

async function initializeTemplate(inlineScripts) {
  await nextTick()
  for (const src of vendorScripts) await appendScript({ src })
  window.dispatchEvent(new Event('load'))
  for (const code of inlineScripts) await appendScript({ code })
}

async function loadPage() {
  const page = pageFromLocation(window.location)
  applyMetadata(page)

  try {
    const response = await fetch(`/pages/${page.source}`)
    if (!response.ok) throw new Error(`Page returned ${response.status}`)

    const source = await response.text()
    const parsed = new DOMParser().parseFromString(source, 'text/html')
    const inlineScripts = [...parsed.querySelectorAll('script:not([src])')]
      .map((script) => script.textContent)
      .filter(Boolean)

    parsed.querySelectorAll('script').forEach((script) => script.remove())
    parsed.querySelector('.preloader')?.remove()
    prepareLegacyMarkup(parsed)
    document.body.className = parsed.body.className
    pageHtml.value = parsed.body.innerHTML
    loading.value = false
    await initializeTemplate(inlineScripts)
  } catch (cause) {
    loading.value = false
    error.value = `The page could not be loaded. ${cause.message}`
  }
}

onMounted(async () => {
  // Content is prerendered, so a legacy full-screen loader must never hide it.
  document.querySelector('.preloader')?.remove()

  if (!initialPage) return loadPage()

  applyMetadata(initialPage.page)
  document.body.className = initialPage.bodyClass
  await initializeTemplate(initialPage.inlineScripts)
})
</script>

<template>
  <div v-if="loading" class="vue-page-state" role="status">Loading FilerEdge…</div>
  <div v-else-if="error" class="vue-page-state vue-page-state--error">{{ error }}</div>
  <div v-else v-html="pageHtml"></div>
</template>
