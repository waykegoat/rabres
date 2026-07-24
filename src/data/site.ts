export interface Phone {
  tel: string
  display: string
}

export const PHONES: Phone[] = [
  { tel: '+79154721762', display: '8 (915) 472-17-62' },
  { tel: '+79858963787', display: '8 (985) 896-37-87' },
]

export const PRIMARY_PHONE = PHONES[0]

export const TELEGRAM_URL = 'https://t.me/work_resource'
export const WHATSAPP_URL = `https://wa.me/${PRIMARY_PHONE.tel.replace('+', '')}`

export const COMPANY = {
  name: 'Рабочий ресурс',
  tagline: 'Разнорабочие и специалисты по Москве и области',
  foundedYear: 2023,
  region: 'Москва и Московская область',
  schedule: 'Круглосуточно, без выходных',
  scheduleSchemaOrg: 'Mo-Su 00:00-24:00',
} as const

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://rabochiy-resurs.ru'
).replace(/\/$/, '')

export const DEFAULT_OG_IMAGE = '/og-image.jpg'
