<template>
  <section class="section section--sunken">
    <div class="container">
      <SectionHeading
        eyebrow="Кому подходит"
        title="Два формата работы"
        subtitle="Условия для подрядчика и для частного заказчика отличаются. Выберите свой — расчёт будет точнее."
      />

      <div class="tracks">
        <article v-for="track in AUDIENCE_TRACKS" :key="track.id" class="track">
          <p class="track__eyebrow">{{ track.eyebrow }}</p>
          <h3 class="track__title">{{ track.title }}</h3>
          <p class="track__text">{{ track.text }}</p>

          <ul class="track__list">
            <li v-for="bullet in track.bullets" :key="bullet" class="track__item">
              <AppIcon name="check" :size="16" class="track__check" />
              {{ bullet }}
            </li>
          </ul>

          <BaseButton
            :variant="track.id === 'business' ? 'primary' : 'ghost'"
            block
            @click="openDialog(track)"
          >
            {{ track.ctaLabel }}
          </BaseButton>
        </article>
      </div>
    </div>

    <LeadDialog v-model:open="dialogOpen" :source="dialogSource" :title="dialogTitle" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import BaseButton from '../ui/BaseButton.vue'
import LeadDialog from '../ui/LeadDialog.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import { AUDIENCE_TRACKS, type AudienceTrack } from '../../data/content'

const dialogOpen = ref(false)
const dialogSource = ref('')
const dialogTitle = ref('')

function openDialog(track: AudienceTrack) {
  dialogSource.value = `Блок «${track.title}»`
  dialogTitle.value = track.ctaLabel
  dialogOpen.value = true
}
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.tracks {
  display: grid;
  gap: var(--space-4);

  @include m.up(t.$bp-md) {
    grid-template-columns: 1fr 1fr;
  }
}

.track {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding: var(--space-6);
  @include m.card-surface;
}

.track:first-child {
  border-color: var(--brand-border);
  background: linear-gradient(180deg, rgba(255, 106, 19, 0.06), transparent 45%), var(--surface);
}

.track__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--brand);
}

.track__title {
  font-size: var(--step-2);
}

.track__text {
  font-size: 0.9375rem;
  color: var(--text-muted);
}

.track__list {
  display: grid;
  gap: var(--space-2);
  margin-block: var(--space-2) var(--space-4);
}

.track__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: 0.9375rem;
}

.track__check {
  flex-shrink: 0;
  margin-top: 0.2rem;
  color: var(--brand);
}
</style>
