<template>
  <section class="section section--sunken">
    <div class="container">
      <SectionHeading
        eyebrow="Направления"
        title="Берёмся за работу, от которой отказываются"
        subtitle="От выноса мусора и демонтажа до инженерии и отделки. Ниже — основные направления, кликните, чтобы посмотреть условия."
      />

      <ul class="gallery">
        <li v-for="tile in TILES" :key="tile.to" class="tile">
          <RouterLink :to="tile.to" class="tile__link">
            <img class="tile__img" :src="tile.img" :alt="tile.alt" loading="lazy" decoding="async" />
            <span class="tile__overlay"></span>
            <span class="tile__body">
              <span class="tile__label">{{ tile.label }}</span>
              <span class="tile__meta">
                {{ tile.meta }}
                <AppIcon name="arrowRight" :size="16" class="tile__arrow" />
              </span>
            </span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppIcon from '../ui/AppIcon.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import toolsImg from '../../assets/images/photos/tools.webp'
import crewImg from '../../assets/images/photos/crew.webp'
import electricImg from '../../assets/images/photos/electric.webp'
import tileImg from '../../assets/images/photos/tile.webp'

const TILES = [
  { img: toolsImg, label: 'Демонтаж и стройка', meta: 'Снос, распил, подготовка', alt: 'Рабочий с электроинструментом на объекте', to: '/uslugi/demontazh' },
  { img: crewImg, label: 'Бригады на объект', meta: 'Подсобные и разнорабочие', alt: 'Бригада рабочих на строительной площадке', to: '/uslugi/podsobnye-raboty' },
  { img: electricImg, label: 'Инженерные работы', meta: 'Электрика и сантехника', alt: 'Электрик за работой со щитом', to: '/uslugi/elektrik' },
  { img: tileImg, label: 'Отделка', meta: 'Плитка, малярные работы', alt: 'Укладка плитки на стену', to: '/uslugi/malyarnye-raboty' },
]
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as t;
@use '../../styles/mixins' as m;

.gallery {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: 1fr;

  @include m.up(t.$bp-sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include m.up(t.$bp-lg) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.tile {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.tile__link {
  display: block;
  position: relative;
  aspect-ratio: 4 / 5;

  @include m.up(t.$bp-lg) {
    aspect-ratio: 3 / 4;
  }
}

.tile__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms var(--ease);
}

.tile__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 30%, rgba(8, 9, 10, 0.9) 100%);
}

.tile__body {
  position: absolute;
  inset: auto 0 0 0;
  display: grid;
  gap: 2px;
  padding: var(--space-4);
}

.tile__label {
  @include m.display-font;
  font-size: var(--step-1);
  color: var(--text);
}

.tile__meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.tile__arrow {
  color: var(--brand);
  transition: transform var(--duration) var(--ease);
}

.tile__link:hover .tile__img {
  transform: scale(1.06);
}

.tile__link:hover .tile__arrow {
  transform: translateX(4px);
}

.tile::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  transition: border-color var(--duration) var(--ease);
  pointer-events: none;
}

.tile:hover::after {
  border-color: var(--brand-border);
}
</style>
