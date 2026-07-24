<template>
  <section id="uslugi" class="section">
    <div class="container">
      <SectionHeading
        eyebrow="Что делаем"
        title="Услуги"
        subtitle="Берём и разовые задачи на пару часов, и объекты на несколько месяцев. Если работы нет в списке — позвоните, скорее всего мы её делаем."
      />

      <ul class="grid">
        <li v-for="service in services" :key="service.slug">
          <RouterLink :to="`/uslugi/${service.slug}`" class="card">
            <span class="card__icon"><AppIcon :name="service.icon" :size="26" /></span>
            <h3 class="card__title">{{ service.title }}</h3>
            <p class="card__teaser">{{ service.teaser }}</p>
            <span class="card__foot">
              <span class="card__price">от {{ service.priceFrom.toLocaleString('ru-RU') }} ₽</span>
              <AppIcon name="arrowRight" :size="18" class="card__arrow" />
            </span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppIcon from '../ui/AppIcon.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import { SERVICES, type Service } from '../../data/services'

withDefaults(defineProps<{ services?: Service[] }>(), {
  services: () => SERVICES,
})
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.card {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  height: 100%;
  padding: var(--space-5);
  @include m.card-surface;
  transition:
    border-color var(--duration) var(--ease),
    background var(--duration) var(--ease),
    transform var(--duration) var(--ease);

  &:hover {
    border-color: var(--brand-border);
    background: var(--surface-hover);
    transform: translateY(-3px);
  }
}

.card__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--brand-soft);
  color: var(--brand);
}

.card__title {
  font-size: var(--step-1);
}

.card__teaser {
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--text-muted);
}

.card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--space-3);
  border-top: 1px solid var(--line);
}

.card__price {
  @include m.display-font;
  font-size: 1rem;
  color: var(--text);
}

.card__arrow {
  color: var(--text-dim);
  transition:
    transform var(--duration) var(--ease),
    color var(--duration) var(--ease);
}

.card:hover .card__arrow {
  transform: translateX(4px);
  color: var(--brand);
}
</style>
