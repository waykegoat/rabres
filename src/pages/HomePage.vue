<template>
  <HeroSection />
  <AudienceSection />
  <ServicesSection />
  <WorkGallerySection />
  <ProcessSection />
  <PricingSection />
  <CalculatorSection />
  <AdvantagesSection />
  <GeographySection />
  <FaqSection />
  <ContactCtaSection source="Главная — блок контактов" />
</template>

<script setup lang="ts">
import HeroSection from '../components/sections/HeroSection.vue'
import AudienceSection from '../components/sections/AudienceSection.vue'
import ServicesSection from '../components/sections/ServicesSection.vue'
import WorkGallerySection from '../components/sections/WorkGallerySection.vue'
import ProcessSection from '../components/sections/ProcessSection.vue'
import PricingSection from '../components/sections/PricingSection.vue'
import CalculatorSection from '../components/sections/CalculatorSection.vue'
import AdvantagesSection from '../components/sections/AdvantagesSection.vue'
import GeographySection from '../components/sections/GeographySection.vue'
import FaqSection from '../components/sections/FaqSection.vue'
import ContactCtaSection from '../components/sections/ContactCtaSection.vue'
import { FAQ } from '../data/content'
import { faqSchema, localBusinessSchema, usePageSeo } from '../lib/seo'

usePageSeo({
  title: 'Разнорабочие и специалисты в Москве и области — от 3 500 ₽ за смену, 24/7',
  description:
    'Бригады разнорабочих и профильных специалистов в Москве и Московской области. Демонтаж, погрузка, земляные работы, сварка, электрика, сантехника. Выезд от 1 часа, работаем круглосуточно.',
  path: '/',
  jsonLd: [localBusinessSchema(), faqSchema(FAQ)],
})
</script>
