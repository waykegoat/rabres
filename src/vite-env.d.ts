/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_LEAD_ENDPOINT?: string
  readonly VITE_YANDEX_METRIKA_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
