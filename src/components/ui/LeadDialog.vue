<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal" role="dialog" aria-modal="true" aria-labelledby="lead-dialog-title" @click.self="close">
        <div class="modal__panel">
          <button class="modal__close" type="button" aria-label="Закрыть" @click="close">
            <AppIcon name="close" :size="20" />
          </button>

          <p class="modal__eyebrow">Ответим за 15 минут</p>
          <h2 id="lead-dialog-title" class="modal__title">{{ title }}</h2>
          <p class="modal__text">
            Оставьте номер — перезвоним, уточним детали и назовём точную стоимость. Без навязывания.
          </p>

          <LeadForm :source="source" with-comment submit-label="Отправить заявку" @submitted="scheduleClose" />

          <div class="modal__divider"><span>или свяжитесь напрямую</span></div>

          <div class="modal__direct">
            <a class="modal__phone" :href="`tel:${PRIMARY_PHONE.tel}`">
              <AppIcon name="phone" :size="18" />
              {{ PRIMARY_PHONE.display }}
            </a>
            <a class="modal__telegram" :href="TELEGRAM_URL" target="_blank" rel="noopener noreferrer">
              <AppIcon name="telegram" :size="18" />
              Telegram
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import AppIcon from './AppIcon.vue'
import LeadForm from './LeadForm.vue'
import { PRIMARY_PHONE, TELEGRAM_URL } from '../../data/site'

const props = withDefaults(
  defineProps<{ open: boolean; title?: string; source?: string }>(),
  {
    title: 'Оставьте заявку',
    source: 'Модальное окно',
  },
)

const emit = defineEmits<{ 'update:open': [boolean] }>()

let closeTimer: ReturnType<typeof setTimeout> | undefined

function close() {
  emit('update:open', false)
}

function scheduleClose() {
  closeTimer = setTimeout(close, 4000)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.removeEventListener('keydown', handleKeydown)
      clearTimeout(closeTimer)
    }
  },
)

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
  clearTimeout(closeTimer)
})
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: var(--space-4);
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  overflow-y: auto;
}

.modal__panel {
  position: relative;
  width: 100%;
  max-width: 480px;
  padding: var(--space-6);
  background: var(--bg-raised);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.modal__close {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--text-muted);

  &:hover {
    background: var(--surface-hover);
    color: var(--text);
  }
}

.modal__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--brand);
}

.modal__title {
  margin-block: var(--space-2) var(--space-3);
  font-size: var(--step-3);
}

.modal__text {
  margin-bottom: var(--space-5);
  font-size: 0.9375rem;
  color: var(--text-muted);
}

.modal__divider {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-block: var(--space-5) var(--space-4);
  font-size: 0.75rem;
  color: var(--text-dim);

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--line);
  }
}

.modal__direct {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.modal__phone,
.modal__telegram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  transition:
    border-color var(--duration) var(--ease),
    color var(--duration) var(--ease);

  &:hover {
    border-color: var(--brand);
    color: var(--brand);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--duration) var(--ease);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
