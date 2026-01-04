<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Лого и информация -->
        <div class="footer-section">
          <div class="footer-logo" @click="scrollToTop">
            <img :src="logo" alt="Рабочий ресурс" class="logo-image" />
            <span class="logo-text">Рабочий ресурс</span>
          </div>
          <p class="footer-description">
            Профессиональные разнорабочие и специалисты в Московской области. 
            Работаем круглосуточно, решаем задачи любой сложности.
          </p>
        </div>

        <!-- Контакты -->
        <div class="footer-section">
          <h4 class="section-title">Контакты</h4>
          <div class="footer-contacts">
            <div class="contact-item" v-for="phone in phones" :key="phone.id">
              <i class="fas fa-phone-alt"></i>
              <a :href="`tel:${phone.number}`" class="contact-link">{{ phone.formatted }}</a>
            </div>
            <div class="contact-item">
              <i class="fab fa-telegram"></i>
              <a href="https://t.me/work_resource" target="_blank" class="contact-link">@work_resource</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span class="contact-text">Московская область</span>
            </div>
          </div>
        </div>

        <!-- Быстрые ссылки -->
        <div class="footer-section">
          <h4 class="section-title">Навигация</h4>
          <div class="footer-links">
            <a href="#services" @click.prevent="scrollToSection('services')">Услуги</a>
            <a href="#pricing" @click.prevent="scrollToSection('pricing')">Цены</a>
            <a href="#contacts" @click.prevent="scrollToSection('contacts')">Контакты</a>
          </div>
        </div>
      </div>

      <!-- Нижняя часть -->
      <div class="footer-bottom">
        <div class="copyright">
          © {{ currentYear }} Рабочий ресурс. Все права защищены.
        </div>
        <button class="scroll-top" @click="scrollToTop">
          <i class="fas fa-arrow-up"></i>
          Наверх
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import logo from '../assets/images/logo.png'

const currentYear = new Date().getFullYear()

const phones = [
  { id: 1, number: '89154721762', formatted: '8 (915) 472-17-62' },
  { id: 2, number: '89858963787', formatted: '8 (985) 896-37-87' }
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  background: #000;
  color: rgba(255, 255, 255, 0.7);
  padding: 60px 0 30px;
  border-top: 1px solid rgba(248, 195, 0, 0.2);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
  margin-bottom: 50px;
}

.footer-section {
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .footer-logo:hover {
    transform: translateY(-2px);
  }

  .logo-image {
    height: 40px;
    width: auto;
  }

  .logo-text {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 20px;
    font-weight: 900;
    color: #F8C300;
    text-transform: uppercase;
  }

  .footer-description {
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95rem;
  }
}

.section-title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.2rem;
  color: white;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: #F8C300;
}

.footer-contacts {
  .contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }

    i {
      color: #F8C300;
      width: 20px;
      font-size: 16px;
    }

    .contact-link {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        color: #F8C300;
        transform: translateX(5px);
      }
    }

    .contact-text {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;

  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    padding-left: 0;

    &:hover {
      color: #F8C300;
      padding-left: 15px;

      &::before {
        content: '→';
        position: absolute;
        left: 0;
        color: #F8C300;
      }
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

.scroll-top {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.scroll-top:hover {
  background: rgba(248, 195, 0, 0.1);
  color: #F8C300;
  border-color: rgba(248, 195, 0, 0.3);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
</style>