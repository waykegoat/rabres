<template>
  <section id="services" class="services">
    <div class="container">
      <h2 class="section-title">Наши услуги</h2>
      
      <div class="services-grid">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="service-card"
          @mouseenter="hoveredService = service.id"
          @mouseleave="hoveredService = null"
        >
          <div class="service-icon-wrapper">
            <div class="service-icon" :class="{ 'icon-hovered': hoveredService === service.id }">
              <span class="icon-symbol">{{ service.icon }}</span>
              <div class="icon-background"></div>
            </div>
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
        </div>
      </div>
      
      <div class="services-note">
        <span class="highlight">Выполняем работу любой сложности</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hoveredService = ref<number | null>(null)

const services = [
  { id: 1, title: 'Демонтаж', icon: '🔨', description: 'Демонтаж любых конструкций и помещений' },
  { id: 2, title: 'Копка', icon: '⛏️', description: 'Земляные работы любой сложности' },
  { id: 3, title: 'Подсобные работы', icon: '👷', description: 'Поддержка на объекте' },
  { id: 4, title: 'Погрузка/разгрузка', icon: '📦', description: 'Работа с грузами любого типа' },
  { id: 5, title: 'Уборка мусора', icon: '🚮', description: 'Вывоз и утилизация отходов' },
  { id: 6, title: 'Уборка снега', icon: '❄️', description: 'Зимнее обслуживание территорий' },
  { id: 7, title: 'Сварочные работы', icon: '🔧', description: 'Профессиональная сварка' },
  { id: 8, title: 'Электрики', icon: '⚡', description: 'Электромонтажные работы' },
  { id: 9, title: 'Сантехники', icon: '🚰', description: 'Установка и ремонт сантехники' },
  { id: 10, title: 'Маляры', icon: '🎨', description: 'Отделочные работы любой сложности' }
]
</script>

<style scoped>
.services {
  padding: 100px 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #000 100%);
  position: relative;
}

.section-title {
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 60px;
  color: white;
  position: relative;
  font-family: 'Roboto Condensed', sans-serif;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background-color: #F8C300;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.service-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  padding: 30px 20px;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-10px);
  background: rgba(248, 195, 0, 0.05);
  border-color: rgba(248, 195, 0, 0.2);
}

.service-icon-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 25px;
}

.service-icon {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.service-card:hover .service-icon {
  transform: scale(1.1);
  background: rgba(248, 195, 0, 0.1);
}

.icon-symbol {
  font-size: 40px;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.icon-background {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  background: rgba(248, 195, 0, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s ease;
}

.service-card:hover .icon-background {
  opacity: 1;
  width: 90px;
  height: 90px;
}

.service-title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: white;
}

.service-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.5;
}

.services-note {
  text-align: center;
  padding: 25px;
  background: #F8C300;
  border-radius: 12px;
  margin-top: 40px;
}

.highlight {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .services {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .highlight {
    font-size: 1.4rem;
  }
}
</style>