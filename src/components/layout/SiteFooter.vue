<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <img src="/logo-112.png" alt="" width="56" height="56" class="footer__logo" loading="lazy" />
          <p class="footer__tagline">{{ COMPANY.tagline }}</p>
          <p class="footer__schedule">
            <AppIcon name="clock" :size="16" />
            {{ COMPANY.schedule }}
          </p>
        </div>

        <nav class="footer__col" aria-label="Услуги">
          <h2 class="footer__title">Услуги</h2>
          <RouterLink v-for="service in SERVICES.slice(0, 6)" :key="service.slug" :to="`/uslugi/${service.slug}`" class="footer__link">
            {{ service.title }}
          </RouterLink>
          <RouterLink to="/uslugi" class="footer__link footer__link--more">Все услуги</RouterLink>
        </nav>

        <nav class="footer__col" aria-label="География">
          <h2 class="footer__title">География</h2>
          <RouterLink v-for="city in CITIES_BY_PRIORITY.slice(0, 6)" :key="city.slug" :to="`/raznorabochie/${city.slug}`" class="footer__link">
            {{ city.name }}
          </RouterLink>
          <RouterLink to="/geografiya" class="footer__link footer__link--more">Все города</RouterLink>
        </nav>

        <div class="footer__col">
          <h2 class="footer__title">Связь</h2>
          <a v-for="phone in PHONES" :key="phone.tel" class="footer__phone" :href="`tel:${phone.tel}`">
            {{ phone.display }}
          </a>
          <a class="footer__link" :href="TELEGRAM_URL" target="_blank" rel="noopener noreferrer">Telegram</a>
          <RouterLink to="/kontakty" class="footer__link">Все контакты</RouterLink>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">© {{ year }} {{ COMPANY.name }}. {{ COMPANY.region }}.</p>
        <div class="footer__legal">
          <RouterLink to="/politika-konfidencialnosti" class="footer__legal-link">
            Политика конфиденциальности
          </RouterLink>
          <RouterLink to="/o-kompanii" class="footer__legal-link">О компании</RouterLink>
        </div>
      </div>

      <p class="footer__disclaimer">
        Информация на сайте носит справочный характер и не является публичной офертой. Точная стоимость
        определяется после уточнения объёма работ.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppIcon from '../ui/AppIcon.vue'
import { COMPANY, PHONES, TELEGRAM_URL } from '../../data/site'
import { SERVICES } from '../../data/services'
import { CITIES_BY_PRIORITY } from '../../data/cities'

const year = new Date().getFullYear()
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.footer {
  padding-block: var(--space-8) var(--space-6);
  background: var(--bg-sunken);
  border-top: 1px solid var(--line);
}

.footer__top {
  display: grid;
  gap: var(--space-6);

  @include m.up(t.$bp-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include m.up(t.$bp-lg) {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }
}

.footer__logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  margin-bottom: var(--space-3);
}

.footer__tagline {
  max-width: 30ch;
  font-size: 0.9375rem;
  color: var(--text-muted);
}

.footer__schedule {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-3);
  font-size: 0.875rem;
  color: var(--brand);
}

.footer__col {
  display: grid;
  align-content: start;
  gap: var(--space-2);
}

.footer__title {
  margin-bottom: var(--space-1);
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  color: var(--text-dim);
}

.footer__link {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: color var(--duration) var(--ease);

  &:hover {
    color: var(--brand);
  }
}

.footer__link--more {
  color: var(--text);
  font-weight: 500;
}

.footer__phone {
  @include m.display-font;
  font-size: 1.125rem;
  transition: color var(--duration) var(--ease);

  &:hover {
    color: var(--brand);
  }
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-5);
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-7);
  padding-top: var(--space-5);
  border-top: 1px solid var(--line);
}

.footer__copy,
.footer__legal-link {
  font-size: 0.8125rem;
  color: var(--text-dim);
}

.footer__legal {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.footer__legal-link:hover {
  color: var(--text-muted);
}

.footer__disclaimer {
  margin-top: var(--space-4);
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--text-dim);
  max-width: 80ch;
}
</style>
