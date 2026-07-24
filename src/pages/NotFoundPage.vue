<template>
  <section class="notfound">
    <div class="container container--narrow notfound__inner">
      <p class="notfound__code">404</p>
      <h1 class="notfound__title">Такой страницы нет</h1>
      <p class="notfound__text">
        Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную или посмотрите список услуг —
        нужное наверняка там.
      </p>

      <div class="notfound__actions">
        <BaseButton to="/" icon-right="arrowRight">На главную</BaseButton>
        <BaseButton to="/uslugi" variant="ghost">Все услуги</BaseButton>
      </div>

      <p class="notfound__phone-label">Или просто позвоните:</p>
      <a class="notfound__phone" :href="`tel:${PRIMARY_PHONE.tel}`">{{ PRIMARY_PHONE.display }}</a>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '../components/ui/BaseButton.vue'
import { PRIMARY_PHONE } from '../data/site'
import { usePageSeo } from '../lib/seo'

usePageSeo({
  title: 'Страница не найдена — Рабочий ресурс',
  description: 'Запрошенная страница не найдена. Перейдите на главную или в список услуг.',
  path: '/404',
  noindex: true,
})
</script>

<style scoped lang="scss">
@use '../styles/mixins' as m;

.notfound {
  padding-block: var(--space-9);
}

.notfound__inner {
  display: grid;
  justify-items: center;
  text-align: center;
  gap: var(--space-3);
}

.notfound__code {
  @include m.display-font;
  font-size: var(--step-6);
  color: var(--brand);
  opacity: 0.4;
}

.notfound__title {
  font-size: var(--step-4);
}

.notfound__text {
  max-width: 48ch;
  color: var(--text-muted);
}

.notfound__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.notfound__phone-label {
  margin-top: var(--space-6);
  font-size: 0.8125rem;
  color: var(--text-dim);
}

.notfound__phone {
  @include m.display-font;
  font-size: var(--step-3);
  color: var(--brand);
}
</style>
