<template>
  <section id="faq" class="section section--sunken">
    <div class="container container--narrow">
      <SectionHeading eyebrow="Вопросы" title="Отвечаем заранее" center />

      <div class="faq">
        <details v-for="(item, index) in items" :key="item.question" class="faq__item" :open="index === 0">
          <summary class="faq__question">
            {{ item.question }}
            <AppIcon name="chevronDown" :size="20" class="faq__chevron" />
          </summary>
          <p class="faq__answer">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppIcon from '../ui/AppIcon.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import { FAQ, type FaqItem } from '../../data/content'

withDefaults(defineProps<{ items?: FaqItem[] }>(), {
  items: () => FAQ,
})
</script>

<style scoped lang="scss">
.faq {
  display: grid;
  gap: var(--space-2);
}

.faq__item {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;

  &[open] {
    border-color: var(--brand-border);
  }
}

.faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  font-family: var(--font-display);
  font-size: var(--step-1);
  text-transform: uppercase;
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    color: var(--brand);
  }
}

.faq__chevron {
  flex-shrink: 0;
  color: var(--text-dim);
  transition: transform var(--duration) var(--ease);
}

.faq__item[open] .faq__chevron {
  transform: rotate(180deg);
  color: var(--brand);
}

.faq__answer {
  padding: 0 var(--space-5) var(--space-5);
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-muted);
}
</style>
