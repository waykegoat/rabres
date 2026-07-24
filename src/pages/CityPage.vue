<template>
  <template v-if="city">
    <div class="container">
      <BreadCrumbs :items="crumbs" />
    </div>

    <section class="intro">
      <div class="container intro__inner">
        <div>
          <p class="intro__eyebrow"><AppIcon name="pin" :size="16" /> {{ city.name }}</p>
          <h1 class="intro__title">Разнорабочие в {{ city.nameIn }}</h1>
          <p class="intro__text">{{ city.note }}</p>

          <div class="intro__facts">
            <div class="intro__fact">
              <span class="intro__fact-value">{{ city.eta }}</span>
              <span class="intro__fact-label">подача бригады</span>
            </div>
            <div class="intro__fact">
              <span class="intro__fact-value">от 3 500 ₽</span>
              <span class="intro__fact-label">смена 8 часов</span>
            </div>
            <div class="intro__fact">
              <span class="intro__fact-value">24/7</span>
              <span class="intro__fact-label">без выходных</span>
            </div>
          </div>
        </div>

        <div class="intro__form">
          <p class="intro__form-title">Вызвать бригаду в {{ city.nameIn }}</p>
          <p class="intro__form-note">Перезвоним за 15 минут</p>
          <LeadForm :source="`Город: ${city.name}`" submit-label="Вызвать бригаду" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeading eyebrow="Услуги" :title="`Что заказывают в ${city.nameIn}`" />
        <ul class="services">
          <li v-for="service in SERVICES" :key="service.slug">
            <RouterLink :to="`/uslugi/${service.slug}`" class="service">
              <AppIcon :name="service.icon" :size="20" class="service__icon" />
              <span class="service__title">{{ service.title }}</span>
              <span class="service__price">от {{ service.priceFrom.toLocaleString('ru-RU') }} ₽</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="section section--sunken">
      <div class="container">
        <SectionHeading eyebrow="Куда выезжаем" :title="`Районы и населённые пункты`" />
        <ul class="areas">
          <li v-for="area in city.areas" :key="area" class="area">
            <AppIcon name="check" :size="16" />
            {{ area }}
          </li>
        </ul>
        <p class="areas__note">
          Список не исчерпывающий — выезжаем по всему округу и соседним направлениям. Уточните адрес
          по телефону, назовём время подачи.
        </p>
      </div>
    </section>

    <ProcessSection />

    <section class="section section--sunken">
      <div class="container">
        <SectionHeading eyebrow="Другие города" title="Работаем также здесь" />
        <ul class="cities">
          <li v-for="item in nearbyCities" :key="item.slug">
            <RouterLink :to="`/raznorabochie/${item.slug}`" class="city-link">
              <AppIcon name="pin" :size="16" />
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <ContactCtaSection
      :title="`Нужны рабочие в ${city.nameIn}?`"
      :source="`Город ${city.name} — блок контактов`"
    />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from '../components/ui/AppIcon.vue'
import BreadCrumbs from '../components/ui/BreadCrumbs.vue'
import LeadForm from '../components/ui/LeadForm.vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import ProcessSection from '../components/sections/ProcessSection.vue'
import ContactCtaSection from '../components/sections/ContactCtaSection.vue'
import { CITIES_BY_PRIORITY, getCity } from '../data/cities'
import { SERVICES } from '../data/services'
import { breadcrumbSchema, serviceSchema, usePageSeo } from '../lib/seo'

const props = defineProps<{ slug: string }>()

const city = computed(() => getCity(props.slug))

const nearbyCities = computed(() => CITIES_BY_PRIORITY.filter((item) => item.slug !== props.slug).slice(0, 8))

const crumbs = computed(() => [
  { name: 'Главная', path: '/' },
  { name: 'География', path: '/geografiya' },
  { name: city.value?.name ?? '', path: `/raznorabochie/${props.slug}` },
])

if (city.value) {
  const name = city.value.name
  const nameIn = city.value.nameIn

  usePageSeo({
    title: `Разнорабочие в ${nameIn} — от 3 500 ₽ за смену, выезд ${city.value.eta}`,
    description: `Услуги разнорабочих и специалистов в ${nameIn}. Демонтаж, погрузка, земляные работы, уборка мусора. Бригада от одного человека, работаем круглосуточно. Цена фиксируется до выезда.`,
    path: `/raznorabochie/${props.slug}`,
    jsonLd: [
      serviceSchema({
        name: `Разнорабочие в ${nameIn}`,
        description: `Бригады разнорабочих и профильных специалистов в ${nameIn} и окрестностях`,
        path: `/raznorabochie/${props.slug}`,
        price: 3500,
      }),
      breadcrumbSchema(crumbs.value),
      {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name,
        address: { '@type': 'PostalAddress', addressLocality: name, addressCountry: 'RU' },
      },
    ],
  })
}
</script>

<style scoped lang="scss">
@use '../styles/tokens' as t;
@use '../styles/mixins' as m;

.intro {
  padding-bottom: var(--space-8);
  background: radial-gradient(60% 90% at 10% 0%, rgba(255, 106, 19, 0.12), transparent 70%);
}

.intro__inner {
  display: grid;
  gap: var(--space-7);
  align-items: start;

  @include m.up(t.$bp-lg) {
    grid-template-columns: 1.2fr 0.8fr;
  }
}

.intro__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--brand);
}

.intro__title {
  font-size: var(--step-5);
  margin-bottom: var(--space-4);
}

.intro__text {
  max-width: 62ch;
  font-size: var(--step-1);
  color: var(--text-muted);
}

.intro__facts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  margin-top: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--line);
}

.intro__fact {
  display: grid;
  gap: 2px;
}

.intro__fact-value {
  @include m.display-font;
  font-size: var(--step-2);
  color: var(--brand);
}

.intro__fact-label {
  font-size: 0.8125rem;
  color: var(--text-dim);
}

.intro__form {
  padding: var(--space-6);
  background: var(--bg-raised);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.intro__form-title {
  @include m.display-font;
  font-size: var(--step-2);
}

.intro__form-note {
  margin-block: var(--space-2) var(--space-5);
  font-size: 0.875rem;
  color: var(--text-muted);
}

.services {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.service {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  transition: border-color var(--duration) var(--ease);

  &:hover {
    border-color: var(--brand-border);
  }
}

.service__icon {
  color: var(--brand);
}

.service__title {
  font-size: 0.9375rem;
}

.service__price {
  margin-left: auto;
  font-size: 0.8125rem;
  color: var(--text-dim);
  white-space: nowrap;
}

.areas {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}

.area {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.9375rem;
  color: var(--text-muted);

  :deep(svg) {
    color: var(--brand);
  }
}

.areas__note {
  margin-top: var(--space-5);
  font-size: 0.9375rem;
  color: var(--text-muted);
}

.cities {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.city-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  font-size: 0.875rem;
  transition:
    border-color var(--duration) var(--ease),
    color var(--duration) var(--ease);

  &:hover {
    border-color: var(--brand-border);
    color: var(--brand);
  }

  :deep(svg) {
    color: var(--brand);
  }
}
</style>
