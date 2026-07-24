<template>
  <div class="action-bar">
    <a class="action-bar__item action-bar__item--call" :href="`tel:${PRIMARY_PHONE.tel}`">
      <AppIcon name="phone" :size="20" />
      <span>Позвонить</span>
    </a>
    <a class="action-bar__item" :href="TELEGRAM_URL" target="_blank" rel="noopener noreferrer">
      <AppIcon name="telegram" :size="20" />
      <span>Telegram</span>
    </a>
    <button class="action-bar__item" type="button" @click="dialogOpen = true">
      <AppIcon name="doc" :size="20" />
      <span>Заявка</span>
    </button>
  </div>

  <LeadDialog v-model:open="dialogOpen" source="Мобильная панель" title="Оставьте заявку" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import LeadDialog from '../ui/LeadDialog.vue'
import { PRIMARY_PHONE, TELEGRAM_URL } from '../../data/site'

const dialogOpen = ref(false)
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: rgba(19, 21, 25, 0.96);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--line);
  padding-bottom: env(safe-area-inset-bottom);

  @include m.up(t.$bp-md) {
    display: none;
  }
}

.action-bar__item {
  display: grid;
  justify-items: center;
  gap: 2px;
  padding: 0.625rem 0.25rem;
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--text-muted);

  & + & {
    border-left: 1px solid var(--line);
  }
}

.action-bar__item--call {
  color: var(--brand);
}
</style>
