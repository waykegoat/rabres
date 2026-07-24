<template>
  <section id="ceny" class="section">
    <div class="container">
      <SectionHeading
        eyebrow="Цены"
        title="Сколько это стоит"
        subtitle="Смена — 8 часов, минимальный заказ — 4 часа. Ставка зависит от квалификации и объёма, но фиксируется до выезда бригады."
      />

      <div class="tariffs">
        <article v-for="tariff in TARIFFS" :key="tariff.id" class="tariff" :class="{ 'tariff--featured': tariff.featured }">
          <span v-if="tariff.featured" class="tariff__badge">Чаще всего заказывают</span>

          <h3 class="tariff__title">{{ tariff.title }}</h3>
          <p class="tariff__audience">{{ tariff.audience }}</p>

          <div class="tariff__price">
            <span class="tariff__amount">от {{ tariff.shiftPrice.toLocaleString('ru-RU') }} ₽</span>
            <span class="tariff__unit">за смену {{ SHIFT_HOURS }} часов</span>
          </div>

          <ul class="tariff__features">
            <li v-for="feature in tariff.features" :key="feature" class="tariff__feature">
              <AppIcon name="check" :size="16" class="tariff__check" />
              {{ feature }}
            </li>
          </ul>

          <BaseButton :variant="tariff.featured ? 'primary' : 'ghost'" block @click="requestTariff(tariff)">
            Заказать
          </BaseButton>
        </article>
      </div>

      <p class="note">
        <AppIcon name="receipt" :size="18" />
        Ночные, праздничные и срочные выезды считаются с надбавкой — её называем сразу при расчёте, а не
        по факту выполнения работ.
      </p>
    </div>

    <LeadDialog v-model:open="dialogOpen" :source="dialogSource" title="Заявка на бригаду" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import BaseButton from '../ui/BaseButton.vue'
import LeadDialog from '../ui/LeadDialog.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import { SHIFT_HOURS, TARIFFS, type Tariff } from '../../data/pricing'

const dialogOpen = ref(false)
const dialogSource = ref('')

function requestTariff(tariff: Tariff) {
  dialogSource.value = `Тариф «${tariff.title}»`
  dialogOpen.value = true
}
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.tariffs {
  display: grid;
  gap: var(--space-4);

  @include m.up(t.$bp-md) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.tariff {
  position: relative;
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding: var(--space-6) var(--space-5);
  @include m.card-surface;
}

.tariff--featured {
  border-color: var(--brand-border);
  background: linear-gradient(180deg, rgba(255, 106, 19, 0.08), transparent 40%), var(--surface);
}

.tariff__badge {
  position: absolute;
  top: -11px;
  left: var(--space-5);
  padding: 0.25rem 0.7rem;
  background: var(--brand);
  color: var(--text-on-brand);
  border-radius: var(--radius-pill);
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tariff__title {
  font-size: var(--step-2);
}

.tariff__audience {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.tariff__price {
  display: grid;
  gap: 2px;
  padding-top: var(--space-3);
  border-top: 1px solid var(--line);
}

.tariff__amount {
  @include m.display-font;
  font-size: var(--step-4);
  color: var(--brand);
}

.tariff__unit {
  font-size: 0.8125rem;
  color: var(--text-dim);
}

.tariff__features {
  display: grid;
  gap: var(--space-2);
  margin-block: var(--space-2) var(--space-4);
}

.tariff__feature {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: 0.9375rem;
}

.tariff__check {
  flex-shrink: 0;
  margin-top: 0.2rem;
  color: var(--brand);
}

.note {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-top: var(--space-5);
  padding: var(--space-4);
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-muted);

  :deep(svg) {
    flex-shrink: 0;
    margin-top: 0.15rem;
    color: var(--brand);
  }
}
</style>
