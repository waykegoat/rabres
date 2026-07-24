import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router/routes'
import { initMetrika, trackPageview } from './lib/analytics'
import './styles/fonts'
import './styles/main.scss'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      return { top: 0 }
    },
  },
  ({ router, isClient }) => {
    if (!isClient) return
    initMetrika()
    router.afterEach((to) => trackPageview(to.fullPath))
  },
)
