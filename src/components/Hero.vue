<template>
  <section class="hero" id="hero">
    <div class="hero-overlay"></div>
    
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line">Разнорабочие и специалисты</span>
          <span class="title-line">в Московской области <span class="highlight">24/7</span></span>
        </h1>
        
        <p class="hero-subtitle">
          Решим любую задачу. Быстро, надежно, по фиксированной цене.
        </p>
        
        <div class="hero-slogan">
          <div class="slogan-icon">⚡</div>
          <div class="slogan-text">«Ваша сила — в наших руках. Работаем круглосуточно!»</div>
        </div>
        
        <div class="hero-actions">
          <button class="btn btn-primary" @click="scrollToSection('services')">
            <span class="btn-text">Наши услуги</span>
            <span class="btn-icon">↓</span>
          </button>
        </div>
        
        <div class="hero-phones">
          <div class="phones-row">
            <a 
              v-for="phone in phones" 
              :key="phone.id"
              :href="`tel:${phone.number}`" 
              class="phone-link"
            >
              <i class="fas fa-phone-alt"></i>
              {{ phone.formatted }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 0 60px;
  background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.7)), 
              url('https://gruzchiki.ru/services/services-images/raznorabochiye-dlya-demontazhnykh-rabot-bg.webp');
  background-size: cover;
  background-position: center;
  color: white;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.hero-title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 30px;
  line-height: 1.2;
  text-transform: uppercase;
}

.title-line {
  display: block;
  margin-bottom: 10px;
}

.highlight {
  color: #F8C300;
  text-shadow: 0 0 20px rgba(248, 195, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-slogan {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  background: rgba(248, 195, 0, 0.1);
  border: 2px solid #F8C300;
  padding: 20px 30px;
  border-radius: 15px;
  margin-bottom: 40px;
  backdrop-filter: blur(10px);
  animation: glow 3s infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(248, 195, 0, 0.2); }
  50% { box-shadow: 0 0 40px rgba(248, 195, 0, 0.4); }
}

.slogan-icon {
  font-size: 32px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.slogan-text {
  font-size: 1.3rem;
  font-weight: 600;
  font-style: italic;
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 36px;
  border: none;
  border-radius: 10px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background: linear-gradient(135deg, #F8C300 0%, #FFD700 100%);
  color: #000;
}

.btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(248, 195, 0, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #F8C300;
  border: 2px solid #F8C300;
}

.btn-secondary:hover {
  background: #F8C300;
  color: #000;
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(248, 195, 0, 0.2);
}

.hero-phones {
  margin-top: 50px;
}

.phones-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.phone-link {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #F8C300;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  color: #F8C300;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.phone-link:hover {
  background: #F8C300;
  color: #000;
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(248, 195, 0, 0.3);
}

@media (max-width: 768px) {
  .hero {
    padding: 100px 0 40px;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .phones-row {
    flex-direction: column;
  }
  
  .phone-link {
    justify-content: center;
  }
}
</style>