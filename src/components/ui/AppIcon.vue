<template>
  <svg
    class="icon"
    :class="{ 'icon--filled': icon.filled }"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="icon.filled ? 'currentColor' : 'none'"
    :stroke="icon.filled ? 'none' : 'currentColor'"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, index) in icon.paths" :key="index" :d="d" />
    <circle v-for="(circle, index) in icon.circles" :key="`c${index}`" :cx="circle.cx" :cy="circle.cy" :r="circle.r" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ICONS, type IconDefinition, type IconName } from './icons'

const props = withDefaults(defineProps<{ name: IconName; size?: number | string }>(), {
  size: 24,
})

const icon = computed<IconDefinition>(() => ICONS[props.name])
</script>

<style scoped>
.icon {
  display: block;
  flex-shrink: 0;
}
</style>
