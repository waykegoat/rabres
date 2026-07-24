<template>
  <div class="container">
    <BreadCrumbs :items="crumbs" />
  </div>

  <div class="container page-head">
    <h1 class="page-head__title">Контакты</h1>
    <p class="page-head__text">
      Диспетчер на связи круглосуточно. Звоните в любое время — ночью, в выходные и в праздники
      телефон работает так же, как днём в будни.
    </p>
  </div>

  <ContactCtaSection title="Свяжитесь с нами" source="Страница контактов" />
</template>

<script setup lang="ts">
import BreadCrumbs from '../components/ui/BreadCrumbs.vue'
import ContactCtaSection from '../components/sections/ContactCtaSection.vue'
import { breadcrumbSchema, localBusinessSchema, usePageSeo } from '../lib/seo'

const crumbs = [
  { name: 'Главная', path: '/' },
  { name: 'Контакты', path: '/kontakty' },
]

usePageSeo({
  title: 'Контакты — Рабочий ресурс, разнорабочие в Москве и области 24/7',
  description:
    'Телефоны и Telegram службы «Рабочий ресурс». Принимаем заявки круглосуточно, без выходных. Выезд бригады по Москве и Московской области от одного часа.',
  path: '/kontakty',
  jsonLd: [localBusinessSchema(), breadcrumbSchema(crumbs)],
})
</script>

<style scoped lang="scss">
.page-head {
  padding-bottom: var(--space-4);
}

.page-head__title {
  font-size: var(--step-5);
  margin-bottom: var(--space-4);
}

.page-head__text {
  max-width: 60ch;
  font-size: var(--step-1);
  color: var(--text-muted);
}
</style>
