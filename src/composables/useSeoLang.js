import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

// Composable function to handle SEO-related tags based on the current locale and route
export function useSeoLang(locales, baseUrl) {
  const route = useRoute()
  const { locale, t } = useI18n()

  // Normalize path (remove locale prefix, ensure trailing slash)
  const path = computed(() => {
    const p = route.path.replace(new RegExp(`^\/(${locales.join('|')})`), '')
    return p.endsWith('/') ? p : p + '/'
  })

  // Canonical URL for the current page including locale
  const canonicalUrl = computed(() => `${baseUrl}/${locale.value}${path.value}`)

  // Alternate links for all locales, including x-default
  const alternateLinks = computed(() => {
    const links = locales.map(code => ({
      rel: 'alternate',
      hreflang: code,
      href: `${baseUrl}/${code}${path.value}`
    }))
    links.push({ 
      rel: 'alternate', 
      hreflang: 'x-default', 
      href: `${baseUrl}/fr${path.value}`
    })
    return links
  })

  // Page title
  const title = computed(() => {
    const routeName = (route.name?.toLowerCase() || 'home')
    const pageTitle = t(`${routeName}.meta.title`, '', { fallbackLocale: locale.value })
    return pageTitle ? `${pageTitle} | FlorianSalvi` : 'FlorianSalvi'
  })

  // Page description
  const description = computed(() => {
    const routeName = (route.name?.toLowerCase() || 'home')
    return t(`${routeName}.meta.description`, '', { fallbackLocale: locale.value }) || ''
  })

  // Set dynamically HTML attributes, meta tags and links
  useHead({
    htmlAttrs: computed(() => ({
      lang: locale.value
    })),
    title: title,
    meta: computed(() => [
      {
        name: 'description',
        content: description.value
      }
    ]),
    link: computed(() => [
      {
        rel: 'canonical',
        href: canonicalUrl.value
      },
      ...alternateLinks.value
    ])
  })

  return {
    title,
    description,
    canonicalUrl,
    alternateLinks,
    path
  }
}