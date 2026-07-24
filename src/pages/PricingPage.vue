<template>
  <div class="container">
    <BreadCrumbs :items="crumbs" />
  </div>

  <div class="container page-head">
    <h1 class="page-head__title">Цены на услуги разнорабочих</h1>
    <p class="page-head__text">
      Все ставки указаны за одного человека за смену. Смена — 8 часов, минимальный заказ — одна смена.
      Итоговую стоимость называем до выезда бригады и по факту работ не пересматриваем.
    </p>
  </div>

  <PricingSection />
  <CalculatorSection />

  <section class="section">
    <div class="container container--narrow">
      <SectionHeading eyebrow="Условия" title="Что влияет на стоимость" />
      <dl class="factors">
        <div v-for="factor in FACTORS" :key="factor.title" class="factor">
          <dt class="factor__title">{{ factor.title }}</dt>
          <dd class="factor__text">{{ factor.text }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <FaqSection />
  <ContactCtaSection source="Страница цен" />
</template>

<script setup lang="ts">
import BreadCrumbs from '../components/ui/BreadCrumbs.vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import PricingSection from '../components/sections/PricingSection.vue'
import CalculatorSection from '../components/sections/CalculatorSection.vue'
import FaqSection from '../components/sections/FaqSection.vue'
import ContactCtaSection from '../components/sections/ContactCtaSection.vue'
import { FAQ } from '../data/content'
import { breadcrumbSchema, faqSchema, usePageSeo } from '../lib/seo'

const FACTORS = [
  {
    title: 'Квалификация',
    text: 'Разнорабочий и профильный специалист стоят по-разному. Если задача не требует допусков, не имеет смысла переплачивать за сварщика.',
  },
  {
    title: 'Объём и длительность',
    text: 'От 5 смен ставка снижается на 5%, от 10 смен — на 10%, от 20 смен — на 15%. Скидка применяется автоматически.',
  },
  {
    title: 'Срочность',
    text: 'Плановый выезд — базовая ставка. Выход на завтра — плюс 10%, выезд сегодня — плюс 25%. Надбавку озвучиваем сразу.',
  },
  {
    title: 'Условия на объекте',
    text: 'Работа на высоте, в стеснённых условиях, без лифта или при отрицательных температурах считается отдельно.',
  },
  {
    title: 'Удалённость',
    text: 'По Москве и ближнему Подмосковью выезд входит в стоимость. По дальним направлениям добавляется транспортная составляющая.',
  },
  {
    title: 'Форма оплаты',
    text: 'Для физлиц — наличные или перевод по факту. Для юрлиц — безнал по договору, с закрывающими документами и возможной отсрочкой.',
  },
]

const crumbs = [
  { name: 'Главная', path: '/' },
  { name: 'Цены', path: '/ceny' },
]

usePageSeo({
  title: 'Цены на разнорабочих в Москве и МО — от 3 500 ₽ за смену',
  description:
    'Прозрачные цены на услуги разнорабочих и специалистов: смена 8 часов от 3 500 ₽, минимальный заказ — одна смена. Скидки за объём, надбавки за срочность. Калькулятор стоимости на сайте.',
  path: '/ceny',
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
  max-width: 62ch;
  font-size: var(--step-1);
  color: var(--text-muted);
}

.factors {
  display: grid;
  gap: var(--space-4);
}

.factor {
  padding: var(--space-4) var(--space-5);
  background: var(--surface);
  border-left: 2px solid var(--brand);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.factor__title {
  font-family: var(--font-display);
  font-size: var(--step-1);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.factor__text {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-muted);
}
</style>
