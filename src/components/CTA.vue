<template>
  <section id="contacts" class="cta">
    <div class="container">
      <div class="cta-content">
        <!-- Заголовок -->
        <div class="cta-header">
          <h2 class="cta-title">Звоните в любое время!</h2>
          <p class="cta-subtitle">Будем рады сотрудничеству</p>
        </div>

        <!-- Основные телефоны -->
        <div class="main-phones">
          <div class="phones-grid">
            <a 
              v-for="phone in phones" 
              :key="phone.id"
              :href="`tel:${phone.number}`" 
              class="phone-card"
              @click="trackCall(phone.number)"
            >
              <div class="phone-icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div class="phone-number">{{ phone.formatted }}</div>
              <div class="phone-label">Нажмите для звонка</div>
            </a>
          </div>
        </div>

        <!-- Telegram -->
        <div class="telegram-section">
          <a 
            href="https://t.me/work_resource" 
            class="telegram-btn"
            target="_blank"
            @click="trackTelegram"
          >
            <div class="telegram-icon">
              <i class="fab fa-telegram"></i>
            </div>
            <div class="telegram-content">
              <div class="telegram-title">Написать в Telegram</div>
              <div class="telegram-subtitle">Быстрая связь через мессенджер</div>
            </div>
            <div class="telegram-arrow">→</div>
          </a>
        </div>

        <!-- Информация -->
        <div class="info-section">
          <div class="info-card">
            <div class="info-icon">📍</div>
            <div class="info-content">
              <div class="info-title">Московская область</div>
              <div class="info-text">Работаем по всей области</div>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">🕒</div>
            <div class="info-content">
              <div class="info-title">Режим работы</div>
              <div class="info-text">Круглосуточно, без выходных</div>
            </div>
          </div>
        </div>

        <!-- Гарантии -->
        <div class="guarantee-section">
          <div class="guarantee-card">
            <div class="guarantee-icon">🎯</div>
            <div class="guarantee-content">
              <div class="guarantee-title">Гарантия качества</div>
              <div class="guarantee-text">Все работы выполняются профессионально и в срок</div>
            </div>
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

const trackCall = (number: string) => {
  console.log('Звонок начат:', number)
}

const trackTelegram = () => {
  console.log('Telegram открыт')
}
</script>

<style scoped>
.cta {
  padding: 100px 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #000 100%);
  position: relative;
}

.cta-content {
  text-align: center;
  color: white;
}

.cta-header {
  margin-bottom: 60px;
}

.cta-title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 3rem;
  margin-bottom: 20px;
  color: #F8C300;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
}

.cta-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
}

.main-phones {
  margin-bottom: 60px;
}

.phones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.phone-card {
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #F8C300;
  border-radius: 20px;
  padding: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.phone-card:hover {
  transform: translateY(-10px) scale(1.05);
  background: rgba(248, 195, 0, 0.1);
  box-shadow: 0 20px 40px rgba(248, 195, 0, 0.2);
}

.phone-icon {
  font-size: 48px;
  color: #F8C300;
  margin-bottom: 20px;
}

.phone-number {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: #F8C300;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(248, 195, 0, 0.3);
}

.phone-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.telegram-section {
  max-width: 500px;
  margin: 0 auto 60px;
}

.telegram-btn {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #0088cc 0%, #006699 100%);
  border-radius: 15px;
  padding: 25px 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.telegram-btn:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 136, 204, 0.3);
}

.telegram-icon {
  font-size: 40px;
  color: white;
}

.telegram-content {
  flex: 1;
  text-align: left;
}

.telegram-title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 5px;
}

.telegram-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

.telegram-arrow {
  font-size: 24px;
  color: white;
  transition: transform 0.3s ease;
}

.telegram-btn:hover .telegram-arrow {
  transform: translateX(5px);
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-align: left;
  transition: all 0.3s ease;
}

.info-card:hover {
  background: rgba(248, 195, 0, 0.05);
  transform: translateY(-5px);
}

.info-icon {
  font-size: 32px;
  color: #F8C300;
}

.info-content {
  flex: 1;
}

.info-title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.1rem;
  color: white;
  margin-bottom: 5px;
}

.info-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.guarantee-section {
  max-width: 500px;
  margin: 0 auto;
}

.guarantee-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: rgba(248, 195, 0, 0.1);
  border-radius: 15px;
  border: 2px solid rgba(248, 195, 0, 0.3);
}

.guarantee-icon {
  font-size: 48px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.guarantee-content {
  flex: 1;
  text-align: left;
}

.guarantee-title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.3rem;
  color: #F8C300;
  margin-bottom: 5px;
}

.guarantee-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .cta {
    padding: 60px 0;
  }
  
  .phones-grid {
    grid-template-columns: 1fr;
  }
  
  .phone-number {
    font-size: 1.8rem;
  }
  
  .telegram-btn {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .telegram-content {
    text-align: center;
  }
  
  .info-card {
    flex-direction: column;
    text-align: center;
  }
  
  .guarantee-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>