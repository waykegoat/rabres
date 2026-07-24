<template>
  <div class="container">
    <BreadCrumbs :items="crumbs" />
  </div>

  <div class="container page-head">
    <h1 class="page-head__title">О компании</h1>
    <p class="page-head__text">
      «Рабочий ресурс» — служба подбора разнорабочих и профильных специалистов по Москве и Московской
      области. Мы работаем с {{ COMPANY.foundedYear }} года и не станем рисовать себе тысячи объектов и
      сотни отзывов. Вместо этого — условия, за которые действительно отвечаем.
    </p>
  </div>

  <section class="section">
    <div class="container container--narrow">
      <SectionHeading eyebrow="Принципы" title="На чём строим работу" />
      <div class="principles">
        <article v-for="principle in PRINCIPLES" :key="principle.title" class="principle">
          <h2 class="principle__title">{{ principle.title }}</h2>
          <p class="principle__text">{{ principle.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--sunken">
    <div class="container container--narrow">
      <SectionHeading eyebrow="Честно" title="Чего мы не делаем" />
      <ul class="limits">
        <li v-for="limit in LIMITS" :key="limit" class="limit">{{ limit }}</li>
      </ul>
      <p class="limits__note">
        Если задача выходит за рамки того, что мы умеем, — скажем об этом сразу. Взять деньги и сорвать
        сроки дороже, чем один раз отказаться.
      </p>
    </div>
  </section>

  <AdvantagesSection />
  <ContactCtaSection source="Страница о компании" />
</template>

<script setup lang="ts">
import BreadCrumbs from '../components/ui/BreadCrumbs.vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import AdvantagesSection from '../components/sections/AdvantagesSection.vue'
import ContactCtaSection from '../components/sections/ContactCtaSection.vue'
import { COMPANY } from '../data/site'
import { breadcrumbSchema, localBusinessSchema, usePageSeo } from '../lib/seo'

const PRINCIPLES = [
  {
    title: 'Цена, названная один раз',
    text: 'Стоимость считаем до выезда и фиксируем. Классическая схема «приехали, посмотрели, стало дороже» — не про нас. Если объём в процессе вырос, согласуем изменение до того, как продолжим работу.',
  },
  {
    title: 'Ответственность за выход людей',
    text: 'Самая частая боль заказчика — работник не приехал и день сорван. Мы держим резерв: если человек не вышел, замена приезжает в тот же день и без доплаты с вашей стороны.',
  },
  {
    title: 'Люди, а не анонимные руки',
    text: 'На объект приезжают одни и те же проверенные работники, а на долгих подрядах закрепляется бригадир. Инструктаж по вашему объекту проходят один раз, а не каждую смену заново.',
  },
  {
    title: 'Документы для тех, кому они нужны',
    text: 'С юрлицами работаем по договору: счета, акты, табель учёта рабочего времени. Для подрядных организаций это условие допуска на объект, и мы его закрываем.',
  },
]

const LIMITS = [
  'Не беремся за работы, требующие лицензий и допусков, которых у нас нет',
  'Не сносим несущие конструкции без проекта и согласования',
  'Не обещаем сроки, в которые заведомо не уложимся',
  'Не занижаем смету на входе, чтобы поднять цену на объекте',
]

const crumbs = [
  { name: 'Главная', path: '/' },
  { name: 'О компании', path: '/o-kompanii' },
]

usePageSeo({
  title: 'О компании «Рабочий ресурс» — разнорабочие в Москве и области',
  description:
    'Служба подбора разнорабочих и специалистов по Москве и Московской области. Фиксированная цена, замена работника в тот же день, договор и безналичный расчёт для юридических лиц.',
  path: '/o-kompanii',
  jsonLd: [localBusinessSchema(), breadcrumbSchema(crumbs)],
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
  max-width: 65ch;
  font-size: var(--step-1);
  color: var(--text-muted);
}

.principles {
  display: grid;
  gap: var(--space-4);
}

.principle {
  padding: var(--space-5);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
}

.principle__title {
  font-size: var(--step-2);
  margin-bottom: var(--space-3);
}

.principle__text {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.limits {
  display: grid;
  gap: var(--space-3);
}

.limit {
  position: relative;
  padding-left: var(--space-5);
  font-size: 0.9375rem;
  color: var(--text-muted);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 10px;
    height: 2px;
    background: var(--brand);
  }
}

.limits__note {
  margin-top: var(--space-5);
  padding: var(--space-4);
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-muted);
}
</style>
