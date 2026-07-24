<template>
  <section class="hero">
    <img
      class="hero__photo"
      :src="hero1280"
      :srcset="`${hero1280} 1280w, ${hero1920} 1920w`"
      sizes="100vw"
      alt=""
      fetchpriority="high"
      decoding="async"
    />
    <div class="hero__backdrop" aria-hidden="true"></div>

    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="hero__badge">
          <span class="hero__pulse"></span>
          Работаем прямо сейчас · {{ COMPANY.schedule }}
        </p>

        <h1 class="hero__title">
          Разнорабочие и специалисты<br />
          <span class="hero__accent">в Москве и области</span>
        </h1>

        <p class="hero__lead">
          Бригада на объект от одного человека — сегодня, завтра или на весь срок подряда. Цену называем
          до выезда и не меняем по факту.
        </p>

        <ul class="hero__facts">
          <li v-for="fact in FACTS" :key="fact.label" class="hero__fact">
            <span class="hero__fact-value">{{ fact.value }}</span>
            <span class="hero__fact-label">{{ fact.label }}</span>
          </li>
        </ul>

        <div class="hero__phones">
          <a v-for="phone in PHONES" :key="phone.tel" class="hero__phone" :href="`tel:${phone.tel}`">
            <AppIcon name="phone" :size="18" />
            {{ phone.display }}
          </a>
        </div>
      </div>

      <div class="hero__form">
        <div class="hero__form-head">
          <h2 class="hero__form-title">Рассчитать стоимость</h2>
          <p class="hero__form-text">Перезвоним за 15 минут и назовём точную цену</p>
        </div>
        <LeadForm source="Первый экран" submit-label="Получить расчёт" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppIcon from '../ui/AppIcon.vue'
import LeadForm from '../ui/LeadForm.vue'
import { COMPANY, PHONES } from '../../data/site'
import hero1280 from '../../assets/images/photos/hero-1280.webp'
import hero1920 from '../../assets/images/photos/hero-1920.webp'

const FACTS = [
  { value: 'от 1 часа', label: 'подача бригады' },
  { value: 'от 3 500 ₽', label: 'смена 8 часов' },
  { value: '24/7', label: 'без выходных' },
]
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.hero {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-7) var(--space-8);
  border-bottom: 1px solid var(--line);
  background: var(--bg);

  @include m.up(t.$bp-lg) {
    padding-block: var(--space-9);
  }
}

.hero__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  opacity: 0.55;
}

.hero__backdrop {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(11, 12, 14, 0.4) 0%, transparent 30%, rgba(11, 12, 14, 0.85) 100%),
    linear-gradient(90deg, rgba(11, 12, 14, 0.96) 0%, rgba(11, 12, 14, 0.7) 42%, rgba(11, 12, 14, 0.35) 100%),
    radial-gradient(55% 70% at 12% 8%, rgba(255, 106, 19, 0.22), transparent 70%);

  @include m.down(t.$bp-lg) {
    background:
      linear-gradient(180deg, rgba(11, 12, 14, 0.55) 0%, rgba(11, 12, 14, 0.82) 55%, var(--bg) 100%),
      radial-gradient(70% 50% at 15% 5%, rgba(255, 106, 19, 0.24), transparent 70%);
  }
}

.hero__inner {
  position: relative;
  display: grid;
  gap: var(--space-7);
  align-items: center;

  @include m.up(t.$bp-lg) {
    grid-template-columns: 1.15fr 0.85fr;
    gap: var(--space-8);
  }
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.4rem 0.85rem;
  margin-bottom: var(--space-4);
  border: 1px solid var(--brand-border);
  background: var(--brand-soft);
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--brand);
}

.hero__pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--brand);
  box-shadow: 0 0 0 0 rgba(255, 106, 19, 0.6);
  animation: pulse 2.4s infinite;
}

@keyframes pulse {
  70% {
    box-shadow: 0 0 0 8px rgba(255, 106, 19, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 106, 19, 0);
  }
}

.hero__title {
  font-size: var(--step-6);
  margin-bottom: var(--space-4);
}

.hero__accent {
  color: var(--brand);
}

.hero__lead {
  max-width: 52ch;
  font-size: var(--step-1);
  color: var(--text-muted);
}

.hero__facts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  margin-block: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--line);
}

.hero__fact {
  display: grid;
  gap: 2px;
}

.hero__fact-value {
  @include m.display-font;
  font-size: var(--step-2);
  color: var(--text);
}

.hero__fact-label {
  font-size: 0.8125rem;
  color: var(--text-dim);
}

.hero__phones {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.hero__phone {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.7rem 1.1rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-md);
  @include m.display-font;
  font-size: 1.0625rem;
  transition:
    border-color var(--duration) var(--ease),
    color var(--duration) var(--ease);

  &:hover {
    border-color: var(--brand);
    color: var(--brand);
  }
}

.hero__form {
  padding: var(--space-5);
  background: var(--bg-raised);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);

  @include m.up(t.$bp-md) {
    padding: var(--space-6);
  }
}

.hero__form-head {
  margin-bottom: var(--space-5);
}

.hero__form-title {
  font-size: var(--step-3);
  margin-bottom: var(--space-2);
}

.hero__form-text {
  font-size: 0.875rem;
  color: var(--text-muted);
}
</style>
