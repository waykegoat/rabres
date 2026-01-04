<template>
  <section class="pricing" id="pricing">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-text">Прозрачные цены</span>
        </h2>
        <p class="section-subtitle">
          Никаких скрытых платежей. Только честные условия
        </p>
      </div>

      <!-- Тарифы -->
      <div class="pricing-tables">
        <!-- Тариф Разнорабочие -->
        <div class="pricing-card">
          <div class="card-header">
            <div class="card-badge">Популярный</div>
            <h3 class="card-title">Разнорабочие</h3>
            <div class="card-icon">👷</div>
          </div>
          
          <div class="card-price">
            <div class="price-amount">
              <span class="currency">₽</span>
              <span class="number">от 3 500</span>
            </div>
            <div class="price-period">/ смена (8 часов)</div>
          </div>
          
          <div class="card-features">
            <div 
              v-for="feature in workersFeatures" 
              :key="feature"
              class="feature-item"
            >
              <span class="feature-check">✓</span>
              <span class="feature-text">{{ feature }}</span>
            </div>
          </div>
        </div>

        <!-- Тариф Специалисты -->
        <div class="pricing-card specialist">
          <div class="card-header">
            <div class="card-badge premium">Премиум</div>
            <h3 class="card-title">Специалисты</h3>
            <div class="card-icon">🔧</div>
          </div>
          
          <div class="card-price">
            <div class="price-amount">
              <span class="currency">₽</span>
              <span class="number">от 5 500</span>
            </div>
            <div class="price-period">/ смена (8 часов)</div>
          </div>
          
          <div class="card-features">
            <div 
              v-for="feature in specialistsFeatures" 
              :key="feature"
              class="feature-item"
            >
              <span class="feature-check">✓</span>
              <span class="feature-text">{{ feature }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Дополнительная информация -->
      <div class="additional-info">
        <div class="info-card">
          <h4 class="info-title">Как мы работаем?</h4>
          <div class="info-steps">
            <div 
              v-for="(step, index) in workSteps" 
              :key="index"
              class="info-step"
            >
              <div class="step-number">0{{ index + 1 }}</div>
              <div class="step-content">
                <h5 class="step-title">{{ step.title }}</h5>
                <p class="step-text">{{ step.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="info-card calculator">
          <h4 class="info-title">Калькулятор стоимости</h4>
          <div class="calculator-form">
            <div class="form-group">
              <label class="form-label">Тип работ:</label>
              <select v-model="workType" class="form-select">
                <option value="basic">Разнорабочие</option>
                <option value="specialist">Специалисты</option>
                <option value="mixed">Смешанная бригада</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Количество смен:</label>
              <div class="range-slider">
                <input 
                  type="range" 
                  v-model="shiftsCount" 
                  min="1" 
                  max="30" 
                  class="slider"
                  @input="updateEstimate"
                >
                <div class="slider-value">{{ shiftsCount }} смен</div>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Срочность:</label>
              <div class="urgency-buttons">
                <button 
                  v-for="urgency in urgencyOptions"
                  :key="urgency.value"
                  :class="['urgency-btn', { 'active': selectedUrgency === urgency.value }]"
                  @click="selectedUrgency = urgency.value"
                >
                  {{ urgency.label }}
                </button>
              </div>
            </div>
            
            <div class="estimate-result">
              <div class="estimate-label">Примерная стоимость:</div>
              <div class="estimate-amount">{{ formattedEstimate }}</div>
              <div class="estimate-note">* Точная стоимость после осмотра объекта</div>
            </div>
            
            <button class="calculate-btn" @click="calculateExact">
              <span class="btn-text">Рассчитать точно</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const workType = ref('basic')
const shiftsCount = ref(1)
const selectedUrgency = ref('standard')

const workersFeatures = ref([
  'Физически крепкие работники',
  'Опыт от 3 лет',
  'Качественно',
  'СИЗ и форма',
  'Ответственный подход'
])

const specialistsFeatures = ref([
  'Квалифицированные мастера',
  'Узкопрофильные специалисты',
  'Профессиональный инструмент',
  'Гарантия на работы',
  'Быстрое решение задач'
])

const workSteps = ref([
  { title: 'Заявка', text: 'Вы оставляете заявку или звоните нам' },
  { title: 'Расчет', text: 'Рассчитываем стоимость и сроки' },
  { title: 'Выезд', text: 'Бригада выезжает на объект' },
  { title: 'Работа', text: 'Выполняем работу качественно' },
  { title: 'Оплата', text: 'После двух отработанных часов до 13:00' }
])

const urgencyOptions = ref([
  { value: 'standard', label: 'Стандартная' },
  { value: 'urgent', label: 'Срочная (+20%)' },
  { value: 'today', label: 'Сегодня (+30%)' }
])

// Вычисляемая стоимость
const estimate = computed(() => {
  let basePrice = workType.value === 'basic' ? 3500 : 5500
  let multiplier = 1
  
  if (selectedUrgency.value === 'urgent') multiplier = 1.2
  if (selectedUrgency.value === 'today') multiplier = 1.5
  
  return Math.round(basePrice * shiftsCount.value * multiplier)
})

const formattedEstimate = computed(() => {
  return new Intl.NumberFormat('ru-RU').format(estimate.value) + ' ₽'
})

const updateEstimate = () => {
  // Обновление уже происходит реактивно
}

const calculateExact = () => {
  alert(`Для точного расчета позвоните нам: 8 (915) 472-17-62\nПредварительная стоимость: ${formattedEstimate.value}`)
}
</script>

<style scoped lang="scss">
.pricing {
  position: relative;
  padding: 80px 0;
  background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  
  .title-number {
    color: #F8C300;
    font-size: 1.5rem;
    opacity: 0.5;
  }
  
  .title-text {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background: #F8C300;
      border-radius: 2px;
    }
  }
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
}

.pricing-tables {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.pricing-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &.specialist {
    background: rgba(248, 195, 0, 0.05);
    border-color: rgba(248, 195, 0, 0.1);
  }
}

.card-header {
  text-align: center;
  margin-bottom: 25px;
  
  .card-badge {
    display: inline-block;
    background: #F8C300;
    color: #000;
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 15px;
    
    &.premium {
      background: linear-gradient(135deg, #FFD700, #F8C300);
    }
  }
  
  .card-title {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 1.8rem;
    color: white;
    margin-bottom: 15px;
  }
  
  .card-icon {
    font-size: 40px;
    margin-bottom: 10px;
  }
}

.card-price {
  text-align: center;
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  .price-amount {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
    margin-bottom: 5px;
    
    .currency {
      font-size: 1.5rem;
      color: #F8C300;
      font-weight: 700;
    }
    
    .number {
      font-family: 'Roboto Condensed', sans-serif;
      font-size: 3rem;
      font-weight: 900;
      color: white;
      line-height: 1;
    }
  }
  
  .price-period {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
}

.card-features {
  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
    
    .feature-check {
      color: #F8C300;
      font-weight: bold;
      font-size: 1rem;
      min-width: 20px;
      margin-top: 2px;
    }
    
    .feature-text {
      color: rgba(255, 255, 255, 0.9);
      text-align: left;
      font-size: 0.95rem;
      line-height: 1.4;
    }
  }
}

.additional-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.info-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &.calculator {
    background: rgba(248, 195, 0, 0.05);
    border-color: rgba(248, 195, 0, 0.1);
  }
  
  .info-title {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 1.3rem;
    color: white;
    margin-bottom: 20px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 40px;
      height: 2px;
      background: #F8C300;
    }
  }
}

.info-steps {
  .info-step {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .step-number {
      font-family: 'Roboto Condensed', sans-serif;
      font-size: 1.5rem;
      font-weight: 900;
      color: #F8C300;
      min-width: 30px;
      opacity: 0.5;
    }
    
    .step-content {
      .step-title {
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 1rem;
        color: white;
        margin-bottom: 5px;
      }
      
      .step-text {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }
}

.calculator-form {
  .form-group {
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .form-label {
    display: block;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 0.95rem;
  }
  
  .form-select {
    width: 100%;
    padding: 12px 15px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: white;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #F8C300;
    }
  }
  
  .range-slider {
    padding: 15px 0;
    
    .slider {
      width: 100%;
      height: 5px;
      -webkit-appearance: none;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      outline: none;
      
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        background: #F8C300;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.1);
          box-shadow: 0 0 10px rgba(248, 195, 0, 0.5);
        }
      }
    }
    
    .slider-value {
      text-align: center;
      color: #F8C300;
      font-weight: 700;
      margin-top: 8px;
      font-size: 1rem;
    }
  }
  
  .urgency-buttons {
    display: flex;
    gap: 8px;
    
    .urgency-btn {
      flex: 1;
      padding: 10px;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.85rem;
      
      &:hover {
        border-color: rgba(248, 195, 0, 0.3);
        color: #F8C300;
      }
      
      &.active {
        background: rgba(248, 195, 0, 0.1);
        border-color: #F8C300;
        color: #F8C300;
        font-weight: 600;
      }
    }
  }
  
  .estimate-result {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 20px;
    margin: 25px 0;
    text-align: center;
    border: 1px solid rgba(248, 195, 0, 0.2);
    
    .estimate-label {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.85rem;
      margin-bottom: 8px;
    }
    
    .estimate-amount {
      font-family: 'Roboto Condensed', sans-serif;
      font-size: 2rem;
      font-weight: 900;
      color: #F8C300;
      margin-bottom: 8px;
    }
    
    .estimate-note {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.75rem;
      font-style: italic;
    }
  }
  
  .calculate-btn {
    width: 100%;
    padding: 15px;
    background: rgba(248, 195, 0, 0.1);
    border: 1px solid #F8C300;
    border-radius: 12px;
    color: #F8C300;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #F8C300;
      color: #000;
    }
    
    .btn-text {
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
}

@media (max-width: 768px) {
  .pricing {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 10px;
  }
  
  .pricing-tables,
  .additional-info {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .pricing-card {
    padding: 20px;
    
    .card-price .number {
      font-size: 2.5rem;
    }
  }
  
  .urgency-buttons {
    flex-direction: column;
  }
}
</style>