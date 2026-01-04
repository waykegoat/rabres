<template>
  <div class="app">
    <Header />
    <main>
      <Hero />
      <Services />
      <Pricing />
      <CTA />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Services from './components/Services.vue'
import Pricing from './components/Pricing.vue'
import CTA from './components/CTA.vue'
import Footer from './components/Footer.vue'
</script>

<style>
/* Глобальные исправления для иконок */
.service-icon {
  overflow: hidden !important;
  border-radius: 50% !important;
  background: rgba(0, 0, 0, 0.5) !important;
}

.service-card:hover .service-icon {
  background: rgba(248, 195, 0, 0.2) !important;
  transform: scale(1.1) !important;
}

/* Фикс для карточек цен при наведении */
.pricing-card:hover {
  transform: translateY(-10px) !important;
  opacity: 1 !important;
}

.pricing-card {
  transition: all 0.3s ease !important;
}

/* Общие стили */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Montserrat', sans-serif;
  background: #000;
  color: #fff;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  background: #F8C300;
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: 'Roboto Condensed', sans-serif;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(248, 195, 0, 0.3);
}
</style>