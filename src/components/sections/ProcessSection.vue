<template>
  <section class="section">
    <div class="container">
      <SectionHeading
        eyebrow="Как работаем"
        title="От звонка до оплаты"
        subtitle="Пять шагов без сюрпризов. Стоимость фиксируется на втором шаге и дальше не растёт."
      />

      <ol class="steps">
        <li v-for="(step, index) in PROCESS_STEPS" :key="step.title" class="step">
          <span class="step__num">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="step__title">{{ step.title }}</h3>
          <p class="step__text">{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import { PROCESS_STEPS } from '../../data/content'
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.steps {
  display: grid;
  gap: var(--space-4);
  counter-reset: step;

  @include m.up(t.$bp-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include m.up(t.$bp-lg) {
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-3);
  }
}

.step {
  position: relative;
  display: grid;
  align-content: start;
  gap: var(--space-2);
  padding: var(--space-5) var(--space-4);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0 0;
    height: 2px;
    background: linear-gradient(90deg, var(--brand), transparent);
    opacity: 0.5;
  }
}

.step__num {
  @include m.display-font;
  font-size: var(--step-3);
  color: var(--brand);
  opacity: 0.85;
}

.step__title {
  font-size: var(--step-1);
}

.step__text {
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--text-muted);
}
</style>
