<template>
  <div class="container">
    <BreadCrumbs :items="crumbs" />
  </div>

  <div class="container page-head">
    <h1 class="page-head__title">Где мы работаем</h1>
    <p class="page-head__text">
      Москва и вся Московская область. Ниже — города, куда выезжаем чаще всего, с ориентировочным
      временем подачи бригады. Если вашего города нет — всё равно приедем, позвоните и уточните.
    </p>
  </div>

  <section class="section">
    <div class="container">
      <ul class="cities">
        <li v-for="city in CITIES_BY_PRIORITY" :key="city.slug">
          <RouterLink :to="`/raznorabochie/${city.slug}`" class="city">
            <div class="city__head">
              <AppIcon name="pin" :size="18" class="city__icon" />
              <h2 class="city__name">{{ city.name }}</h2>
              <span class="city__eta">{{ city.eta }}</span>
            </div>
            <p class="city__areas">{{ city.areas.slice(0, 4).join(' · ') }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <ContactCtaSection source="Страница географии" />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppIcon from '../components/ui/AppIcon.vue'
import BreadCrumbs from '../components/ui/BreadCrumbs.vue'
import ContactCtaSection from '../components/sections/ContactCtaSection.vue'
import { CITIES_BY_PRIORITY } from '../data/cities'
import { breadcrumbSchema, usePageSeo } from '../lib/seo'

const crumbs = [
  { name: 'Главная', path: '/' },
  { name: 'География', path: '/geografiya' },
]

usePageSeo({
  title: 'Разнорабочие в Москве и городах Московской области — где мы работаем',
  description:
    'Выезжаем по Москве и всей Московской области: Балашиха, Химки, Подольск, Мытищи, Красногорск, Люберцы, Одинцово и другие города. Подача бригады от одного часа, круглосуточно.',
  path: '/geografiya',
  jsonLd: [breadcrumbSchema(crumbs)],
})
</script>

<style scoped lang="scss">
@use '../styles/tokens' as t;
@use '../styles/mixins' as m;

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

.cities {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.city {
  display: grid;
  gap: var(--space-2);
  height: 100%;
  padding: var(--space-5);
  @include m.card-surface;
  transition:
    border-color var(--duration) var(--ease),
    background var(--duration) var(--ease);

  &:hover {
    border-color: var(--brand-border);
    background: var(--surface-hover);
  }
}

.city__head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.city__icon {
  color: var(--brand);
}

.city__name {
  font-size: var(--step-1);
}

.city__eta {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--text-dim);
}

.city__areas {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--text-muted);
}
</style>
