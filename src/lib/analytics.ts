import { YANDEX_METRIKA_ID } from '../data/site'

const METRIKA_SRC = 'https://mc.yandex.ru/metrika/tag.js'

let initialized = false

function isEnabled(): boolean {
  return YANDEX_METRIKA_ID > 0 && typeof window !== 'undefined'
}

export function initMetrika(): void {
  if (initialized || !isEnabled()) return
  initialized = true

  window.ym =
    window.ym ||
    function (...args: unknown[]) {
      ;(window.ym!.a = window.ym!.a || []).push(args)
    }
  window.ym!.l = Date.now()

  const script = document.createElement('script')
  script.async = true
  script.src = METRIKA_SRC
  document.head.appendChild(script)

  window.ym!(YANDEX_METRIKA_ID, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  })
}

export function trackPageview(url: string): void {
  if (!isEnabled() || !window.ym) return
  window.ym(YANDEX_METRIKA_ID, 'hit', url)
}

export function reachGoal(goal: string): void {
  if (!isEnabled() || !window.ym) return
  window.ym(YANDEX_METRIKA_ID, 'reachGoal', goal)
}
