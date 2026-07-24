<template>
  <div class="heading" :class="{ 'heading--center': center }">
    <p v-if="eyebrow" class="heading__eyebrow">{{ eyebrow }}</p>
    <component :is="level" class="heading__title">{{ title }}</component>
    <p v-if="subtitle" class="heading__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    eyebrow?: string
    subtitle?: string
    level?: 'h1' | 'h2' | 'h3'
    center?: boolean
  }>(),
  { level: 'h2' },
)
</script>

<style scoped lang="scss">
@use '../../styles/mixins' as m;

.heading {
  display: grid;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  max-width: 62ch;
}

.heading--center {
  justify-items: center;
  text-align: center;
  margin-inline: auto;
}

.heading__eyebrow {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--brand);

  &::before {
    content: '';
    width: 24px;
    height: 2px;
    background: var(--brand);
  }
}

.heading--center .heading__eyebrow::before {
  display: none;
}

.heading__subtitle {
  font-size: var(--step-1);
  color: var(--text-muted);
}
</style>
