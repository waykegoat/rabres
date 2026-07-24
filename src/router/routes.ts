import type { RouteRecordRaw } from 'vue-router'
import { SERVICES } from '../data/services'
import { CITIES } from '../data/cities'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/uslugi',
    name: 'services',
    component: () => import('../pages/ServicesPage.vue'),
  },
  ...SERVICES.map<RouteRecordRaw>((service) => ({
    path: `/uslugi/${service.slug}`,
    name: `service-${service.slug}`,
    component: () => import('../pages/ServicePage.vue'),
    props: { slug: service.slug },
  })),
  {
    path: '/geografiya',
    name: 'cities',
    component: () => import('../pages/CitiesPage.vue'),
  },
  ...CITIES.map<RouteRecordRaw>((city) => ({
    path: `/raznorabochie/${city.slug}`,
    name: `city-${city.slug}`,
    component: () => import('../pages/CityPage.vue'),
    props: { slug: city.slug },
  })),
  {
    path: '/ceny',
    name: 'pricing',
    component: () => import('../pages/PricingPage.vue'),
  },
  {
    path: '/o-kompanii',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
  },
  {
    path: '/kontakty',
    name: 'contacts',
    component: () => import('../pages/ContactsPage.vue'),
  },
  {
    path: '/politika-konfidencialnosti',
    name: 'privacy',
    component: () => import('../pages/PrivacyPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
  },
]
