<template>
  <section class="section">
    <div class="container">
      <SectionHeading
        eyebrow="География"
        title="Где мы работаем"
        subtitle="Москва и вся Московская область. В ближнее Подмосковье бригада доезжает в течение часа, в дальнее — за два-три."
      />

      <ul class="cities">
        <li v-for="city in CITIES_BY_PRIORITY" :key="city.slug">
          <RouterLink :to="`/raznorabochie/${city.slug}`" class="city">
            <AppIcon name="pin" :size="18" class="city__icon" />
            <span class="city__name">{{ city.name }}</span>
            <span class="city__eta">{{ city.eta }}</span>
          </RouterLink>
        </li>
      </ul>

      <p class="hint">
        Вашего города нет в списке? Мы всё равно приедем — позвоните, уточним время подачи и стоимость выезда.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppIcon from '../ui/AppIcon.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import { CITIES_BY_PRIORITY } from '../../data/cities'
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.cities {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.city {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  transition:
    border-color var(--duration) var(--ease),
    background var(--duration) var(--ease);

  &:hover {
    border-color: var(--brand-border);
    background: var(--surface-hover);
  }
}

.city__icon {
  color: var(--brand);
}

.city__name {
  font-weight: 500;
}

.city__eta {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--text-dim);
}

.hint {
  margin-top: var(--space-5);
  font-size: 0.9375rem;
  color: var(--text-muted);
}
</style>
