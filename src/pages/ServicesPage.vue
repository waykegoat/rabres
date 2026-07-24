<template>
  <div class="container">
    <BreadCrumbs :items="crumbs" />
  </div>

  <div class="container page-head">
    <h1 class="page-head__title">Услуги разнорабочих и специалистов</h1>
    <p class="page-head__text">
      Закрываем весь спектр работ, где нужны руки: от выноса мусора до электромонтажа. Берём разовые
      задачи и подряды на несколько месяцев по Москве и области.
    </p>
  </div>

  <ServicesSection />
  <PricingSection />
  <FaqSection />
  <ContactCtaSection source="Страница услуг" />
</template>

<script setup lang="ts">
import BreadCrumbs from '../components/ui/BreadCrumbs.vue'
import ServicesSection from '../components/sections/ServicesSection.vue'
import PricingSection from '../components/sections/PricingSection.vue'
import FaqSection from '../components/sections/FaqSection.vue'
import ContactCtaSection from '../components/sections/ContactCtaSection.vue'
import { FAQ } from '../data/content'
import { breadcrumbSchema, faqSchema, usePageSeo } from '../lib/seo'

const crumbs = [
  { name: 'Главная', path: '/' },
  { name: 'Услуги', path: '/uslugi' },
]

usePageSeo({
  title: 'Услуги разнорабочих в Москве и области — цены от 3 500 ₽ за смену',
  description:
    'Полный список услуг: демонтаж, земляные работы, погрузка и разгрузка, уборка мусора и снега, сварка, электрика, сантехника, малярные работы. Выезд по Москве и Московской области круглосуточно.',
  path: '/uslugi',
  jsonLd: [breadcrumbSchema(crumbs), faqSchema(FAQ)],
})
</script>

<style scoped lang="scss">
.page-head {
  padding-bottom: var(--space-6);
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
