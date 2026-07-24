import { useHead } from '@unhead/vue'
import { COMPANY, DEFAULT_OG_IMAGE, PHONES, SITE_URL, TELEGRAM_URL } from '../data/site'

export interface PageSeo {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown>[]
}

export function usePageSeo(seo: PageSeo) {
  const canonical = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`
  const image = `${SITE_URL}${seo.image ?? DEFAULT_OG_IMAGE}`

  useHead({
    title: seo.title,
    meta: [
      { name: 'description', content: seo.description },
      ...(seo.noindex ? [{ name: 'robots', content: 'noindex, follow' }] : []),
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: COMPANY.name },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seo.title },
      { name: 'twitter:description', content: seo.description },
      { name: 'twitter:image', content: image },
    ],
    link: [{ rel: 'canonical', href: canonical }],
    script: (seo.jsonLd ?? []).map((data) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(data),
    })),
  })
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.name,
    description: COMPANY.tagline,
    url: SITE_URL,
    telephone: PHONES.map((phone) => phone.tel),
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    priceRange: 'от 3500 ₽',
    openingHours: COMPANY.scheduleSchemaOrg,
    sameAs: [TELEGRAM_URL],
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Московская область',
      addressCountry: 'RU',
    },
    areaServed: [
      { '@type': 'City', name: 'Москва' },
      { '@type': 'AdministrativeArea', name: 'Московская область' },
    ],
  }
}

export function serviceSchema(input: { name: string; description: string; path: string; price: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    serviceType: input.name,
    url: `${SITE_URL}${input.path}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Москва' },
      { '@type': 'AdministrativeArea', name: 'Московская область' },
    ],
    offers: {
      '@type': 'Offer',
      price: input.price,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
