<template>
  <section id="kontakty" class="cta">
    <div class="container cta__inner">
      <div class="cta__copy">
        <h2 class="cta__title">{{ title }}</h2>
        <p class="cta__text">{{ text }}</p>

        <div class="cta__phones">
          <a v-for="phone in PHONES" :key="phone.tel" class="cta__phone" :href="`tel:${phone.tel}`">
            <AppIcon name="phone" :size="20" />
            {{ phone.display }}
          </a>
        </div>

        <div class="cta__messengers">
          <BaseButton :href="TELEGRAM_URL" external variant="secondary" icon-left="telegram">Telegram</BaseButton>
          <BaseButton :href="WHATSAPP_URL" external variant="ghost" icon-left="whatsapp">WhatsApp</BaseButton>
        </div>

        <dl class="cta__meta">
          <div class="cta__meta-item">
            <dt><AppIcon name="clock" :size="16" /> Режим работы</dt>
            <dd>{{ COMPANY.schedule }}</dd>
          </div>
          <div class="cta__meta-item">
            <dt><AppIcon name="pin" :size="16" /> Выезд</dt>
            <dd>{{ COMPANY.region }}</dd>
          </div>
        </dl>
      </div>

      <div class="cta__form">
        <p class="cta__form-title">Оставьте заявку</p>
        <p class="cta__form-note">Ответим в течение 15 минут, даже ночью</p>
        <LeadForm :source="source" with-comment submit-label="Отправить заявку" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppIcon from '../ui/AppIcon.vue'
import BaseButton from '../ui/BaseButton.vue'
import LeadForm from '../ui/LeadForm.vue'
import { COMPANY, PHONES, TELEGRAM_URL, WHATSAPP_URL } from '../../data/site'

withDefaults(
  defineProps<{ title?: string; text?: string; source?: string }>(),
  {
    title: 'Нужны люди на объект?',
    text: 'Позвоните или оставьте номер. Уточним задачу, посчитаем стоимость и назовём время подачи бригады.',
    source: 'Блок контактов',
  },
)
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.cta {
  position: relative;
  padding-block: var(--space-8);
  background:
    radial-gradient(70% 100% at 0% 0%, rgba(255, 106, 19, 0.14), transparent 65%),
    var(--bg-raised);
  border-top: 1px solid var(--line);

  @include m.up(t.$bp-md) {
    padding-block: var(--space-9);
  }
}

.cta__inner {
  display: grid;
  gap: var(--space-7);
  align-items: start;

  @include m.up(t.$bp-lg) {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }
}

.cta__title {
  font-size: var(--step-4);
  margin-bottom: var(--space-3);
}

.cta__text {
  max-width: 48ch;
  color: var(--text-muted);
}

.cta__phones {
  display: grid;
  gap: var(--space-2);
  margin-block: var(--space-5);
}

.cta__phone {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  @include m.display-font;
  font-size: var(--step-3);
  transition: color var(--duration) var(--ease);

  &:hover {
    color: var(--brand);
  }

  :deep(svg) {
    color: var(--brand);
  }
}

.cta__messengers {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.cta__meta {
  display: grid;
  gap: var(--space-4);
  margin-top: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--line);

  @include m.up(t.$bp-sm) {
    grid-template-columns: 1fr 1fr;
  }
}

.cta__meta-item dt {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-dim);

  :deep(svg) {
    color: var(--brand);
  }
}

.cta__meta-item dd {
  margin: var(--space-1) 0 0;
  font-size: 0.9375rem;
}

.cta__form {
  padding: var(--space-6);
  background: var(--bg);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.cta__form-title {
  @include m.display-font;
  font-size: var(--step-2);
}

.cta__form-note {
  margin-block: var(--space-2) var(--space-5);
  font-size: 0.875rem;
  color: var(--text-muted);
}
</style>
