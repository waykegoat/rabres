<template>
  <template v-if="service">
    <div class="container">
      <BreadCrumbs :items="crumbs" />
    </div>

    <section class="intro">
      <div class="container intro__inner">
        <div>
          <span class="intro__icon"><AppIcon :name="service.icon" :size="28" /></span>
          <h1 class="intro__title">{{ service.h1 }}</h1>
          <p class="intro__text">{{ service.intro }}</p>

          <div class="intro__facts">
            <div class="intro__fact">
              <span class="intro__fact-value">от {{ service.priceFrom.toLocaleString('ru-RU') }} ₽</span>
              <span class="intro__fact-label">за {{ service.priceUnit }}</span>
            </div>
            <div class="intro__fact">
              <span class="intro__fact-value">от 1 часа</span>
              <span class="intro__fact-label">подача бригады</span>
            </div>
            <div class="intro__fact">
              <span class="intro__fact-value">24/7</span>
              <span class="intro__fact-label">включая праздники</span>
            </div>
          </div>
        </div>

        <div class="intro__form">
          <p class="intro__form-title">Заявка на услугу</p>
          <p class="intro__form-note">Перезвоним за 15 минут и назовём точную цену</p>
          <LeadForm :source="`Услуга: ${service.title}`" submit-label="Получить расчёт" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeading eyebrow="Что входит" :title="`Какие работы выполняем`" />
        <ul class="works">
          <li v-for="work in service.works" :key="work" class="work">
            <AppIcon name="check" :size="18" class="work__check" />
            {{ work }}
          </li>
        </ul>
      </div>
    </section>

    <section class="section section--sunken">
      <div class="container">
        <SectionHeading eyebrow="Как мы это делаем" title="На что обращаем внимание" />
        <div class="points">
          <article v-for="point in service.points" :key="point.title" class="point">
            <h3 class="point__title">{{ point.title }}</h3>
            <p class="point__text">{{ point.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <ProcessSection />

    <section class="section section--sunken">
      <div class="container">
        <SectionHeading eyebrow="Другие услуги" title="Часто заказывают вместе" />
        <ul class="related">
          <li v-for="item in relatedServices" :key="item.slug">
            <RouterLink :to="`/uslugi/${item.slug}`" class="related__link">
              <AppIcon :name="item.icon" :size="20" />
              <span>{{ item.title }}</span>
              <AppIcon name="arrowRight" :size="16" class="related__arrow" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <ContactCtaSection
      :title="`Нужны ${service.title.toLowerCase()}?`"
      :source="`Услуга ${service.title} — блок контактов`"
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
import { SERVICES, getService } from '../data/services'
import { breadcrumbSchema, serviceSchema, usePageSeo } from '../lib/seo'

const props = defineProps<{ slug: string }>()

const service = computed(() => getService(props.slug))

const relatedServices = computed(() => SERVICES.filter((item) => item.slug !== props.slug).slice(0, 6))

const crumbs = computed(() => [
  { name: 'Главная', path: '/' },
  { name: 'Услуги', path: '/uslugi' },
  { name: service.value?.title ?? '', path: `/uslugi/${props.slug}` },
])

if (service.value) {
  usePageSeo({
    title: service.value.seoTitle,
    description: service.value.seoDescription,
    path: `/uslugi/${props.slug}`,
    jsonLd: [
      serviceSchema({
        name: service.value.title,
        description: service.value.seoDescription,
        path: `/uslugi/${props.slug}`,
        price: service.value.priceFrom,
      }),
      breadcrumbSchema(crumbs.value),
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

.intro__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--brand-soft);
  border: 1px solid var(--brand-border);
  color: var(--brand);
}

.intro__title {
  font-size: var(--step-5);
  margin-bottom: var(--space-4);
}

.intro__text {
  max-width: 60ch;
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

.works {
  display: grid;
  gap: var(--space-3);

  @include m.up(t.$bp-md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.work {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
}

.work__check {
  flex-shrink: 0;
  margin-top: 0.15rem;
  color: var(--brand);
}

.points {
  display: grid;
  gap: var(--space-4);

  @include m.up(t.$bp-md) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.point {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding: var(--space-5);
  @include m.card-surface;
}

.point__title {
  font-size: var(--step-1);
}

.point__text {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.related {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.related__link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  transition: border-color var(--duration) var(--ease);

  &:hover {
    border-color: var(--brand-border);
  }

  :deep(svg:first-child) {
    color: var(--brand);
  }
}

.related__arrow {
  margin-left: auto;
  color: var(--text-dim);
}
</style>
