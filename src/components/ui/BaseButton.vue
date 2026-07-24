<template>
  <component
    :is="tag"
    :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--block': block, 'btn--busy': busy }]"
    v-bind="linkAttrs"
    :disabled="tag === 'button' ? disabled || busy : undefined"
    :type="tag === 'button' ? type : undefined"
  >
    <AppIcon v-if="iconLeft" :name="iconLeft" :size="iconSize" />
    <span class="btn__label"><slot /></span>
    <AppIcon v-if="iconRight" :name="iconRight" :size="iconSize" class="btn__trailing" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from './AppIcon.vue'
import type { IconName } from './icons'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'contrast'
    size?: 'sm' | 'md' | 'lg'
    to?: string
    href?: string
    external?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
    busy?: boolean
    block?: boolean
    iconLeft?: IconName
    iconRight?: IconName
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
  },
)

const tag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const iconSize = computed(() => (props.size === 'lg' ? 20 : 18))

const linkAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    return props.external
      ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
      : { href: props.href }
  }
  return {}
})
</script>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: var(--radius-md);
  font-family: var(--font-display);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  white-space: nowrap;
  border: 1px solid transparent;
  transition:
    background var(--duration) var(--ease),
    border-color var(--duration) var(--ease),
    color var(--duration) var(--ease),
    transform var(--duration) var(--ease);

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    transform: translateY(1px);
  }
}

.btn--sm {
  padding: 0.5rem 0.875rem;
  font-size: 0.8125rem;
}

.btn--md {
  padding: 0.75rem 1.25rem;
  font-size: 0.9375rem;
}

.btn--lg {
  padding: 1rem 1.75rem;
  font-size: 1.0625rem;
}

.btn--block {
  display: flex;
  width: 100%;
}

.btn--primary {
  background: var(--brand);
  color: var(--text-on-brand);

  &:not(:disabled):hover {
    background: var(--brand-strong);
  }
}

.btn--secondary {
  background: var(--brand-soft);
  border-color: var(--brand-border);
  color: var(--brand);

  &:not(:disabled):hover {
    background: rgba(255, 106, 19, 0.2);
    border-color: var(--brand);
  }
}

.btn--ghost {
  border-color: var(--line-strong);
  color: var(--text);

  &:not(:disabled):hover {
    border-color: var(--text-muted);
    background: rgba(255, 255, 255, 0.04);
  }
}

.btn--contrast {
  background: var(--text);
  color: var(--bg);

  &:not(:disabled):hover {
    background: #fff;
  }
}

.btn--busy .btn__label {
  opacity: 0.7;
}

.btn__trailing {
  transition: transform var(--duration) var(--ease);
}

.btn:not(:disabled):hover .btn__trailing {
  transform: translateX(3px);
}
</style>
