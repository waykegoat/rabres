<template>
  <section class="section section--sunken">
    <div class="container">
      <SectionHeading
        eyebrow="Почему нас выбирают"
        title="Что вы получаете кроме рабочих рук"
        subtitle="Мы молодая компания и не будем рисовать себе тысячи объектов. Вместо этого — понятные условия, за которые отвечаем."
      />

      <ul class="grid">
        <li v-for="item in ADVANTAGES" :key="item.title" class="item">
          <span class="item__icon"><AppIcon :name="item.icon" :size="22" /></span>
          <h3 class="item__title">{{ item.title }}</h3>
          <p class="item__text">{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppIcon from '../ui/AppIcon.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import { ADVANTAGES } from '../../data/content'
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.grid {
  display: grid;
  gap: var(--space-4);

  @include m.up(t.$bp-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include m.up(t.$bp-lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.item {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding: var(--space-5);
  @include m.card-surface;
}

.item__icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  border: 1px solid var(--brand-border);
  background: var(--brand-soft);
  color: var(--brand);
}

.item__title {
  font-size: var(--step-1);
}

.item__text {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-muted);
}
</style>
