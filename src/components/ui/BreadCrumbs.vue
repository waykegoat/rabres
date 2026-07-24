<template>
  <nav class="crumbs" aria-label="Хлебные крошки">
    <ol class="crumbs__list">
      <li v-for="(item, index) in items" :key="item.path" class="crumbs__item">
        <RouterLink v-if="index < items.length - 1" :to="item.path" class="crumbs__link">
          {{ item.name }}
        </RouterLink>
        <span v-else aria-current="page" class="crumbs__current">{{ item.name }}</span>
        <AppIcon v-if="index < items.length - 1" name="chevronRight" :size="14" class="crumbs__sep" />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppIcon from './AppIcon.vue'

defineProps<{ items: Array<{ name: string; path: string }> }>()
</script>

<style scoped lang="scss">
.crumbs {
  padding-block: var(--space-4);
}

.crumbs__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.8125rem;
}

.crumbs__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.crumbs__link {
  color: var(--text-dim);

  &:hover {
    color: var(--brand);
  }
}

.crumbs__current {
  color: var(--text-muted);
}

.crumbs__sep {
  color: var(--text-dim);
  opacity: 0.5;
}
</style>
