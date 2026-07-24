<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="container header__inner">
      <RouterLink to="/" class="brand" aria-label="Рабочий ресурс — на главную">
        <img src="/logo-112.png" alt="" width="52" height="52" class="brand__mark" />
        <span class="brand__text">
          <span class="brand__name">Рабочий ресурс</span>
          <span class="brand__note">Москва и область · 24/7</span>
        </span>
      </RouterLink>

      <nav class="nav" aria-label="Основная навигация">
        <RouterLink v-for="item in NAV_ITEMS" :key="item.to" :to="item.to" class="nav__link">
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="header__actions">
        <a class="header__phone" :href="`tel:${PRIMARY_PHONE.tel}`">
          <AppIcon name="phone" :size="18" />
          <span>{{ PRIMARY_PHONE.display }}</span>
        </a>
        <BaseButton @click="openLeadDialog">Оставить заявку</BaseButton>
        <button
          class="header__burger"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="Меню"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="24" />
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <div v-if="menuOpen" id="mobile-menu" class="drawer">
        <nav class="drawer__nav" aria-label="Мобильная навигация">
          <RouterLink v-for="item in NAV_ITEMS" :key="item.to" :to="item.to" class="drawer__link">
            {{ item.label }}
            <AppIcon name="chevronRight" :size="18" />
          </RouterLink>
        </nav>
        <div class="drawer__contacts">
          <a v-for="phone in PHONES" :key="phone.tel" class="drawer__phone" :href="`tel:${phone.tel}`">
            <AppIcon name="phone" :size="18" />
            {{ phone.display }}
          </a>
          <BaseButton :href="TELEGRAM_URL" external variant="secondary" icon-left="telegram" block>
            Написать в Telegram
          </BaseButton>
        </div>
      </div>
    </Transition>
  </header>

  <LeadDialog v-model:open="leadDialogOpen" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppIcon from '../ui/AppIcon.vue'
import BaseButton from '../ui/BaseButton.vue'
import LeadDialog from '../ui/LeadDialog.vue'
import { PHONES, PRIMARY_PHONE, TELEGRAM_URL } from '../../data/site'

const NAV_ITEMS = [
  { to: '/uslugi', label: 'Услуги' },
  { to: '/ceny', label: 'Цены' },
  { to: '/geografiya', label: 'География' },
  { to: '/o-kompanii', label: 'О компании' },
  { to: '/kontakty', label: 'Контакты' },
]

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)
const leadDialogOpen = ref(false)

function openLeadDialog() {
  leadDialogOpen.value = true
}

function handleScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

watch(() => route.fullPath, () => (menuOpen.value = false))
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(11, 12, 14, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--duration) var(--ease);
}

.header--scrolled {
  border-bottom-color: var(--line);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  min-height: var(--header-height);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}

.brand__mark {
  width: 52px;
  height: 52px;
  object-fit: contain;
}

.brand__text {
  display: none;

  @include m.up(t.$bp-sm) {
    display: grid;
    gap: 3px;
  }
}

.brand__name {
  @include m.display-font;
  font-size: 1.25rem;
  line-height: 1;
}

.brand__note {
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 0.02em;
}

.nav {
  display: none;
  gap: var(--space-5);
  margin-inline-start: auto;

  @include m.up(t.$bp-lg) {
    display: flex;
  }
}

.nav__link {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: color var(--duration) var(--ease);

  &:hover,
  &.router-link-active {
    color: var(--text);
  }
}

.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-inline-start: auto;

  @include m.up(t.$bp-lg) {
    margin-inline-start: 0;
  }
}

.header__phone {
  display: none;
  align-items: center;
  gap: var(--space-2);
  @include m.display-font;
  font-size: 1.1875rem;
  color: var(--text);
  transition: color var(--duration) var(--ease);

  &:hover {
    color: var(--brand);
  }

  @include m.up(t.$bp-md) {
    display: flex;
  }
}

.header__actions :deep(.btn) {
  display: none;

  @include m.up(t.$bp-md) {
    display: inline-flex;
  }
}

.header__burger {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-md);
  border: 1px solid var(--line-strong);
  color: var(--text);

  @include m.up(t.$bp-lg) {
    display: none;
  }
}

.drawer {
  border-top: 1px solid var(--line);
  background: var(--bg-raised);
  padding: var(--space-4);
  display: grid;
  gap: var(--space-4);

  @include m.up(t.$bp-lg) {
    display: none;
  }
}

.drawer__nav {
  display: grid;
}

.drawer__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) 0;
  font-family: var(--font-display);
  font-size: 1.0625rem;
  text-transform: uppercase;
  border-bottom: 1px solid var(--line);
  color: var(--text-muted);

  &.router-link-active {
    color: var(--brand);
  }
}

.drawer__contacts {
  display: grid;
  gap: var(--space-3);
}

.drawer__phone {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  @include m.display-font;
  font-size: 1.25rem;
  color: var(--text);
}

.drawer__contacts :deep(.btn) {
  display: flex;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity var(--duration) var(--ease);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
</style>
