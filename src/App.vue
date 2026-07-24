<template>
  <a class="skip-link" href="#main">Перейти к содержанию</a>
  <SiteHeader />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter />
  <MobileActionBar />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import MobileActionBar from './components/layout/MobileActionBar.vue'
import { COMPANY } from './data/site'

useHead({
  htmlAttrs: { lang: 'ru' },
  titleTemplate: (title?: string) => (title ? `${title}` : COMPANY.name),
})
</script>

<style scoped>
main {
  min-height: 60vh;
}

@media (max-width: 767.98px) {
  main {
    padding-bottom: 72px;
  }
}
</style>
