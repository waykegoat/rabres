<template>
  <form v-if="status !== 'success'" class="lead" :class="`lead--${layout}`" novalidate @submit.prevent="handleSubmit">
    <div class="lead__fields">
      <label v-if="withName" class="field">
        <span class="field__label">Как к вам обращаться</span>
        <input v-model.trim="name" class="field__input" type="text" name="name" autocomplete="name" placeholder="Имя" />
      </label>

      <label class="field">
        <span class="field__label">Телефон</span>
        <input
          v-model="phone"
          class="field__input"
          :class="{ 'field__input--invalid': phoneError }"
          type="tel"
          name="phone"
          inputmode="tel"
          autocomplete="tel"
          placeholder="+7 (___) ___-__-__"
          :aria-invalid="Boolean(phoneError)"
          aria-describedby="lead-phone-error"
          required
          @input="handlePhoneInput"
          @blur="touched = true"
        />
        <span v-if="phoneError" id="lead-phone-error" class="field__error">{{ phoneError }}</span>
      </label>

      <label v-if="withComment" class="field field--wide">
        <span class="field__label">Что нужно сделать</span>
        <textarea
          v-model.trim="comment"
          class="field__input field__input--area"
          name="comment"
          rows="3"
          placeholder="Например: разгрузить фуру в Химках завтра к 9 утра, нужно 4 человека"
        />
      </label>
    </div>

    <div class="lead__honeypot" aria-hidden="true">
      <label>
        Не заполняйте это поле
        <input v-model="company" type="text" name="company" tabindex="-1" autocomplete="off" />
      </label>
    </div>

    <BaseButton type="submit" :size="layout === 'stacked' ? 'lg' : 'md'" :busy="status === 'sending'" block>
      {{ status === 'sending' ? 'Отправляем…' : submitLabel }}
    </BaseButton>

    <label class="consent">
      <input v-model="consent" type="checkbox" class="consent__box" required />
      <span class="consent__text">
        Согласен на обработку персональных данных в соответствии с
        <RouterLink to="/politika-konfidencialnosti" class="consent__link">политикой конфиденциальности</RouterLink>
      </span>
    </label>

    <p v-if="status === 'error'" class="lead__status lead__status--error" role="alert">{{ statusMessage }}</p>
  </form>

  <div v-else class="lead-success" role="status">
    <div class="lead-success__mark"><AppIcon name="check" :size="28" /></div>
    <p class="lead-success__title">Заявка принята</p>
    <p class="lead-success__text">
      Перезвоним в течение 15 минут и назовём точную стоимость. Если нужно быстрее — звоните напрямую.
    </p>
    <a class="lead-success__phone" :href="`tel:${PRIMARY_PHONE.tel}`">{{ PRIMARY_PHONE.display }}</a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseButton from './BaseButton.vue'
import AppIcon from './AppIcon.vue'
import { formatPhone, isValidPhone } from '../../lib/phone'
import { submitLead } from '../../lib/leadApi'
import { reachGoal } from '../../lib/analytics'
import { PRIMARY_PHONE } from '../../data/site'

const props = withDefaults(
  defineProps<{
    source: string
    layout?: 'stacked' | 'inline'
    withName?: boolean
    withComment?: boolean
    submitLabel?: string
    estimate?: string
  }>(),
  {
    layout: 'stacked',
    withName: true,
    withComment: false,
    submitLabel: 'Получить расчёт',
  },
)

const emit = defineEmits<{ submitted: [] }>()

const route = useRoute()

const name = ref('')
const phone = ref('')
const comment = ref('')
const company = ref('')
const consent = ref(true)
const touched = ref(false)
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const statusMessage = ref('')

const phoneError = computed(() => {
  if (!touched.value) return ''
  if (!phone.value.trim()) return 'Укажите номер телефона'
  if (!isValidPhone(phone.value)) return 'Проверьте номер — нужен российский мобильный'
  return ''
})

function handlePhoneInput(event: Event) {
  const input = event.target as HTMLInputElement
  phone.value = formatPhone(input.value)
}

async function handleSubmit() {
  touched.value = true
  if (!isValidPhone(phone.value) || !consent.value) return

  status.value = 'sending'

  const result = await submitLead({
    name: name.value || undefined,
    phone: phone.value,
    comment: comment.value || undefined,
    estimate: props.estimate,
    source: props.source,
    page: route.fullPath,
    company: company.value,
  })

  if (result.ok) {
    status.value = 'success'
    reachGoal('lead_submit')
    emit('submitted')
  } else {
    status.value = 'error'
    statusMessage.value = result.message
  }
}
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.lead {
  display: grid;
  gap: var(--space-4);
}

.lead__fields {
  display: grid;
  gap: var(--space-3);
}

.lead--inline .lead__fields {
  @include m.up(t.$bp-md) {
    grid-template-columns: 1fr 1fr;
  }
}

.field {
  display: grid;
  gap: var(--space-2);
}

.field--wide {
  grid-column: 1 / -1;
}

.field__label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-muted);
}

.field__input {
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--bg-sunken);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-md);
  color: var(--text);
  transition:
    border-color var(--duration) var(--ease),
    background var(--duration) var(--ease);

  &::placeholder {
    color: var(--text-dim);
  }

  &:hover {
    border-color: var(--text-dim);
  }

  &:focus {
    border-color: var(--brand);
    background: var(--bg);
    outline: none;
  }
}

.field__input--area {
  resize: vertical;
  min-height: 88px;
}

.field__input--invalid {
  border-color: var(--danger);
}

.field__error {
  font-size: 0.8125rem;
  color: var(--danger);
}

.lead__honeypot {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.consent {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  cursor: pointer;
}

.consent__box {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  margin-top: 0.2rem;
  accent-color: var(--brand);
}

.consent__text {
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--text-dim);
}

.consent__link {
  color: var(--text-muted);
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: var(--brand);
  }
}

.lead__status--error {
  font-size: 0.875rem;
  color: var(--danger);
}

.lead-success {
  display: grid;
  justify-items: center;
  gap: var(--space-3);
  padding: var(--space-6) var(--space-4);
  text-align: center;
  @include m.card-surface;
}

.lead-success__mark {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-pill);
  background: var(--brand-soft);
  color: var(--brand);
}

.lead-success__title {
  @include m.display-font;
  font-size: var(--step-2);
}

.lead-success__text {
  max-width: 34ch;
  font-size: 0.9375rem;
  color: var(--text-muted);
}

.lead-success__phone {
  @include m.display-font;
  font-size: var(--step-2);
  color: var(--brand);
}
</style>
