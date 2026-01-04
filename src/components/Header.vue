<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <div class="header-content">
        <!-- Логотип -->
        <div class="logo" @click="scrollToTop">
          <img :src="logo" alt="Рабочий ресурс" class="logo-image" />
          <span class="logo-text">Рабочий ресурс</span>
        </div>

        <!-- Навигация -->
        <nav class="nav">
          <a href="#services" class="nav-link" @click.prevent="scrollToSection('services')">
            <span class="nav-number">01</span>
            <span class="nav-text">Услуги</span>
          </a>
          <a href="#pricing" class="nav-link" @click.prevent="scrollToSection('pricing')">
            <span class="nav-number">02</span>
            <span class="nav-text">Цены</span>
          </a>
          <a href="#contacts" class="nav-link" @click.prevent="scrollToSection('contacts')">
            <span class="nav-number">03</span>
            <span class="nav-text">Контакты</span>
          </a>
        </nav>

        <!-- Телефоны -->
        <div class="phones">
          <a v-for="(phone, index) in phones" 
             :key="index" 
             :href="`tel:${phone.number}`" 
             class="phone-link"
             @click="trackCall(phone.number)">
            <div class="phone-icon">
              <i class="fas fa-phone-alt"></i>
            </div>
            <div class="phone-number">{{ phone.formatted }}</div>
          </a>
        </div>

        <!-- Мобильное меню -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Мобильное меню -->
    <div class="mobile-menu" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
      <div class="mobile-menu-content">
        <a href="#services" class="mobile-menu-link" @click.prevent="scrollToSection('services')">
          Услуги
        </a>
        <a href="#pricing" class="mobile-menu-link" @click.prevent="scrollToSection('pricing')">
          Цены
        </a>
        <a href="#contacts" class="mobile-menu-link" @click.prevent="scrollToSection('contacts')">
          Контакты
        </a>
        <div class="mobile-phones">
          <a v-for="(phone, index) in phones" 
             :key="index" 
             :href="`tel:${phone.number}`" 
             class="mobile-phone-link"
             @click="trackCall(phone.number)">
            <i class="fas fa-phone-alt"></i>
            {{ phone.formatted }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import logo from '../assets/images/logo.png'

const phones = ref([
  { number: '89154721762', formatted: '8 (915) 472-17-62' },
  { number: '89858963787', formatted: '8 (985) 896-37-87' }
])

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  isMobileMenuOpen.value = false
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const trackCall = (number: string) => {
  console.log('Звонок начат:', number)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(248, 195, 0, 0.2);
}

.header-scrolled {
  background: rgba(0, 0, 0, 0.98);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: translateY(-2px);
}

.logo-image {
  height: 100px;
  width: auto;
}

.logo-text {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 22px;
  font-weight: 900;
  color: #F8C300;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav {
  display: flex;
  gap: 40px;

  @media (max-width: 992px) {
    display: none;
  }
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  .nav-number {
    color: #F8C300;
    transform: scale(1.2);
  }

  .nav-text {
    color: #F8C300;
    transform: translateY(2px);
  }

  &::after {
    width: 100%;
  }
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #F8C300;
  transition: width 0.3s ease;
}

.nav-number {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.nav-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: white;
  transition: all 0.3s ease;
}

.phones {
  display: flex;
  gap: 15px;

  @media (max-width: 992px) {
    display: none;
  }
}

.phone-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: rgba(248, 195, 0, 0.1);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(248, 195, 0, 0.2);
}

.phone-link:hover {
  background: rgba(248, 195, 0, 0.2);
  transform: translateY(-2px);
}

.phone-icon {
  color: #F8C300;
  font-size: 14px;
}

.phone-number {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #F8C300;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;

  span {
    width: 25px;
    height: 3px;
    background: #F8C300;
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  @media (max-width: 992px) {
    display: flex;
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 300px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(20px);
  z-index: 999;
  transition: all 0.4s ease;
  border-left: 2px solid #F8C300;

  &.mobile-menu-open {
    right: 0;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  }
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 100px 30px 30px;
  height: 100%;
}

.mobile-menu-link {
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  padding: 15px;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(248, 195, 0, 0.1);
    transform: translateX(10px);
  }
}

.mobile-phones {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: auto;
}

.mobile-phone-link {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #F8C300;
  text-decoration: none;
  padding: 15px;
  background: rgba(248, 195, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #F8C300;
  transition: all 0.3s ease;

  &:hover {
    background: #F8C300;
    color: #000;
  }

  i {
    font-size: 16px;
  }
}
</style>