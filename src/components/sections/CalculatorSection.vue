<template>
  <section id="kalkulyator" class="section section--sunken">
    <div class="container">
      <SectionHeading
        eyebrow="Калькулятор"
        title="Прикиньте бюджет за минуту"
        subtitle="Расчёт ориентировочный: он не учитывает сложность объекта и удалённость. Отправьте его нам — вернёмся с точной цифрой."
      />

      <div class="calc">
        <form class="calc__controls" @submit.prevent>
          <fieldset class="control">
            <legend class="control__label">Кто нужен</legend>
            <div class="chips">
              <button
                v-for="tariff in TARIFFS"
                :key="tariff.id"
                type="button"
                class="chip"
                :class="{ 'chip--active': tariffId === tariff.id }"
                :aria-pressed="tariffId === tariff.id"
                @click="tariffId = tariff.id"
              >
                {{ tariff.title }}
              </button>
            </div>
          </fieldset>

          <div class="control">
            <label class="control__label" for="calc-people">
              Сколько человек
              <output class="control__value">{{ people }}</output>
            </label>
            <input id="calc-people" v-model.number="people" type="range" min="1" max="20" class="range" />
          </div>

          <div class="control">
            <label class="control__label" for="calc-shifts">
              Сколько смен
              <output class="control__value">{{ shifts }}</output>
            </label>
            <input id="calc-shifts" v-model.number="shifts" type="range" min="1" max="30" class="range" />
          </div>

          <fieldset class="control">
            <legend class="control__label">Когда нужны</legend>
            <div class="chips">
              <button
                v-for="option in URGENCY_OPTIONS"
                :key="option.id"
                type="button"
                class="chip chip--stacked"
                :class="{ 'chip--active': urgencyId === option.id }"
                :aria-pressed="urgencyId === option.id"
                @click="urgencyId = option.id"
              >
                <span>{{ option.label }}</span>
                <small>{{ option.hint }}</small>
              </button>
            </div>
          </fieldset>
        </form>

        <aside class="calc__result">
          <p class="calc__result-label">Ориентировочная стоимость</p>
          <p class="calc__total">{{ formatMoney(estimate.total) }}</p>
          <p class="calc__breakdown">
            {{ people }} чел. × {{ shifts }} {{ shiftWord }} · {{ formatMoney(estimate.pricePerShift) }} за смену
          </p>

          <p v-if="estimate.volumeSaving > 0" class="calc__saving">
            <AppIcon name="check" :size="16" />
            Скидка за объём: −{{ formatMoney(estimate.volumeSaving) }}
          </p>

          <div class="calc__form">
            <p class="calc__form-title">Получить точный расчёт</p>
            <LeadForm source="Калькулятор" :estimate="estimateSummary" submit-label="Отправить расчёт" :with-name="false" />
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import LeadForm from '../ui/LeadForm.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import {
  TARIFFS,
  URGENCY_OPTIONS,
  calculateEstimate,
  formatMoney,
  getTariff,
  getUrgency,
  type TariffId,
  type UrgencyId,
} from '../../data/pricing'

const tariffId = ref<TariffId>('worker')
const people = ref(2)
const shifts = ref(3)
const urgencyId = ref<UrgencyId>('planned')

const estimate = computed(() =>
  calculateEstimate({
    tariffId: tariffId.value,
    people: people.value,
    shifts: shifts.value,
    urgencyId: urgencyId.value,
  }),
)

const shiftWord = computed(() => {
  const value = shifts.value % 100
  if (value >= 11 && value <= 14) return 'смен'
  const last = value % 10
  if (last === 1) return 'смена'
  if (last >= 2 && last <= 4) return 'смены'
  return 'смен'
})

const estimateSummary = computed(
  () =>
    `${getTariff(tariffId.value).title}, ${people.value} чел., ${shifts.value} ${shiftWord.value}, ` +
    `${getUrgency(urgencyId.value).label.toLowerCase()} — ${formatMoney(estimate.value.total)}`,
)
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.calc {
  display: grid;
  gap: var(--space-4);

  @include m.up(t.$bp-lg) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }
}

.calc__controls {
  display: grid;
  gap: var(--space-5);
  padding: var(--space-6);
  @include m.card-surface;
}

.control {
  display: grid;
  gap: var(--space-3);
  border: none;
  padding: 0;
  margin: 0;
}

.control__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-muted);
}

.control__value {
  @include m.display-font;
  font-size: 1.125rem;
  color: var(--brand);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chip {
  flex: 1 1 auto;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-md);
  background: var(--bg-sunken);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
  transition:
    border-color var(--duration) var(--ease),
    color var(--duration) var(--ease),
    background var(--duration) var(--ease);

  &:hover {
    border-color: var(--text-dim);
    color: var(--text);
  }
}

.chip--stacked {
  display: grid;
  gap: 2px;
  text-align: left;

  small {
    font-size: 0.6875rem;
    color: var(--text-dim);
  }
}

.chip--active {
  border-color: var(--brand);
  background: var(--brand-soft);
  color: var(--brand);

  small {
    color: var(--brand);
    opacity: 0.75;
  }
}

.range {
  width: 100%;
  height: 4px;
  border-radius: var(--radius-pill);
  background: var(--line-strong);
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--brand);
    border: 3px solid var(--bg-raised);
    box-shadow: var(--shadow-sm);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--brand);
    border: 3px solid var(--bg-raised);
  }
}

.calc__result {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-6);
  background: var(--bg-raised);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-lg);
}

.calc__result-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
}

.calc__total {
  @include m.display-font;
  font-size: var(--step-5);
  color: var(--brand);
}

.calc__breakdown {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.calc__saving {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
  color: var(--success);
}

.calc__form {
  margin-top: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--line);
}

.calc__form-title {
  margin-bottom: var(--space-3);
  @include m.display-font;
  font-size: var(--step-1);
}
</style>
